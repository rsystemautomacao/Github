#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script automatizado para fazer commit e push para o GitHub
Versão simplificada - verifica token salvo ou pede para criar
"""

import os
import subprocess
from pathlib import Path
import tkinter as tk
from tkinter import filedialog, messagebox, simpledialog
import re
import webbrowser
import requests
import json

class GitAutoCommit:
    def __init__(self):
        self.root = tk.Tk()
        self.root.withdraw()
        self.selected_folder = None
        self.github_token = None
        self.github_username = None
        self.config_file = Path.home() / '.github_auto_commit.json'
        
    def load_saved_token(self):
        """Carrega token salvo se existir"""
        if self.config_file.exists():
            try:
                with open(self.config_file, 'r') as f:
                    config = json.load(f)
                    token = config.get('token')
                    username = config.get('username')
                    if token and self.validate_token(token):
                        self.github_token = token
                        self.github_username = username
                        return True
            except:
                pass
        return False
    
    def save_token(self, token, username):
        """Salva token para uso futuro"""
        try:
            config = {
                'token': token,
                'username': username
            }
            with open(self.config_file, 'w') as f:
                json.dump(config, f)
            return True
        except:
            return False
    
    def validate_token(self, token):
        """Valida o token fazendo uma requisição à API do GitHub"""
        try:
            headers = {
                'Authorization': f'token {token}',
                'Accept': 'application/vnd.github.v3+json'
            }
            response = requests.get('https://api.github.com/user', headers=headers, timeout=10)
            if response.status_code == 200:
                user_data = response.json()
                self.github_username = user_data.get('login')
                return True
            return False
        except:
            return False
    
    def get_github_token(self):
        """Obtém token do GitHub - verifica se já está logado ou pede para criar"""
        # Tenta carregar token salvo
        if self.load_saved_token():
            print(f"✅ Token encontrado! Usuário: {self.github_username}")
            return True
        
        # Se não tem token, abre GitHub para criar
        print("\n" + "="*60)
        print("  CONFIGURAÇÃO INICIAL")
        print("="*60)
        print("\nVocê precisa de um Personal Access Token do GitHub.")
        print("Vamos abrir o navegador para você criar um token.")
        print("\nInstruções:")
        print("1. Faça login no GitHub (se não estiver logado)")
        print("2. Clique em 'Generate new token (classic)'")
        print("3. Dê um nome (ex: 'Auto Commit')")
        print("4. Selecione o escopo 'repo'")
        print("5. Clique em 'Generate token'")
        print("6. COPIE o token (você não verá novamente!)")
        print("7. Cole aqui quando solicitado")
        print("\n" + "="*60)
        
        input("\nPressione ENTER para abrir o GitHub...")
        
        # Abre página de criação de token
        token_url = "https://github.com/settings/tokens/new"
        webbrowser.open(token_url)
        
        # Solicita token
        self.root.deiconify()
        token = simpledialog.askstring(
            "Token do GitHub",
            "Cole o Personal Access Token gerado:",
            show='*'
        )
        self.root.withdraw()
        
        if not token:
            print("Token não fornecido. Operação cancelada.")
            return False
        
        # Valida e salva token
        if self.validate_token(token):
            self.github_token = token
            self.save_token(token, self.github_username)
            print(f"✅ Token salvo com sucesso! Usuário: {self.github_username}")
            return True
        else:
            print("❌ Token inválido. Verifique e tente novamente.")
            return False
    
    def select_folder(self):
        """Abre diálogo para selecionar a pasta"""
        folder = filedialog.askdirectory(
            title="Selecione a pasta que deseja fazer commit"
        )
        if folder:
            self.selected_folder = Path(folder)
            return True
        return False
    
    def check_git_installed(self):
        """Verifica se o Git está instalado"""
        try:
            subprocess.run(['git', '--version'], 
                         capture_output=True, 
                         check=True)
            return True
        except (subprocess.CalledProcessError, FileNotFoundError):
            return False
    
    def is_git_repo(self, folder):
        """Verifica se a pasta é um repositório Git"""
        git_dir = folder / '.git'
        return git_dir.exists()
    
    def init_git_repo(self, folder):
        """Inicializa um repositório Git se não existir"""
        try:
            subprocess.run(['git', 'init'], 
                         cwd=folder, 
                         check=True,
                         capture_output=True)
            return True
        except subprocess.CalledProcessError:
            return False
    
    def get_remote_url(self, folder):
        """Obtém a URL do repositório remoto"""
        try:
            result = subprocess.run(
                ['git', 'remote', 'get-url', 'origin'],
                cwd=folder,
                capture_output=True,
                text=True,
                check=True
            )
            return result.stdout.strip()
        except subprocess.CalledProcessError:
            return None
    
    def set_remote_url(self, folder, username, repo_name):
        """Configura a URL do repositório remoto"""
        url = f"https://github.com/{username}/{repo_name}.git"
        try:
            subprocess.run(['git', 'remote', 'remove', 'origin'],
                         cwd=folder,
                         capture_output=True)
        except:
            pass
        
        try:
            subprocess.run(['git', 'remote', 'add', 'origin', url],
                         cwd=folder,
                         check=True,
                         capture_output=True)
            return True
        except subprocess.CalledProcessError:
            return False
    
    def get_repo_name_from_url(self, url):
        """Extrai o nome do repositório da URL"""
        match = re.search(r'github\.com[/:]([\w-]+)/([\w.-]+)', url)
        if match:
            return match.group(2).replace('.git', '')
        return None
    
    def get_repo_name(self):
        """Solicita o nome do repositório se necessário"""
        self.root.deiconify()
        repo_name = simpledialog.askstring(
            "Nome do Repositório",
            "Digite o nome do repositório no GitHub:",
            initialvalue=self.selected_folder.name
        )
        self.root.withdraw()
        return repo_name or self.selected_folder.name
    
    def get_commit_message(self):
        """Solicita mensagem de commit ao usuário"""
        self.root.deiconify()
        message = simpledialog.askstring(
            "Mensagem de Commit",
            "Digite a mensagem do commit:",
            initialvalue="Atualização automática"
        )
        self.root.withdraw()
        return message or "Atualização automática"
    
    def git_add(self, folder):
        """Adiciona todos os arquivos ao staging"""
        try:
            subprocess.run(['git', 'add', '.'],
                         cwd=folder,
                         check=True,
                         capture_output=True)
            return True
        except subprocess.CalledProcessError:
            return False
    
    def git_commit(self, folder, message):
        """Faz o commit"""
        try:
            # Configura usuário Git se necessário
            try:
                subprocess.run(['git', 'config', 'user.name'],
                             cwd=folder,
                             capture_output=True,
                             check=True)
            except:
                subprocess.run(['git', 'config', 'user.name', 'Auto Commit'],
                             cwd=folder,
                             capture_output=True)
            
            try:
                subprocess.run(['git', 'config', 'user.email'],
                             cwd=folder,
                             capture_output=True,
                             check=True)
            except:
                subprocess.run(['git', 'config', 'user.email', 'auto@commit.local'],
                             cwd=folder,
                             capture_output=True)
            
            result = subprocess.run(
                ['git', 'commit', '-m', message],
                cwd=folder,
                capture_output=True,
                text=True,
                check=True
            )
            return True
        except subprocess.CalledProcessError as e:
            if "nothing to commit" in e.stderr.lower():
                return None
            return False
    
    def get_current_branch(self, folder):
        """Obtém o nome da branch atual"""
        try:
            result = subprocess.run(
                ['git', 'branch', '--show-current'],
                cwd=folder,
                capture_output=True,
                text=True,
                check=True
            )
            branch = result.stdout.strip()
            if branch:
                return branch
        except:
            pass
        
        # Se não tem branch, verifica se tem commits
        try:
            result = subprocess.run(
                ['git', 'rev-parse', '--abbrev-ref', 'HEAD'],
                cwd=folder,
                capture_output=True,
                text=True
            )
            branch = result.stdout.strip()
            if branch and branch != 'HEAD':
                return branch
        except:
            pass
        
        # Tenta criar branch main
        try:
            subprocess.run(['git', 'branch', '-M', 'main'],
                         cwd=folder,
                         capture_output=True)
            return 'main'
        except:
            return 'main'
    
    def git_push(self, folder, username, token, repo_name):
        """Faz o push para o GitHub usando token"""
        # Obtém branch atual
        branch = self.get_current_branch(folder)
        
        # Monta a URL com token
        url = f"https://{username}:{token}@github.com/{username}/{repo_name}.git"
        
        # Atualiza remote com token
        try:
            subprocess.run(['git', 'remote', 'set-url', 'origin', url],
                         cwd=folder,
                         capture_output=True,
                         check=True)
        except:
            subprocess.run(['git', 'remote', 'add', 'origin', url],
                         cwd=folder,
                         capture_output=True)
        
        try:
            # Faz push na branch atual
            result = subprocess.run(
                ['git', 'push', '-u', 'origin', branch],
                cwd=folder,
                capture_output=True,
                text=True,
                timeout=60
            )
            
            if result.returncode == 0:
                return True
            else:
                print(f"Erro no push: {result.stderr}")
                return False
                
        except subprocess.TimeoutExpired:
            print("Timeout ao fazer push. Verifique sua conexão.")
            return False
        except Exception as e:
            print(f"Erro ao fazer push: {e}")
            return False
    
    def run(self):
        """Executa o processo completo"""
        print("="*60)
        print("  AUTOMATIZADOR DE COMMIT PARA GITHUB")
        print("="*60)
        print()
        
        # Verifica se Git está instalado
        if not self.check_git_installed():
            messagebox.showerror(
                "Erro",
                "Git não está instalado!\n"
                "Por favor, instale o Git primeiro:\n"
                "https://git-scm.com/downloads"
            )
            return False
        
        # Verifica/obtém token do GitHub
        print("1. Verificando autenticação GitHub...")
        if not self.get_github_token():
            print("Operação cancelada.")
            return False
        
        # Seleciona a pasta
        print("\n2. Selecionando pasta...")
        if not self.select_folder():
            print("Operação cancelada pelo usuário.")
            return False
        
        print(f"   Pasta selecionada: {self.selected_folder}")
        
        # Verifica/inicializa repositório Git
        print("\n3. Verificando repositório Git...")
        if not self.is_git_repo(self.selected_folder):
            print("   Repositório Git não encontrado. Inicializando...")
            if not self.init_git_repo(self.selected_folder):
                messagebox.showerror("Erro", "Não foi possível inicializar o repositório Git.")
                return False
            print("   Repositório Git inicializado com sucesso!")
        else:
            print("   Repositório Git encontrado.")
        
        # Verifica remote
        remote_url = self.get_remote_url(self.selected_folder)
        repo_name = None
        
        if remote_url:
            print(f"   Remote encontrado: {remote_url}")
            repo_name = self.get_repo_name_from_url(remote_url)
            if repo_name:
                print(f"   Repositório: {repo_name}")
        else:
            print("   Nenhum remote configurado.")
            repo_name = self.get_repo_name()
            if not repo_name:
                print("Operação cancelada.")
                return False
            
            # Configura remote
            if not self.set_remote_url(self.selected_folder, 
                                      self.github_username, 
                                      repo_name):
                messagebox.showerror("Erro", "Não foi possível configurar o remote.")
                return False
        
        # Adiciona arquivos
        print("\n4. Adicionando arquivos...")
        if not self.git_add(self.selected_folder):
            messagebox.showerror("Erro", "Erro ao adicionar arquivos.")
            return False
        print("   Arquivos adicionados com sucesso!")
        
        # Obtém mensagem de commit
        commit_message = self.get_commit_message()
        if not commit_message:
            print("Operação cancelada.")
            return False
        
        # Faz commit
        print(f"\n5. Fazendo commit com mensagem: '{commit_message}'...")
        commit_result = self.git_commit(self.selected_folder, commit_message)
        
        if commit_result is None:
            messagebox.showinfo("Info", "Nenhuma alteração para commitar.")
            return True
        elif not commit_result:
            messagebox.showerror("Erro", "Erro ao fazer commit.")
            return False
        print("   Commit realizado com sucesso!")
        
        # Verifica branch
        branch = self.get_current_branch(self.selected_folder)
        print(f"\n6. Branch atual: {branch}")
        
        # Faz push
        print("\n7. Fazendo push para o GitHub...")
        if not self.git_push(self.selected_folder,
                           self.github_username,
                           self.github_token,
                           repo_name):
            messagebox.showerror("Erro", "Erro ao fazer push.\nVerifique seu token e conexão.")
            return False
        
        print("   Push realizado com sucesso!")
        print("\n" + "="*60)
        print("  PROCESSO CONCLUÍDO COM SUCESSO!")
        print("="*60)
        
        messagebox.showinfo(
            "Sucesso",
            f"Commit e push realizados com sucesso!\n\n"
            f"Repositório: {repo_name}\n"
            f"Branch: {branch}\n"
            f"Mensagem: {commit_message}"
        )
        
        return True

def main():
    """Função principal"""
    app = GitAutoCommit()
    try:
        app.run()
    except KeyboardInterrupt:
        print("\n\nOperação cancelada pelo usuário.")
    except Exception as e:
        messagebox.showerror("Erro", f"Erro inesperado: {e}")
        print(f"\nErro: {e}")
    finally:
        app.root.destroy()

if __name__ == "__main__":
    main()
