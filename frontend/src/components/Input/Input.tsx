import React, {
  ComponentPropsWithoutRef,
  Dispatch,
  SetStateAction,
} from "react";
import styled from "styled-components";

const InputComponent = styled.input`
  outline: none;
  border: none;
  background-color: white;

  padding: 1rem;
  border-radius: 5px;
  margin: 0.7rem 0;
`;

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  state: [string, Dispatch<SetStateAction<string>>];
}

const Input: React.FC<InputProps> = ({ state, ...props }) => {
  return <InputComponent {...props}></InputComponent>;
};

export default Input;
