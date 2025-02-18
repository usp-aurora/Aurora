import React, { useState } from "react";
import { TextField, Button, Select, MenuItem, Autocomplete } from "@mui/material";

const listaDeDisciplinas = [
    { nome: "Disciplina 1" },
    { nome: "Disciplina 2" },
];

const FormularioTeste = () => {
    const [criterios, setCriterios] = useState([{ quantidade: "", tipo: "" }]);
    const [disciplinas, setDisciplinas] = useState([]);

    const adicionaCriterio = () => {
        setCriterios((prev) => [...prev, { quantidade: "", tipo: "" }]);
    };

    const removeCriterio = (index) => {
        setCriterios((prev) => prev.filter((_, i) => i !== index));
    };

    const atualizarCriterio = (index, campo, valor) => {
        setCriterios((prev) =>
            prev.map((c, i) => (i === index ? { ...c, [campo]: valor } : c))
        );
    };

    const adicionaDisciplina = (novaDisciplina) => {
        setDisciplinas((prev) => [...prev, novaDisciplina]);
    };
    
    
    const removeDisciplina = (index) => {
        setDisciplinas((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div>
            <h2>Critérios</h2>
            {criterios.map((criterio, index) => (
                <div key={index}>
                    <TextField
                        label="Quantidade"
                        type="number"
                        value={criterio.quantidade}
                        onChange={(e) => atualizarCriterio(index, "quantidade", e.target.value)}
                    />

                    <Select
                        value={criterio.tipo}
                        onChange={(e) => atualizarCriterio(index, "tipo", e.target.value)}
                    >
                        <MenuItem value="opcao1">Opção 1</MenuItem>
                        <MenuItem value="opcao2">Opção 2</MenuItem>
                    </Select>

                    <Button onClick={() => removeCriterio(index)}>Remover</Button>
                </div>
            ))}
            <Button onClick={adicionaCriterio}>Adicionar Critério</Button>

            <h2>Disciplinas</h2>
            <Autocomplete
                options={listaDeDisciplinas}
                getOptionLabel={(option) => option.nome}
                onChange={(event, novaDisciplina) => {
                    if (novaDisciplina) adicionaDisciplina(novaDisciplina);
                }}
                renderInput={(params) => <TextField {...params} label="Pesquisar disciplina" />}
            />

            {disciplinas.map((disciplina, index) => (
                <div key={index}>
                    <span>{disciplina.nome}</span>
                    <Button onClick={() => removeDisciplina(index)}>X</Button>
                </div>
            ))}
        </div>
    );
};

export default FormularioTeste;
 