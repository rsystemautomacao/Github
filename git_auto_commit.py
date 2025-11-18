#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script automatizado para fazer commit e push para o GitHub
"""

import os
import sys
import subprocess
import getpass
from pathlib import Path
import tkinter as tk
from tkinter import filedialog, messagebox, simpledialog
import re

class GitAutoCommit:
    def __init__(self):
        self.root = tk.Tk()
        self.root.withdraw()  # Esconde a janela principal
        self.selected_folder = None
        self.github_username = None
        self.github_password = None
        
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
        except subprocess.CalledProcessError as e:
            print(f"Erro ao inicializar repositório: {e}")
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
            # Remove remote existente se houver
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
    
    def get_commit_message(self):
        """Solicita mensagem de commit ao usuário"""
        self.root.deiconify()  # Mostra a janela para o diálogo
        message = simpledialog.askstring(
            "Mensagem de Commit",
            "Digite a mensagem do commit:",
            initialvalue="Atualização automática"
        )
        self.root.withdraw()
        return message or "Atualização automática"
    
    def get_github_credentials(self):
        """Solicita credenciais do GitHub de forma segura"""
        self.root.deiconify()
        
        username = simpledialog.askstring(
            "Credenciais GitHub",
            "Digite seu usuário do GitHub:"
        )
        
        if not username:
            self.root.withdraw()
            return False
        
        # Usa getpass para entrada segura de senha
        print("\n" + "="*50)
        print("Digite sua senha do GitHub (não será exibida):")
        print("="*50)
        password = getpass.getpass("Senha: ")
        
        self.root.withdraw()
        
        if not password:
            return False
        
        self.github_username = username
        self.github_password = password
        return True
    
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
    
    def git_add(self, folder):
        """Adiciona todos os arquivos ao staging"""
        try:
            result = subprocess.run(
                ['git', 'add', '.'],
                cwd=folder,
                check=True,
                capture_output=True,
                text=True
            )
            return True
        except subprocess.CalledProcessError as e:
            print(f"Erro ao adicionar arquivos: {e.stderr}")
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
                check=True,
                capture_output=True,
                text=True
            )
            return True
        except subprocess.CalledProcessError as e:
            if "nothing to commit" in e.stderr.lower():
                print("Nenhuma alteração para commitar.")
                return None
            print(f"Erro ao fazer commit: {e.stderr}")
            return False
    
    def git_push(self, folder, username, password, repo_name):
        """Faz o push para o GitHub"""
        # Monta a URL com credenciais
        url = f"https://{username}:{password}@github.com/{username}/{repo_name}.git"
        
        try:
            # Tenta fazer push
            result = subprocess.run(
                ['git', 'push', '-u', 'origin', 'main'],
                cwd=folder,
                capture_output=True,
                text=True,
                timeout=60
            )
            
            if result.returncode != 0:
                # Tenta com 'master' se 'main' falhar
                result = subprocess.run(
                    ['git', 'push', '-u', 'origin', 'master'],
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
    
    def check_branch(self, folder):
        """Verifica qual branch está sendo usada"""
        try:
            result = subprocess.run(
                ['git', 'branch', '--show-current'],
                cwd=folder,
                capture_output=True,
                text=True,
                check=True
            )
            branch = result.stdout.strip()
            if not branch:
                # Se não houver branch, cria main
                subprocess.run(['git', 'branch', '-M', 'main'],
                             cwd=folder,
                             capture_output=True)
                return 'main'
            return branch
        except:
            # Tenta criar branch main
            try:
                subprocess.run(['git', 'branch', '-M', 'main'],
                             cwd=folder,
                             capture_output=True)
                return 'main'
            except:
                return 'master'
    
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
        
        # Seleciona a pasta
        print("1. Selecionando pasta...")
        if not self.select_folder():
            print("Operação cancelada pelo usuário.")
            return False
        
        print(f"   Pasta selecionada: {self.selected_folder}")
        
        # Verifica/inicializa repositório Git
        print("\n2. Verificando repositório Git...")
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
        
        # Obtém credenciais
        print("\n3. Solicitando credenciais do GitHub...")
        if not self.get_github_credentials():
            print("Operação cancelada.")
            return False
        
        # Se não houver remote, configura
        if not remote_url:
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
        branch = self.check_branch(self.selected_folder)
        print(f"\n6. Branch atual: {branch}")
        
        # Faz push
        print("\n7. Fazendo push para o GitHub...")
        if not self.git_push(self.selected_folder,
                           self.github_username,
                           self.github_password,
                           repo_name):
            messagebox.showerror("Erro", "Erro ao fazer push.\nVerifique suas credenciais e conexão.")
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

