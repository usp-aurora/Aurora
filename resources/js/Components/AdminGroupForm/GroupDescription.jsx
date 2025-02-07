import React from "react";
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

const Input = styled.input`
`;

export default function TextInputWithLabel({ label }) {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Input />
    </Wrapper>
    );
  };;
