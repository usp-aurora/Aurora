import ProgressBar from './ProgressBar';

export default {
	title: 'CompletionBar/ProgressBar',
	component: ProgressBar,

	parameters: {
		layout: 'centered',
	},
	
	tags: ['autodocs'],
	
	argTypes: {
		label: {
			description: 'Rótulo para a barra de progresso',
			control: 'text',
		},
		coursed: {
			description: 'Quantidade de progresso concluído',
			control: 'number',
		},
		planned: {
			description: 'Quantidade de progresso planejado',
			control: 'number',
		},
		needed: {
			description: 'Quantidade total de progresso necessário',
			control: 'number',
		},
		color: {
			description: 'Cor da barra de progresso',
			control: "select",
			options: ["primary", "error", 'neutral', "white", "black", "red", "yellow", "orange", "brown", "green", "cyan", "purple", "pink"],
		},
	},

	args: {
		label: 'Exemplo',
		coursed: 50,
		planned: 75,
		needed: 100,
		color: 'pink'
	},

	decorators: [
		(Story) => (
			<div style={{ width: '80vw' }}>
				<Story />
			</div>
		),
	],
};

export const Default = {
	args: {
		label: 'Example',
		coursed: 50,
		planned: 75,
		needed: 100,
		color: 'green'
	},
};
