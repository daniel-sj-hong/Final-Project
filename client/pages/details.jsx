import React from 'react';
import Header from '../components/header';
// import ReactStars from 'react-rating-stars-component';

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    };
  }

  componentDidMount() {
    fetch(`/api/reviews?${this.props.params.toString()}`)
      .then(response => response.json())
      .then(comments => {
        this.setState({ reviews: comments });
        console.log(comments);
      });
  }

  render() {
    return (
      <>
        <Header />
        <div className="container search-results-container restrict-height margin-top-50"></div>
      </>
    );
  }
}
