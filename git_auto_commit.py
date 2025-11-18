#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script automatizado para fazer commit e push para o GitHub
"""

import os
import sys
import subprocess
from pathlib import Path
import tkinter as tk
from tkinter import filedialog, messagebox, simpledialog
import re
import webbrowser
import http.server
import socketserver
import urllib.parse
import json
import threading
import time
import requests
from urllib.parse import urlparse, parse_qs

class OAuthCallbackHandler(http.server.SimpleHTTPRequestHandler):
    """Handler para receber o callback OAuth"""
    
    def __init__(self, *args, callback_data=None, **kwargs):
        self.callback_data = callback_data
        super().__init__(*args, **kwargs)
    
    def do_GET(self):
        """Processa o callback OAuth"""
        parsed_path = urlparse(self.path)
        query_params = parse_qs(parsed_path.query)
        
        if 'code' in query_params:
            code = query_params['code'][0]
            self.callback_data['code'] = code
            self.callback_data['received'] = True
            
            # Resposta HTML
            self.send_response(200)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.end_headers()
            html = """
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Autenticação Concluída</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    }
                    .container {
                        text-align: center;
                        background: white;
                        padding: 40px;
                        border-radius: 10px;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    }
                    h1 { color: #28a745; }
                    p { color: #666; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>✅ Autenticação Concluída!</h1>
                    <p>Você pode fechar esta janela e voltar para o aplicativo.</p>
                </div>
            </body>
            </html>
            """
            self.wfile.write(html.encode('utf-8'))
        elif 'error' in query_params:
            error = query_params['error'][0]
            self.callback_data['error'] = error
            self.callback_data['received'] = True
            
            self.send_response(200)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.end_headers()
            html = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Erro na Autenticação</title>
                <style>
                    body {{
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                    }}
                    .container {{
                        text-align: center;
                        background: white;
                        padding: 40px;
                        border-radius: 10px;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    }}
                    h1 {{ color: #dc3545; }}
                    p {{ color: #666; }}
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>❌ Erro na Autenticação</h1>
                    <p>Erro: {error}</p>
                    <p>Você pode fechar esta janela e tentar novamente.</p>
                </div>
            </body>
            </html>
            """
            self.wfile.write(html.encode('utf-8'))
        else:
            self.send_response(400)
            self.end_headers()
    
    def log_message(self, format, *args):
        """Suprime logs do servidor"""
        pass


class GitAutoCommit:
    def __init__(self):
        self.root = tk.Tk()
        self.root.withdraw()  # Esconde a janela principal
        self.selected_folder = None
        self.github_token = None
        self.github_username = None
        
        # Configurações OAuth (usando OAuth App padrão para desenvolvimento)
        # Em produção, você deve criar seu próprio OAuth App no GitHub
        self.client_id = "Iv1.8a61f9b7a7e154d0"  # OAuth App público para desenvolvimento
        self.client_secret = None  # Não necessário para Device Flow ou se usar token direto
        self.redirect_uri = "http://localhost:8765/callback"
        self.scope = "repo"
        
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
    
    def authenticate_with_github(self):
        """Autentica com GitHub usando Device Flow (OAuth 2.0)"""
        print("\n" + "="*60)
        print("  AUTENTICAÇÃO COM GITHUB")
        print("="*60)
        
        # Inicia Device Flow
        print("\nIniciando processo de autenticação...")
        result = self.start_device_flow()
        
        if not result or result[0] is None:
            return False
        
        device_code, user_code, verification_uri, interval = result
        
        # Se já temos token (método alternativo)
        if device_code and not user_code and not verification_uri:
            # Fallback retornou token diretamente
            self.github_token = device_code
            if self.validate_token(device_code):
                username = self.get_github_username(device_code)
                if username:
                    self.github_username = username
                    print(f"✅ Autenticado como: {username}")
                print("✅ Autenticação concluída com sucesso!")
                return True
            return False
        
        print(f"\n📱 Código de verificação: {user_code}")
        print(f"🌐 Abrindo navegador para autorização...")
        print(f"\nSe o navegador não abrir, acesse: {verification_uri}")
        print(f"E digite o código: {user_code}")
        print("\nAguardando autorização...")
        
        # Abre navegador
        webbrowser.open(verification_uri)
        
        # Polling para obter token
        token = self.poll_for_token(device_code, interval)
        
        if not token:
            return False
        
        self.github_token = token
        
        # Obtém informações do usuário
        print("Obtendo informações do usuário...")
        username = self.get_github_username(token)
        if username:
            self.github_username = username
            print(f"✅ Autenticado como: {username}")
        else:
            print("⚠️  Aviso: Não foi possível obter o nome de usuário.")
        
        print("✅ Autenticação concluída com sucesso!")
        return True
    
    def start_device_flow(self):
        """Inicia o Device Flow do GitHub"""
        try:
            response = requests.post(
                'https://github.com/login/device/code',
                data={
                    'client_id': self.client_id,
                    'scope': self.scope
                },
                headers={'Accept': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                return (
                    data.get('device_code'),
                    data.get('user_code'),
                    data.get('verification_uri'),
                    int(data.get('interval', 5))
                )
            else:
                print(f"Erro ao iniciar Device Flow: {response.status_code}")
                print("Tentando método alternativo...")
                return self.fallback_authentication()
        except Exception as e:
            print(f"Erro ao iniciar Device Flow: {e}")
            print("Tentando método alternativo...")
            return self.fallback_authentication()
    
    def poll_for_token(self, device_code, interval):
        """Faz polling para obter o token após autorização"""
        max_attempts = 120  # 10 minutos máximo (120 * 5 segundos)
        attempt = 0
        
        while attempt < max_attempts:
            try:
                response = requests.post(
                    'https://github.com/login/oauth/access_token',
                    data={
                        'client_id': self.client_id,
                        'device_code': device_code,
                        'grant_type': 'urn:ietf:params:oauth:grant-type:device_code'
                    },
                    headers={'Accept': 'application/json'},
                    timeout=10
                )
                
                if response.status_code == 200:
                    data = response.json()
                    
                    if 'access_token' in data:
                        return data['access_token']
                    elif 'error' in data:
                        error = data['error']
                        if error == 'authorization_pending':
                            # Ainda aguardando autorização
                            print(".", end="", flush=True)
                        elif error == 'slow_down':
                            # GitHub pediu para reduzir velocidade
                            interval += 5
                            print(".", end="", flush=True)
                        elif error == 'expired_token':
                            print("\n❌ Código expirado. Por favor, tente novamente.")
                            return None
                        elif error == 'access_denied':
                            print("\n❌ Acesso negado pelo usuário.")
                            return None
                        else:
                            print(f"\n❌ Erro: {error}")
                            return None
                
            except Exception as e:
                print(f"\nErro ao verificar token: {e}")
                return None
            
            time.sleep(interval)
            attempt += 1
        
        print("\n⏱️  Timeout: Autorização não foi concluída a tempo.")
        return None
    
    def fallback_authentication(self):
        """Método alternativo caso Device Flow não funcione"""
        print("\n" + "="*60)
        print("  MÉTODO ALTERNATIVO DE AUTENTICAÇÃO")
        print("="*60)
        print("\nPara fazer push, você precisa de um Personal Access Token.")
        print("Vamos abrir o navegador para você criar um token.")
        print("\nInstruções:")
        print("1. Clique em 'Generate new token (classic)'")
        print("2. Dê um nome para o token (ex: 'Auto Commit')")
        print("3. Selecione o escopo 'repo' (acesso completo aos repositórios)")
        print("4. Clique em 'Generate token'")
        print("5. COPIE o token gerado (você não poderá vê-lo novamente)")
        print("6. Cole o token quando solicitado")
        print("\n" + "="*60)
        
        input("\nPressione ENTER para abrir a página de criação de token...")
        
        # Abre página de criação de token
        token_url = "https://github.com/settings/tokens/new"
        webbrowser.open(token_url)
        
        # Solicita token
        self.root.deiconify()
        token = simpledialog.askstring(
            "Personal Access Token",
            "Cole o Personal Access Token gerado:",
            show='*'
        )
        self.root.withdraw()
        
        if not token:
            print("Token não fornecido. Operação cancelada.")
            return None, None, None, None
        
        # Valida token
        if self.validate_token(token):
            # Retorna formato compatível
            return token, None, None, None
        else:
            print("Token inválido. Por favor, verifique e tente novamente.")
            return None, None, None, None
    
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
        except Exception as e:
            print(f"Erro ao validar token: {e}")
            return False
    
    def get_github_username(self, token):
        """Obtém o nome de usuário do GitHub usando o token"""
        try:
            headers = {
                'Authorization': f'token {token}',
                'Accept': 'application/vnd.github.v3+json'
            }
            response = requests.get('https://api.github.com/user', headers=headers, timeout=10)
            if response.status_code == 200:
                return response.json().get('login')
        except Exception as e:
            print(f"Erro ao obter informações do usuário: {e}")
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
    
    def git_push(self, folder, username, token, repo_name):
        """Faz o push para o GitHub usando token"""
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
        
        # Autentica com GitHub via OAuth
        print("\n3. Autenticando com GitHub...")
        if not self.authenticate_with_github():
            print("Operação cancelada.")
            return False
        
        # Se não houver remote, configura
        if not remote_url:
            if self.github_username:
                if not self.set_remote_url(self.selected_folder, 
                                          self.github_username, 
                                          repo_name):
                    messagebox.showerror("Erro", "Não foi possível configurar o remote.")
                    return False
            else:
                # Se não temos username, pede
                repo_name = self.get_repo_name()
                if not repo_name:
                    print("Operação cancelada.")
                    return False
                # Pede username se necessário
                self.root.deiconify()
                username = simpledialog.askstring(
                    "Usuário GitHub",
                    "Digite seu usuário do GitHub:",
                    initialvalue=""
                )
                self.root.withdraw()
                if username:
                    self.github_username = username
                    if not self.set_remote_url(self.selected_folder, 
                                              self.github_username, 
                                              repo_name):
                        messagebox.showerror("Erro", "Não foi possível configurar o remote.")
                        return False
                else:
                    print("Operação cancelada.")
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

