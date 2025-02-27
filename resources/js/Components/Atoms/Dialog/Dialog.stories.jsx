import Dialog from './Dialog';
import { fn } from '@storybook/test';

import Typography from '@mui/material/Typography';
import Button from "../Buttons/Button";


export default {
	title: 'Atoms/Dialog',
	component: Dialog,

	parameters: {
		layout: 'centered',
	},

	tags: ['autodocs'],

	argTypes: {
		open: {
			control: 'boolean',
			description: 'Controla se o diálogo está aberto ou fechado.',
		},
		handleClose: {
			control: 'function',
			description: 'Função chamada ao fechar o diálogo.',
		},
		title: {
			control: 'text',
			description: 'Título exibido no cabeçalho do diálogo.',
		},
		content: {
			control: 'object',
			description: 'Conteúdo exibido no corpo do diálogo.',
		},
		actions: {
			control: 'object',
			description: 'Ações exibidas no rodapé do diálogo.',
		},
		withCloseButton: {
			control: 'boolean',
			description: 'Exibe ou oculta o botão de fechar no diálogo.',
		},
	},
};

export const Default = {
	args: {
		open: true,
		handleClose: fn,
		title: "Título teste",
		content: (<>
			<Typography>
				Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
				dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
				consectetur ac, vestibulum at eros.
			</Typography>
			<Typography>
				Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
				Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
			</Typography>
			<Typography>
				Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
				magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
				ullamcorper nulla non metus auctor fringilla.
			</Typography>
		</>),
		actions: (
			<>
				<Button>
					Save changes
				</Button>
			</>
		),
		withCloseButton: true,
	}
}

