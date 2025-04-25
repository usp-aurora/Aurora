const clickEffect = {
    "&": {
        transform: "translateY(0)",
        transition: "transform 0.1s ease-in-out",
    },
    "&:active, &:focus": {
        transform: "translateY(-2px)", 
    },
};

export default clickEffect;
