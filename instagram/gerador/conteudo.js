// Fonte única de todo o conteúdo: slides, roteiros dos Reels, legendas e hashtags.
// Edite aqui e rode `node gerar.js` para regerar imagens, vídeos e legendas.
//
// Campos de cada cena/slide (todos opcionais):
//   kicker  – selo da série (ex.: "LÓGICA #01")
//   emoji   – ilustração grande
//   title   – frase principal (use **palavra** para destacar)
//   text    – explicação curta
//   code    – linhas de código (array)
//   rows    – tabela de comparação [[esquerda, direita], ...]
//   bullets – lista de tópicos
//   chart   – { labels, values, highlight, prefix } (gráfico de barras animado)
//   dur     – duração da cena no Reel, em segundos (se omitido, é calculada)
//   textoAntes – força o texto a aparecer antes do código/gráfico

const series = {
  logica: { nome: 'LÓGICA DE PROGRAMAÇÃO', cor: '#FFC53D' },
  poo: { nome: 'POO', cor: '#B69CFF' },
  bi: { nome: 'BI & DADOS', cor: '#2EE6A6' },
  halloween: { nome: 'ESPECIAL HALLOWEEN', cor: '#FF8A3D' },
  blackfriday: { nome: 'ESPECIAL BLACK FRIDAY', cor: '#FF5C7A' },
  desafio: { nome: 'DESAFIO', cor: '#5CC8FF' },
};

