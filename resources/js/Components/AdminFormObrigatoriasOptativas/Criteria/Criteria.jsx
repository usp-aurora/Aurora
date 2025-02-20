import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import CriteriaItem from "./CriteriaItem";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';

const Container = styled('div')({
    width: '824px',
});

const RemoveButton = styled(Button)({
    width: "40px",
    height: "40px",
    minWidth: "40px",
    minHeight: "40px",
    border: "none",
    backgroundColor: "transparent",
    color: "#757575",
    '& .MuiSvgIcon-root': {
        fontSize: '26px', 
    },
});

const AddButton = styled(Button)({
    width: "40px",
    height: "40px",
    minWidth: "40px",
    minHeight: "40px",
    border: "none",
    backgroundColor: "#2A85CD",
    color: "#FFFFFF",
    borderRadius: "8px",
    '& .MuiSvgIcon-root': {
        fontSize: '36px', 
    },
});


const Criteria = () => {

    const generateId = () => Date.now() + Math.random();

    const [criteria, setCriteria] = useState([
        { key: generateId(), quantity: "", type: "" }
    ]);

    const addCriteria = () => {
        setCriteria((prev) => [...prev, { key: generateId(), quantity: "", type: "" }]);
    };

    const removeCriteria = (keyToRemove) => {
        setCriteria((prev) => prev.filter((c) => c.key !== keyToRemove));
    };

    const updateCriteria = (key, field, value) => {
        setCriteria((prev) =>
            prev.map((c) => (c.key === key ? { ...c, [field]: value } : c))
        );
    };

    return (
        <Container>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CriteriaItem
                        quantity={criteria[0].quantity}
                        onChangeQuantity={(e) => updateCriteria(criteria[0].key, "quantity", e.target.value)}
                        type={criteria[0].type}
                        onChangeType={(event, newValue) => updateCriteria(criteria[0].key, "type", newValue)}
                    />
                    <AddButton onClick={addCriteria}>
                        <AddIcon />
                    </AddButton>
                </Box>
                {criteria.slice(1).map((c) => (
                    <Box key={c.key} sx={{ display: "flex", alignItems: "center" }}>
                        <CriteriaItem
                            quantity={c.quantity}
                            onChangeQuantity={(e) => updateCriteria(c.key, "quantity", e.target.value)}
                            type={c.type}
                            onChangeType={(event, newValue) => updateCriteria(c.key, "type", newValue)}
                        />
                        <RemoveButton variant="outlined" color="error" onClick={() => removeCriteria(c.key)}>
                            <CloseIcon />
                        </RemoveButton>
                    </Box>
                ))}
            </Box>
        </Container>
    );
};

export default Criteria;

