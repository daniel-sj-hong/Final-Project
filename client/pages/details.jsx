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
      .then(response => {
        // response.json().PromiseResult;
        console.log(response.json());
        console.log(response.json().PromiseResult);
      })
      .then(comments => {
        this.setState({ reviews: comments });
      });
  }

  render() {
    return (
      <>
        <Header />
      </>
    );
  }
}
