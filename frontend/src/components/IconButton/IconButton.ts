import { darken } from "polished";
import styled from "styled-components";
import Button from "../Button";

const IconButton = styled(Button).attrs({ imageSize: "15px" })`
  background-color: transparent;
  width: 36px;
  height: 36px;
  border-radius: 20px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

export default IconButton;
