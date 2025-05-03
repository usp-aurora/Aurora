/* Criteria is the form component for adding criteria. It combines the quantity, the selector, the text and their logic. */


import React, { useState } from "react";

import CriteriaItem from "./CriteriaItem";

import { Button, Box } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';


/* Styling of the remove button for the criteria */
const RemoveButton = styled(Button)({
    width: "40px",
    minWidth: "40px",
    height: "40px",
    minHeight: "40px",
    border: "none",
    backgroundColor: "transparent",
    color: "#757575",
    '& .MuiSvgIcon-root': {
        fontSize: '26px', 
    },
});


/* Styling of the add button for the criteria */
const AddButton = styled(Button)({
    width: "40px",
    minWidth: "40px",
    height: "40px",
    minHeight: "40px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#2A85CD",
    color: "#FFFFFF",
    '& .MuiSvgIcon-root': {
        fontSize: '36px', 
    },
});


/* Criteria component */
const Criteria = ({ tipo, onChange }) => {

    // State to manage the criteria ID
    const [idCounter, setIdCounter] = useState(0);

    // State to manage the selected criteria
    const [criteria, setCriteria] = useState([
        { key: idCounter, quantity: "", type: "" }
    ]);

    // Add a new criteria to the list
    const addCriteria = () => {
        setCriteria((prev) => {
            const updated = [...prev, { key: idCounter + 1, quantity: "", type: "" }];
            onChange?.(tipo, updated);
            return updated;
        });
        setIdCounter((prev) => prev + 1);
    };
    
    // Remove a criteria from the list
    const removeCriteria = (keyToRemove) => {
        setCriteria((prev) => {
            const updated = prev.filter((c) => c.key !== keyToRemove);
            onChange?.(tipo, updated);
            return updated;
        });
    };
    
    // Update a criteria in the list
    const updateCriteria = (key, field, value) => {
        setCriteria((prev) => {
            const updated = prev.map((c) =>
                c.key === key ? { ...c, [field]: value } : c
            );
            onChange?.(tipo, updated);
            return updated;
        });
    };
    
    return (

        <Box sx={{ width: "824px" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CriteriaItem
                        quantity={criteria[0].quantity}
                        onChangeQuantity={(e) => updateCriteria(criteria[0].key, "quantity", e.target.value)}
                        type={criteria[0].type}
                        onChangeType={(_, newValue) => updateCriteria(criteria[0].key, "type", newValue)}
                    />
                    <AddButton onClick={addCriteria}> <AddIcon /> </AddButton>
                </Box>
                {criteria.slice(1).map((c) => (
                    <Box key={c.key} sx={{ display: "flex", alignItems: "center" }}>
                        <CriteriaItem
                            quantity={c.quantity}
                            onChangeQuantity={(e) => updateCriteria(c.key, "quantity", e.target.value)}
                            type={c.type}
                            onChangeType={(_, newValue) => updateCriteria(c.key, "type", newValue)}
                        />
                        <RemoveButton variant="outlined" color="error" onClick={() => removeCriteria(c.key)}> <CloseIcon /> </RemoveButton>
                    </Box>
                ))}
            </Box>
        </Box>

    );
    
};

export default Criteria;

