import styled from "@emotion/styled";

const NoteContainer = styled.div`
    border: 1px solid white;
    border-radius: 0.5rem;
    box-sizing: border-box;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: start;

    &:hover {
        border-image: linear-gradient(45deg, #ff7eb3, #ff758c, #ff7eb3) 1;
    }
`;

const Title = styled.p`
    font-weight: bold;
    color: white;
`;

const Date = styled.p`
    font-size: 0.9rem;
    color: grey;
`;

const Content = styled.p`
    text-align: start;
    color: white;
`;

function NoteItem() {
  return (
    <NoteContainer>
      <Title>Functional Component</Title>
      <Date>Kamis, 14 April 2022</Date>
      <Content>
        Function component is a React Component that is created by JavaScript Function. So that JavaScript function can
        be
        called a component when they return a React Element and call like a React Component.
      </Content>
    </NoteContainer>
  );
}

export default NoteItem;