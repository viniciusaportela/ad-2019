import React, {
  ComponentPropsWithoutRef,
  Dispatch,
  SetStateAction,
} from "react";
import styled from "styled-components";
import Sizings from "../../styles/sizings";

const InputComponent = styled.input`
  outline: none;
  border: none;
  background-color: white;

  padding: ${Sizings.PADDING_2};
  border-radius: ${Sizings.BORDER_RADIUS};
  margin: ${Sizings.MARGIN_1} 0;
`;

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  state: [string, Dispatch<SetStateAction<string>>];
}

const Input: React.FC<InputProps> = ({ state, ...props }) => {
  return <InputComponent {...props}></InputComponent>;
};

export default Input;
