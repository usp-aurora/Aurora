import { styled } from "@mui/material";

const Link = styled("line")({
	stroke: "white",
	strokeWidth: "1px",
	filter: "url(#glow)",
});

function LinkView({x1=0,y1=0,x2=10,y2=10,r=80,scale=1}) {
	const scaledR = r * scale;
	const scaledStrokeWidth = scale;
	
	const hypot = Math.hypot(x2-x1,y2-y1);
	if(hypot < 2*scaledR) {
		return (<></>);
	}
	const cx = (x2-x1)/hypot;
	const cy = (y2-y1)/hypot;
	x1 += scaledR*cx;
	y1 += scaledR*cy;
	x2 -= scaledR*cx;
	y2 -= scaledR*cy;
	return (
		<Link
			x1={x1} y1={y1}
			x2={x2} y2={y2}
			style={{
				strokeWidth: `${scaledStrokeWidth}px`
			}}
		/>
	);
}

export default LinkView;