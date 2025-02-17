import CompletionHeader from './CompletionHeader';

export default {
	title: 'CompletionHeader',
	component: CompletionHeader,

	parameters: {
		layout: 'centered',
	},
	
	tags: ['autodocs'],
	
	args: {
		title: "Inteligência Artificial",
		metrics: [
			{
				name: "disciplinas", 
				value: "10",
				total: "50"
			},
			{
				name: "blocos", 
				value: "9",
				total: "10"
			}
		],
		color: "red",
		completed: false,
		open: true
	},
};

export const Default = {
	args: {
	},
};
