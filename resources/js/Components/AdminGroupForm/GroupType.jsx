import styled from "styled-components";


const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Label = styled.label`
    font-size: 16px;
    color: #333;
`;

const Select = styled.select`
`;

export default function GroupType({ label, options }) {
    return (
        <Wrapper>
            <Label>{label}</Label>
            <Select>
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                {option.label}
                </option>
            ))}
            </Select>
        </Wrapper>
    );
}