import { Box } from '@mui/material';
import PlanetView from '../views/PlanetView.mjs';

const baseTemplate = {
  "seed": "mac031212311231250",
  "resolution": 3,
  "color": "rgb(80,120,180)",
  "noises": {
    "a": {
      "seed-suffix": "noise A",
      "octave-strengths": [
        100,
        5,
        1
      ]
    },
    "b": {
      "octave-strengths": [
        1,
        5,
        20
      ],
      "seed-suffix": "b"
    },
    "clouds": {
      "octave-strengths": [
        2,
        1,
        5
      ],
      "seed-suffix": "clouds"
    }
  },
  "layers": [
    {
      "noise-strengths": {
        "a": 2,
        "b": 1
      },
      "span": 0.45,
      "color": "rgb(5, 219, 79)"
    },
    {
      "noise-strengths": {
        "a": 1,
        "b": 2
      },
      "span": 0.15,
      "color": "rgb(226, 60, 0)"
    }
  ],
  "clouds": {
    "noise-strengths": {
      "clouds": 1
    },
    "span": 0.3,
    "color": "rgb(39, 138, 0)",
    "height": 5
  },
  "atmosphere": {
    "color": "rgb(101, 255, 40)",
    "height": 18
  }
}

function generatePlanet(color, seed) {
	const template = {
		...baseTemplate,
		color: color || baseTemplate.color,
		seed: seed || baseTemplate.seed
	};

	console.log('Template being used:', template);
	console.log('Cloud configuration:', template.clouds);

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

function Planet({ dummy }) {
	let color = "rgb(242, 19, 194)";
	let seed = "mac0320";

	const planetSVG = generatePlanet(color, seed);

	return (
		<Box
			sx={{ width: "100%", height: "100%" }}
			dangerouslySetInnerHTML={{ __html: planetSVG }}
		/>
	);
}

export default Planet;