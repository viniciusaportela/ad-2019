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
  ResponsiveRow,
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

  /**
   * Toggle the current create / edit view
   *
   * If it's not open, then open it as create view
   *
   * If it's already open, then close it
   *
   * *If it was open in edit mode, then clear the inputs*
   */
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

  /**
   * Start editing a person (set editingId and set inputs)
   *
   * @param editingPerson the person entity who is going to be edited
   */
  const openEditView = (editingPerson: Person) => {
    setAction("edit");
    setEditingId(editingPerson._id);

    setNameInput(editingPerson.name);
    setEmailInput(editingPerson.email);

    setCreatingEditing(true);
  };

  /**
   * Add a person to database
   *
   * Uses the `nameInput` and `emailInput`, and call savePerson
   */
  const addPerson = async () => {
    setLoading(true);

    const inserted = await savePerson("create", {
      name: nameInput,
      email: emailInput,
    });

    if (inserted) {
      setPeople((people) => [...people, inserted]);
      _clearInputs();
    }

    setLoading(false);
  };

  /**
   * Edit certain person data
   *
   * It gets the `editingId` state to determine who is being
   * edited
   */
  const editPerson = async () => {
    setLoading(true);

    const res = await savePerson("update", {
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

    setLoading(false);
  };

  /**
   * Save certain person data (create or edit)
   *
   * @param method - If it's creating or editing
   * @param input - `name`, `edit` and if is editing the `id` of
   * the person being edited
   */
  const savePerson = async (
    method: "create" | "update",
    input: {
      name: string;
      email: string;
      personId?: string;
    }
  ) => {
    if (!input.name.trim() || !input.email.trim()) return;

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

  /**
   * Delete a certain person from database
   *
   * @param id Person database ID
   */
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

  /**
   * Send a email to all registered people
   * with him secret friend
   */
  const sendToAll = async () => {
    try {
      await PersonService.sendToAll();

      setPeople([]);
      _clearInputs();
      _resetCreateEditState();
    } catch (err) {
      treatApiError(err, {
        apiError: ({ error }) => {
          if (error === ErrorCodes.INVALID_USERS_LENGTH) {
            alert("A quantidade de usuários deve ser maior que 2 e par");
          } else {
            alert("Erro interno");
          }
        },
        clientError: () => {
          alert("Erro ao enviar emails");
        },
      });
    }
  };

  /**
   * Clear all create / edit inputs
   */
  const _clearInputs = () => {
    setNameInput("");
    setEmailInput("");
  };

  /**
   * Reset all states that handle the create / edit view
   */
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
            <ResponsiveRow>
              <Col style={{ flex: 1 }}>
                <Label htmlFor="name">Nome</Label>
                <Input state={[nameInput, setNameInput]} id="name" />
              </Col>
              <ColDivider />
              <Col style={{ flex: 1 }}>
                <Label htmlFor="email">Email</Label>
                <Input state={[emailInput, setEmailInput]} id="email" />
              </Col>
            </ResponsiveRow>
            <AddEditButton
              disabled={loading}
              onClick={action === "edit" ? () => editPerson() : addPerson}
            >
              {action === "edit"
                ? loading
                  ? "Editando..."
                  : "Editar"
                : loading
                ? "Adicionando..."
                : "Adicionar"}
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
