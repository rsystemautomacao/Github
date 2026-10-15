# 📲 Pacote de conteúdo para Instagram: Lógica, POO e BI do dia a dia

Calendário de **20/10 a 24/11/2026** com **11 posts prontos**: 6 Reels **narrados em português** (MP4) e 5 carrosséis (PNG). Cada post tem legenda, 5 hashtags e texto alternativo.
Tudo é gerado por código a partir de [`gerador/conteudo.js`](gerador/conteudo.js), então dá para editar um texto e regerar.

```
instagram/
├── posts/
│   └── NN-tema/
│       ├── reel.mp4 + capa.png      ← Reels (1080x1920, 30fps)
│       ├── slide-01..07.png         ← Carrosséis (1080x1350, formato 4:5)
│       └── legenda.txt              ← legenda + hashtags + texto alternativo
└── gerador/                         ← código que cria tudo isso
```

---

## 📥 Onde pegar o material

**No computador (recomendado):**
1. Baixe o ZIP com tudo: <https://github.com/rsystemautomacao/Github/archive/refs/heads/claude/kind-hypatia-fxvr5g.zip>. Precisa estar logado no GitHub se o repositório for privado.
   Outro caminho: abra <https://github.com/rsystemautomacao/Github>, troque o branch de `main` para `claude/kind-hypatia-fxvr5g`, clique em **Code → Download ZIP**.
2. Extraia o ZIP e abra `instagram/posts/`. Cada pasta é um post, já na ordem do calendário (`01-…`, `02-…`).
3. Dentro de cada pasta:
   - `reel.mp4` + `capa.png` → Reels
   - `slide-01.png … slide-07.png` → carrossel (suba nessa ordem)
   - `legenda.txt` → abra no Bloco de Notas e copie a legenda, as hashtags e o texto alternativo

**Para postar pelo celular:** envie a pasta do post para o **Google Drive** (ou OneDrive) e, no celular, toque em *⋮ → Fazer download*. Os arquivos vão para a galeria. Evite mandar pelo WhatsApp como foto ou vídeo, porque ele reduz a qualidade. Se for usar o WhatsApp, envie como **Documento**.

## ⏰ Agendar tudo de uma vez (Meta Business Suite, grátis)

Em uns 30 minutos dá para deixar os 11 posts agendados pelo computador, sem passar nada para o celular:
1. Garanta que **@insta.rsystem** é conta **Profissional** (Criador ou Empresa): *Configurações → Tipo de conta e ferramentas*.
2. Acesse <https://business.facebook.com> e entre com o Facebook ligado ao Instagram. Se pedir, conecte o Instagram em *Configurações → Contas do Instagram*.
3. Vá em **Planejador → Criar publicação** (para carrossel) ou **Criar reel** (para Reels).
4. Marque só o Instagram, suba os arquivos da pasta do post e cole a legenda do `legenda.txt`.
5. Em **Opções de agendamento**, escolha a data e a hora do calendário abaixo e clique em **Agendar**.
6. Repita para os 11 posts.

**Música de fundo (opcional):** os Reels já vêm com narração. Para colocar uma música em alta por baixo, use o app, porque a biblioteca de músicas do Business Suite é menor. Deixe a música em ~10% e o áudio original em 100%.

## 🗓️ Calendário

