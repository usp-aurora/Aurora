import CourseInfo from './CourseInfo';
import { fn } from '@storybook/test';

export default {
	title: 'CourseInfo',
	component: CourseInfo,

	parameters: {
		layout: 'centered',
	},
	
	tags: ['autodocs'],
	
	args: {
		isOpen: true,
		onClose: fn(),
		title: "Título teste",
		code: "MAC0110",
		tags: {"name": "MAC0110", "color": "blue"},
		credits: {"lectureCredits": 2, "workCredits": 2},
		desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
};

export const Default = {
	args: {
		isOpen: true,
		onClose: fn(),
		title: "Introdução à Computação",
		code: "MAC0110",
		tags: [{"name": "MAC0110", "color": "blue"}, {"name": "MAC0110", "color": "blue"}],
		credits: {"lectureCredits": 2, "workCredits": 2},
		desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
	},
};