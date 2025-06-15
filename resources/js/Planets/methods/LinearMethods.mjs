/******************************************************************************************\
 
 Linear Methods
 Defines Vector and Rotation Matrix
 
\******************************************************************************************/

class Vector extends Array {
	constructor(...args) {
		super(...args)
	}

	scale(scalar) {
		return new Vector(...this.map(value => scalar*value))
	}

	combine(other, operation) {
		const result = new Vector()
		result.length = Math.max(this.length, other.length)
		for(let i=0; i<result.length; ++i) {
			result[i] = operation(
				(i<this.length ? this[i] : 0),
				(i<other.length ? other[i] : 0),
			)
		}
		return result
	}

	sum(other) {
		return this.combine(other, (a,b) => (a+b))
	}

	sub(other) {
		return this.combine(other, (a,b) => (a-b))
	}

	norm() {
		return Math.sqrt(this.reduce((current, value) => current + value*value, 0))
	}

	normalize() {
		const norm = this.norm()
		return norm == 0 ?
			new Vector(...this.map((value, idx) => idx == 0 ? 1 : 0)) :
			this.scale(1/norm)
	}
}

function RotationMatrix(...args) {
	const cos = args.map(angle => Math.cos(angle))
	const sin = args.map(angle => Math.sin(angle))
	const columns = [
		new Vector(cos[0]*cos[1], sin[0]*cos[1], -sin[1]),
		new Vector(
			cos[0]*sin[1]*sin[2] - sin[0]*cos[2],
			sin[0]*sin[1]*sin[2] + cos[0]*cos[2],
			cos[1]*sin[2],
		),
		new Vector(
			cos[0]*sin[1]*cos[2] + sin[0]*sin[2],
			sin[0]*sin[1]*cos[2] - cos[0]*sin[2],
			cos[1]*cos[2],
		),
	]
	this.multiply = (vector) => (
		columns[0]
			.scale(vector[0])
			.sum(columns[1].scale(vector[1]))
			.sum(columns[2].scale(vector[2]))
	)
} 

export { Vector, RotationMatrix }
