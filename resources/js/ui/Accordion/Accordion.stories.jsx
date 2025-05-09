import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "./Accordion";

/**
 * O accordion é um componente que permite expandir e contrair o conteúdo interno. 
 * Suas dimensões são completamente controladas pelo seu conteúdo em summary e children.
 * Caso você não defina expanded, o accordion se controlará sozinho. Entretanto, você pode utilizar um 
 * useState hook para controlá-lo manualmente.
 */
export default {
    title: "Atoms/Accordion",
    component: Accordion,

    parameters: {
        layout: "centered",
    },

    tags: ["autodocs"],

    argTypes: {
        children: {
            control: "object",
            description: "Define o conteúdo interno do accordion",
        },

        summary: {
            control: "object",
            description: "Define o que aparece no accordion fechado",
        },

        glassmorphismLevel: {
            control: "select",
      		options: ["level2", "level3"],
      		description: "Define o nível do glassmorphismo"
        },

		expanded: {
			control: "boolean", 
			description: "Define se o accordion está expandido ou não",
		},

        onClick: {
            control: "function",
            description: "Função executada ao clicar no accordion",
        },
    },
};

export const Default = {
    args: {
        children: (
            <Typography>
                Hello world :)
            </Typography>
        ),
        summary: (
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Typography>Lorem Ipsum</Typography>,
                <Typography>dolor sit amet</Typography>,
            </Box>
        ),
        glassmorphismLevel: "level2",
		expanded: true,
		onClick: () => {},
    },
};
