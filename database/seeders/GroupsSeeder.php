<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Group;

class GroupsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $groups = [
            [
                'id' => 1,
                'title' => "Bacharelado em Ciência da Computação [2025]",
                'description' => "Curso do BCC do IME-USP :)",
                'parent_group_id' => null,
                'is_course_root' => true
            ],
            [
                'id' => 2,
                'title' => "Trilha de Inteligência Artificial",
                'description' => "A inteligência artificial visa desenvolver tecnologias como carros autônomos, robôs domésticos e tradutores automáticos, estudando a representação e aquisição do conhecimento humano e a construção de sistemas autônomos confiáveis. A trilha de IA forma profissionais para criar ferramentas que automatizam tarefas cognitivas complexas, exigindo disciplinas em IA, teoria de sistemas de computação e matemática. Recomenda-se fazer o TCC no tema, mas não é obrigatório para o certificado.",
                'parent_group_id' => 1,
                'is_course_root' => false
            ],
            [
                'id' => 3,
                'title' => "Introdução à IA",
                'description' => "É necessário cursar 3 disciplinas deste bloco para conclusão da trilha.",
                'parent_group_id' => 2,
                'is_course_root' => false
            ],
            [
                'id' => 4,
                'title' => "Obrigatória da trilha",
                'description' => "",
                'parent_group_id' => 3,
                'is_course_root' => false
            ],
            [
                'id' => 5,
                'title' => "Sistemas",
                'description' => "É necessário cursar 2 disciplinas deste bloco para conclusão da trilha.",
                'parent_group_id' => 2,
                'is_course_root' => false
            ],
            [
                'id' => 6,
                'title' => "Teoria associada à IA",
                'description' => "É necessário cursar 1 disciplina deste bloco para conclusão da trilha.",
                'parent_group_id' => 2,
                'is_course_root' => false
            ],

            [
                'id' => 7,
                'title' => "Trilha de Sistemas de Software",
                'description' => "A trilha Sistemas de Software é voltada para alunos que desejem se especializar na área de desenvolvimento de software, expondo-os a teorias, técnicas, métodos e ferramentas modernas de desenvolvimento de software.
                Para se concluir essa trilha, o aluno precisa cursar no mínimo 7 disciplinas dentre as descritas abaixo.",
                'parent_group_id' => 1,
                'is_course_root' => false
            ],
            [
                'id' => 8,
                'title' => "Desenvolvimento de Software",
                'description' => "Cursar pelo menos 2 disciplinas deste módulo para conclusão da trilha.",
                'parent_group_id' => 7,
                'is_course_root' => false
            ],
            [
                'id' => 9,
                'title' => "Banco de Dados",
                'description' => "Cursar pelo menos 1 disciplina deste módulo para conclusão da trilha.",
                'parent_group_id' => 7,
                'is_course_root' => false
            ],
            [
                'id' => 10,
                'title' => "Sistemas Paralelos e Distribuídos",
                'description' => "Cursar pelo menos 2 disciplinas deste módulo para conclusão da trilha.",
                'parent_group_id' => 7,
                'is_course_root' => false
            ],

            [
                'id' => 11,
                'title' => "Trilha de Teoria da Computação",
                'description' => "A trilha é formada por disciplinas optativas eletivas em Algoritmos, Matemática Discreta e Otimização do Bacharelado em Ciência da Computação. O objetivo da trilha é orientar uma formação mais específica de estudantes com interesse em Teoria da Computação. Para receber um certificado de conclusão da trilha o estudante deve cursar pelo menos sete disciplinas da trilha sendo que dentre essas estão todas as disciplinas obrigatórias de pelo menos dois módulos.",
                'parent_group_id' => 1,
                'is_course_root' => false
            ],
            [
                'id' => 12,
                'title' => "Algoritmos",
                'description' => "Módulo de Algoritmos com disciplinas obrigatórias e optativas.",
                'parent_group_id' => 11,
                'is_course_root' => false
            ],
            [
                'id' => 13,
                'title' => "Obrigatórias de Algoritmos",
                'description' => "",
                'parent_group_id' => 12,
                'is_course_root' => false
            ],
            [
                'id' => 14,
                'title' => "Matemática Discreta",
                'description' => "Módulo de Matemática Discreta com disciplinas obrigatórias e optativas.",
                'parent_group_id' => 11,
                'is_course_root' => false
            ],
            [
                'id' => 15,
                'title' => "Obrigatórias de Matemática Discreta",
                'description' => "",
                'parent_group_id' => 14,
                'is_course_root' => false
            ],
            [
                'id' => 16,
                'title' => "Otimização",
                'description' => "Módulo de Otimização com disciplinas obrigatórias e optativas.",
                'parent_group_id' => 11,
                'is_course_root' => false
            ],
            [
                'id' => 17,
                'title' => "Obrigatórias de Otimização",
                'description' => "",
                'parent_group_id' => 16,
                'is_course_root' => false
            ],
            [
                'id' => 18,
                'title' => "Ciência de Dados",
                'description' => "O Brasil está na era digital, com 400 horas de vídeos por minuto no YouTube e 87 mil horas no Netflix. Há 300 milhões de dispositivos online, 41% das transações bancárias são digitais, levando a um investimento de R$ 20 bilhões em TI. A trilha de Ciência de Dados forma líderes em dados, requerendo aprovação em 7 disciplinas para certificação.",
                'parent_group_id' => 1,
                'is_course_root' => false
            ],
            [
                'id' => 19,
                'title' => "Disciplinas Obrigatórias",
                'description' => "",
                'parent_group_id' => 18,
                'is_course_root' => false
            ],
            [
                'id' => 20,
                'title' => "Núcleo",
                'description' => "É necessário cursar a disciplina deste bloco para conclusão da trilha.",
                'parent_group_id' => 19,
                'is_course_root' => false
            ],
            [
                'id' => 21,
                'title' => "Processamento de Sinais",
                'description' => "É necessário cursar pelo menos 1 disciplina deste bloco para conclusão da trilha.",
                'parent_group_id' => 19,
                'is_course_root' => false
            ],
            [
                'id' => 22,
                'title' => "Sistemas",
                'description' => "É necessário cursar pelo menos 1 disciplina deste bloco para conclusão da trilha.",
                'parent_group_id' => 19,
                'is_course_root' => false
            ],
            [
                'id' => 23,
                'title' => "Banco de Dados",
                'description' => "É necessário cursar pelo menos 1 disciplina deste bloco para conclusão da trilha.",
                'parent_group_id' => 19,
                'is_course_root' => false
            ],
            [
                'id' => 24,
                'title' => "Otimização",
                'description' => "É necessário cursar pelo menos 1 disciplina deste bloco para conclusão da trilha.",
                'parent_group_id' => 19,
                'is_course_root' => false
            ],
            [
                'id' => 25,
                'title' => "Probabilidade e Estatística",
                'description' => "É necessário cursar pelo menos 1 disciplina deste bloco para conclusão da trilha.",
                'parent_group_id' => 19,
                'is_course_root' => false
            ],
            [
                'id' => 26,
                'title' => "Áreas de Aplicação",
                'description' => "É recomendado cursar pelo menos 2 disciplinas deste bloco. Também são válidas as disciplinas das outras trilhas.",
                'parent_group_id' => 18,
                'is_course_root' => false
            ],
            [
                'id' => 27,
                'title' => "Outras Unidades",
                'description' => "É recomendado cursar disciplinas deste bloco.",
                'parent_group_id' => 18,
                'is_course_root' => false
            ],
            [
                'id' => 28,
                'title' => "Obrigatórias",
                'Description' => "Matérias obrigatórias da ciência da computação", 
                'parent_group_id' => 1,
                'is_course_root' => false
            ]
        ];

        foreach ($groups as $group) {
            Group::create($group);
        }
    }
}
