# 🚀 Automatizador de Commit para GitHub

Um script Python simples que automatiza commit e push para o GitHub com um único clique!

## ✨ Funcionalidades

- 📁 **Seleção de pasta** através de interface gráfica
- 🔄 **Inicialização automática** de repositório Git (se necessário)
- ➕ **Adiciona todos os arquivos** automaticamente
- 💬 **Solicita mensagem de commit** de forma interativa
- 🔐 **Token salvo** - Você só precisa configurar uma vez!
- 🌐 **Abre GitHub automaticamente** para criar token (se necessário)
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
   
   Ou dê duplo clique no arquivo `executar.bat`

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

### Primeira Vez (Configuração)

1. **Execute o app**
2. **O navegador abrirá automaticamente** para criar um token
3. **Faça login no GitHub** (se não estiver logado)
4. **Crie um Personal Access Token:**
   - Clique em "Generate new token (classic)"
   - Dê um nome (ex: "Auto Commit")
   - Selecione o escopo **`repo`**
   - Clique em "Generate token"
   - **COPIE o token** (você não verá novamente!)
5. **Cole o token** quando solicitado
6. **Pronto!** O token será salvo para uso futuro

### Uso Normal (Após Configuração)

1. **Execute o app**
2. **Selecione a pasta** que deseja fazer commit
3. **Digite a mensagem do commit**
4. **Pronto!** O app faz tudo automaticamente!

## ⚙️ O que o Script Faz

1. ✅ Verifica se tem token salvo (se não tiver, abre GitHub para criar)
2. ✅ Verifica se o Git está instalado
3. ✅ Verifica se a pasta é um repositório Git (inicializa se necessário)
4. ✅ Configura o remote do GitHub (se necessário)
5. ✅ Adiciona todos os arquivos (`git add .`)
6. ✅ Faz o commit com sua mensagem
7. ✅ Faz o push para o GitHub usando o token salvo

## 🔒 Segurança

- **Token salvo localmente** - Fica em `~/.github_auto_commit.json`
- **Token validado** - O app verifica se o token ainda é válido antes de usar
- **Apenas você tem acesso** - O arquivo fica na sua pasta home
- **Personal Access Token** - Método seguro recomendado pelo GitHub

## ⚠️ Notas Importantes

- **Primeira vez?** Você precisará criar um token uma única vez
- **Token expirado?** O app detecta e pede para criar um novo
- **Repositório novo?** Certifique-se de que o repositório já existe no GitHub antes de fazer push
- **Token salvo:** O token fica salvo em `~/.github_auto_commit.json` para uso futuro

## 🐛 Solução de Problemas

### Erro: "Git não está instalado"
- Instale o Git: https://git-scm.com/downloads
- Reinicie o terminal após instalar

### Erro: "ModuleNotFoundError: No module named 'requests'"
- Instale a dependência: `pip install requests`
- Ou execute `instalar_dependencias.bat`

### Erro: "Erro ao fazer push"
- Verifique se o token tem permissão `repo`
- Certifique-se de que o repositório existe no GitHub
- Verifique sua conexão com a internet

### Erro: "Token inválido"
- O token pode ter expirado
- Crie um novo token no GitHub
- O app pedirá automaticamente se detectar token inválido

### Erro: "Nenhuma alteração para commitar"
- Isso significa que não há mudanças na pasta selecionada
- Faça algumas alterações nos arquivos e tente novamente

## 📄 Licença

Este projeto é de código aberto e está disponível para uso livre.

## 🤝 Contribuições

Sinta-se à vontade para melhorar este script! Sugestões e pull requests são bem-vindos.

---

**Desenvolvido com ❤️ para facilitar seu workflow com Git e GitHub**
