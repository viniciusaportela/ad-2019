import React, { ComponentPropsWithoutRef } from "react";
import { darken, lighten } from "polished";
import styled from "styled-components";

import Colors from "../../styles/colors";

const ButtonComponent = styled.button`
  background-color: ${Colors.PRIMARY};
  color: ${Colors.LIGHT};
  border: none;
  outline: none;
  cursor: pointer;

  width: min-content;
  height: min-content;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1rem;
  border-radius: 5px;

  &:hover {
    background-color: ${lighten(0.06, Colors.PRIMARY)};
  }

  &:active {
    background-color: ${lighten(0.2, Colors.PRIMARY)};
  }

  &disabled {
    background-color: ${darken(0.1, Colors.PRIMARY)};
  }
`;

const ButtonImage = styled.img<{ size: string }>`
  object-fit: contain;
  width: ${({ size }) => size};
  height: ${({ size }) => size};

  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const DEFAULT_IMAGE_SIZE = "20px";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  withImage?: string;
  imageSize?: string;
  styleImage?: Object;
}

const Button: React.FC<ButtonProps> = ({
  withImage,
  imageSize,
  children,
  styleImage,
  ...props
}) => {
  return (
    <ButtonComponent {...props}>
      {withImage && (
        <ButtonImage
          style={styleImage}
          src={withImage}
          size={imageSize || DEFAULT_IMAGE_SIZE}
        />
      )}
      {children}
    </ButtonComponent>
  );
};

export default Button;
