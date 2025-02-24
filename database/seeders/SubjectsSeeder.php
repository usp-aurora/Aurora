<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Subject;

class SubjectsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subjects = [
            [
                'code' => 'CMU0449',
                'name' => 'Áudio e Produção Musical',
                'syllabus' => 'Fornecer ferramentas conceituais e práticas para o uso de tecnologias eletrônicas e digitais em áudio musical. Aproximar os alunos dos processos de produção fonográfica, prática de estúdio de gravação, manipulação de áudio e de criação musical com ferramentas digitais. Apresentar os fundamentos de técnicas de gravação, mixagem e difusão sonora.',
                'lecture_credits' => 3,
                'work_credits' => 0
            ],
            [
                'code' => 'CMU0529',
                'name' => 'Fundamentos da Acústica Musical I',
                'syllabus' => 'Apresentar os conceitos básicos acerca do fenômeno sonoro e dos mecanismos de percepção auditiva do ponto de vista da prática musical.',
                'lecture_credits' => 2,
                'work_credits' => 0
            ],
            [
                'code' => 'CMU0530',
                'name' => 'Fundamentos da Acústica Musical II',
                'syllabus' => 'Complementar os estudos realizados na disciplina \'Fundamentos da Acústica Musical I\' concentrando-se nos aspectos relacionados à acústica de instrumentos e da voz, acústica de ambientes e formação de escalas e afinações.',
                'lecture_credits' => 2,
                'work_credits' => 0
            ],
            [
                'code' => 'IPN0007',
                'name' => 'Redes Neurais Artifíciais na Engenharia Nuclear',
                'syllabus' => 'Introduzir novos conceitos do campo de redes neurais artificiais (RNA) dotando o aluno do conhecimento necessário para desenvolvimento e aplicação de redes neurais artificiais na Engenharia Nuclear     ',
                'lecture_credits' => 2,
                'work_credits' => 3
            ],
            [
                'code' => 'MAC0218',
                'name' => 'Técnicas de Programação II',
                'syllabus' => 'Expor o estudante a técnicas mais avançadas de programação, incluindo depuração, testes, orientação a objetos, padrões de projeto e construção de sistemas Web. Esses tópicos são aplicados em uma parte prática que consiste em desenvolver um sistema Web de médio porte em uma linguagem orientada a objetos (por exemplo Java, Python ou Ruby).',
                'lecture_credits' => 4,
                'work_credits' => 2
            ],
            [
                'code' => 'MAC0219',
                'name' => 'Programação Concorrente e Paralela',
                'syllabus' => 'Familiarizar o aluno com os conceitos e termos básicos de sistemas paralelos, implementação e uso de concorrência, apresentar os tipos de arquitetura mais usados, descrever o suporte necessário para a programação de tais sistemas e apresentar algumas aplicações.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0300',
                'name' => 'Métodos Numéricos da Álgebra Linear',
                'syllabus' => 'Apresentar os conceitos básicos da resolução numérica de sistemas de equações lineares e problemas de autovalores.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0315',
                'name' => 'Otimização Linear',
                'syllabus' => 'Apresentar os conceitos básicos, teóricos e algorítmicos, da resolução de problemas de otimização linear.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0317',
                'name' => 'Introdução ao Processamento de Sinais Digitais',
                'syllabus' => 'Apresentar ao aluno os fundamentos teóricos e o ferramental computacional comuns às áreas de processamento digital de áudio, imagens e vídeo, incluindo representação de sinais digitais, transformações tempo-frequência e espaço-frequência, e desenho e implementação de filtros digitais para problemas típicos em processamento de sinais, tais como suavização, segmentação e compressão, entre outros.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0318',
                'name' => 'Introdução à Programação de Robôs Móveis',
                'syllabus' => 'Estudar tópicos relacionados à robótica móvel utilizando kits robóticos educacionais.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0320',
                'name' => 'Introdução à Teoria dos Grafos',
                'syllabus' => 'Grafos são estruturas matemáticas que podem ser usadas para modelar muitos problemas computacionais. Esta disciplina tem o objetivo de introduzir o aluno à linguagem e aos problemas e teoremas básicos da teoria de grafos. Esta disciplina complementa a disciplina MAC0328 - Algoritmos em Grafos, que trata dos aspectos mais algorítmicos de vários problemas sobre grafos.\n',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0325',
                'name' => 'Otimização Combinatória',
                'syllabus' => 'Ensinar técnicas para o tratamento de problemas de otimização combinatória, em especial aqueles que podem ser formulados como problemas em grafos.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0327',
                'name' => 'Desafios de Programação',
                'syllabus' => 'Desenvolver habilidades de resolução de problemas computacionais em um ambiente semelhante ao de concursos internacionais de programação como o ICPC e à Maratona de Programação da SBC.  Os problemas de programação propostos levam ao aprendizado gradual de técnicas de desenvolvimento e análise de algoritmos, incluindo o uso de estruturas de dados bem conhecidas e uma grande variedade de estratégias de resolução de problemas computacionais.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0328',
                'name' => 'Algoritmos em Grafos',
                'syllabus' => 'Estudar algoritmos para problemas fundamentais em grafos.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0331',
                'name' => 'Geometria Computacional',
                'syllabus' => 'Estudo de algoritmos, estruturas de dados e propriedades geométricas para a solução de problemas de natureza geométrica.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0332',
                'name' => 'Engenharia de Software',
                'syllabus' => 'Ao final da disciplina, o aluno deverá ser capaz de desenvolver com qualidade e agilidade sistemas de\nsoftware inovadores com alto grau de complexidade, tanto técnicas quanto sociais. Será capaz de aplicar\nprincípios, técnicas e ferramentas nas diversas atividades da engenharia de software, avaliando seu\nimpacto no andamento do projeto e no produto final. Atuará em atividades práticas ao longo do curso,\npropiciando a aprendizagem na prática dos conteúdos.',
                'lecture_credits' => 4,
                'work_credits' => 2
            ],
            [
                'code' => 'MAC0336',
                'name' => 'Criptografia para Segurança de Dados',
                'syllabus' => 'Estudar os principais algoritmos de criptografia e suas aplicações.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0337',
                'name' => 'Computação Musical',
                'syllabus' => 'Introduzir ferramental teórico e prático do uso de computadores para analisar, processar e sintetizar sons e estruturas musicais.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0341',
                'name' => 'Introdução a Bioinformática',
                'syllabus' => 'As ciências biológicas sofreram uma importante revolução nas últimas décadas pelo uso de métodos matemático computacionais, o que foi possível graças a introdução de novas tecnologias para medição de fenômenos moleculares. O objetivo deste curso é familiarizar o aluno: com aspectos de dinâmicas fundamentais dos seres vivos no nível de Biologia Molecular e com a evolução das espécies; com os fenômenos moleculares que são medidos com as técnicas de medição com os repositórios públicos de fenômenos biológicos medidos e, finalmente, com técnicas de processamento de dados que permitem extrair informação biológica dos fenômenos medidos. Além de apresentar exemplos de problemas de bioinformática e de suas soluções.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0343',
                'name' => 'Otimização Semidefinida e Aplicações',
                'syllabus' => 'Desenvolver os pré-requisitos e a teoria de otimização semidefinida, bem como aplicações em otimização combinatória e outras áreas, como teoria dos códigos e otimização polinomial.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0344',
                'name' => 'Arquitetura de Computadores',
                'syllabus' => 'Introduzir os conceitos de organização e arquitetura de computadores.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0346',
                'name' => 'Programação para Jogos Digitais',
                'syllabus' => 'Desenvolver, por meio de exemplos práticos, a habilidade de reconhecer a estrutura básica de um jogo digital, implementar o essencial de cada subsistema, eleger soluções condizentes ao projeto de gameplay e familiarizar-se com as diversas técnicas e tecnologias usadas na área.',
                'lecture_credits' => 4,
                'work_credits' => 2
            ],
            [
                'code' => 'MAC0351',
                'name' => 'Algoritmos em Bioinformática',
                'syllabus' => 'Fornecer uma visão geral das principais técnicas e algoritmos utilizados para o estudo de genômicaem Bioinformática.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0352',
                'name' => 'Redes de Computadores e Sistemas Distribuídos',
                'syllabus' => 'Prover uma visão de tópicos essenciais para redes de computadores e sistemas distribuídos sob a perspectiva de sistemas, enfatizando os tópicos mais importantes para o desenvolvedor de software.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0375',
                'name' => 'Biologia de Sistemas',
                'syllabus' => 'Familiarizar o aluno com modelagem e inferência de sistemas biológicos. ',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0385',
                'name' => 'Estruturas de Dados Avançadas',
                'syllabus' => 'Familiarizar estudantes com estruturas de dados amplamente utilizadas no cotidiano que não são estudadas em disciplinas usuais. Produzir uma biblioteca com implementações da maioria das estruturas de dados estudadas.',
                'lecture_credits' => 4,
                'work_credits' => 2
            ],
            [
                'code' => 'MAC0413',
                'name' => 'Tópicos Avançados de Programação Orientada a Objetos',
                'syllabus' => 'Discutir conceitos avançados de modelagem e desenvolvimento\nde software orientado a objetos para alunos que já possuam conhecimentos e\nexperiência em programação orientada a objetos. Ao término da disciplina,\no estudante ser´a capaz de analisar, criticar e desenvolver complexos sistemas\norientados a objetos de acordo com o estado da arte e o estado da prática na área\nde Orientação a Objetos.',
                'lecture_credits' => 4,
                'work_credits' => 2
            ],
            [
                'code' => 'MAC0414',
                'name' => 'Autômatos, Computabilidade e Complexidade',
                'syllabus' => 'Procuramos por respostas para questões sobre as limitações da computação. Que problemas podem ser\nresolvidos por algoritmos? Como comparar problemas e algoritmos por alguma medida de dificuldade?\nComo se pode provar que certos problemas que pedem um algoritmo não podem ser resolvidos? O que\nse ganha e o que se perde com restrições no formato dos algoritmos?',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0417',
                'name' => 'Visão e Processamento de Imagens',
                'syllabus' => 'Apresentar os principais conceitos envolvidos na aquisição, processamento e análise de imagens digitais. Preparar os alunos para o uso de desenvolvimento de sistemas de processamento e análise de imagens.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0418',
                'name' => 'Tópicos Especiais de Programação Matemática',
                'syllabus' => 'Completar a formação do aluno interessado na área de programação matemática, usando estudo de aplicações como motivação para resultados mais específicos do que os das disciplinas introdutórias.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0419',
                'name' => 'Métodos de Otimização em Finanças',
                'syllabus' => 'Esta disciplina aborda algumas técnicas de Programação Matemática para otimização e estimação em processos econometricos, otimização de tomada de decisões economicas e financeiras, e elaboração de politicas de investimento e planejamento, atuaria e teste de hipoteses. Apresentaremos estas técnicas sempre no contexto de problemas economicos ou financeiros, embora as mesmas técnicas sejam cotidianamente empregadas em uma variedade de outros contextos, como engenharia de produção, controle de sistemas, etc.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0420',
                'name' => 'Introdução a Computação Gráfica',
                'syllabus' => 'Introduzir conceitos de computação gráfica, fornecendo conhecimento teórico para a criação de imagens\nsintéticas. Desenvolver competências para o desenvolvimento de programas gráficos interativos. ',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0425',
                'name' => 'Inteligência Artificial',
                'syllabus' => 'Apresentar os conceitos básicos da área de Inteligência Artificial, que permitem a resolução automática de problemas, através do estudo de técnicas de planejamento, representação de conhecimento, percepção, raciocínio aproximado e aprendizagem.',
                'lecture_credits' => 4,
                'work_credits' => 2
            ],
            [
                'code' => 'MAC0426',
                'name' => 'Sistemas de Bancos de Dados',
                'syllabus' => 'Expor os principais componentes da arquitetura dos sistemas gerenciadores de bancos de dados relacionais. Introduzir outras abordagens de representação e gerenciamento de dados, como os dados semiestruturados e os bancos de dados não relacionais.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0427',
                'name' => 'Otimização Não Linear',
                'syllabus' => 'Apresentar as principais ferramentas para a resolução de problemas de otimização não linear.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0431',
                'name' => 'Introdução à Computação Paralela e Distribuída',
                'syllabus' => 'Familiarizar o aluno com os conceitos e termos básicos de sistemas paralelos e  distribuídos, apresentar os tipos de arquitetura mais usados, descrever o suporte necessário para a programação de tais sistemas, e apresentar algumas aplicações. ',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0436',
                'name' => 'Tópicos de Matemática Discreta I',
                'syllabus' => 'Expor o aluno com inclinação à matemática e a aspectos teóricos da ciência da computação a tópicos avançados da matemática discreta.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0439',
                'name' => 'Laboratório de Bancos de Dados',
                'syllabus' => 'Consolidar os principais fundamentos apresentados em uma disciplina introdutória de sistemas de bancos\nde dados. Explorar os aspectos práticos envolvidos no desenvolvimento de um sistema com banco de\ndados, o que inclui o uso de sistemas gerenciadores de bancos de dados e ferramentas de apoio ao\nprojeto de bancos de dados.',
                'lecture_credits' => 4,
                'work_credits' => 2
            ],
            [
                'code' => 'MAC0444',
                'name' => 'Sistemas Baseados em Conhecimento',
                'syllabus' => 'Expor o aluno às diversas áreas da Inteligência Artificial, com aprofundamento em alguns tópicos como raciocínio lógico, raciocínio com incerteza, construção de bases de conhecimento, engenharia de conhecimento, ontologia e processamento de linguagem natural.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0446',
                'name' => 'Princípios de Interação Humano-computador',
                'syllabus' => 'Introduzir fundamentos de Interação Humano Computador (IHC) e experiência prática com o processo de\nprojeto de sistemas interativos, cobrindo aspectos de design, prototipação e avaliação de interfaces. ',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0450',
                'name' => 'Algoritmos de Aproximação',
                'syllabus' => 'Familiarizar os alunos com as técnicas de desenvolvimento e análise de algoritmos de aproximação para problemas combinatórios e com os resultados da teoria de complexidade relacionados a aproximações. São estudados algoritmos de aproximação para vários problemas, dentre os quais destacamos problemas de escalonamento, bin packing, geometria computacional e otimização sobre grafos.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0452',
                'name' => 'Tópicos de Otimização Combinatória I',
                'syllabus' => 'Familiarizar os alunos com assuntos recentes e novas técnicas em otimização combinatória.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0459',
                'name' => 'Ciência e Engenharia de Dados',
                'syllabus' => 'Ao final da disciplina o aluno deverá saber os fundamentos e as técnicas para manipulação, análise, representação, validação e processamento de grandes volumes de dados.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0460',
                'name' => 'Introdução ao aprendizado de máquina',
                'syllabus' => 'Introduzir os principais conceitos, fundamentos e algoritmos de aprendizado de máquina. Introduzir métodos de avaliação de modelos e suas limitações. Introduzir técnicas para lidar com o sobreajuste de modelos. Utilizar bibliotecas de aprendizado de máquina para resolver problemas de predição. ',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0461',
                'name' => 'Introdução ao Escalonamento e Aplicações',
                'syllabus' => 'Introduzir conceitos e problemas básicos de escalonamento estático, assim como propor aplicações práticas. O principal objetivo da disciplina é de fornecer técnicas para a análise e resolução(geralmente através de algoritmos de aproximação) de problemas de escalonamento.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0463',
                'name' => 'Computação Móvel',
                'syllabus' => 'O objetivo da disciplina é proporcionar ao aluno um primeiro contato com a área de computação distribuída móvel. Em particular, serão (a) estudados os problemas específicos na comunicação, no gerenciamento de dados e no projeto de sistemas decorrentes da mobilidade de usuários e de elementos computacionais (b) apresentados os conceitos, as tecnologias e os modelos fundamentais da área e (c) discutido os mecanismos, protocolos e metodologias usadas no\ndesenvolvimento de software para sistemas deste tipo. Além disto, nessa disciplina\no aluno dever´a ter a oportunidade de fazer diversos projetos práticos.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0465',
                'name' => 'Biologia Computacional',
                'syllabus' => 'Apresentar uma introdução aos principais algoritmos que têm sido desenvolvidos para problemas da\nbiologia computacional, servindo de partida para um estudo posterior mais aprofundado de tópicos\nabordados no curso.\n',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0466',
                'name' => 'Teoria dos Jogos Algorítmica',
                'syllabus' => 'Apresentar a área de teoria algorítmica dos jogos, introduzindo os conceitos necessários de teoria dos jogos, e discorrendo sobre problemas e resultados da área. A disciplina deverá proporcionar ao aluno a oportunidade de se familiarizar com vários resultados recentes em leilões combinatórios, jogos de roteamento e jogos de formação de redes. capacidade de estimar o desempenho de um algoritmo.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0467',
                'name' => 'Empreendedorismo Digital',
                'syllabus' => 'Apresentar os conceitos básicos relacionados ao empreendedorismo com foco em inovação tecnológica e empresas startups de software e internet. Incentivar o espírito empreendedor em alunos de Ciência da Computação e demais interessados em inovação tecnológica em torno de software. Ao fim da disciplina o aluno deve ser capaz de refletir sobre as possibilidades de criação de um negócio sustentável a partir de uma ideia tecnológica inovadora.',
                'lecture_credits' => 4,
                'work_credits' => 2
            ],
            [
                'code' => 'MAC0468',
                'name' => 'Tópicos em Computação Gráfica',
                'syllabus' => 'Familiarizar o aluno com o estado da arte na síntese de imagens tridimensionais e animação.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0470',
                'name' => 'Desenvolvimento de Software Livre',
                'syllabus' => 'Familiarizar os alunos com o ecossistema do Software Livre incluindo os principais aspectos relacionados à produção de software seguindo o modelo aberto e colaborativo de produção e compartilhamento.',
                'lecture_credits' => 4,
                'work_credits' => 2
            ],
            [
                'code' => 'MAC0472',
                'name' => 'Laboratório de Métodos Ágeis',
                'syllabus' => 'Familiarizar o estudante com metodologias  &#x301;ágeis de desenvolvimento de software orientado a objetos.',
                'lecture_credits' => 4,
                'work_credits' => 2
            ],
            [
                'code' => 'MAC0473',
                'name' => 'Otimização Inteira',
                'syllabus' => 'Familiarizar os alunos com técnicas de modelagem e resolução de problemas através de otimização inteira.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0475',
                'name' => 'Laboratório de Sistemas Computacionais Complexos',
                'syllabus' => 'Capacitar os estudantes para construirem sistemas complexos e distribuídos, utilizando metodologias de desenvolvimento e tecnologias web \/ mobile atuais.',
                'lecture_credits' => 4,
                'work_credits' => 2
            ],
            [
                'code' => 'MAC0690',
                'name' => 'Tópicos em Combinatória Contemporânea I',
                'syllabus' => 'Introduzir aspectos básicos envolvidos em tópicos centrais da pesquisa corrente na área de combinatória, com ênfase em combinatória assintótica.  Discutir métodos combinatórios, algébricos, analíticos e probabilísticos da área.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0691',
                'name' => 'Tópicos na Teoria Algébrica dos Grafos',
                'syllabus' => 'Estudar tópicos em teoria algébrica dos grafos, com ênfase em teoria espectral dos grafos.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0692',
                'name' => 'Tópicos em Combinatória Contemporânea II',
                'syllabus' => 'Aprofundar o estudo de tópicos centrais da pesquisa corrente na área de combinatória, com ênfase em combinatória assintótica, iniciado em Tópicos em Combinatória Contemporânea I.  ',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0693',
                'name' => 'Tópicos Matemáticos para Computação Contemporânea',
                'syllabus' => 'Estudar tópicos matemáticos relevantes para a análise de certos algoritmos modernos da ciência da computação, incluindo tópicos de probabilidade, da álgebra linear, e da geometria de espaços de dimensão alta.\n',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0775',
                'name' => 'Métodos Probabilísticos em Combinatória e em Teoria da Computação I (',
                'syllabus' => 'A disciplina tem como objetivo introduzir o aluno às técnicas probabilísticas fundamentais usadas  em combinatória e em teoria da computação. Espera-se que o aluno, ao completar esta disciplina,  terá visto os instrumentos básicos desta área, e que ele terá também desenvolvido sua sensibilidade para problemas combinatórios tanto determinísticos como probabilísticos.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAC0776',
                'name' => 'Métodos Probabilísticos em Combinatória e em Teoria da Computação II',
                'syllabus' => 'Dar continuidade à apresentação de técnicas probabilísticas em combinatória e em teoria da computação, através do estudo aprofundado de tópicos contemporâneos de pesquisa em que há elementos probabilísticos envolvidos,  explícita ou implicitamente',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAE0221',
                'name' => 'Probabilidade I',
                'syllabus' => 'Apresentar os conceitos fundamentais da Teoria das Probabilidades. Estudar os principais modelos probabilísticos discretos e contínuos, transformações de variáveis e principais distribuições amostrais.',
                'lecture_credits' => 6,
                'work_credits' => 0
            ],
            [
                'code' => 'MAE0224',
                'name' => 'Probabilidade II',
                'syllabus' => 'Estudo completo das principais distribuições de probabilidade.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAE0228',
                'name' => 'Noções de Probabilidade e Processos Estocásticos',
                'syllabus' => 'Fornecer os conceitos da teoria das probabilidades e de processos estocásticos que permitam o estudo posterior de inferência estatística e aplicações em processos estocásticos.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAE0312',
                'name' => 'Introdução aos Processos Estocásticos',
                'syllabus' => 'Apresentar a noção de processos estocásticos que é central na teoria das probabilidades moderna. Fornecer exemplos elementares e os teoremas centrais em processos estocásticos.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAE0326',
                'name' => 'Aplicações de Processos Estocásticos',
                'syllabus' => 'Apresentar modelos recentes de aplicações de processos estocásticos.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAE0515',
                'name' => 'Introdução à Teoria dos Jogos',
                'syllabus' => 'Fornecer as ideias básicas da teoria dos jogos através de exemplos simples.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAE0580',
                'name' => 'Introdução à aprendizagem estatística',
                'syllabus' => 'Apresentar de forma introdutória algumas questões e idéias centrais nesse novo domínio da Estatística.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAT0111',
                'name' => 'Cálculo Diferencial e Integral I',
                'syllabus' => 'Estudo de funções de uma variável, limites, derivadas e integrais.',
                'lecture_credits' => 6,
                'work_credits' => 0
            ],
            [
                'code' => 'MAT0206',
                'name' => 'Análise Real',
                'syllabus' => 'Introduzir conceitos básicos da análise real, visando tornar os estudantes familiarizados coma linguagem     formal e técnicas de demonstração em Matemática.',
                'lecture_credits' => 6,
                'work_credits' => 0
            ],
            [
                'code' => 'MAT0225',
                'name' => 'Funções Analíticas',
                'syllabus' => 'Estudo de funções analíticas e aplicações. ',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAT0234',
                'name' => 'Medida e Integração',
                'syllabus' => 'Introduzir os conceitos de medida e integração e apresentar aplicações.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAT0264',
                'name' => 'Anéis e Corpos',
                'syllabus' => 'Introdução às noções básicas de estruturas algébricas: anéis e corpos.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAT0265',
                'name' => 'Grupos',
                'syllabus' => 'Introdução às noções básicas de estruturas algébricas: grupos.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'MAT0311',
                'name' => 'Cálculo Diferencial e Integral V',
                'syllabus' => 'Estudo de transformações entre espaços reais, topologia de Rn, continuidade e diferenciabilidade. ',
                'lecture_credits' => 6,
                'work_credits' => 0
            ],
            [
                'code' => 'MAT0349',
                'name' => 'Introdução à Lógica',
                'syllabus' => 'Dar o conhecimento essencial do cálculo proposicional e de predicados de 1 ordem aos estudantes de     licenciatura em matemática. ',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'PCS2057',
                'name' => 'Multimídia e Hipermídia',
                'syllabus' => 'Apresentar as tecnologias básicas necessárias ao desenvolvimento de sistemas de multimídia\/hipermídia e realidade virtual; analisar as diversas áreas de aplicações, bem como técnicas, metodologias e ferramentas de desenvolvimento; discutir o estado da arte, perspectivas de evolução, e desafios a serem vencidos; propiciar o contato prático com os aspectos relacionados à criação e produção de sistemas interativos avançados.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'PCS3438',
                'name' => 'Inteligência Artificial',
                'syllabus' => 'Esta disciplina apresenta os principais conceitos e técnicas utilizados para a concepção e desenvolvimento de sistemas computacionais inteligentes, enfatizando os problemas que se destinam a solucionar, os principais formalismos e linguagens de programação e as principais aplicações práticas.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'PCS3848',
                'name' => 'Sistemas Embarcados',
                'syllabus' => 'Transmitir conceitos fundamentais relacionados com Sistemas Embarcados, para desenvolver habilidades de concepção e desenvolvimento de dispositivos e sistemas.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'PCS3858',
                'name' => 'Laboratório de Sistemas Embarcados',
                'syllabus' => 'Obter conhecimentos práticos e habilidades associadas ao projeto de dispositivos para Sistemas Embarcados, por meio da aplicação dos conceitos associados a experimentos práticos.',
                'lecture_credits' => 4,
                'work_credits' => 1
            ],
            [
                'code' => 'PCS3863',
                'name' => 'Gerência e Qualidade de Software',
                'syllabus' => 'Capacitar os alunos na gestão corporativa de tecnologia de informação, com o foco principal em software. Capacitar na melhoria da qualidade de processos, produtos e serviços de software e TI.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'PMR3508',
                'name' => 'Aprendizado de Máquina e Reconhecimento de Padrões',
                'syllabus' => 'Introdução às técnicas básicas de reconhecimento de padrões (classificadores probabilísticos, árvores de decisão, redes neurais, SVMs, regressão) e visão computacional (modelos de imagem, processamento de imagens, visão estéreo, reconhecimento de objetos).',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'PSI2432',
                'name' => 'Projeto e Implementação de Filtros Digitais',
                'syllabus' => 'Aprender técnicas de projeto de filtros digitais e exercitá-las na síntese de filtros com especificações usadas em aplicações de interesse prático. A compreensão dos algoritmos de projeto requer a aplicação dos conceitos de sistemas e de transformadas adquiridos anteriormente e contribuirá para a sedimentação desses conceitos. Por outro lado, esta disciplina fornece os conceitos básicos para a realização de filtros e modelos adaptativos, que serão abordados em disciplinas mais avançadas do curso.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'PSI2672',
                'name' => 'Práticas em Reconhecimento de Padrões, Modelagem e Neurocomputação',
                'syllabus' => 'O objetivo principal da disciplina é oferecer aos alunos da ênfase Sistemas Eletrônicos do curso de Engenharia Elétrica a oportunidade de realização de projetos práticos envolvendo as temáticas de reconhecimento de padrões e a modelagem computacional de sistemas reais, através de técnicas de neurocomputação e similares.Goals:This course gives the students of Electrical Engineering with specialization in Electronic Systems the opportunity to develop practical projects related to pattern recognition and the modeling of real world systems, through the use of neural approaches and other techniques.   ',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'PSI3461',
                'name' => 'Métodos Matriciais em Reconhecimento de Padrões',
                'syllabus' => 'Aprendizado dos métodos matriciais mais relevantes em reconhecimento de padrões.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'PSI3501',
                'name' => 'Processamento de Voz e Aprendizagem de Máquina',
                'syllabus' => 'Esta disciplina busca familiarizar os alunos com as técnicas modernas de aprendizagem de máquina e suas aplicações ao processamento de sinais de voz e estimular a busca de melhoramentos e alternativas a essas técnicas vigentes.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'PSI3560',
                'name' => 'Sistemas Cognitivos',
                'syllabus' => 'Introdução às ciências cognitivas, e discussão deprincípios e técnicas para concepção e implantação de sistemas artificiais com um viés cognitivo. O curso apresenta uma linha complementar ao estudo oferecido em outras disciplinas da ênfase de Eletrônica e Sistemas, e particularmente da especialidade de Sistemas Inteligentes.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'PSI3571',
                'name' => 'Práticas em Reconhecimento de Padrões, Modelagem e Inteligência Computacional',
                'syllabus' => 'O objetivo principal da disciplina é oferecer aos alunos da ênfase Eletrônica e Sistemas e aos demais cursos de Engenharia a oportunidade de realização de projetos práticos e prototipação de sistemas envolvendo as temáticas de reconhecimento de padrões e a modelagem computacional de sistemas reais, através de técnicas de neurocomputação e inteligência computacional de uma forma geral.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => 'PTC3569',
                'name' => 'Introdução à Inteligência Computacional',
                'syllabus' => 'Apresentar os fundamentos teóricos e práticos de redes neurais, sistemas de lógica nebulosa, e algoritmos genéticos. Aprender como mapear um problema para o domínio neural, ou \'fuzzy\'-neural, isto é, chegar a uma arquitetura específica para resolver o problema. Realizar algumas aplicações de natureza prática (simulações). A ênfase do curso será mais em propriedades matemáticas e computacionais do que em analogias com redes biológicas.',
                'lecture_credits' => 4,
                'work_credits' => 0
            ],
            [
                'code' => "MAC0101",
                'name' => "Integração na Universidade e na Profissão",
                'syllabus' => "O Naruto pode ser um pouco rude às vezes, talvez você não saiba disso, mas o Naruto também cresceu sem pai. Na verdade, ele nunca conheceu nenhum de seus pais, e nunca teve nenhum amigo em nossa aldeia. Mesmo assim, eu nunca vi ele chorar, ficar zangado ou se dar por vencido, ele está sempre disposto a melhorar, ele quer ser respeitado, é o sonho dele e o Naruto daria a vida por isso sem hesitar. Meu palpite é que ele se cansou de chorar e decidiu fazer alguma coisa a respeito! ",
                'work_credits' => 2,
                'lecture_credits' => 0,
            ],
            [
                'code' => "MAC0105",
                'name' => "Fundamentos de Matemática para a Computação",
                'syllabus' => "O Naruto pode ser um pouco rude às vezes, talvez você não saiba disso, mas o Naruto também cresceu sem pai. Na verdade, ele nunca conheceu nenhum de seus pais, e nunca teve nenhum amigo em nossa aldeia. Mesmo assim, eu nunca vi ele chorar, ficar zangado ou se dar por vencido, ele está sempre disposto a melhorar, ele quer ser respeitado, é o sonho dele e o Naruto daria a vida por isso sem hesitar. Meu palpite é que ele se cansou de chorar e decidiu fazer alguma coisa a respeito! ",
                'work_credits' => 4,
                'lecture_credits' => 0,
            ],
            [
                'code' => "MAC0110",
                'name' => "Introdução à Computação",
                'syllabus' => "O Naruto pode ser um pouco rude às vezes, talvez você não saiba disso, mas o Naruto também cresceu sem pai. Na verdade, ele nunca conheceu nenhum de seus pais, e nunca teve nenhum amigo em nossa aldeia. Mesmo assim, eu nunca vi ele chorar, ficar zangado ou se dar por vencido, ele está sempre disposto a melhorar, ele quer ser respeitado, é o sonho dele e o Naruto daria a vida por isso sem hesitar. Meu palpite é que ele se cansou de chorar e decidiu fazer alguma coisa a respeito! ",
                'work_credits' => 4,
                'lecture_credits' => 0,
            ],
            [
                'code' => "MAC0329",
                'name' => "Álgebra Booleana e Aplicações no Projeto de Arquitetura de Computadores",
                'syllabus' => "O Naruto pode ser um pouco rude às vezes, talvez você não saiba disso, mas o Naruto também cresceu sem pai. Na verdade, ele nunca conheceu nenhum de seus pais, e nunca teve nenhum amigo em nossa aldeia. Mesmo assim, eu nunca vi ele chorar, ficar zangado ou se dar por vencido, ele está sempre disposto a melhorar, ele quer ser respeitado, é o sonho dele e o Naruto daria a vida por isso sem hesitar. Meu palpite é que ele se cansou de chorar e decidiu fazer alguma coisa a respeito! ",
                'work_credits' => 4,
                'lecture_credits' => 0,
            ],
            [
                'code' => "MAT2453",
                'name' => "Cálculo Diferencial e Integral I",
                'syllabus' => "O Naruto pode ser um pouco rude às vezes, talvez você não saiba disso, mas o Naruto também cresceu sem pai. Na verdade, ele nunca conheceu nenhum de seus pais, e nunca teve nenhum amigo em nossa aldeia. Mesmo assim, eu nunca vi ele chorar, ficar zangado ou se dar por vencido, ele está sempre disposto a melhorar, ele quer ser respeitado, é o sonho dele e o Naruto daria a vida por isso sem hesitar. Meu palpite é que ele se cansou de chorar e decidiu fazer alguma coisa a respeito! ",
                'work_credits' => 6,
                'lecture_credits' => 0,
            ],
            [
                'code' => "MAT0112",
                'name' => "Vetores e Geometria",
                'syllabus' => "O Naruto pode ser um pouco rude às vezes, talvez você não saiba disso, mas o Naruto também cresceu sem pai. Na verdade, ele nunca conheceu nenhum de seus pais, e nunca teve nenhum amigo em nossa aldeia. Mesmo assim, eu nunca vi ele chorar, ficar zangado ou se dar por vencido, ele está sempre disposto a melhorar, ele quer ser respeitado, é o sonho dele e o Naruto daria a vida por isso sem hesitar. Meu palpite é que ele se cansou de chorar e decidiu fazer alguma coisa a respeito! ",
                'work_credits' => 4,
                'lecture_credits' => 0,
            ],
            [
                'code' => "MAC0121",
                'name' => "Algoritmos e Estruturas de Dados I",
                'syllabus' => "O Naruto pode ser um pouco rude às vezes, talvez você não saiba disso, mas o Naruto também cresceu sem pai. Na verdade, ele nunca conheceu nenhum de seus pais, e nunca teve nenhum amigo em nossa aldeia. Mesmo assim, eu nunca vi ele chorar, ficar zangado ou se dar por vencido, ele está sempre disposto a melhorar, ele quer ser respeitado, é o sonho dele e o Naruto daria a vida por isso sem hesitar. Meu palpite é que ele se cansou de chorar e decidiu fazer alguma coisa a respeito! ",
                'work_credits' => 4,
                'lecture_credits' => 0,
            ],
            [
                'code' => "MAC0216",
                'name' => "Técnicas de Programação I",
                'syllabus' => "O Naruto pode ser um pouco rude às vezes, talvez você não saiba disso, mas o Naruto também cresceu sem pai. Na verdade, ele nunca conheceu nenhum de seus pais, e nunca teve nenhum amigo em nossa aldeia. Mesmo assim, eu nunca vi ele chorar, ficar zangado ou se dar por vencido, ele está sempre disposto a melhorar, ele quer ser respeitado, é o sonho dele e o Naruto daria a vida por isso sem hesitar. Meu palpite é que ele se cansou de chorar e decidiu fazer alguma coisa a respeito! ",
                'work_credits' => 4,
                'lecture_credits' => 2,
            ],
            [
                'code' => "MAC0239",
                'name' => "Introdução à Lógica e Verificação de Programas",
                'syllabus' => "O Naruto pode ser um pouco rude às vezes, talvez você não saiba disso, mas o Naruto também cresceu sem pai. Na verdade, ele nunca conheceu nenhum de seus pais, e nunca teve nenhum amigo em nossa aldeia. Mesmo assim, eu nunca vi ele chorar, ficar zangado ou se dar por vencido, ele está sempre disposto a melhorar, ele quer ser respeitado, é o sonho dele e o Naruto daria a vida por isso sem hesitar. Meu palpite é que ele se cansou de chorar e decidiu fazer alguma coisa a respeito! ",
                'work_credits' => 4,
                'lecture_credits' => 0,
            ],
            [
                'code' => "MAE0119",
                'name' => "Introdução à Probabilidade e à Estatística",
                'syllabus' => "O Naruto pode ser um pouco rude às vezes, talvez você não saiba disso, mas o Naruto também cresceu sem pai. Na verdade, ele nunca conheceu nenhum de seus pais, e nunca teve nenhum amigo em nossa aldeia. Mesmo assim, eu nunca vi ele chorar, ficar zangado ou se dar por vencido, ele está sempre disposto a melhorar, ele quer ser respeitado, é o sonho dele e o Naruto daria a vida por isso sem hesitar. Meu palpite é que ele se cansou de chorar e decidiu fazer alguma coisa a respeito! ",
                'work_credits' => 6,
                'lecture_credits' => 0,
            ],
            [
                'code' => "MAT2454",
                'name' => "Cálculo Diferencial e Integral II",
                'syllabus' => "O Naruto pode ser um pouco rude às vezes, talvez você não saiba disso, mas o Naruto também cresceu sem pai. Na verdade, ele nunca conheceu nenhum de seus pais, e nunca teve nenhum amigo em nossa aldeia. Mesmo assim, eu nunca vi ele chorar, ficar zangado ou se dar por vencido, ele está sempre disposto a melhorar, ele quer ser respeitado, é o sonho dele e o Naruto daria a vida por isso sem hesitar. Meu palpite é que ele se cansou de chorar e decidiu fazer alguma coisa a respeito! ",
                'work_credits' => 4,
                'lecture_credits' => 0,
            ],
            [
                'code' => "MAT0122",
                'name' => "Álgebra Linear I",
                'syllabus' => "O Naruto pode ser um pouco rude às vezes, talvez você não saiba disso, mas o Naruto também cresceu sem pai. Na verdade, ele nunca conheceu nenhum de seus pais, e nunca teve nenhum amigo em nossa aldeia. Mesmo assim, eu nunca vi ele chorar, ficar zangado ou se dar por vencido, ele está sempre disposto a melhorar, ele quer ser respeitado, é o sonho dele e o Naruto daria a vida por isso sem hesitar. Meu palpite é que ele se cansou de chorar e decidiu fazer alguma coisa a respeito! ",
                'work_credits' => 4,
                'lecture_credits' => 0,
            ],
            [
                'code' => "MAC0102",
                'name' => "Caminhos no Bacharelado em Ciência da Computação",
                'syllabus' => "O Naruto pode ser um pouco rude às vezes, talvez você não saiba disso, mas o Naruto também cresceu sem pai. Na verdade, ele nunca conheceu nenhum de seus pais, e nunca teve nenhum amigo em nossa aldeia. Mesmo assim, eu nunca vi ele chorar, ficar zangado ou se dar por vencido, ele está sempre disposto a melhorar, ele quer ser respeitado, é o sonho dele e o Naruto daria a vida por isso sem hesitar. Meu palpite é que ele se cansou de chorar e decidiu fazer alguma coisa a respeito! ",
                'work_credits' => 2,
                'lecture_credits' => 0,
            ],
            [
                'code' => "MAC0209",
                'name' => "Modelagem e Simulação",
                'syllabus' => "O Naruto pode ser um pouco rude às vezes, talvez você não saiba disso, mas o Naruto também cresceu sem pai. Na verdade, ele nunca conheceu nenhum de seus pais, e nunca teve nenhum amigo em nossa aldeia. Mesmo assim, eu nunca vi ele chorar, ficar zangado ou se dar por vencido, ele está sempre disposto a melhorar, ele quer ser respeitado, é o sonho dele e o Naruto daria a vida por isso sem hesitar. Meu palpite é que ele se cansou de chorar e decidiu fazer alguma coisa a respeito! ",
                'work_credits' => 4,
                'lecture_credits' => 0,
            ],
            [
                'code' => "MAC0210",
                'name' => "Laboratório de Métodos Numéricos",
                'syllabus' => "O Naruto pode ser um pouco rude às vezes, talvez você não saiba disso, mas o Naruto também cresceu sem pai. Na verdade, ele nunca conheceu nenhum de seus pais, e nunca teve nenhum amigo em nossa aldeia. Mesmo assim, eu nunca vi ele chorar, ficar zangado ou se dar por vencido, ele está sempre disposto a melhorar, ele quer ser respeitado, é o sonho dele e o Naruto daria a vida por isso sem hesitar. Meu palpite é que ele se cansou de chorar e decidiu fazer alguma coisa a respeito! ",
                'work_credits' => 4,
                'lecture_credits' => 0,
            ],
            [
                'code' => "MAC0323",
                'name' => "Algoritmos e Estruturas de Dados II",
                'syllabus' => "O Naruto pode ser um pouco rude às vezes, talvez você não saiba disso, mas o Naruto também cresceu sem pai. Na verdade, ele nunca conheceu nenhum de seus pais, e nunca teve nenhum amigo em nossa aldeia. Mesmo assim, eu nunca vi ele chorar, ficar zangado ou se dar por vencido, ele está sempre disposto a melhorar, ele quer ser respeitado, é o sonho dele e o Naruto daria a vida por isso sem hesitar. Meu palpite é que ele se cansou de chorar e decidiu fazer alguma coisa a respeito! ",
                'work_credits' => 4,
                'lecture_credits' => 2,
            ],
            [
                'code' => "MAT0236",
                'name' => "Funções Diferenciáveis e Séries",
                'syllabus' => "O Naruto pode ser um pouco rude às vezes, talvez você não saiba disso, mas o Naruto também cresceu sem pai. Na verdade, ele nunca conheceu nenhum de seus pais, e nunca teve nenhum amigo em nossa aldeia. Mesmo assim, eu nunca vi ele chorar, ficar zangado ou se dar por vencido, ele está sempre disposto a melhorar, ele quer ser respeitado, é o sonho dele e o Naruto daria a vida por isso sem hesitar. Meu palpite é que ele se cansou de chorar e decidiu fazer alguma coisa a respeito! ",
                'work_credits' => 4,
                'lecture_credits' => 0,
            ],
            [
                'code' => "MAC0316",
                'name' => "Conceitos Fundamentais de Linguagens de Programação",
                'syllabus' => "O Naruto pode ser um pouco rude às vezes, talvez você não saiba disso, mas o Naruto também cresceu sem pai. Na verdade, ele nunca conheceu nenhum de seus pais, e nunca teve nenhum amigo em nossa aldeia. Mesmo assim, eu nunca vi ele chorar, ficar zangado ou se dar por vencido, ele está sempre disposto a melhorar, ele quer ser respeitado, é o sonho dele e o Naruto daria a vida por isso sem hesitar. Meu palpite é que ele se cansou de chorar e decidiu fazer alguma coisa a respeito! ",
                'work_credits' => 4,
                'lecture_credits' => 0,
            ],
            [
                'code' => "MAC0338",
                'name' => "Análise de Algoritmos",
                'syllabus' => "O Naruto pode ser um pouco rude às vezes, talvez você não saiba disso, mas o Naruto também cresceu sem pai. Na verdade, ele nunca conheceu nenhum de seus pais, e nunca teve nenhum amigo em nossa aldeia. Mesmo assim, eu nunca vi ele chorar, ficar zangado ou se dar por vencido, ele está sempre disposto a melhorar, ele quer ser respeitado, é o sonho dele e o Naruto daria a vida por isso sem hesitar. Meu palpite é que ele se cansou de chorar e decidiu fazer alguma coisa a respeito! ",
                'work_credits' => 4,
                'lecture_credits' => 0,
            ],
            [
                'code' => "MAC0350",
                'name' => "Introdução ao Desenvolvimento de Sistemas de Software",
                'syllabus' => "O Naruto pode ser um pouco rude às vezes, talvez você não saiba disso, mas o Naruto também cresceu sem pai. Na verdade, ele nunca conheceu nenhum de seus pais, e nunca teve nenhum amigo em nossa aldeia. Mesmo assim, eu nunca vi ele chorar, ficar zangado ou se dar por vencido, ele está sempre disposto a melhorar, ele quer ser respeitado, é o sonho dele e o Naruto daria a vida por isso sem hesitar. Meu palpite é que ele se cansou de chorar e decidiu fazer alguma coisa a respeito! ",
                'work_credits' => 4,
                'lecture_credits' => 2,
            ],
            [
                'code' => "MAC0422",
                'name' => "Sistemas Operacionais",
                'syllabus' => "O Naruto pode ser um pouco rude às vezes, talvez você não saiba disso, mas o Naruto também cresceu sem pai. Na verdade, ele nunca conheceu nenhum de seus pais, e nunca teve nenhum amigo em nossa aldeia. Mesmo assim, eu nunca vi ele chorar, ficar zangado ou se dar por vencido, ele está sempre disposto a melhorar, ele quer ser respeitado, é o sonho dele e o Naruto daria a vida por isso sem hesitar. Meu palpite é que ele se cansou de chorar e decidiu fazer alguma coisa a respeito! ",
                'work_credits' => 4,
                'lecture_credits' => 2,
            ],
            [
                'code' => "FLC0474",
                'name' => "Língua Portuguesa",
                'syllabus' => "O Naruto pode ser um pouco rude às vezes, talvez você não saiba disso, mas o Naruto também cresceu sem pai. Na verdade, ele nunca conheceu nenhum de seus pais, e nunca teve nenhum amigo em nossa aldeia. Mesmo assim, eu nunca vi ele chorar, ficar zangado ou se dar por vencido, ele está sempre disposto a melhorar, ele quer ser respeitado, é o sonho dele e o Naruto daria a vida por isso sem hesitar. Meu palpite é que ele se cansou de chorar e decidiu fazer alguma coisa a respeito! ",
                'work_credits' => 3,
                'lecture_credits' => 0,
            ],
            [
                'code' => "MAC0499",
                'name' => "Trabalho de Formatura Supervisionado (2 semestres)",
                'syllabus' => "O Naruto pode ser um pouco rude às vezes, talvez você não saiba disso, mas o Naruto também cresceu sem pai. Na verdade, ele nunca conheceu nenhum de seus pais, e nunca teve nenhum amigo em nossa aldeia. Mesmo assim, eu nunca vi ele chorar, ficar zangado ou se dar por vencido, ele está sempre disposto a melhorar, ele quer ser respeitado, é o sonho dele e o Naruto daria a vida por isso sem hesitar. Meu palpite é que ele se cansou de chorar e decidiu fazer alguma coisa a respeito! ",
                'work_credits' => 0,
                'lecture_credits' => 16,
            ]
        ];

        foreach ($subjects as $Subject) {
            Subject::create($Subject);
        }
        
        //Subject::factory(150)->create();
    }
}
  