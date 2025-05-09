import Header from "./HeaderMobile";

export default {
	title: "Header/Mobile",
	component: Header,

	parameters: {
		layout: "centered",
	},

	tags: ["autodocs"],
	
	argTypes: {
		width: { 
			control: {
				type: "number",
				default: "300"
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
		width: '300px',
	},
};
