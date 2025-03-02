import CompletionHeader from './CompletionHeader';

export default {
	title: 'SubjectPicker/Pieces/CompletionHeader',
	component: CompletionHeader,

	parameters: {
		layout: 'centered',
	},
	
	tags: ['autodocs'],
	
	argTypes: {
		title: {
			description: 'O título do cabeçalho de conclusão',
			control: 'text'
		},
		color: {
			description: "Cor do ícone de completude",
			control: "select",
			options: ["primary", "error", 'neutral', "white", "black", "red", "yellow", "orange", "brown", "green", "cyan", "purple", "pink"],
		},
		completed: {
			description: 'Status de conclusão',
			control: 'boolean'
		}
	}
};

export const Default = {
	args: {
		title: "Inteligência Artificial",
		color: "red",
		completed: false,
	},
};
