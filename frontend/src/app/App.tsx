import React, { useEffect, useState } from "react";

import Input from "../components/Input";

import Send from "../assets/images/send.png";
import Plus from "../assets/images/plus.png";

import PersonService from "../services/PersonService";
import { ErrorCodes } from "../constants/enums";

import isPair from "../utils/isPair";
import treatApiError from "../utils/treatApiError";
import {
  Container,
  Background,
  Logo,
  LogoText,
  BackgroundSquare,
  MainCard,
  Header,
  Title,
  HeaderButton,
  HeaderAddButton,
  InputContainer,
  Row,
  Col,
  Label,
  ColDivider,
  AddEditButton,
  PeopleCount,
  Line,
  LineText,
  LineEdit,
  LineDelete,
} from "./style";

function App() {
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
      .catch(() => {
        alert("Erro ao pegar lista de pessoas");
      });
  }, []);

  const toggleCreateView = () => {
    if (action === undefined) {
      setAction("create");
      setCreatingEditing(true);
    } else {
      if (action === "edit") {
        _clearInputs();
      }

      _resetCreateEditState();
    }
  };

  const openEditView = (editingPerson: Person) => {
    setAction("edit");
    setEditingId(editingPerson._id);

    setNameInput(editingPerson.name);
    setEmailInput(editingPerson.email);

    setCreatingEditing(true);
  };

  const addPerson = async () => {
    const inserted = await insertPerson("create", {
      name: nameInput,
      email: emailInput,
    });

    if (inserted) {
      setPeople((people) => [...people, inserted]);
      _clearInputs();
    }
  };

  const editPerson = async () => {
    const res = await insertPerson("update", {
      name: nameInput,
      email: emailInput,
      personId: editingId,
    });

    if (res !== false) {
      setPeople((people) =>
        people.map((person) => {
          if (person._id === editingId) {
            return { ...person, name: nameInput, email: emailInput };
          } else {
            return person;
          }
        })
      );

      _clearInputs();
      _resetCreateEditState();
    }
  };

  const insertPerson = async (
    method: "create" | "update",
    input: {
      name: string;
      email: string;
      personId?: string;
    }
  ) => {
    if (!nameInput.trim() || !emailInput.trim()) return;

    try {
      return await PersonService[method](
        ...[
          ...(input.personId ? [input.personId] : []),
          input.name,
          input.email,
        ]
      );
    } catch (err) {
      treatApiError(err, {
        apiError: ({ error }) => {
          switch (error) {
            case ErrorCodes.INVALID_EMAIL:
              alert("Email inválido");
              break;
            case ErrorCodes.ALREADY_EXISTS:
              alert("Esse email já foi cadastrado");
              break;
            default:
              alert("Erro no servidor ao criar");
          }
        },
        clientError: () => {
          alert("Erro ao criar");
        },
      });

      return false;
    }
  };

  const deletePerson = async (id: string) => {
    try {
      await PersonService.delete(id);
      setPeople((people) => people.filter((person) => person._id !== id));

      if (action === "edit" && editingId === id) {
        _clearInputs();
        _resetCreateEditState();
      }
    } catch (err) {
      alert("Erro ao deletar");
    }
  };

  const sendToAll = () => {};

  const _clearInputs = () => {
    setNameInput("");
    setEmailInput("");
  };

  const _resetCreateEditState = () => {
    setAction(undefined);
    setCreatingEditing(false);
    setEditingId(undefined);
  };

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
              onClick={action === "edit" ? () => editPerson() : addPerson}
            >
              {action === "edit" ? "Editar" : "Adicionar"}
            </AddEditButton>
          </InputContainer>
        )}

        <PeopleCount>{people.length} Pessoas</PeopleCount>
        {people.map((person, index) => (
          <Line strip={isPair(index)}>
            <LineText>{person.name}</LineText>
            <LineEdit onClick={() => openEditView(person)} />
            <LineDelete onClick={() => deletePerson(person._id)} />
          </Line>
        ))}
      </MainCard>
    </Container>
  );
}

export default App;
