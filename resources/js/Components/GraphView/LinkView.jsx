import { styled } from "@mui/material";

const Link = styled("line")({
	stroke: "white",
	strokeWidth: "1px",
	filter: "url(#glow)",
});

function LinkView({x1=0,y1=0,x2=10,y2=10,r=80}) {
	const hypot = Math.hypot(x2-x1,y2-y1);
	if(hypot < 2*r) {
		return (<></>);
	}
	const cx = (x2-x1)/hypot;
	const cy = (y2-y1)/hypot;
	x1 += r*cx;
	y1 += r*cy;
	x2 -= r*cx;
	y2 -= r*cy;
	return (
		<Link
			x1={String(x1)} y1={String(y1)}
			x2={String(x2)} y2={String(y2)}
		/>
	);
}

export default LinkView;
