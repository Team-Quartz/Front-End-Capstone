import React from 'react';
import styled from 'styled-components';
import { FlexRow, TextButton } from '../sharedComponents.jsx';
import QuestionEntry from './QuestionEntry.jsx';
import QuestionModal from './QuestionModal.jsx';
import SuccessModal from './SuccessModal.jsx';
import utils from '../../Utils.js';
class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.productId,
      productName: this.props.productName,
      questions: [],
      questionPage: 1,
      areMoreQuestions: true,
      searchFilter: this.props.searchFilter,
      writeNewQuestion: false,
      showSuccess: false
    }
    this.showMoreQuestions = this.showMoreQuestions.bind(this);
    this.openQuestionModal = this.openQuestionModal.bind(this);
    this.openSuccessModal = this.openSuccessModal.bind(this);
    this.closeSuccessModal = this.closeSuccessModal.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
  }

  componentDidMount() {
    // if (this.props.questions === undefined) {
    //   this.setState({
    //     questions: {results: ['LOADING'] }
    //   })
    // }

    this.setState({
      questions: [],
    })
    this.renderQuestions();
    utils
      .fetchQuestions(this.props.productId, this.state.questionPage, 2)
      .then(questions => {
        questions.results.sort((firstQuestion, secondQuestion) => {
          return secondQuestion.question_helpfulness - firstQuestion.question_helpfulness;
        })
        this.setState({
          questions: questions.results,
        })
      })
      .catch(err => {err});
  }

  //TODO: make this function update productId when it changes and also get the new questions
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.productId !== this.props.productId) {
      this.renderQuestions();
      // console.log('NEW QUESTIONS: ', this.props.questions);
      // this.setState({
      //   questions: this.props.questions.results,
      //   productId: this.props.productId
      // })
      // utils.fetchQuestions(this.props.productId, this.state.questionPage, 2)
      //   .then(questions => {
      //     if (questions.length < 2) {
      //       this.setState({
      //         areMoreQuestions: false
      //       })
      //     }
      //     let newQuestions = this.state.questions.concat(questions.results);
      //     newQuestions.sort((firstQuestion, secondQuestion) => {
      //       return secondQuestion.question_helpfulness - firstQuestion.question_helpfulness;
      //     })
      //     this.setState({
      //       questions: newQuestions,
      //       productId: this.props.productId
      //     })
      //   })
      //   .catch(err => {err});
    } else if (prevState.questionPage !== this.state.questionPage) {
      this.renderQuestions()
    }
    // else if (prevState.questions !== this.state.questions) {
    //   this.setState({
    //     questions: questions.results,
    //   })
    // }
  }

  showMoreQuestions() {
    utils.fetchQuestions(this.props.productId, this.state.questionPage + 1, 2)
        .then(questions => {
          if (questions.results.length < 2) {
            this.setState({
              areMoreQuestions: false
            })
          }
          const newQuestions = this.state.questions.concat(questions.results);
          newQuestions.sort((firstQuestion, secondQuestion) => {
            return secondQuestion.question_helpfulness - firstQuestion.question_helpfulness;
          })
          this.setState({
            questions: newQuestions,
            productId: this.props.productId
          })
        })
        .catch(err => {err});
    this.setState((prevState, props) => ({ questionPage: prevState.questionPage + 1 }));
    this.renderQuestions();
  }

  openQuestionModal(open) {
    this.setState({
      writeNewQuestion: open,
    });
  }

  openSuccessModal(open) {
    this.setState({
      showSuccess: open,
    });
  }

  renderQuestions() {
    return this.state.questions.filter(question =>
      question.question_body.toLowerCase()
      .includes(this.props.searchFilter.toLowerCase())
    ).slice(0, this.state.questionPage * 2)
    .map((question, idx) => {
      return <QuestionEntry
      key={idx}
      productName={this.props.productName}
      question={question}
      success={() => this.openSuccessModal(true)}
      />
    })
  }

  closeSuccessModal() {
    this.openQuestionModal(false);
    this.openSuccessModal(false);
    this.renderQuestions();
  }

  render() {
    return (
      <div style={{ overflow: 'auto', maxHeight: '80vh' }}>
        { !this.state.questions
        ? <p>LOADING...</p>
        : this.renderQuestions()}
        {!this.state.questions ? null
        // : this.state.questions.length > this.state.questionPage * 2
        : this.state.areMoreQuestions
        ? <TextButton onClick={this.showMoreQuestions}>MORE ANSWERED QUESTIONS</TextButton>
        : null}
        <QuestionModal
          onClose={() => this.openQuestionModal(false)}
          success={() => this.openSuccessModal(true)}
          show={this.state.writeNewQuestion}
          productName={this.state.productName}
          productId={this.props.productId}
        />
        <SuccessModal
          onClose={() => this.openSuccessModal(false)}
          show={this.state.showSuccess}
        />
        <TextButton onClick={() => this.openQuestionModal(true)}>
          ADD A QUESTION ＋
        </TextButton>
      </div>
    )
  }
}

export default QuestionsList;

