import ProgressBar from './ProgressBar';

export default {
	title: 'Progress Bar',
	component: ProgressBar,

	parameters: {
		layout: 'centered',
	},
	
	tags: ['autodocs'],
	
	args: {
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
	},
};
