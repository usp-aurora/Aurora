import Semester from './Semester';

export default {
	title: 'Semester',
	component: Semester,

	parameters: {
		layout: 'centered',
	},
	
	tags: ['autodocs'],
	
	args: {
		semesterData: {
			"semesterId": 1, 
			"subjects": [
				{
				  name: "Introduction to Computing",
				  code: "MAC0101",
				  credits: [4, 2]
				},
				{
				  name: "Calculus I",
				  code: "MAT0101",
				  credits: [4, 2]
				},
				{
				  name: "Linear Algebra I",
				  code: "MAT0102",
				  credits: [4, 2]
				}
			  ]
		}
	},

	// decorators: [
	// 	(Story) => (
	// 		<div style={{ width: '80vw' }}>
	// 			<Story />
	// 		</div>
	// 	),
	// ],
};

export const Default = {
	args: {
	},
};
