# 🚀 Automatizador de Commit para GitHub

Um script Python simples e eficiente que automatiza todo o processo de commit e push para o GitHub com apenas alguns cliques!

## ✨ Funcionalidades

- 📁 **Seleção de pasta** através de interface gráfica
- 🔄 **Inicialização automática** de repositório Git (se necessário)
- ➕ **Adiciona todos os arquivos** automaticamente
- 💬 **Solicita mensagem de commit** de forma interativa
- 🔐 **Entrada segura de senha** (senha não é exibida)
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

2. **Não são necessárias dependências externas!**
   - O script usa apenas bibliotecas padrão do Python

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
3. **Informe seu usuário do GitHub**
4. **Digite sua senha** (não será exibida na tela)
5. **Aguarde** enquanto o script faz todo o trabalho!

## ⚙️ O que o Script Faz

1. ✅ Verifica se o Git está instalado
2. ✅ Verifica se a pasta é um repositório Git (inicializa se necessário)
3. ✅ Configura o remote do GitHub (se necessário)
4. ✅ Adiciona todos os arquivos (`git add .`)
5. ✅ Faz o commit com sua mensagem
6. ✅ Faz o push para o GitHub

## 🔒 Segurança

- A senha é solicitada usando `getpass`, que não exibe os caracteres digitados
- As credenciais são usadas apenas para autenticação no GitHub
- Nenhuma informação é armazenada localmente

## ⚠️ Notas Importantes

- **Primeira vez usando?** O script pode pedir o nome do repositório se não houver remote configurado
- **Repositório novo?** Certifique-se de que o repositório já existe no GitHub antes de fazer push
- **Autenticação:** Se você usa autenticação de dois fatores (2FA), pode precisar usar um Personal Access Token ao invés da senha

### Usando Personal Access Token (Recomendado)

Se você usa 2FA ou prefere maior segurança:

1. Crie um Personal Access Token no GitHub:
   - Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Gere um novo token com permissões `repo`

2. Use o token como senha quando o script solicitar

## 🐛 Solução de Problemas

### Erro: "Git não está instalado"
- Instale o Git: https://git-scm.com/downloads
- Reinicie o terminal após instalar

### Erro: "Erro ao fazer push"
- Verifique suas credenciais
- Certifique-se de que o repositório existe no GitHub
- Se usar 2FA, use um Personal Access Token

### Erro: "Nenhuma alteração para commitar"
- Isso significa que não há mudanças na pasta selecionada
- Faça algumas alterações nos arquivos e tente novamente

## 📄 Licença

Este projeto é de código aberto e está disponível para uso livre.

## 🤝 Contribuições

Sinta-se à vontade para melhorar este script! Sugestões e pull requests são bem-vindos.

---

**Desenvolvido com ❤️ para facilitar seu workflow com Git e GitHub**

