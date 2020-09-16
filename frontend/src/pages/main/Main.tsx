import React, { useEffect, useState } from "react";
import { lighten, linearGradient, transparentize } from "polished";
import styled from "styled-components";

import Card from "../../components/Card";
import Button from "../../components/Button";
import IconButton from "../../components/IconButton";
import Input from "../../components/Input";

import Colors from "../../styles/colors";

import Gift from "../../assets/images/gift.png";
import Send from "../../assets/images/send.png";
import Plus from "../../assets/images/plus.png";
import Edit from "../../assets/images/edit.png";
import Delete from "../../assets/images/delete.png";

import PersonService from "../../services/PersonService";

/**
 * =================
 * Styled Components
 * =================
 */
const Container = styled.div``;

const Background = styled.div`
  width: 100%;
  height: 200px;
  padding: 1rem;

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
  margin-left: 1rem;
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
  font-size: 1.3rem;
  font-weight: 600;

  margin-right: auto;
`;

const Header = styled.div`
  flex-direction: row;
`;

const HeaderButton = styled(Button)`
  width: 40px;
  height: 40px;

  margin: 0 0.3rem;
`;

const HeaderAddButton = styled(HeaderButton).attrs(
  ({ close }: { close?: boolean }) => ({
    styleImage: {
      transform: `rotate(${close ? "45deg" : 0})`,
      transition: "transform 0.3s",
    },
  })
)<{ close?: boolean }>``;

const PeopleCount = styled.span`
  margin-bottom: 1rem;
`;

const InputContainer = styled.div`
  background-color: ${Colors.GRAY_1};

  border-radius: 5px;

  padding: 0.7rem;
  margin-top: 0.7rem;
  margin-bottom: 1.3rem;
`;

const Line = styled.div<{ strip?: boolean }>`
  background-color: ${({ strip }) => (strip ? Colors.GRAY_1 : "transparent")};

  padding: 0.5rem;

  flex-direction: row;
  align-items: center;
`;

const LineText = styled.span`
  margin-right: auto;
`;

const LineEdit = styled(IconButton).attrs({ withImage: Edit })``;

const LineDelete = styled(IconButton).attrs({ withImage: Delete })``;

const AddEditButton = styled(Button)`
  margin-top: 0.2rem;
  margin-left: auto;
  padding: 0.7rem 2.5rem;
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
  const [creatingEditing, setCreatingEditing] = useState(false);
  const [action, setAction] = useState<"create" | "edit" | undefined>();
  const [editingId, setEditingId] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  /**
   * Inputs from Edit/Create View
   */
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  useEffect(() => {
    PersonService.list()
      .then((people: Person[]) => setPeople(people))
      .catch((e: any) => {
        //alert("Erro ao carregar usuários");
      });
  }, []);

  const toggleCreateView = () => {
    if (action === "create") {
      setAction(undefined);
      setCreatingEditing(false);
    } else {
      setAction("create");
      setCreatingEditing(true);
    }
  };

  const toggleEditView = (editingId: string) => {
    setAction(creatingEditing ? undefined : "edit");
    setEditingId(creatingEditing ? undefined : "edit");
    setCreatingEditing((lastState) => !lastState);
  };

  const createPerson = () => {
    PersonService.create(nameInput, emailInput)
      .then((insertedPerson: Person) => {
        setPeople((people) => [...people, insertedPerson]);
      })
      .catch((e) => {});
  };

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
          <HeaderAddButton
            withImage={Plus}
            imageSize="12px"
            onClick={toggleCreateView}
            close={creatingEditing}
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
                <Input state={[emailInput, setEmailInput]} id="email" />
              </Col>
            </Row>
            <AddEditButton
              disabled={loading}
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
