import { RotationMatrix } from "../methods/LinearMethods.mjs"
import { createIcosahedralSphere, getEdges } from "../methods/SphericalGraphMethods.mjs"
import { getIslandCountours } from "../methods/ContourMethods.mjs"
import { setSeed, randomHexColor, randomInt, randomFloat, randomFractalNoise } from "../methods/RandomMethods.mjs"

import IslandView from "./IslandView.mjs"

function fixLayer(layers, key, noises) {
	if(typeof(layers[key]) != "object")
		layers[key] = {}
	const layer = layers[key]
	if(layer["noise-strengths"] == undefined) {
		layer["noise-strengths"] = {}
		layer["noise-strengths"][key] = 1
	}
	for(const strengthKey in layer["noise-strengths"]) {
		if(typeof(layer["noise-strengths"][strengthKey]) != "number")
			layer["noise-strengths"][strengthKey] = 1
		if(noises[strengthKey] == undefined)
			noises[strengthKey] = {}
	}
	if(typeof(layer.span) == "number")
		layer.span = Math.min(Math.max(layer.span,0),1)
	else
		layer.span = 0.5
	if(typeof(layer.color) != "string")
		layer.color = "#555"
}

function fixNoise(noises, key, resolution) {
	if(typeof(noises[key]) != "object")
		noises[key] = {}
	const noise = noises[key]
	if(typeof(noise["seed-suffix"]) != "string") {
		if(typeof(noise["seed-suffix"]) == "number")
			noise["seed-suffix"] = noise["seed-suffix"].toString()
		else
			noise["seed-suffix"] = key + ""
	}
	if(typeof(noise["octave-strengths"]) != "object")
		noise["octave-strengths"] = Array(resolution).fill(1)
	let totalStrength = 0
	for(let strengthKey = 0; strengthKey < resolution; ++strengthKey) {
		const strength = noise["octave-strengths"][strengthKey]
		if(typeof(strength) != "number" || strength < 0)
			noise["octave-strengths"][strengthKey] = 0
		else
			totalStrength += strength
	}
	if(totalStrength == 0)
		noise["octave-strengths"][resolution-1] = 1
}

function fixTemplate(template) {
	if(typeof(template.seed) != "string") {
		if(typeof(template.seed) == "number")
			template.seed = template.seed.toString()
		else
			template.seed += Date.now().toString()
	}
	if(typeof(template.resolution) != "number")
		template.resolution = 2
	if(typeof(template.color) != "string")
		template.color = "#777"
	if(typeof(template.noises) != "object")
		template.noises = Object.create(null)
	if(typeof(template.layers) != "object")
		template.layers = []
	for(const key in template.layers)
		fixLayer(template.layers, key, template.noises)
	if(template.clouds != undefined) {
		if(typeof(template.clouds) != "object")
			template.clouds = {}
		fixLayer(template, "clouds", template.noises)
		if(typeof(template.clouds.height) != "number")
			template.clouds.height = 5
	}
	for(const key in template.noises)
		fixNoise(template.noises, key, template.resolution)
	if(template.atmosphere != undefined) {
		if(typeof(template.atmosphere) != "object")
			template.atmosphere = {}
		if(typeof(template.atmosphere.color) != "string")
			template.atmosphere.color = "#555"
		if(typeof(template.atmosphere.height) != "number")
			template.atmosphere.height = 5
	}
}

function blendNoises(noises, strengths) {
	let blend = undefined
	let totalStrength = 0
	for(const key in strengths)
		totalStrength += strengths[key]
	for(const key in strengths) {
		if(blend == undefined)
			blend = noises[key].map(a => a/totalStrength*strengths[key])
		else
			blend = blend.map((a,i) => a+noises[key][i]/totalStrength*strengths[key])
	}
	return blend
}

function instantiateLayer(
	layer,
	radius,
	noises,
	[positions, faces, adjacency],
) {
	const divergence = layer.divergence
	const span = layer.span
	const color = layer.color
	const noise = blendNoises(noises, layer["noise-strengths"])
	const contour = getIslandCountours(positions, faces, adjacency, noise, 1-span)
	return new IslandView(contour, color, radius)
}

