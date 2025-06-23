let state = [42, 73, 23, 19]

function cyrb128(str) {
	let h1 = 1779033703, h2 = 3144134277, h3 = 1013904242, h4 = 2773480762;
	for (let i = 0, k; i < str.length; i++) {
		k = str.charCodeAt(i);
		h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
		h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
		h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
		h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
	}
	h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
	h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
	h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
	h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
	h1 ^= (h2 ^ h3 ^ h4), h2 ^= h1, h3 ^= h1, h4 ^= h1;
	return [h1>>>0, h2>>>0, h3>>>0, h4>>>0];
}

function getRandomState() {
	return state.slice()
}

function setRandomState(newState) {
	state = newState
}

function setSeed(seed = "") {
	state = cyrb128(seed);
}

function mulbery32() {
	let t = state[0] += 0x6D2B79F5;
	t = Math.imul(t ^ t >>> 15, t | 1);
	t ^= t + Math.imul(t ^ t >>> 7, t | 61);
	return ((t ^ t >>> 14) >>> 0) / 4294967296;
}

function random() {
	return mulbery32()
}

function randomFloat(a=1, b=0) {
	return (b-a)*random()+a
}

function randomInt(a=2, b=0) {
	return Math.floor(randomFloat(a,b))
}

function randomHexColor() {
	const hex = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f']
	const r = randomInt(16)
	const g = randomInt(16)
	const b = randomInt(16)
	return `#${hex[r]}${hex[g]}${hex[b]}`
}

function randomNoise(positions, seed) {
	const randomState = getRandomState()
	setSeed(seed)
	const noise = positions.map(() => randomFloat(1))
	setRandomState(randomState)
	return noise
}

function randomFractalNoise(octaves, octaveLengths, octaveStrengths, seed) {
	const randomState = getRandomState()
	setSeed(seed)
	const noise = octaves.map(() => 0)
	const strengthSum = octaveStrengths.slice(0,octaveLengths.length+1).reduce((a,b) => a+b)
	for(let i = 0; i < octaveLengths.length; ++i) {
		const octaveNoise = Array(octaveLengths[i]).fill().map(() => randomFloat(1))
		const octaveStrength = octaveStrengths[i]/strengthSum/Math.pow(2,octaveLengths.length-i)
		for(let j = 0; j < octaves.length; ++j)
			for(const [k,factor] of octaves[j][i])
				noise[j] += octaveNoise[k]*octaveStrength*(factor+1)
	}
	const lastOctaveStrength = octaveStrengths[octaveStrengths.length-1]
	for(let j = 0; j < octaves.length; ++j)
		noise[j] += randomFloat(1)*lastOctaveStrength/strengthSum
	setRandomState(randomState)
	return noise
}

export {
	setRandomState,
	getRandomState,
	setSeed,
	random,
	randomFloat,
	randomInt,
	randomHexColor,
	randomNoise,
	randomFractalNoise,
}
