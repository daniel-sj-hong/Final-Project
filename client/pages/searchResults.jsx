import React from 'react';
import Header from '../components/header';
import ReactStars from 'react-rating-stars-component';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: []
    };
  }

  componentDidMount() {
    fetch(`/api/restaurants?${this.props.params.toString()}`, {
    })
      .then(response => response.json())
      .then(restaurants => {
        this.setState({ searchResults: restaurants });
      });
  }

  render() {

    return (
      <>
        <Header />
        <div className="row justify-center">
          <h2 className="search-result-text">Search Results</h2>
        </div>

        <div className="container search-results-container restrict-height">
          <div className={this.state.searchResults.length === 0 ? 'lds-ripple' : 'hidden'}><div></div><div></div></div>
          <ul className="row justify-center">
        {
        this.state.searchResults.map(restaurant =>
            <li className="col-90 cool-effect" key={restaurant.id}>
              <a href={`#details?alias=${restaurant.alias}`}>
              <div className="row padding-tb10">
                <div className="col-20 flex center-all">
                  <div className="flex center-all">
                    <img className="image-size-adjust border-radius" src={restaurant.image_url} />
                  </div>
                </div>
                <div className="col-80 center-all">
                  <div className="row">
                    {restaurant.name}
                  </div>
                  <div className="row">
                    <div className="col-one-thirds"><ReactStars value={restaurant.rating} edit={false} isHalf={true} /></div>
                    <div className="col-one-thirds">{restaurant.review_count} reviews</div>
                    <div className="col-one-thirds">{restaurant.price}</div>
                  </div>
                  <div className="row overflow">
                    {`${restaurant.location.address1}, ${restaurant.location.city}, ${restaurant.location.state} ${restaurant.location.zip_code}`}
                  </div>
                </div>
              </div>
              </a>
            </li>
        )
      }
        </ul>
      </div>
      </>
    );
  }
}
