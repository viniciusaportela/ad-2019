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

  padding: 0.8rem;
  border-radius: 5px;
  margin: 0.7rem 0;
`;

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  state: [string, Dispatch<SetStateAction<string>>];
}

const Input: React.FC<InputProps> = ({ state, ...props }) => {
  const input = state[0];
  const setInput = state[1];

  const onInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setInput(ev.target.value);
  };

  return (
    <InputComponent
      {...props}
      value={input}
      onChange={onInputChange}
    ></InputComponent>
  );
};

export default Input;
