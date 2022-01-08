import React from 'react';
import styled from 'styled-components';
import QuestionsList from './QuestionsList.jsx';
import SearchBar from './SearchBar.jsx';
import utils from '../../Utils.js';
import { Title } from '../sharedComponents.jsx';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.productId,
      searchFilter: '',
    };
    this.updateSearchFilter = this.updateSearchFilter.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.productId !== this.props.productId) {
      this.setState({
        productId: this.props.productId,
      });
    }
  }

  updateSearchFilter(query) {
    this.setState({ searchFilter: query });
  }

  render() {
    return (
      <div>
        <Title>QUESTIONS &amp; ANSWERS</Title>
        <SearchBar updateSearchFilter={this.updateSearchFilter} />
        <QuestionsList
          productId={this.state.productId}
          productName={this.props.productName}
          searchFilter={this.state.searchFilter}
        />
      </div>
    );
  }
}

export default QuestionsAndAnswers;
