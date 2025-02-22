import CourseInfo from './CourseInfo';
import { fn } from '@storybook/test';

export default {
	title: 'CourseInfo/CourseInfo',
	component: CourseInfo,

	parameters: {
		layout: 'centered',
	},
	
	tags: ['autodocs'],

	argTypes: {
		isOpen: {
			control: 'boolean',
			description: 'Define se o modal está aberto',
		},
		onClose: {
			control: 'function',
			description: 'Função chamada para fechar o modal',
		},
		name: {
			control: 'text',
			description: 'Nome do curso',
		},
		code: {
			control: 'text',
			description: 'Código do curso',
		},
		tags: {
			control: 'object',
			description: 'Tags associadas ao curso',
		},
		credits: {
			control: 'object',
			description: 'Créditos do curso',
		},
		desc: {
			control: 'text',
			description: 'Descrição do curso',
		},
	},
};

export const Default = {
	args: {
		isOpen: true,
		onClose: fn(),
		name: "Introdução à Computação",
		code: "MAC0110",
		tags: [{"name": "Obrigatória", "color": "blue"}, {"name": "Outra tag qualquer", "color": "blue"}],
		credits: [2, 2],
		desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
};