| # | Data sugerida | Formato | Tema | Analogia do dia a dia |
|---|---|---|---|---|
| 01 | Ter 20/10 · 19h | 🎬 Reel | Variáveis | Pote de tempero com etiqueta 🧂 |
| 02 | Qui 22/10 · 12h | 🖼️ Carrossel | Classe x Objeto (POO) | Forma de bolo x bolo pronto 🎂 |
| 03 | Sáb 24/10 · 11h | 🎬 Reel | Dashboard e KPI (BI) | Painel do carro 🚗 |
| 04 | Ter 27/10 · 19h | 🎬 Reel | if / elif / else | Levar guarda-chuva se chover ☔ |
| 05 | **Sáb 31/10** · 11h | 🖼️ Carrossel | **Especial Halloween**: bugs clássicos | 5 monstros do código 🎃 |
| 06 | Ter 03/11 · 19h | 🎬 Reel | 4 pilares da POO | Cafeteira ☕ |
| 07 | Qui 05/11 · 12h | 🖼️ Carrossel | ETL (BI) | Ida à feira, da compra ao prato 🥕 |
| 08 | Ter 10/11 · 12h | 🖼️ Carrossel | Loops while / for | Lavar louça 🧽 |
| 09 | Qui 12/11 · 19h | 🎬 Reel | Funções | Liquidificador 🥤 |
| 10 | Ter 17/11 · 12h | 🖼️ Carrossel | **Desafio interativo** (teste de mesa) | "Pense como um computador" 🤖 |
| 11 | **Ter 24/11** · 19h | 🎬 Reel | **Especial Black Friday (27/11)**: série temporal | "Esse desconto é real?" 🏷️ |

Os horários são **ponto de partida**. Depois de 3 semanas, veja em *Painel profissional → Insights → Público → Horários mais ativos* e ajuste.

