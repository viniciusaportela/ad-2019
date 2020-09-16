import { lighten, linearGradient, transparentize } from "polished";
import styled from "styled-components";

import Card from "../components/Card";
import Button from "../components/Button";
import IconButton from "../components/IconButton";

import Colors from "../styles/colors";

import Gift from "../assets/images/gift.png";
import Edit from "../assets/images/edit.png";
import Delete from "../assets/images/delete.png";

export const Container = styled.div``;

export const Background = styled.div`
  width: 100%;
  height: 200px;
  padding: 1rem;

  background-color: ${linearGradient({
    colorStops: [Colors.PRIMARY, lighten(0.05, Colors.PRIMARY)],
    toDirection: "to right",
  })};

  flex-direction: row;
`;

export const BackgroundSquare = styled.div`
  border-radius: 15px;
  background-color: ${transparentize(0.7, Colors.LIGHT)};
  position: absolute;
  transform: rotate(45deg);
`;

export const Logo = styled.img.attrs({ src: Gift })`
  object-fit: contain;
  width: 35px;
  height: 35px;

  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

export const LogoText = styled.span`
  margin-left: 1rem;
  color: ${Colors.LIGHT};

  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

export const MainCard = styled(Card)`
  align-self: center;
  z-index: 1;

  margin-top: -4rem;
  margin-bottom: 2rem;

  width: 90%;
  max-width: 600px;
`;

export const Title = styled.h1`
  font-size: 1.3rem;
  font-weight: 600;

  margin-right: auto;
`;

export const Header = styled.div`
  flex-direction: row;
`;

export const HeaderButton = styled(Button)`
  width: 40px;
  height: 40px;

  margin: 0 0.3rem;
`;

export const HeaderAddButton = styled(HeaderButton).attrs(
  ({ close }: { close?: boolean }) => ({
    styleImage: {
      transform: `rotate(${close ? "45deg" : 0})`,
      transition: "transform 0.3s",
    },
  })
)<{ close?: boolean }>``;

export const PeopleCount = styled.span`
  margin-bottom: 1rem;
`;

export const InputContainer = styled.div`
  background-color: ${Colors.GRAY_1};

  border-radius: 5px;

  padding: 0.7rem;
  margin-top: 0.7rem;
  margin-bottom: 1.3rem;
`;

export const Line = styled.div<{ strip?: boolean }>`
  background-color: ${({ strip }) => (strip ? Colors.GRAY_1 : "transparent")};

  padding: 0.5rem;

  flex-direction: row;
  align-items: center;
`;

export const LineText = styled.span`
  margin-right: auto;
`;

export const LineEdit = styled(IconButton).attrs({ withImage: Edit })``;

export const LineDelete = styled(IconButton).attrs({ withImage: Delete })``;

export const AddEditButton = styled(Button)`
  margin-top: 0.2rem;
  margin-left: auto;
  padding: 0.7rem 2.5rem;
`;

export const ResponsiveRow = styled.div`
  flex-direction: row;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export const Col = styled.div``;

export const ColDivider = styled.div`
  width: 10px;
`;

export const Label = styled.label``;
