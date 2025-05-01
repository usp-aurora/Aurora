const coreCurriculum = Array.from({ length: 8 }, (_, i) => ({ semesterId: i + 1, subjects: [], suggestions: [] }));

coreCurriculum[0].subjects = [
	{
		code: "MAC0101",
		name: "Integração na Universidade e na Profissão",
		credits: [2, 0],
	},
	{
		code: "MAC0105",
		name: "Fundamentos de Matemática para a Computação",
		credits: [4, 0],
	},
	{
		code: "MAC0110",
		name: "Introdução à Computação",
		credits: [4, 0],
	},
	{
		code: "MAC0329",
		name: "Álgebra Booleana e Aplicações no Projeto de Arquitetura de Computadores",
		credits: [4, 0],
	},
	{
		code: "MAT2453",
		name: "Cálculo Diferencial e Integral I",
		credits: [6, 0],
	},
	{
		code: "MAT0112",
		name: "Vetores e Geometria",
		credits: [4, 0],
	}
];

coreCurriculum[1].subjects = [
	{
		code: "MAC0121",
		name: "Algoritmos e Estruturas de Dados I",
		credits: [4, 0],
	},
	{
		code: "MAC0216",
		name: "Técnicas de Programação I",
		credits: [4, 2],
	},
	{
		code: "MAC0239",
		name: "Introdução à Lógica e Verificação de Programas",
		credits: [4, 0],
	},
	{
		code: "MAE0119",
		name: "Introdução à Probabilidade e à Estatística",
		credits: [6, 0],
	},
	{
		code: "MAT2454",
		name: "Cálculo Diferencial e Integral II",
		credits: [4, 0],
	},
	{
		code: "MAT0122",
		name: "Álgebra Linear I",
		credits: [4, 0],
	}
];

coreCurriculum[2].subjects = [
	{
		code: "MAC0102",
		name: "Caminhos no Bacharelado em Ciência da Computação",
		credits: [2, 0],
	},
	{
		code: "MAC0209",
		name: "Modelagem e Simulação",
		credits: [4, 0],
	},
	{
		code: "MAC0210",
		name: "Laboratório de Métodos Numéricos",
		credits: [4, 0],
	},
	{
		code: "MAC0323",
		name: "Algoritmos e Estruturas de Dados II",
		credits: [4, 2],
	},
	{
		code: "MAT0236",
		name: "Funções Diferenciáveis e Séries",
		credits: [4, 0],
	}
];

coreCurriculum[3].subjects = [
	{
		code: "MAC0316",
		name: "Conceitos Fundamentais de Linguagens de Programação",
		credits: [4, 0],
	},
	{
		code: "MAC0338",
		name: "Análise de Algoritmos",
		credits: [4, 0],
	}
];

coreCurriculum[4].subjects = [
	{
		code: "MAC0350",
		name: "Introdução ao Desenvolvimento de Sistemas de Software",
		credits: [4, 2],
	},
	{
		code: "MAC0422",
		name: "Sistemas Operacionais",
		credits: [4, 2],
	}
];

coreCurriculum[6].subjects = [
	{
		code: "FLC0474",
		name: "Língua Portuguesa",
		credits: [3, 0],
	},
	{
		code: "MAC0499",
		name: "Trabalho de Formatura Supervisionado (2 semestres)",
		credits: [0, 16],
	}
];

coreCurriculum[7].subjects = [
	{
		code: "MAC0499",
		name: "Trabalho de Formatura Supervisionado (continuação)",
		credits: [0, 0],
	}
];

for (let i = 0; i < 6; i++) {
	coreCurriculum[5].suggestions.push({
		group: "Optativa Livre",
	});
}

export default coreCurriculum;