import React, { useEffect, useState } from "react";
import { lighten, linearGradient, transparentize } from "polished";
import styled from "styled-components";

import Card from "../../components/Card";
import Button from "../../components/Button";
import IconButton from "../../components/IconButton";
import Input from "../../components/Input";

import Sizings from "../../styles/sizings";
import Colors from "../../styles/colors";

import Gift from "../../assets/images/gift.png";
import Send from "../../assets/images/send.png";
import Plus from "../../assets/images/plus.png";
import Edit from "../../assets/images/edit.png";
import Delete from "../../assets/images/delete.png";

import UserService from "../../services/UserService";

/**
 * =================
 * Styled Components
 * =================
 */
const Container = styled.div``;

const Background = styled.div`
  width: 100%;
  height: 200px;
  padding: ${Sizings.PADDING_2};

  background-color: ${linearGradient({
    colorStops: [Colors.PRIMARY, lighten(0.05, Colors.PRIMARY)],
    toDirection: "to right",
  })};

  flex-direction: row;
`;

const BackgroundSquare = styled.div`
  border-radius: 15px;
  background-color: ${transparentize(0.7, Colors.LIGHT)};
  position: absolute;
  transform: rotate(45deg);
`;

const Logo = styled.img.attrs({ src: Gift })`
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

const LogoText = styled.span`
  margin-left: ${Sizings.MARGIN_2};
  color: ${Colors.LIGHT};

  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const MainCard = styled(Card)`
  align-self: center;
  z-index: 1;

  margin-top: -4rem;
  margin-bottom: 2rem;

  width: 90%;
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: ${Sizings.FONT_3};
  font-weight: 600;

  margin-right: auto;
`;

const Header = styled.div`
  flex-direction: row;
`;

const HeaderButton = styled(Button)`
  width: 40px;
  height: 40px;

  margin: 0 ${Sizings.MARGIN_1};
`;

const PeopleCount = styled.span`
  margin-bottom: ${Sizings.MARGIN_1};
`;

const InputContainer = styled.div`
  background-color: ${Colors.GRAY_1};

  border-radius: ${Sizings.BORDER_RADIUS};

  padding: ${Sizings.PADDING_2};
  margin-top: ${Sizings.MARGIN_1};
  margin-bottom: ${Sizings.MARGIN_3};
`;

const Line = styled.div<{ strip?: boolean }>`
  background-color: ${({ strip }) => (strip ? Colors.GRAY_1 : "transparent")};

  padding: ${Sizings.PADDING_1};

  flex-direction: row;
  align-items: center;
`;

const LineText = styled.span`
  margin-right: auto;
`;

const LineEdit = styled(IconButton).attrs({ withImage: Edit })``;

const LineDelete = styled(IconButton).attrs({ withImage: Delete })``;

const AddEditButton = styled(Button)`
  margin-top: ${Sizings.MARGIN_2};
  margin-left: auto;
  padding: ${Sizings.PADDING_2} ${Sizings.PADDING_5};
`;

const Row = styled.div`
  flex-direction: row;
`;

const Col = styled.div``;

const ColDivider = styled.div`
  width: 10px;
`;

const Label = styled.label``;

// =================================

function Main() {
  /**
   * People List State
   */
  const [people, setPeople] = useState<Person[]>([]);

  /**
   * States for Manipulating the View
   * for Edit and Create People
   */
  const [creatingEditing, setCreatingEditing] = useState(true);
  const [action, setAction] = useState<"create" | "edit" | undefined>();
  const [editingId, setEditingId] = useState<string | undefined>();

  /**
   * Inputs from Edit/Create View
   */
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  useEffect(() => {
    UserService.list()
      .then((people: Person[]) => setPeople(people))
      .catch((e: any) => {
        //alert("Erro ao carregar usuários");
      });
  }, []);

  const openCreateView = () => {
    setCreatingEditing(true);
    setAction("create");
  };

  const openEditView = (editingId: string) => {
    setCreatingEditing(true);
    setAction("edit");
    setEditingId(editingId);
  };

  const createPerson = () => {};

  const editPerson = () => {};

  const deletePerson = (id: string) => {};

  const sendToAll = () => {};

  return (
    <Container>
      <Background>
        <Logo />
        <LogoText>
          Amigo
          <br />
          Secreto
        </LogoText>

        <BackgroundSquare
          style={{ left: "1%", top: 70, width: 40, height: 40 }}
        />
        <BackgroundSquare
          style={{ left: "20%", top: 50, width: 80, height: 80 }}
        />
        <BackgroundSquare
          style={{ right: "10%", top: -10, width: 130, height: 130 }}
        />
        <BackgroundSquare
          style={{ right: "30%", top: 10, width: 90, height: 90 }}
        />
      </Background>
      <MainCard>
        <Header>
          <Title>Amigo Secreto</Title>
          <HeaderButton withImage={Send} imageSize="15px" onClick={sendToAll} />
          <HeaderButton
            withImage={Plus}
            imageSize="12px"
            onClick={openCreateView}
          />
        </Header>
        {creatingEditing && (
          <InputContainer>
            <Row>
              <Col style={{ flex: 1 }}>
                <Label htmlFor="name">Nome</Label>
                <Input state={[nameInput, setNameInput]} id="name" />
              </Col>
              <ColDivider />
              <Col style={{ flex: 1 }}>
                <Label htmlFor="email">Email</Label>
                <Input state={[emailInput, setNameInput]} id="email" />
              </Col>
            </Row>
            <AddEditButton
              onClick={action === "edit" ? () => editPerson() : createPerson}
            >
              {action === "edit" ? "Editar" : "Adicionar"}
            </AddEditButton>
          </InputContainer>
        )}

        <PeopleCount>{people.length} Pessoas</PeopleCount>
        <Line strip={true}>
          <LineText>Vinícius de Araújo Portela</LineText>
          <LineEdit />
          <LineDelete />
        </Line>
      </MainCard>
    </Container>
  );
}

export default Main;
