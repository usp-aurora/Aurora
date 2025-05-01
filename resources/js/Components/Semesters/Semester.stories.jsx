import Semester from "./Semester";
import { DragAndDropProvider } from "../Dnd/DragAndDropContext";

export default {
	title: "Semesters/Semester",
	component: Semester,

	parameters: {
		layout: "centered",
	},

	tags: ["autodocs"],

	argTypes: {
		semesterData: {
			description: "Dados do semestre. Um objeto com uma propriedade 'semesterID', que também representa o período e uma propriedade 'subjects', que é um array de objetos com as propriedades 'id', 'name', 'code', 'semester', 'subjectId' e 'credits' (credits é um objeto com workCredits e lectureCredits)",
			control: {
				type: 'object',
			},
		},
		isRequiredView: {
			description: "Indica se a visualização é obrigatória",
			control: {
				type: 'boolean',
			},
		},
	},

	decorators: [
		(Story) => (
			<DragAndDropProvider setSubjectMap={() => {}} setPlans={() => {}}>
				<Story />
			</DragAndDropProvider>
		),
	],
};

export const Default = {
	args: {
		semesterData: {
			semesterId: 1,
			subjects: [
				{
					id: 1,
					name: "Introduction to Computing",
					code: "MAC0101",
					semester: 1,
					subjectId: 101,
					credits: [4, 2],
				},
				{
					id: 2,
					name: "Calculus I",
					code: "MAT0101",
					semester: 1,
					subjectId: 102,
					credits: [4, 2],
				},
				{
					id: 3,
					name: "Linear Algebra I",
					code: "MAT0102",
					semester: 1,
					subjectId: 103,
					credits: [4, 2],
				},
			],
		},
		isRequiredView: false,
	},
};
