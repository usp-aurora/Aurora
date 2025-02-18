import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import CriteriaItem from "./CriteriaItem";
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

const RemoveButton = styled(Button)({
    width: "40px",
    height: "40px",
    border: "none",
    backgroundColor: "transparent",
    color: "#757575",
    // alterar tamanho do closeicon para bater distancia?
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {criteria.map((c) => (
                <Box key={c.key} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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

            <Button variant="contained" onClick={addCriteria}>
                Add
            </Button>
        </Box>
    );
};

export default Criteria;

// botão de adcionar
// arrumar negocio de seleção
