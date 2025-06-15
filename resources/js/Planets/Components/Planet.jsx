import { Box } from '@mui/material';
import PlanetView from '../views/PlanetView.mjs';
import { useTheme } from '@mui/material/styles';


const baseTemplate = {
  "seed": "mac0110",
  "resolution": 3,
  "color": "#095C4D",
  "noises": {
    "a": {
      "seed-suffix": "a",
      "octave-strengths": [
        10,
        7,
        1
      ]
    },
    "b": {
      "octave-strengths": [
        1,
        7,
        90
      ],
      "seed-suffix": "b"
    },
    "clouds": {
      "octave-strengths": [
        1,
        1,
        3
      ],
      "seed-suffix": "clouds"
    }
  },
  "layers": [
    {
      "noise-strengths": {
        "a": 1,
        "b": 1
      },
      "span": 0.26,
      "color": "#15B48F"
    },
    {
      "noise-strengths": {
        "a": 1,
        "b": 1
      },
      "span": 0.12,
      "color": "#72E3C1"
    }
  ],
  "clouds": {
    "noise-strengths": {
      "clouds": 1
    },
    "span": 0.01,
    "color": "rgb(255, 255, 255)",
    "height": 10
  },
  "atmosphere": {
    "color": "rgb(255, 255, 255)",
    "height": 25
  }
}

function generatePlanet(seed, seaColor, landOuterColor, landInnerColor, cloudsColor, hasClouds) {
  const template = {
    ...baseTemplate,
    seed: seed || baseTemplate.seed,
    color: seaColor || baseTemplate.color,
    layers: [
      {
        ...baseTemplate.layers[0],
        color: landOuterColor || baseTemplate.layers[0].color
      },
      {
        ...baseTemplate.layers[1],
        color: landInnerColor || baseTemplate.layers[1].color
      }
    ],
    clouds: {
      ...baseTemplate.clouds,
      "noise-strengths": {
        clouds: hasClouds ? 1 : 0
      },
      color: cloudsColor || baseTemplate.clouds.color
    }

  };

	try {
		const planet = new PlanetView(template);

		if (!planet.el) {
			throw new Error('Failed to generate planet SVG element');
		}

		return planet.el.outerHTML;
	} catch (error) {
		console.error('Error generating planet:', error);
		throw new Error(`Planet generation failed: ${error.message}`);
	}
}

function Planet({ seed="default", color="blue" }) {
  const theme = useTheme();
  let colorPalette = theme.palette[color];
  let seaColor = colorPalette[900];
  let landOuterColor = colorPalette[600];
  let landInnerColor = colorPalette[300];

  const seedToValue = [200, 300, 400, 500];
  let value = seedToValue[Math.abs(seed.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)) % seedToValue.length];
  let cloudsColor = theme.palette["grey"][value];

  let hasClouds = ["green", "blue", "cyan"].includes(color);

	const planetSVG = generatePlanet(seed, seaColor, landOuterColor, landInnerColor, cloudsColor, hasClouds);

	return (
		<Box
			sx={{ width: "100%", height: "100%" }}
			dangerouslySetInnerHTML={{ __html: planetSVG }}
		/>
	);
}

export default Planet;