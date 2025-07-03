import Button from './Button';

export default {
	title: 'Atoms/Button',
	component: Button,

	parameters: {
		layout: 'centered',
	},
	
	tags: ['autodocs'],
	
	argTypes: {
		children: {
			control: "object",
			description: "Define o conteúdo interno do botão", 
		}, 
		variant: {
			control: "radio",
			options: ["contained", "contained-secondary", "outlined", "text"],
			description: "Define o tipo de botão",
		},
		size: {
			control: "radio",
			options: ["small", "medium", "large"],
			description: "Define o tamanho do botão",
		},
		color: {
			control: "select",
			options: ["blue", "red", 'neutral', "white", "black", "red", "yellow", "orange", "brown", "green", "cyan", "purple", "pink"],
			description: "Define a cor do botão",
		},
		disabled: {
			control: "boolean",
			description: "Define se o botão está desabilitado ou não",
		},	
        onClick: {
            control: "function",
            description: "Função executada ao clicar no botão",
        },
	},
};

export const Default = {
	args: {
		children: "Click me"
	},
};

export const Disabled = {
	args: {
		children: "Click me",
		disabled: true
	},
};


export const ErrorButton = {
	args: {
		children: "Click me",
		variant: "contained",
		color: "error"
	},
};

export const TextButton = {
	args: {
		children: "Click me",
		variant: "text"
	},
};