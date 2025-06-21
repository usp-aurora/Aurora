function applyRadialForce(positions, velocities, {
	radialLength = 350,
	radialStrength = 0.5,
}) {
	for(const [key1,pos1] of positions) {
		for(const [key2,pos2] of positions) {
			if(key1 < key2) {
				const x1 = pos1.x, y1 = pos1.y;
				const x2 = pos2.x, y2 = pos2.y;
				const hypot = Math.hypot(x2-x1,y2-y1);
				const cx = (hypot == 0 ? 0.5 : (x2-x1)/hypot);
				const cy = (hypot == 0 ? 0.5 : (y2-y1)/hypot);
				const speed = Math.min(hypot-radialLength,0)*radialStrength;
				const velocity1 = velocities.get(key1);
				const velocity2 = velocities.get(key2);
				velocity1.x += speed*cx;
				velocity1.y += speed*cy;
				velocity2.x -= speed*cx;
				velocity2.y -= speed*cy;
			}
		}
	}
}

function applyLinkForce(positions, velocities, links, vertical = false, { linkStrength = 1.5 }) {
	const axis = (vertical ? "x" : "y");
	for(const [key,link] of links) {
		const pos1 = positions.get(link.a), pos2 = positions.get(link.b);
		const dist = pos2[axis]-pos1[axis];
		const absDist = Math.abs(dist);
		const logFactor = absDist > 1 ? Math.log(absDist + 1) : absDist;
		const speed = Math.sign(dist) * logFactor * linkStrength;
		const velocity1 = velocities.get(link.a);
		const velocity2 = velocities.get(link.b);
		velocity1[axis] += speed;
		velocity2[axis] -= speed;
	}
}

function applyLayerForce(positions, velocities, layers, vertical = false, {
	layerStart = 0,
	layerSeparation = 350,
	layerStrength = 5,
}) {
	const axis = (vertical ? "y" : "x");
	for(const [key,pos] of positions) {
		const layerPos = layers.get(key)*layerSeparation+layerStart;
		const distance = layerPos-pos[axis];
		const speed = distance*layerStrength;
		const velocity = velocities.get(key);
		velocity[axis] += speed;
	}
}

export { applyRadialForce, applyLinkForce, applyLayerForce };