import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFilter: '',
      placeholder: 'Have a question? Search for answers...'
    }
    this.handleChange =this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    if (e.target.value.length >= 3) {
      this.props.updateSearchFilter(e.target.value);
    }
    if (e.target.value.length < 3) {
      this.props.updateSearchFilter('');
    }
    this.setState({searchFilter: e.target.value});
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.value} onChange={this.handleChange} placeholder={this.state.placeholder} />
      </div>
    )
  }
}

export default SearchBar;

