import React from 'react';
import Header from '../components/header';
import ReactStars from 'react-rating-stars-component';
import { format } from 'date-fns';

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
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
          isLoading: false,
          reviews: comments,
          searchResults: restaurants
        });
        console.log('reviews:', comments);
        console.log('searchResults:', restaurants);
      });
  }

  render() {
    if (this.state.isLoading) return null;
    const timestamp = this.state.reviews[0].time_created;
    const date = new Date(timestamp);
    const dateFormated = format(date, 'MM/dd/yyyy');
    console.log(dateFormated);
    console.log(this.state.reviews[0].time_created);
    return (
      <>
        <Header />
        <div className="container search-results-container restrict-height margin-top-50">
          <div className="row">
            <div className="col-full flex justify-center">
              <h1>{this.state.searchResults.name}</h1>
            </div>
          </div>
          <div className="row justify-center">
            <div className="col-one-thirds flex center-all">
              <img className="details-image-size center-all" src={this.state.searchResults.image_url} />
            </div>
            <div className="col-two-thirds">
              <div className="row">
                <div className="col-two-thirds flex center-all margin-bottom-4">
                  <ReactStars size={30} value={this.state.searchResults.rating} edit={false} isHalf={true} />
                </div>
                <div className="col-one-thirds flex center-all">
                  <p className="font-adjust font-bold margin-r12">
                    {this.state.searchResults.review_count} Reviews
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-full flex center-all">
                  <p className="font-adjust font-bold">
                    {`${this.state.searchResults.location.display_address[0]} ${this.state.searchResults.location.display_address[1]}`}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-one-thirds flex center-all font-bold font-adjust">
                  {this.state.searchResults.price}
                </div>
                <div className="col-one-thirds flex center-all font-bold font-adjust-2">
                  {this.state.searchResults.display_phone}
                </div>
                <div className="col-one-thirds flex center-all">
                  <i className="far fa-heart"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-full">
              <h2 className="margin-left-15">Reviews</h2>
            </div>
          </div>
          <div className="row">
            <ul className="row justify-center">
              <li className="col-90">
                <div className="row">
                  <div className="col-one-thirds flex center-all">
                    <p>{this.state.reviews[0].user.name}</p>
                  </div>
                  <div className="col-one-thirds flex center-all">
                    <ReactStars size={15} value={this.state.reviews[0].rating} edit={false} isHalf={true} />
                  </div>
                  <div className="col-one-thirds flex center-all">
                    <p>{dateFormated}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}
