import Header from "./HeaderDesktop";

export default {
	title: "Header/Desktop",
	component: Header,

	parameters: {
		layout: "centered",
	},

	tags: ["autodocs"],
	
	argTypes: {
		width: { 
			control: {
				type: "number",
				default: "900"
			}
		}
	},

	decorators: [
		(Story, context) => (
			<div style={{ width: context.args.width }}>
				<Story />
			</div>
		),
	],
};

export const Default = {
	args: {
		width: '900px',
	},
};
