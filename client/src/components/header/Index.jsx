import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const Container = styled.div`
  background-color: lightgrey;
  height: 70px;
  margin: 0px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 15px;
`;

const Title = styled.div`
  font-size: 30px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding-left: 5px;
`

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`
const SearchBar = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  width: 300px;
  margin-right: 2px;
  padding-right: 5px;

`;

const Icon = styled.div`
  position: absolute;
  right: 10px;
`

const Input = styled.input`
  border: none;
  height: 100%;
  width: 300px;
  padding-left: 10px;
  font-size: 20px;
`;

const Index = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Title>NAME OF OUR SITE</Title>
        </Left>
        <Right>
          <SearchBar>
            <Input placeholder="search..." />
            <Icon>
            <FaSearch/>
            </Icon>
          </SearchBar>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Index;
