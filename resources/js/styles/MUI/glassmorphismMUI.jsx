const glassmorphismStyle = (theme) => ({
	background: theme.glassmorphism.level2.color,
	boxShadow: theme.glassmorphism.level2.boxShadow,
	backdropFilter: theme.glassmorphism.level2.backdropFilter,
	WebkitBackdropFilter: theme.glassmorphism.level2.backdropFilter,

	borderLeft: `1px solid ${theme.glassmorphism.level2.color}`,
	borderBottom: `1px solid ${theme.glassmorphism.level2.color}`,
});

export default glassmorphismStyle;