Cada série tem uma cor: 🟡 Lógica · 🟣 POO · 🟢 BI. A numeração (#01, #02…) faz quem chega por um post ir atrás dos outros, e isso vira seguidor.

---

## #️⃣ Hashtags em 2026: o que mudou

**Use no máximo 5 hashtags.** Desde o fim de 2025 o Instagram limita posts e Reels a **5 hashtags**. Os guias de 2026 recomendam de 3 a 5, todas relevantes ([Later](https://later.com/blog/ultimate-guide-to-using-instagram-hashtags/), [Dash Social, out/2026](https://www.dashsocial.com/blog/instagram-hashtags), [RecurPost](https://recurpost.com/instagram-scheduler/instagram-hashtag-limits-and-placement-rules/)). Hashtags genéricas como #love e #instagood não trazem seguidores para um nicho técnico.

**Fórmula usada nos posts:** 1 ampla + 2 médias + 2 de nicho.

| Tema | Ampla (1) | Médias (escolha 2) | Nicho (escolha 2) |
|---|---|---|---|
| Lógica | `#programacao` | `#python` `#logicadeprogramacao` `#tecnologia` | `#programacaoparainiciantes` `#aprenderprogramar` `#estudandoprogramacao` |
| POO | `#programacao` | `#python` `#poo` `#devbrasil` | `#programacaoorientadaaobjetos` `#carreiraemti` |
| BI | `#dados` | `#powerbi` `#businessintelligence` `#analisededados` | `#dashboard` `#etl` `#engenhariadedados` |
| Datas do período | `#halloween` (31/10) | `#blackfriday` `#blackfriday2026` (27/11) | junte com 2–3 da série do post |

> ⚠️ **Sendo honesto:** o Instagram não publica um ranking oficial de hashtags em alta, e eu não tenho acesso à contagem ao vivo do app. Antes de publicar, faça esta checagem de 2 minutos:
> 1. Busque a hashtag na lupa → aba **Tags**. Ali aparece o número de posts e as sugestões relacionadas.
> 2. Abra a tag e veja os posts. Se os do topo são de perfis do seu tamanho e do seu assunto, ela serve. Se forem só contas gigantes ou conteúdo fora do tema, troque.
> 3. Repita uma vez por mês, porque tags de nicho mudam devagar e as sazonais mudam rápido.

### 🔎 Mais importante que hashtag: palavra-chave (SEO do Instagram)

Hoje a busca do Instagram lê **o texto da legenda, o texto na tela e o seu perfil**. Por isso:
- As legendas já trazem **"lógica de programação"**, **"POO"**, **"Power BI"** e **"análise de dados"** escritos por extenso.
- Coloque palavra-chave no **campo Nome** do perfil (ex.: `Seu Nome | Programação e BI fácil`). Esse campo entra na busca.
- Bio sugerida: `Lógica, POO e BI explicados com coisas do dia a dia 🍳☕🚗 | Post novo ter/qui/sáb | Salva e aprende sem decoreba 👇`

---

## 🚀 Como publicar cada post

**Reels**
1. Envie o `reel.mp4`. Em *Editar capa → Adicionar da galeria*, use o `capa.png`.
2. **O vídeo já tem narração.** Se quiser uma música em alta por baixo (ícone de música; as em alta têm a setinha ↗), deixe a **música em ~10%** e o **áudio original em 100%**, para não abafar a explicação.
3. Cole a legenda e as hashtags do `legenda.txt`.
4. Em *Configurações avançadas → Acessibilidade*, cole o **texto alternativo**.
5. Opcional: ative **"Teste de Reels"** (*Trial Reels*) para mostrar primeiro só a quem não te segue. É bom para testar ganchos.

**Carrosséis**
1. Envie os `slide-01…07.png` **na ordem**. Carrossel também aceita música.
2. Mesma legenda, hashtags e texto alternativo.

**Na primeira hora depois de postar**
- Responda **todos** os comentários com pergunta ou complemento. Cada resposta gera mais conversa.
- Reposte nos Stories com uma **enquete** ou um **quiz** ("O que é uma variável? A) pote B) etiqueta…").
- Nos posts com palavra-chave no CTA (PAINEL, ETL), responda cada pessoa com um link ou o próximo conteúdo. Dá para automatizar com ferramentas de DM automática.

---

## 📈 Estratégia de crescimento (o que faz seguidor de verdade)

1. **Compartilhamentos e salvamentos valem mais que curtida.** Todo CTA pede "manda pra quem tá começando" ou "salva pra revisar", e isso não está lá por acaso.
2. **Gancho no 1º segundo.** No gerador, a frase da primeira cena já aparece no primeiro segundo. Não corte isso.
3. **Reels para alcance, carrossel para profundidade.** Um estudo HypeAuditor/Metricool com mais de 80 milhões de posts brasileiros (set/2026) mostrou carrosséis com alcance comparável ou maior que o dos Reels ([NIDDE Digital](https://niddedigital.com/reels-ou-carrossel-estudo-revela-o-que-tem-funcionado-melhor-em-2026-para-o-instagram-no-brasil/), [Grande Consumo](https://grandeconsumo.com/instagram-premeia-carrosseis-reels-e-conversacao-revela-estudo/)). Por isso o plano mistura os dois.
4. **Posts interativos** (o desafio, o "qual monstro te assombrou?") puxam comentários e trazem gente nova.
5. **Collab:** publique o desafio (post 10) ou o de Halloween (post 05) como *Collab* com outro perfil de tecnologia. O post aparece para as duas audiências.
6. **Reaproveite:** os mesmos MP4 servem para TikTok e YouTube Shorts. Suba o arquivo original, não um vídeo baixado com marca d'água de outra rede.
7. **Toda semana, olhe 3 números:** compartilhamentos, salvamentos e seguidores ganhos por post. Repita as analogias que mais converterem.

---

## 🛠️ Como gerar ou editar os vídeos e imagens

Pré-requisitos: [Node.js 18+](https://nodejs.org), [ffmpeg](https://ffmpeg.org/download.html) no PATH e, para a narração, [Python 3.10+](https://www.python.org/downloads/).

```bash
cd instagram/gerador
npm install
npx playwright install chromium
pip install -r requirements.txt
```

**Narração:** usa o [Kokoro](https://github.com/thewh1teagle/kokoro-onnx), uma voz neural gratuita que roda no seu computador, sem internet e sem chave de API. Baixe os 2 arquivos do modelo (cerca de 340 MB) e coloque-os em `instagram/gerador/modelos/`:
- [kokoro-v1.0.onnx](https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.onnx)
- [voices-v1.0.bin](https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin)

```bash
node gerar.js                 # gera tudo (~1–2 min por Reel)
node gerar.js 03 07           # só os posts 03 e 07
node gerar.js --sem-video     # só carrosséis, capas e legendas (rápido)
node gerar.js --sem-voz       # Reels sem narração
```

**Trocar a voz:** há 3 vozes brasileiras: `pm_alex` (masculina, padrão), `pm_santa` (masculina) e `pf_dora` (feminina). A velocidade padrão é `1.08`.
- PowerShell: `$env:VOZ="pf_dora"; $env:VELOCIDADE="1.0"; node gerar.js 01`
- Linux/Mac: `VOZ=pf_dora VELOCIDADE=1.0 node gerar.js 01`

**Editar o que o narrador fala:** em `conteudo.js`, cada Reel tem a lista `narracao`, com uma fala por cena e na mesma ordem das cenas. Escreva termos em inglês do jeito que se pronunciam (`déchibórdi`, `Páiton`, `bi ai`, `élse`), senão a voz lê como português. Cada cena dura o tempo da fala, e os elementos vão aparecendo enquanto o narrador explica.

O **@insta.rsystem** já sai nas artes: no rodapé dos carrosséis e no topo dos Reels, porque embaixo o app cobre com a legenda e os botões. Para trocar ou remover:
- PowerShell: `$env:PERFIL="@outroperfil"; node gerar.js` (ou `$env:PERFIL=""` para tirar)
- Linux/Mac: `PERFIL=@outroperfil node gerar.js`

**Para criar um post novo**, copie um bloco em `conteudo.js`, troque o `id` e os textos e rode o gerador. Use `**palavra**` para destacar na cor da série. Cada cena aceita `emoji`, `title`, `text`, `code`, `rows` (tabela), `bullets` e `chart` (gráfico de barras animado). Sem narração, a duração de cada cena é calculada pelo tamanho do texto.

---

## 💡 Banco de ideias para as próximas semanas

| Conceito | Analogia | Série |
|---|---|---|
| Arrays / listas (índice começa em 0) | Caixa de ovos 🥚 | Lógica |
| Recursão | Bonecas russas 🪆 | Lógica |
| API | Garçom levando o pedido à cozinha 🍽️ | Lógica |
| Git / commits | "Salvar jogo" no videogame 🎮 | Lógica |
| Busca binária / Big O | Procurar palavra no dicionário 📖 | Lógica |
| Interface (POO) | Tomada: qualquer aparelho com o plugue certo funciona 🔌 | POO |
| Composição x Herança | Carro *tem* motor x carro *é* veículo 🚙 | POO |
| SQL JOIN | Lista de convidados x lista de presentes 🎁 | BI |
| Média x mediana | O salário médio sobe quando um milionário entra no bar 🍺 | BI |
| Correlação ≠ causalidade | Venda de sorvete x afogamentos 🍦 | BI |
| Modelo estrela (Power BI) | Comanda do restaurante e o cardápio ⭐ | BI |

---

### Fontes da pesquisa (outubro/2026)
- [Dash Social: Trending Instagram Hashtags for October 2026](https://www.dashsocial.com/blog/instagram-hashtags)
- [Later: Instagram hashtags in 2026, win with the 5-tag limit](https://later.com/blog/ultimate-guide-to-using-instagram-hashtags/)
- [RecurPost: Instagram Hashtag Limits and Placement Rules (2026)](https://recurpost.com/instagram-scheduler/instagram-hashtag-limits-and-placement-rules/)
- [Buffer: How the Instagram Algorithm Works, 2026](https://buffer.com/resources/instagram-algorithms/)
- [Atom Digital: Hashtags Instagram 2026](https://atomdigital.com.br/tudo-sobre-redes-sociais/hashtags-mais-usadas-instagram-2026/)
- [Altive: Hashtags em alta no Instagram hoje](https://altive-ai.com/blog/hashtags/hashtags-em-alta-no-instagram)
- [NIDDE Digital: Reels ou carrossel? Estudo 2026](https://niddedigital.com/reels-ou-carrossel-estudo-revela-o-que-tem-funcionado-melhor-em-2026-para-o-instagram-no-brasil/)
- [Grande Consumo: Instagram premeia carrosséis, Reels e conversação](https://grandeconsumo.com/instagram-premeia-carrosseis-reels-e-conversacao-revela-estudo/)
