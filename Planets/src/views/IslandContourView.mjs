function IslandCountourView(color = "red", width = "1") {
	this.el = document.createElementNS("http://www.w3.org/2000/svg", "path")
	this.el.setAttribute("stroke", color)
	this.el.setAttribute("fill", "none")
	this.el.setAttribute("stroke-width", width)

	this.draw = (islands) => {
		this.el.setAttribute("d", islands.map(island => {
			const last = island[island.length-1]
			return `M ${last[0]} ${last[1]} ` + island.map(
				position => `L ${position[0]} ${position[1]}`
			).join(" ")
		}).join(" "))
	}
}

default export IslandCountourView
