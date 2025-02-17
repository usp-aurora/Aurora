import ProgressBar from './ProgressBar';

export default {
	title: 'Progress Bar',
	component: ProgressBar,

	parameters: {
		layout: 'centered',
	},
	
	tags: ['autodocs'],
	
	args: {
		label: 'Example',
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
