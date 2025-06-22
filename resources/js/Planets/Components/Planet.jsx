import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PlanetView from '../views/PlanetView.mjs';
import { useSubjectMapContext } from '../../Contexts/SubjectMapContext';

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
    "height": 0
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

function Planet({ subjectCode }) {
  const { subjectDataMap } = useSubjectMapContext();
  const subjectData = subjectDataMap[subjectCode];
  const seed = subjectCode;
  let hasClouds = false;
  let colors = subjectData.groups.map(function(group){
    if(["green", "blue", "cyan"].includes(group.color)){
      hasClouds = true;
    }
    
    return group.color
  });

  if(colors.length <= 0){
    colors = ["grey"];
  }

  // Escolhendo cor para o planeta
  const c1 = colors[0 % colors.length];
  const c2 = colors[1 % colors.length];
  const c3 = colors[2 % colors.length];

  const theme = useTheme();
  const seaColor = theme.palette[c1][900];
  const landOuterColor = theme.palette[c2][600];
  const landInnerColor = theme.palette[c3][300];

  // Escolhendo cor para a nuvem
  const seedToValue = [200, 300, 400, 500];
  const value = seedToValue[Math.abs(seed.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)) % seedToValue.length];
  const cloudsColor = theme.palette["grey"][value];

	const planetSVG = generatePlanet(seed, seaColor, landOuterColor, landInnerColor, cloudsColor, hasClouds);

	return (
		<Box
			sx={{ width: "100%", height: "100%" }}
			dangerouslySetInnerHTML={{ __html: planetSVG }}
		/>
	);
}

export default Planet;