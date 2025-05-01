import Chip from './Chip';

export default {
	title: 'Atoms/Chip',
	component: Chip,

	parameters: {
		layout: 'centered',
	},
	
	tags: ['autodocs'],
	
	argTypes: {
		label: {
			control: "string", 
			description: "Define o texto do chip",
		},
		color: {
			control: "select",
			options: ["primary", "error", 'neutral', "white", "black", "red", "yellow", "orange", "brown", "green", "cyan", "purple", "pink"],
			description: "Define a cor do chip",
		},
		variant: {
			control: "radio",
			options: ["contained", "outlined"],
			description: "Define o tipo de chip",
		},
	}
};

export const ChipDefault = {
	args: {
		label: "Obrigatória"
	},
};

export const ChipNeutro = {
	args: {
		label: "Obrigatória",
		color: "neutral"
	},
};

export const ChipColorido = {
	args: {
		label: "Obrigatória",
		color: "green"
	},
};