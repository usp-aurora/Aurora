import Button from './Button';
import { fn } from '@storybook/test';

export default {
	title: 'Atoms/Button',
	component: Button,

	parameters: {
		layout: 'centered',
	},
	
	tags: ['autodocs'],
	
	args: {
		children: "Click me",
		variant: "contained",
		size: "medium",
		color: "primary",
		disabled: false,
		onClick: fn() 
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