const posts = [
  // ───────────────────────────── 01 ─────────────────────────────
  {
    id: '01-variavel-pote-de-tempero',
    tipo: 'reel',
    // Narração: uma fala por cena. Termos em inglês vão escritos como se pronunciam.
    narracao: [
      "Sabia que você usa variáveis todo dia? E o melhor: na cozinha!",
      "Olha só. Pensa num pote de tempero, com uma etiqueta. A etiqueta é o nome. E o que tem dentro do pote, é o valor.",
      "No código, é igualzinho. Açúcar recebe quinhentos. Sal recebe duzentos. E tempero recebe o texto: orégano. Cada nome guarda um valor.",
      "E quando o açúcar acaba? Você não joga o pote fora, né? Você reabastece! Açúcar passa a valer zero, e depois, mil. O pote é o mesmo. Só o conteúdo que varia. Por isso o nome: variável!",
      "Resumindo: a etiqueta é o nome da variável. O conteúdo é o valor guardado. E reabastecer, é atribuir um novo valor.",
      "Salva esse vídeo, e manda pra quem tá começando a programar! No próximo da série: if e élse, explicados com um guarda-chuva.",
    ],
    serie: 'logica',
    data: 'Ter 20/10/2026 · 19h',
    cenas: [
      { kicker: 'LÓGICA #01', emoji: '🧂', title: 'Você usa **variáveis** todo dia… na cozinha 🍳' },
      { emoji: '🫙', title: 'Pense num pote com **etiqueta**', text: 'A **etiqueta** é o nome. O que tem **dentro** é o valor.' },
      { title: 'Em código é igualzinho:', code: ['acucar = 500', 'sal = 200', 'tempero = "orégano"'] },
      {
        title: 'Acabou o açúcar? Você **reabastece**',
        code: ['acucar = 0', 'acucar = 1000  # comprou mais'],
        text: 'O pote é o mesmo, o conteúdo **varia**. Por isso: **vari**ável 😉',
      },
      {
        title: 'Resumo',
        rows: [
          ['🏷️ Etiqueta', 'Nome da variável'],
          ['🍚 Conteúdo', 'Valor guardado'],
          ['🔄 Reabastecer', 'Atribuir novo valor'],
        ],
      },
      { emoji: '📌', title: 'Salva e manda pra quem tá **começando**!', text: 'Próximo da série: **if/else** explicado com um guarda-chuva ☔' },
    ],
    legenda: `Você já usa variáveis todo dia e nem percebeu 🧂

Na cozinha, cada pote tem uma etiqueta ("açúcar", "sal") e um conteúdo que muda: acaba, você reabastece, e o pote continua o mesmo.

Em lógica de programação, uma variável funciona exatamente assim:
🏷️ o nome é a etiqueta
🍚 o valor é o que está dentro
🔄 trocar o valor = reabastecer o pote

Por isso o nome: o conteúdo VARIA, então é uma VARIável 😉

Se você está começando a aprender programação (Python, JavaScript, qualquer linguagem), esse é o primeiro conceito que precisa ficar claro, e agora ficou.

💬 Comenta: qual "pote" da sua cozinha seria a variável mais importante do seu código?
📌 Salva pra revisar e manda pra quem está começando.`,
    hashtags: ['#logicadeprogramacao', '#programacao', '#programacaoparainiciantes', '#python', '#aprenderprogramar'],
    alt: 'Vídeo animado explicando variáveis em programação com a analogia de potes de tempero com etiqueta: o nome da variável é a etiqueta e o valor é o conteúdo do pote.',
  },

  // ───────────────────────────── 02 ─────────────────────────────
  {
    id: '02-classe-objeto-bolo',
    tipo: 'carrossel',
    serie: 'poo',
    data: 'Qui 22/10/2026 · 12h',
    slides: [
      { kicker: 'POO #01', emoji: '🎂', title: 'Classe e Objeto explicados com **bolo**', text: 'Arrasta que em 30 segundos você entende →' },
      { emoji: '📜', title: 'A **Classe** é a forma (e a receita)', text: 'Ela diz **como** todo bolo vai ser: formato, sabor, cobertura. Mas forma não se come 😅' },
      { emoji: '🍰', title: 'O **Objeto** é o bolo pronto', text: 'Cada bolo que sai da forma é um objeto. **Uma forma → vários bolos diferentes.**' },
      {
        title: 'Em Python fica assim:',
        code: [
          'class Bolo:',
          '    def __init__(self, sabor, cobertura):',
          '        self.sabor = sabor',
          '        self.cobertura = cobertura',
          '',
          'bolo1 = Bolo("chocolate", "brigadeiro")',
          'bolo2 = Bolo("cenoura", "chocolate")',
        ],
      },
      {
        emoji: '🔪',
        title: 'O que o bolo **tem** e o que ele **faz**',
        rows: [
          ['🍫 Atributos', 'O que ele TEM: sabor, cobertura, tamanho'],
          ['🍴 Métodos', 'O que ele FAZ: fatiar(), decorar()'],
        ],
      },
      {
        title: 'Resumindo',
        rows: [
          ['Classe', 'Forma / receita'],
          ['Objeto', 'Bolo pronto'],
          ['Atributo', 'Característica'],
          ['Método', 'Ação'],
        ],
      },
      { emoji: '💬', title: 'Qual bolo (objeto) você criaria?', text: 'Comenta aqui 👇 e **salva** pra revisar antes da prova.' },
    ],
    legenda: `Classe e objeto explicados com bolo 🎂 (arrasta →)

Esse é O conceito da Programação Orientada a Objetos (POO) que mais confunde quem está começando. Então vamos pra cozinha:

📜 Classe = a forma + a receita. Define como todo bolo vai ser.
🍰 Objeto = o bolo pronto. Uma forma, vários bolos.
🍫 Atributos = o que o bolo TEM (sabor, cobertura)
🍴 Métodos = o que o bolo FAZ (fatiar, decorar)

No slide 4 tem o código em Python, pra você ver a analogia virando programa de verdade.

💬 Comenta qual bolo (objeto) você criaria com essa classe. Os melhores sabores ganham resposta 😄
📌 Salva pra revisar antes da prova ou da entrevista.`,
    hashtags: ['#poo', '#programacaoorientadaaobjetos', '#programacao', '#python', '#devbrasil'],
    alt: 'Carrossel de 7 slides explicando classe e objeto em Programação Orientada a Objetos: a classe é a forma de bolo e o objeto é o bolo pronto, com exemplo de código em Python.',
  },

  // ───────────────────────────── 03 ─────────────────────────────
  {
    id: '03-dashboard-painel-do-carro',
    tipo: 'reel',
    // Narração: uma fala por cena. Termos em inglês vão escritos como se pronunciam.
    narracao: [
      "Você já sabe ler um déchibórdi. Só não sabia disso ainda!",
      "Repara no painel do carro. Velocidade, combustível, temperatura. Tudo o que importa, numa olhada só.",
      "Em bi ai, cada ponteiro desses é um cá pê i, um indicador-chave. O combustível é o orçamento disponível. O velocímetro, as vendas do dia. E a temperatura, a satisfação do cliente.",
      "E a luz de alerta? Essa é o alerta condicional. Ela acende sozinha, quando alguma coisa sai do normal. Você nem precisa ficar vigiando.",
      "Então guarda essa regra: déchibórdi bom é igual painel de carro. Mostra pouco, só o essencial. Dá pra entender em cinco segundos. E avisa antes do problema acontecer.",
      "Comenta: painel, aqui embaixo! No próximo da série, eu te explico é tê éle, com uma ida à feira.",
    ],
    serie: 'bi',
    data: 'Sáb 24/10/2026 · 11h',
    cenas: [
      { kicker: 'BI #01', emoji: '🚗', title: 'Você já sabe ler um **dashboard**. Só não sabia 👀' },
      { emoji: '🏎️', title: 'Olha o painel do carro', text: 'Velocidade, combustível, temperatura… tudo que importa **num olhar**.' },
      {
        title: 'Cada ponteiro é um **KPI**',
        rows: [
          ['⛽ Combustível', 'Orçamento disponível'],
          ['🏁 Velocímetro', 'Vendas do dia'],
          ['🌡️ Temperatura', 'Satisfação do cliente'],
        ],
      },
      { emoji: '🚨', title: 'E a **luz de alerta**?', text: 'É o **alerta condicional**: acende sozinho quando algo sai do normal.' },
      {
        emoji: '📊',
        title: 'Dashboard bom = painel bom',
        bullets: ['Mostra **pouco**, mas o essencial', 'Dá pra entender em **5 segundos**', 'Avisa **antes** do problema'],
      },
      { emoji: '💬', title: 'Comenta **PAINEL** 👇', text: 'Próximo da série: **ETL** explicado com uma ida à feira 🥕' },
    ],
    legenda: `Você já sabe ler um dashboard. Só não sabia 👀🚗

O painel do carro é o dashboard mais famoso do mundo:
⛽ combustível, 🏁 velocidade, 🌡️ temperatura, tudo num olhar.

Em Business Intelligence (BI) é a mesma ideia:
📍 cada ponteiro é um KPI (indicador-chave)
🚨 a luz de alerta é um alerta condicional: acende quando algo sai do normal
📊 um bom dashboard mostra pouco, se entende em 5 segundos e avisa ANTES do problema

Se o seu dashboard no Power BI precisa de 10 minutos de explicação, ele é um painel de avião, não de carro 😅

💬 Comenta PAINEL se quer o próximo: ETL explicado com uma ida à feira 🥕
➕ Segue pra aprender BI e análise de dados sem complicação.`,
    hashtags: ['#businessintelligence', '#powerbi', '#dashboard', '#analisededados', '#dados'],
    alt: 'Vídeo animado comparando um dashboard de BI ao painel de um carro: cada ponteiro é um KPI e a luz de alerta é um alerta condicional.',
  },

  // ───────────────────────────── 04 ─────────────────────────────
  {
    id: '04-if-else-guarda-chuva',
    tipo: 'reel',
    // Narração: uma fala por cena. Termos em inglês vão escritos como se pronunciam.
    narracao: [
      "Você toma decisões igualzinho a um programa. E faz isso toda manhã!",
      "Antes de sair de casa, você pensa: se estiver chovendo, eu levo o guarda-chuva. Senão, vou de óculos escuros.",
      "No código, o se vira if. E o senão vira élse. Se estiver chovendo: levar guarda-chuva. Senão: levar óculos escuros.",
      "E dá pra encadear decisões com o élif, que quer dizer: senão, se. Se chover, guarda-chuva. Senão, se estiver frio, casaco. Senão, é só sair feliz!",
      "Agora, presta atenção na regra de ouro: o computador testa as condições de cima pra baixo, e para na primeira que for verdadeira. Por isso, a ordem importa!",
      "Desafio: escreve aqui nos comentários um if da sua rotina. E salva o vídeo, pra não esquecer!",
    ],
    serie: 'logica',
    data: 'Ter 27/10/2026 · 19h',
    cenas: [
      { kicker: 'LÓGICA #02', emoji: '☔', title: 'Você toma **decisões** como um programa. Toda manhã.' },
      { emoji: '🌧️', title: 'Antes de sair de casa…', text: '**SE** estiver chovendo → guarda-chuva. **SENÃO** → óculos escuros 😎' },
      { title: 'Em código:', code: ['if chovendo:', '    levar("guarda-chuva")', 'else:', '    levar("óculos escuros")'] },
      {
        title: 'Dá pra encadear decisões',
        code: ['if chovendo:', '    levar("guarda-chuva")', 'elif frio:', '    levar("casaco")', 'else:', '    sair_feliz()'],
        text: '**elif** = "senão, se…"',
      },
      { emoji: '💡', title: 'A regra de ouro', text: 'O computador testa **de cima pra baixo** e para na **primeira** condição verdadeira.' },
      { emoji: '👇', title: 'Desafio: escreve um **if** da sua rotina', text: 'Salva 📌 e manda pro amigo que está aprendendo.' },
    ],
    legenda: `Você toma decisões como um programa. Toda manhã ☔

Antes de sair de casa você roda isso no cérebro:
SE estiver chovendo → leva guarda-chuva
SENÃO → óculos escuros 😎

Em lógica de programação isso se chama estrutura condicional (if / else). E quando tem mais de uma possibilidade, entra o elif ("senão, se…").

💡 Regra de ouro: o computador testa as condições de cima pra baixo e para na PRIMEIRA que for verdadeira. A ordem importa!

👇 Desafio: escreve nos comentários um if da sua rotina. Vale tudo: café, academia, segunda-feira…
📌 Salva e manda pra quem está aprendendo a programar.`,
    hashtags: ['#logicadeprogramacao', '#programacao', '#python', '#programacaoparainiciantes', '#estudandoprogramacao'],
    alt: 'Vídeo animado explicando if, elif e else com a decisão de levar guarda-chuva quando está chovendo, com exemplos de código em Python.',
  },

  // ───────────────────────────── 05 ─────────────────────────────
  {
    id: '05-halloween-monstros-do-codigo',
    tipo: 'carrossel',
    serie: 'halloween',
    data: 'Sáb 31/10/2026 · 11h (Halloween)',
    slides: [
      { kicker: 'ESPECIAL HALLOWEEN', emoji: '🎃', title: '5 **monstros** que assombram todo programador', text: 'O nº 3 já te pegou, admite 👻 →' },
      {
        emoji: '🧟',
        title: '1. O **Loop Infinito**',
        text: 'Um zumbi que **nunca para** de andar. A condição de parada nunca fica falsa.',
        code: ['while True:', '    print("cérebros...")'],
      },
      {
        emoji: '👻',
        title: '2. O **Null**, o fantasma',
        text: 'Você chama alguém que **não está lá**. Usar algo vazio dá erro na hora.',
        code: ['cliente = None', 'cliente.nome  # 💥 erro!'],
      },
      { emoji: '🧛', title: '3. O **Bug de Sexta à Noite**', text: 'Só aparece **depois do deploy**, quando todo mundo já foi embora. Antídoto: **testar antes** de publicar.' },
      { emoji: '🕷️', title: '4. O **Código Espaguete**', text: 'Uma teia onde tudo depende de tudo. Mexeu num fio, cai algo do outro lado 🕸️ Antídoto: **funções pequenas** e nomes claros.' },
      { emoji: '🧙', title: '5. O **"Na minha máquina funciona"**', text: 'A maldição mais antiga da TI. Antídoto: **ambientes iguais** (ex.: Docker) e testes automatizados.' },
      { emoji: '💬', title: 'Qual monstro já te assombrou?', text: 'Responde com o **número** e marca o amigo que é o nº 5 😂' },
    ],
    legenda: `5 monstros que assombram todo programador 🎃👻 (arrasta →)

🧟 1. Loop infinito: o zumbi que nunca para
👻 2. Null: o fantasma que você chama e não está lá
🧛 3. O bug de sexta à noite: só aparece depois do deploy
🕷️ 4. Código espaguete: mexe num fio, cai do outro lado
🧙 5. "Na minha máquina funciona": a maldição mais antiga da TI

E cada um tem seu antídoto (tá nos slides 😉). Quem está aprendendo programação vai encontrar TODOS em algum momento. Conhecer o monstro é metade da batalha.

💬 Responde com o NÚMERO do monstro que já te assombrou
🏷️ Marca aquele amigo que é o nº 5 😂
Feliz Halloween, dev! 🎃`,
    hashtags: ['#halloween', '#programacao', '#programador', '#devbrasil', '#tecnologia'],
    alt: 'Carrossel de Halloween com 5 problemas comuns de programação apresentados como monstros: loop infinito como zumbi, null como fantasma, bug de sexta como vampiro, código espaguete como aranha e o "na minha máquina funciona" como bruxo.',
  },

  // ───────────────────────────── 06 ─────────────────────────────
  {
    id: '06-pilares-poo-cafeteira',
    tipo: 'reel',
    // Narração: uma fala por cena. Termos em inglês vão escritos como se pronunciam.
    narracao: [
      "Os quatro pilares da programação orientada a objetos, explicados com uma cafeteira. Bora?",
      "Primeiro: encapsulamento. As peças de dentro da cafeteira ficam trancadas. Você não mexe na resistência. Só usa o que a máquina libera pra você. No código, esses dados ficam privados.",
      "Segundo: abstração. Você só vê três botões: curto, longo e capuchino. Toda a complexidade fica escondida. Você só manda: fazer café.",
      "Terceiro: herança. A cafeteira de cápsula herda tudo da cafeteira comum. E ainda ganha uma função nova: ler a cápsula.",
      "Quarto: polimorfismo. O mesmo comando, preparar, gera resultados diferentes: café, chá, ou chocolate quente. Mesma ordem, várias formas.",
      "Resumo pra prova: encapsulamento protege o que é interno. Abstração mostra só o essencial. Herança reaproveita e estende. E polimorfismo é o mesmo comando, com várias formas.",
      "Essa pergunta cai muito em entrevista de emprego. Salva o vídeo, e manda pro amigo que vai fazer uma!",
    ],
    serie: 'poo',
    data: 'Ter 03/11/2026 · 19h',
    cenas: [
      { kicker: 'POO #02', emoji: '☕', title: 'Os **4 pilares da POO** explicados com uma cafeteira' },
      {
        emoji: '🔒',
        title: '1. **Encapsulamento**',
        text: 'As peças internas ficam **trancadas**. Você não mexe na resistência, só usa o que a máquina libera.',
        code: ['self.__temperatura = 92  # privado'],
      },
      {
        emoji: '🎛️',
        title: '2. **Abstração**',
        text: 'Você só vê **3 botões**: curto, longo, cappuccino. A complexidade fica escondida.',
        code: ['cafeteira.fazer_cafe("curto")'],
      },
      {
        emoji: '🧬',
        title: '3. **Herança**',
        text: 'A cafeteira de cápsula **herda** tudo da comum… e ainda ganha ler_capsula().',
        code: ['class CafeteiraCapsula(Cafeteira):'],
      },
      {
        emoji: '🎭',
        title: '4. **Polimorfismo**',
        text: 'Mesmo comando **preparar()**, resultados diferentes.',
        code: ['for bebida in [Cafe(), Cha(), Chocolate()]:', '    bebida.preparar()'],
      },
      {
        title: 'Resumo pra prova 📝',
        rows: [
          ['🔒 Encapsulamento', 'Protege o que é interno'],
          ['🎛️ Abstração', 'Mostra só o essencial'],
          ['🧬 Herança', 'Reaproveita e estende'],
          ['🎭 Polimorfismo', 'Mesmo comando, várias formas'],
        ],
      },
      { emoji: '📌', title: 'Salva antes da **entrevista de emprego**', text: 'Essa pergunta cai MUITO. Manda pro amigo que vai fazer uma 👇' },
    ],
    legenda: `Os 4 pilares da POO explicados com uma cafeteira ☕

Essa é uma das perguntas mais comuns em entrevista de estágio e júnior. Guarda essa:

🔒 Encapsulamento: as peças internas ficam trancadas. Você não mexe na resistência, só usa o que a máquina libera.
🎛️ Abstração: você só vê os botões que importam (curto, longo, cappuccino).
🧬 Herança: a cafeteira de cápsula herda tudo da comum e ainda ganha funções novas.
🎭 Polimorfismo: o mesmo comando preparar() gera café, chá ou chocolate.

Programação Orientada a Objetos não precisa ser decoreba. Quando você entende a analogia, o código faz sentido sozinho.

📌 Salva antes da próxima entrevista
👇 Manda pro amigo que está estudando POO`,
    hashtags: ['#poo', '#programacaoorientadaaobjetos', '#programacao', '#python', '#carreiraemti'],
    alt: 'Vídeo animado explicando os 4 pilares da programação orientada a objetos (encapsulamento, abstração, herança e polimorfismo) usando uma cafeteira como exemplo.',
  },

  // ───────────────────────────── 07 ─────────────────────────────
  {
    id: '07-etl-feira',
    tipo: 'carrossel',
    serie: 'bi',
    data: 'Qui 05/11/2026 · 12h',
    slides: [
      { kicker: 'BI #02', emoji: '🥕', title: '**ETL** explicado com uma ida à feira', text: 'O processo por trás de todo dashboard →' },
      { emoji: '🧺', title: 'E: **Extrair**', text: 'Você passa na feira, no mercado e no açougue. Nos dados é igual: cada um vem de um lugar: **planilha, sistema, API, banco de dados.**' },
      {
        emoji: '🔪',
        title: 'T: **Transformar**',
        text: 'Lavar, descascar, tirar o que estragou. Nos dados: **limpar e padronizar.**',
        rows: [
          ['"SP", "sp", "São Paulo"', '→ "São Paulo"'],
          ['"10/11/26", "2026-11-10"', '→ uma data só'],
          ['Linhas repetidas', '→ removidas'],
        ],
      },
      { emoji: '🍽️', title: 'L: **Carregar** (Load)', text: 'Guardar tudo pronto num lugar só: o **data warehouse**. De lá, o Power BI só precisa servir à mesa.' },
      { emoji: '🤢', title: 'Por que isso importa?', text: 'Dashboard com dado sujo é igual comida mal lavada: **parece bonito, mas faz mal.** Boa parte do trabalho de BI acontece no **T**.' },
      {
        title: 'Resumindo',
        rows: [
          ['🧺 Extrair', 'Buscar os dados nas fontes'],
          ['🔪 Transformar', 'Limpar e padronizar'],
          ['🍽️ Carregar', 'Guardar pronto para análise'],
        ],
      },
      { emoji: '💬', title: 'Comenta **ETL** se já viu um dado "estragado"', text: 'E **salva** pra consultar no próximo projeto 📌' },
    ],
    legenda: `ETL explicado com uma ida à feira 🥕 (arrasta →)

Todo dashboard bonito tem uma cozinha bagunçada por trás. Ela se chama ETL:

🧺 E de Extrair: buscar os ingredientes em vários lugares (planilhas, sistemas, APIs, bancos de dados)
🔪 T de Transformar: lavar, descascar e tirar o que estragou (remover duplicados, padronizar datas e nomes)
🍽️ L de Load, Carregar: deixar tudo pronto no data warehouse, pro Power BI só servir à mesa

Dashboard com dado sujo é igual comida mal lavada: parece bonito, mas faz mal 🤢

Se você quer trabalhar com BI, análise ou engenharia de dados, esse conceito é a base de tudo.

💬 Comenta ETL se você já encontrou um dado "estragado" (conta qual!)
📌 Salva pra consultar no próximo projeto.`,
    hashtags: ['#etl', '#engenhariadedados', '#powerbi', '#businessintelligence', '#dados'],
    alt: 'Carrossel explicando o processo de ETL (extrair, transformar e carregar dados) usando a analogia de comprar ingredientes na feira, lavar e cortar, e servir no prato.',
  },

  // ───────────────────────────── 08 ─────────────────────────────
  {
    id: '08-loops-lavar-louca',
    tipo: 'carrossel',
    serie: 'logica',
    data: 'Ter 10/11/2026 · 12h',
    slides: [
      { kicker: 'LÓGICA #03', emoji: '🧽', title: 'Você executa um **loop** toda vez que lava a louça', text: 'Arrasta →' },
      { emoji: '🔁', title: '**Enquanto** tiver prato na pia…', text: 'pega um prato → lava → enxágua → põe no escorredor. **E repete.**' },
      {
        title: 'Isso é um **while**',
        code: ['while pia_tem_prato():', '    prato = pegar_prato()', '    lavar(prato)', '    escorrer(prato)'],
        text: 'Repete **enquanto** a condição for verdadeira.',
      },
      {
        title: 'E o **for**?',
        textoAntes: true,
        text: 'Quando você **já sabe** o que vai repetir: "lavar cada copo do jogo de 6".',
        code: ['for copo in jogo_de_copos:', '    lavar(copo)'],
      },
      { emoji: '🚨', title: 'Cuidado com o **loop infinito**', text: 'Se o prato **nunca sai** da pia, você lava o mesmo prato pra sempre. Todo loop precisa de um jeito de **acabar**.' },
      {
        title: 'Resumindo',
        rows: [
          ['while', 'Repete enquanto algo for verdade'],
          ['for', 'Repete para cada item de uma lista'],
          ['Condição de parada', 'O que evita o loop infinito'],
        ],
      },
      { emoji: '💬', title: 'Que tarefa da sua rotina é um loop?', text: 'Comenta 👇 A melhor resposta vira post!' },
    ],
    legenda: `Você executa um loop toda vez que lava a louça 🧽 (arrasta →)

ENQUANTO tiver prato na pia:
→ pega um prato
→ lava
→ põe no escorredor
…e repete.

Em lógica de programação isso é uma estrutura de repetição:
🔁 while: repete enquanto a condição for verdadeira
🔁 for: repete para cada item de uma lista (cada copo do jogo)
🚨 E todo loop precisa de uma condição de parada, senão vira loop infinito (o prato que nunca sai da pia 😅)

💬 Que tarefa da sua rotina é um loop? A resposta mais criativa vira post!
📌 Salva pra revisar quando for estudar laços de repetição.`,
    hashtags: ['#logicadeprogramacao', '#programacao', '#python', '#aprenderprogramar', '#tecnologia'],
    alt: 'Carrossel explicando estruturas de repetição while e for com a analogia de lavar louça enquanto houver pratos na pia, com exemplos de código em Python.',
  },

  // ───────────────────────────── 09 ─────────────────────────────
  {
    id: '09-funcao-liquidificador',
    tipo: 'reel',
    // Narração: uma fala por cena. Termos em inglês vão escritos como se pronunciam.
    narracao: [
      "Função em programação é um liquidificador. Sério, olha só!",
      "Primeiro, entram os ingredientes: morango e leite. Na programação, isso se chama parâmetros. É a entrada.",
      "Aí, ele processa. E você nem precisa saber como o motor funciona por dentro. É só apertar o botão.",
      "E no final, sai a vitamina! Isso é o retorno da função. A saída.",
      "Em Páiton, fica assim: a gente define a função liquidificador, que recebe uma fruta e um líquido, e retorna a vitamina. Depois, é só chamar: liquidificador, de morango com leite.",
      "E por que usar funções? Porque você escreve uma vez, e usa mil vezes. O código fica organizado. E achar erro fica muito mais fácil.",
      "E aí, que vitamina a sua função faria? Comenta aqui! E segue o perfil, pra aprender programação sem decoreba.",
    ],
    serie: 'logica',
    data: 'Qui 12/11/2026 · 19h',
    cenas: [
      { kicker: 'LÓGICA #04', emoji: '🥤', title: 'Função em programação é um **liquidificador**. Sério.' },
      { emoji: '🍓', title: 'Entram os ingredientes…', text: 'Morango e leite = **parâmetros** (a entrada)' },
      { emoji: '🌀', title: '…ele processa…', text: 'Você não precisa saber como o motor funciona. **Só aperta o botão.**' },
      { emoji: '🥤', title: '…e sai a vitamina!', text: 'O resultado = **retorno** (a saída)' },
      {
        title: 'Em Python:',
        code: ['def liquidificador(fruta, liquido):', '    return f"vitamina de {fruta} com {liquido}"', '', 'copo = liquidificador("morango", "leite")'],
      },
      {
        emoji: '💡',
        title: 'Por que usar funções?',
        bullets: ['Escreve **uma vez**, usa mil vezes', 'Código mais **organizado**', 'Achar erro fica **mais fácil**'],
      },
      { emoji: '🍌', title: 'Que vitamina a sua função faria?', text: 'Comenta 👇 e segue pra aprender **sem decoreba** 🚀' },
    ],
    legenda: `Função em programação é um liquidificador. Sério 🥤

🍓 Entram os ingredientes → parâmetros (a entrada)
🌀 Ele processa → você não precisa saber como o motor funciona
🥤 Sai a vitamina → o retorno (a saída)

Em Python:
def liquidificador(fruta, liquido):
    return f"vitamina de {fruta} com {liquido}"

Por que isso importa? Porque com funções você escreve uma vez e usa mil vezes, deixa o código organizado e acha erros muito mais rápido.

💬 Que vitamina a sua função faria? Comenta os parâmetros 🍌
➕ Segue pra aprender lógica de programação sem decoreba.`,
    hashtags: ['#logicadeprogramacao', '#python', '#programacaoparainiciantes', '#programacao', '#estudandoprogramacao'],
    alt: 'Vídeo animado explicando funções em programação com a analogia de um liquidificador: ingredientes são parâmetros, o processamento é o corpo da função e a vitamina é o retorno.',
  },

  // ───────────────────────────── 10 ─────────────────────────────
  {
    id: '10-desafio-pense-como-computador',
    tipo: 'carrossel',
    serie: 'desafio',
    data: 'Ter 17/11/2026 · 12h',
    slides: [
      { kicker: 'DESAFIO', emoji: '🤖', title: 'Você consegue **pensar como um computador**?', text: '3 desafios. Responde nos comentários **antes** de ver o final 👀' },
      { title: 'Desafio 1 🟢 Fácil', code: ['x = 5', 'x = x + 3', 'print(x)'], text: 'O que aparece na tela?' },
      {
        title: 'Desafio 2 🟡 Médio',
        code: ['idade = 17', 'if idade >= 18:', '    print("Pode dirigir")', 'else:', '    print("Vai de bike")'],
        text: 'Qual mensagem aparece?',
      },
      {
        title: 'Desafio 3 🔴 Difícil',
        code: ['total = 0', 'for n in [1, 2, 3, 4]:', '    if n % 2 == 0:', '        total = total + n', 'print(total)'],
        text: 'Dica: **%** é o resto da divisão.',
      },
      { emoji: '🙈', title: 'Já respondeu nos comentários?', text: 'Então pode arrastar pro gabarito… 👉' },
      {
        title: 'Gabarito ✅',
        rows: [
          ['Desafio 1', '**8**: x vale 5, depois 5 + 3'],
          ['Desafio 2', '**Vai de bike**: 17 não é ≥ 18'],
          ['Desafio 3', '**6**: soma só os pares (2 + 4)'],
        ],
      },
      { emoji: '🏆', title: 'Quantos você acertou?', text: 'Comenta seu placar (0 a 3) e **marca um amigo** pra tentar 🤝' },
    ],
    legenda: `Você consegue pensar como um computador? 🤖🧠

3 desafios de lógica de programação, do fácil ao difícil:
🟢 Desafio 1: variáveis
🟡 Desafio 2: if / else
🔴 Desafio 3: for + resto da divisão

⚠️ Regra: responde nos comentários ANTES de olhar o gabarito (não vale espiar 👀)

Esse tipo de exercício é chamado de teste de mesa: você executa o código "na cabeça", linha por linha, como o computador faria. É um dos melhores treinos pra quem está aprendendo a programar.

🏆 Comenta seu placar (0, 1, 2 ou 3)
🏷️ Marca um amigo pra ver quem acerta mais`,
    hashtags: ['#logicadeprogramacao', '#programacao', '#python', '#desafio', '#aprenderprogramar'],
    alt: 'Carrossel interativo com 3 desafios de lógica de programação em Python, um sobre variáveis, um sobre if e else e um sobre laço for, com gabarito no penúltimo slide.',
  },

  // ───────────────────────────── 11 ─────────────────────────────
  {
    id: '11-black-friday-desconto-real',
    tipo: 'reel',
    // Narração: uma fala por cena. Termos em inglês vão escritos como se pronunciam.
    narracao: [
      "De mil novecentos e noventa e nove, por novecentos e noventa e nove reais. Mas será que esse desconto é de verdade?",
      "Quem trabalha com bi ai responde isso olhando o histórico. É a tal da série temporal: como o preço andou nos últimos meses.",
      "Olha esse gráfico. O preço ficava em torno de mil e duzentos reais. Aí, em novembro, ele sobe pra quase dois mil. Só pra cair na Bléqui Fráidei, e parecer uma pechincha.",
      "A métrica certa é comparar com a média dos últimos meses, e não com o preço de antes. Fazendo a conta, o desconto real é de só dezessete por cento. Não cinquenta!",
      "Isso é bi ai na vida real. Dado histórico vale mais que promessa. Compare com a referência certa. E decida com fatos, não com emoção.",
      "Manda esse vídeo pro amigo que sempre cai no metade do dobro. E salva, pra usar na sexta, dia vinte e sete!",
    ],
    serie: 'blackfriday',
    data: 'Ter 24/11/2026 · 19h (semana da Black Friday, 27/11)',
    cenas: [
      { kicker: 'BLACK FRIDAY', emoji: '🏷️', title: '"De R$ 1.999 por R$ 999"… é **desconto** mesmo? 🤔' },
      { emoji: '📈', title: 'O BI responde com **histórico**', text: 'Em vez de olhar só o preço de hoje, olha a **série temporal**: como o preço andou nos últimos meses.' },
      {
        title: 'Olha o gráfico 👇',
        chart: { labels: ['JUL', 'AGO', 'SET', 'OUT', 'NOV', 'BF'], values: [1199, 1149, 1199, 1249, 1999, 999], highlight: [4, 5], prefix: 'R$ ' },
        text: 'Subiu em novembro… pra **"cair"** na Black Friday 🙃',
        dur: 6.5,
      },
      {
        title: 'A métrica certa',
        code: ['media_90d = 1199', 'preco_bf = 999', 'desconto = 1 - preco_bf / media_90d', '# 17%, não 50% 😬'],
        text: 'Compare com a **média dos últimos meses**, não com o preço "de".',
      },
      {
        emoji: '🧠',
        title: 'Isso é **BI** na vida real',
        bullets: ['Dado histórico > promessa', 'Comparar com a **referência certa**', 'Decidir com **fatos**, não com emoção'],
      },
      { emoji: '😂', title: 'Manda pro amigo que cai no **"metade do dobro"**', text: 'Salva 📌 e usa na sexta, **27/11**' },
    ],
    legenda: `"De R$ 1.999 por R$ 999"… é desconto mesmo? 🤔🏷️

Na Black Friday todo mundo olha só o preço de hoje. Quem trabalha com BI olha o histórico.

📈 Série temporal: como o preço se comportou nos últimos meses
🧮 A métrica certa: compare com a MÉDIA dos últimos meses, não com o preço "de"
😬 No exemplo do vídeo, o "50% off" vira só 17% de desconto real

Isso é Business Intelligence na vida real: decidir com dados, não com emoção (nem com contagem regressiva piscando na tela 😅).

Dica: sites e extensões de histórico de preços fazem exatamente essa análise pra você.

😂 Manda pro amigo que sempre cai no "metade do dobro"
📌 Salva pra usar na sexta, 27/11`,
    hashtags: ['#blackfriday', '#blackfriday2026', '#analisededados', '#businessintelligence', '#dados'],
    alt: 'Vídeo animado mostrando como analisar se um desconto de Black Friday é real usando histórico de preços: um gráfico de barras mostra o preço subindo em novembro antes da promoção, e o cálculo revela 17% de desconto real em vez de 50%.',
  },
];

module.exports = { series, posts };
