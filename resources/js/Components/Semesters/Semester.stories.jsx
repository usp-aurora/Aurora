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
			"semester": 1, 
			"courses": [
				{
				  id: 1,
				  title: "Introduction to Computing",
				  code: "MAC0101",
				  semester: 1,
				  subjectId: 101,
				  lectureCredits: 4,
				  workCredits: 2
				},
				{
				  id: 2,
				  title: "Calculus I",
				  code: "MAT0101",
				  semester: 1,
				  subjectId: 102,
				  lectureCredits: 4,
				  workCredits: 2
				},
				{
				  id: 3,
				  title: "Linear Algebra I",
				  code: "MAT0102",
				  semester: 1,
				  subjectId: 103,
				  lectureCredits: 4,
				  workCredits: 2
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
