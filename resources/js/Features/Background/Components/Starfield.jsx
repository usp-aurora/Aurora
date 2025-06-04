import { styled } from "@mui/material/styles";
import { useEffect, useRef, useMemo } from "react";

const Galaxy = styled("div")(({ themeMode }) => ({
	position: "fixed",
	background: themeMode === "dark"
		? "linear-gradient(180deg, #1A1B23, #192E47)"
		: "linear-gradient(150deg, rgba(150, 170, 230, 0.8), rgba(184, 224, 223, 0.8), rgba(224, 192, 242, 0.8))",

	zIndex: -1,
	width: "100vw",
	height: "100vh",
	overflow: "hidden",
	pointerEvents: "none",
}));

const StarsCanvas = styled("canvas")({
	position: "absolute",
	width: "100%",
	height: "100%",
	top: 0,
});

function calculateOpacity(index) {
	if (index % 13 === 0) return 0.25;
	if (index % 7 === 0) return 0.5;
	if (index % 3 === 0) return 0.75;
	return 1;
}

function drawStar(ctx, x, y, size, opacity) {
	if (size < 20) {
		drawSimpleStar(ctx, x, y, size, opacity);
		return;
	}
	const scale = size / 25;

	ctx.save();
	ctx.translate(x, y);
	ctx.scale(scale, scale);
	ctx.globalAlpha = opacity;

	ctx.beginPath();
	ctx.moveTo(12.7178, 16.7285);
	ctx.lineTo(11.6419, 13.8315);
	ctx.lineTo(8.73437, 12.7595);
	ctx.lineTo(11.6419, 11.6875);
	ctx.lineTo(12.7178, 8.79053);
	ctx.lineTo(13.7936, 11.6875);
	ctx.lineTo(16.7012, 12.7595);
	ctx.lineTo(13.7936, 13.8315);
	ctx.closePath();

	ctx.fillStyle = 'white';
	ctx.fill();
	ctx.restore();
}

function drawSimpleStar(ctx, x, y, size, opacity) {
	ctx.save();
	ctx.globalAlpha = opacity;
	ctx.fillStyle = 'white';
	ctx.beginPath();
	ctx.arc(x, y, size / 8, 0, Math.PI * 2);
	ctx.fill();
	ctx.restore();
}

function Starfield({ themeMode = "dark", twinkling = true, starCount = 250, ...props }) {
	const canvasRef = useRef(null);
	const animationRef = useRef(null);

	const stars = useMemo(() => {
		return Array.from({ length: starCount }).map((_, index) => ({
			x: Math.random(),
			y: Math.random(),
			size: (Math.random() + 0.1) * 25,
			baseOpacity: calculateOpacity(index),
			twinklePhase: Math.random() * Math.PI * 2,
			twinkleSpeed: 0.2 + Math.random() * 0.6,
		}));
	}, [starCount]);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		let startTime = performance.now();
		let lastFrameTime = 0;
		const targetFPS = 30;
		const frameInterval = 1000 / targetFPS;

		const resizeCanvas = () => {
			const rect = canvas.getBoundingClientRect();
			canvas.width = rect.width * window.devicePixelRatio;
			canvas.height = rect.height * window.devicePixelRatio;
			ctx.resetTransform();
			ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
		};

		const animate = (currentTime) => {
			if (!canvas) return;

			if (currentTime - lastFrameTime < frameInterval) {
				if (twinkling) {
					animationRef.current = requestAnimationFrame(animate);
				}
				return;
			}

			lastFrameTime = currentTime;
			const elapsed = (currentTime - startTime) / 1000;

			ctx.clearRect(0, 0, canvas.width, canvas.height);

			stars.forEach((star) => {
				const x = star.x * canvas.offsetWidth;
				const y = star.y * canvas.offsetHeight;

				let opacity = star.baseOpacity;

				if (twinkling) {
					const twinkleValue = Math.sin(elapsed * star.twinkleSpeed + star.twinklePhase);
					const twinkleFactor = (twinkleValue + 1) / 2;
					opacity = star.baseOpacity * (0.2 + 0.8 * twinkleFactor);
				}

				drawStar(ctx, x, y, star.size, opacity);
			});

			if (twinkling) {
				animationRef.current = requestAnimationFrame(animate);
			}
		};

		resizeCanvas();
		animate(performance.now());

		const handleResize = () => {
			resizeCanvas();
			if (!twinkling) {
				animate(performance.now());
			}
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [stars, twinkling]);

	return (
		<Galaxy themeMode={themeMode} {...props}>
			<StarsCanvas ref={canvasRef} />
		</Galaxy>
	);
}

export default Starfield;
