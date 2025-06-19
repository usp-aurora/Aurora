const glassmorphismStyle = (theme, level, performanceMode) => ({
	backgroundColor: theme.glassmorphism[level].color,
	boxShadow: theme.glassmorphism[level].boxShadow,

	...( !performanceMode && {
		backdropFilter: theme.glassmorphism[level].backdropFilter,
		WebkitBackdropFilter: theme.glassmorphism[level].backdropFilter,
	} ),

	borderLeft: `1px solid ${theme.glassmorphism[level].color}`,
	borderBottom: `1px solid ${theme.glassmorphism[level].color}`,
});

export default glassmorphismStyle;
