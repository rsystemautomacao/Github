# 🚀 Automatizador de Commit para GitHub

Um script Python simples e eficiente que automatiza todo o processo de commit e push para o GitHub com apenas alguns cliques!

## ✨ Funcionalidades

- 📁 **Seleção de pasta** através de interface gráfica
- 🔄 **Inicialização automática** de repositório Git (se necessário)
- ➕ **Adiciona todos os arquivos** automaticamente
- 💬 **Solicita mensagem de commit** de forma interativa
- 🌐 **Autenticação via navegador** - Login direto no GitHub sem digitar senha!
- 🔐 **OAuth 2.0 Device Flow** - Autenticação segura e moderna
- 🚀 **Push automático** para o GitHub
- ✅ **Verificação de Git instalado** e configuração automática

## 📋 Pré-requisitos

1. **Python 3.6 ou superior**
   - Verifique com: `python --version` ou `python3 --version`

2. **Git instalado**
   - Download: https://git-scm.com/downloads
   - Verifique com: `git --version`

3. **Conta no GitHub**
   - Crie uma em: https://github.com

## 🛠️ Instalação

1. **Clone ou baixe este repositório**

2. **Instale as dependências:**
   ```bash
   pip install -r requirements.txt
   ```
   
   Ou instale manualmente:
   ```bash
   pip install requests
   ```

## 🎯 Como Usar

### Windows

1. **Execute o script:**
   ```bash
   python git_auto_commit.py
   ```
   
   Ou dê duplo clique no arquivo `git_auto_commit.py`

### Linux/Mac

1. **Torne o script executável (opcional):**
   ```bash
   chmod +x git_auto_commit.py
   ```

2. **Execute:**
   ```bash
   python3 git_auto_commit.py
   ```

## 📝 Processo de Uso

1. **Selecione a pasta** que deseja fazer commit
2. **Digite a mensagem do commit** quando solicitado
3. **Autentique no GitHub via navegador:**
   - O navegador será aberto automaticamente
   - Um código de verificação será exibido
   - Digite o código no GitHub e autorize o aplicativo
   - O app reconhecerá automaticamente após a autorização
4. **Aguarde** enquanto o script faz todo o trabalho!

### 🔄 Método Alternativo (se OAuth não funcionar)

Se o método OAuth não funcionar, o app oferecerá uma alternativa:
1. O navegador abrirá a página de criação de Personal Access Token
2. Crie um token com escopo `repo`
3. Cole o token quando solicitado

## ⚙️ O que o Script Faz

1. ✅ Verifica se o Git está instalado
2. ✅ Verifica se a pasta é um repositório Git (inicializa se necessário)
3. ✅ Abre navegador para autenticação OAuth no GitHub
4. ✅ Obtém token de acesso automaticamente após autorização
5. ✅ Configura o remote do GitHub (se necessário)
6. ✅ Adiciona todos os arquivos (`git add .`)
7. ✅ Faz o commit com sua mensagem
8. ✅ Faz o push para o GitHub usando o token

## 🔒 Segurança

- **Autenticação OAuth 2.0** - Método seguro e recomendado pelo GitHub
- **Device Flow** - Não requer client_secret, ideal para aplicações desktop
- **Token de acesso** - Usa tokens ao invés de senhas
- **Nenhuma informação armazenada** - Credenciais não são salvas localmente
- **Login via navegador** - Você faz login diretamente no site do GitHub

## ⚠️ Notas Importantes

- **Primeira vez usando?** O script pode pedir o nome do repositório se não houver remote configurado
- **Repositório novo?** Certifique-se de que o repositório já existe no GitHub antes de fazer push
- **Autenticação OAuth:** O app usa OAuth 2.0 Device Flow, que funciona mesmo com 2FA ativado
- **Código de verificação:** Quando o navegador abrir, você verá um código no terminal. Digite esse código no GitHub
- **Timeout:** Você tem até 10 minutos para autorizar no navegador

### 🔧 Se OAuth não funcionar

O app tem um método alternativo que:
1. Abre a página de criação de Personal Access Token
2. Você cria um token manualmente
3. Cola o token no app

Isso é útil se houver problemas de rede ou firewall bloqueando o OAuth.

## 🐛 Solução de Problemas

### Erro: "Git não está instalado"
- Instale o Git: https://git-scm.com/downloads
- Reinicie o terminal após instalar

### Erro: "Erro ao fazer push"
- Verifique se o token foi gerado corretamente
- Certifique-se de que o repositório existe no GitHub
- Verifique se o token tem permissão `repo`
- Tente usar o método alternativo (Personal Access Token manual)

### Erro: "Erro ao iniciar Device Flow"
- Verifique sua conexão com a internet
- Tente novamente (pode ser um problema temporário)
- Use o método alternativo que será oferecido automaticamente

### Erro: "Nenhuma alteração para commitar"
- Isso significa que não há mudanças na pasta selecionada
- Faça algumas alterações nos arquivos e tente novamente

## 📄 Licença

Este projeto é de código aberto e está disponível para uso livre.

## 🤝 Contribuições

Sinta-se à vontade para melhorar este script! Sugestões e pull requests são bem-vindos.

---

**Desenvolvido com ❤️ para facilitar seu workflow com Git e GitHub**

