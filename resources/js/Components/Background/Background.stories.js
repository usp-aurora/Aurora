import Starfield from "./Starfield";

export default {
	title: "Background/Starfield",
	component: Starfield,

	parameters: {
		layout: 'fullscreen',
	},

	tags: ["autodocs"],
  	
	argTypes: {
    	themeMode: {
      		control: "radio",
      		options: ["light", "dark"],
      		description: "Define o tema do fundo",
      		table: { type: { summary: "string" } },
    	},

    	twinkling: {
      		control: "boolean",
      		description: "Ativa ou desativa o efeito de piscar das estrelas",
      		table: { type: { summary: "boolean" } },
    	},

    	starCount: {
      		control: { type: "number", min: 0, max: 500, step: 25 },
      		description: "Quantidade de estrelas no fundo",
      		table: { type: { summary: "number" } },
    	},
  	},
};

export const Default = {
	args: {
    	themeMode: "dark",
    	twinkling: true,
    	starCount: 125,
  	},
};
