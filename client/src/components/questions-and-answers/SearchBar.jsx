import React from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const Container = styled.div`
  background-color: white;
  height: 40px;
  border: 1px solid grey;
  margin: 0 0px;
  padding-right: -150px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 15px;
  position: relative;
`;

const SearchField = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  width: 100%;
  margin-right: -50px;
  position: absolute;
  top: 0;
`;

const Icon = styled.div`
  position: absolute;
  right: 75px;
`;

const Input = styled.input`
  border: none;
  height: 100%;
  width: 100%;
  padding-left: 10px;
  margin-right: -150px;
  font-size: 13px;
  font-weight: bold;
`;

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFilter: '',
      placeholder: 'HAVE A QUESTION? SEARCH FOR ANSWERS...',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    if (e.target.value.length >= 3) {
      this.props.updateSearchFilter(e.target.value);
    }
    if (e.target.value.length < 3) {
      this.props.updateSearchFilter('');
    }
    this.setState({ searchFilter: e.target.value });
  }

  render() {
    return (
      <Container>
        <Wrapper>
          <SearchField>
            <Input
              type='text'
              value={this.state.value}
              onChange={this.handleChange}
              placeholder={this.state.placeholder}
            />
            <Icon>
              <FaSearch />
            </Icon>
          </SearchField>
        </Wrapper>
      </Container>
    );
  }
}

export default SearchBar;