function PlanetView(template = {}) {
	this.el = document.createElementNS("http://www.w3.org/2000/svg", "svg")
	this.el.setAttribute("viewBox", "-100 -100 200 200")
	this.el.setAttribute("preserveAspectRatio", "xMidYMid meet")

	this.setTemplate = function(template = {}) {
		const clouds = template.clouds
		const atmosphere = template.atmosphere
		const layers = template.layers
		const fullRadius = 100 + Math.max(atmosphere ? atmosphere.height : 0, clouds ? clouds.height : 0)
		const innerRadius = 100/fullRadius*100

		const graph = createIcosahedralSphere(template.resolution)
		const [positions, faces, adjacency, octaves, octaveLengths] = graph

		setSeed(template.seed)

		const noises = {}
		for(const noiseKey in template.noises) {
			const noiseTemplate = template.noises[noiseKey]
			noises[noiseKey] = randomFractalNoise(
				octaves,
				octaveLengths,
				noiseTemplate["octave-strengths"],
				template.seed + noiseTemplate["seed-suffix"],
			)
		}

		const layerInstances = []
		if(template.layers) {
			for(const layer of layers) {
				layerInstances.push(instantiateLayer(layer, innerRadius, noises, graph))
			}
		}

		this.el.innerHTML = ""

		const defsEl = document.createElementNS("http://www.w3.org/2000/svg", "defs")
		defsEl.innerHTML = `
			<radialGradient
				id="planet_shaddow_gradient"
				cx="0" cy="0" r="1"
				gradientUnits="userSpaceOnUse"
				gradientTransform="translate(-20 -20) rotate(60) scale(120)"
			>
				<stop stop-color="#0A1627" stop-opacity="0"/>
				<stop offset="0.6" stop-color="#0A1627" stop-opacity="0.1"/>
				<stop offset="1" stop-color="#0A1627" stop-opacity="0.7"/>
			</radialGradient>
			<radialGradient
				id="clouds_shaddow_gradient"
				cx="0" cy="0" r="1"
				gradientUnits="userSpaceOnUse"
				gradientTransform="translate(-30 -30) rotate(60) scale(130)"
			>
				<stop stop-color="#0A1627" stop-opacity="0"/>
				<stop offset="0.6" stop-color="#0A1627" stop-opacity="0.1"/>
				<stop offset="1" stop-color="#0A1627" stop-opacity="0.7"/>
			</radialGradient>
			<radialGradient
				id="diffraction_alpha"
				cx="0" cy="0" r="1"
				gradientUnits="userSpaceOnUse"
				gradientTransform="translate(-30 -30) rotate(60) scale(100 160)"
			>
				<stop stop-color="#FF0000"/>
				<stop offset="0.60" stop-color="#FF0000" stop-opacity="0.65"/>
				<stop offset="1" stop-color="#FF0000" stop-opacity="0"/>
			</radialGradient>
			<radialGradient
				id="diffraction_gradient"
				cx="0" cy="0" r="100"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#F6FFCF" stop-opacity="0.2"/>
				<stop offset="0.75" stop-color="#F6FFCF"/>
				<stop offset="0.9" stop-color="#F6FFCF" stop-opacity="0"/>
			</radialGradient>
		`
		this.el.appendChild(defsEl)

		const circleEl = document.createElementNS("http://www.w3.org/2000/svg", "circle")
		circleEl.setAttribute("cx", 0)
		circleEl.setAttribute("cy", 0)
		circleEl.setAttribute("r", innerRadius)
		circleEl.setAttribute("fill", template.color)
		circleEl.setAttribute("stroke", "none")
		this.el.appendChild(circleEl)

		for(const layerInstance of layerInstances) {
			this.el.appendChild(layerInstance.el)
			layerInstance.draw()
		}

		if(clouds) {
			const cloudsMaskEl = document.createElementNS("http://www.w3.org/2000/svg", "mask")
			cloudsMaskEl.setAttribute("id", "clouds_mask")
			cloudsMaskEl.setAttribute("maskUnits", "userSpaceOnUse")
			cloudsMaskEl.setAttribute("x", "-100")
			cloudsMaskEl.setAttribute("y", "-100")
			cloudsMaskEl.setAttribute("width", "200")
			cloudsMaskEl.setAttribute("height", "200")
			cloudsMaskEl.style.maskType = "alpha"
			this.el.appendChild(cloudsMaskEl)

			const cloudsRadius = (100+clouds.height)/fullRadius*100
			const cloudsLayerInstance = instantiateLayer(clouds, cloudsRadius, noises, graph)
			cloudsMaskEl.appendChild(cloudsLayerInstance.el)
			layerInstances.push(cloudsLayerInstance)
		}

		const overlayEl = document.createElementNS("http://www.w3.org/2000/svg", "g")
		overlayEl.innerHTML = `
			<circle cx="0" cy="0" r="${innerRadius}" fill="url(#planet_shaddow_gradient)"/>

			${clouds ? `
				<g mask="url(#clouds_mask)">
					<circle cx="0" cy="0" r="100" fill="${clouds.color}"/>
					<circle cx="0" cy="0" r="100" fill="url(#clouds_shaddow_gradient)"/>
				</g>
				`
				: ''
			}

			${atmosphere ? `
				<mask
					id="diffraction_mask"
					style="mask-type:alpha"
					maskUnits="userSpaceOnUse"
					x="-100" y="-100" width="200" height="200"
				>
					<circle cx="0" cy="0" r="100" fill="url(#diffraction_alpha)"/>
				</mask>

				<g mask="url(#diffraction_mask)">
					<circle
						cx="0" cy="0" r="100"
						opacity="0.41"
						fill="url(#diffraction_gradient)"
					/>
				</g>
				`
				: ''
			}
		`
		this.el.appendChild(overlayEl)

		this.setRotation = function(rotation) {
			for(const layerInstance of layerInstances) {
				layerInstance.draw(rotation)
			}
		}
	}

	fixTemplate(template)
	this.setTemplate(template)
}

export default PlanetView
