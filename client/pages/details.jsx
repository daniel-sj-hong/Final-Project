import React from 'react';
import Header from '../components/header';
// import ReactStars from 'react-rating-stars-component';

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      searchResults: []
    };
  }

  componentDidMount() {
    Promise.all([
      fetch(`/api/reviews?${this.props.params.toString()}`).then(response => response.json()),
      fetch(`/api/business?${this.props.params.toString()}`).then(response => response.json())
    ])
      .then(([comments, restaurants]) => {
        this.setState({
          reviews: comments,
          searchResults: restaurants
        });
        console.log('reviews:', comments);
        console.log('searchResults:', restaurants);
      });
  }

  render() {
    return (
      <>
        <Header />
        <div className="container search-results-container restrict-height margin-top-50">
          <div className="row">
            <div className="col-full flex justify-center">
              <h1>{this.state.searchResults.name}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-one-third">
            </div>
          </div>
        </div>
      </>
    );
  }
}
