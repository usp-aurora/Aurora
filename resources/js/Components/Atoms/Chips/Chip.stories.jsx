import Chip from './Chip';

export default {
	title: 'Chip',
	component: Chip,

	parameters: {
		layout: 'centered',
	},
	
	tags: ['autodocs'],
	
	args: {
		label: "Obrigatória",
		color: "primary"
	},
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

// export const OutlinedChip = {
// 	args: {
// 		label: "Chip Label",
// 		variant: "outlined"
// 	},
// };
