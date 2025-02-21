import { createTheme } from '@mui/material/styles';

let theme = createTheme({});

theme = createTheme({
    spacing: 8,
    palette: {
        // special colors have the palette generate automatically
        primary: {main: '#2A85CD'},
        error: {main: '#E83030'},
        neutral: {main: '#FFFFFF',
            secondary: '#FFFFFF'
        },
        white: {main: '#FFFFFF'},
        black: {main: '#000000'},   
        red: theme.palette.augmentColor ({
            color: {
                main: '#E83030',
            },
            name: 'red'
        }),
        yellow: theme.palette.augmentColor ({
            color: {
                main: '#FFD12B',
            },
            name: 'yellow'
        }),
        orange: theme.palette.augmentColor ({
            color: {
                main: '#ff9800',
            },
            name: 'orange'
        }),
        brown: theme.palette.augmentColor ({
            color: {
                main: '#8E7143',
            },
            name: 'brown'
        }),
        green: theme.palette.augmentColor ({
            color: {
                main: '#09DE5A',
            },
            name: 'green'
        }),
        cyan: theme.palette.augmentColor ({
            color: {
                main: '#15B48F',
            },
            name: 'cyan'
        }),
        purple: theme.palette.augmentColor ({
            color: {
                main: '#6762CD',
            },
            name: 'purple'
        }),
        pink: theme.palette.augmentColor ({
            color: {
                main: '#F73EF6',
            },
            name: 'pink'
        }),
        
    },

    typography: {
        fontFamily: 'Rubik, Arial, sans-serif',
        allVariants: {
            color: '#FFFFFF'
        },
        h1: {
            fontSize: '1.75rem',
            lineHeight: '2.5rem',
            fontWeight: 900,
        },
        h2: {
            fontSize: '1.5rem',
            lineHeight: '2.0rem',
            fontWeight: 700,
        },
        h3: {
            fontSize: '1.25rem',
            lineHeight: '2.0rem',
            fontWeight: 500,
        },
        h4: {
            fontSize: '1.0rem',
            lineHeight: '1.25rem',
            fontWeight: 500,
        },
        h5: {
            fontSize: '0.88rem',
            lineHeight: '1.0rem',
            fontWeight: 400,
        },
        p: {
            fontSize: '0.69rem',
            lineHeight: '1rem',
            fontWeight: 400,
        },
        small: {
            fontSize: '0.62rem',
            lineHeight: '0.88rem',
            fontWeight: 400,
        }

    },

    card: {
        mobile: {
            innerWidth: 104,
            innerHeight: 95,
            outerWidth: 104,
            outerHeight: 104, 
            borderRadius: 8,
            planetSize: 45,
            moonSize: 12,
        },
        desktop: {
            innerWidth: 128,
            innerHeight: 115,
            outerWidth: 128,
            outerHeight: 128,
            borderRadius: 12,
            planetSize: 55,
            moonSize: 15,
        }
    },

    glassmorphism: {
        level2: {
            backdropFilter: "blur(20)",
            color: "rgb(194, 220, 245, 0.2)",
            boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.089)',
            // light: {
            //     color: "#FFFFFF",
            //     boxShadow: 'none',
            // },
            // dark: {
            // }
        },

        level3: {
            backdropFilter: "blur(50)",
            color: "rgb(194, 220, 245, 0.2)",
            boxShadow: '3px 3px 3px rgba(0, 0, 0, 0.089)',
            // light: {
            //     color: "#FFFFFF",
            //     boxShadow: 'none',
            // },
            // dark: {
            // }
        }
    }
});

export default theme;