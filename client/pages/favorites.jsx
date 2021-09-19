import React from 'react';
import Header from '../components/header';
import ReactStars from 'react-rating-stars-component';

export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: []
    };
  }

  componentDidMount() {
    fetch('/api/favorites', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        this.setState({ favorites: result });
      });
  }

  render() {
    return (
      <>
        <Header />
        <div className="row justify-center">
          <h2 className="favorites-text">Favorites</h2>
        </div>

        <div className="container search-results-container restrict-height">
          <ul className="row justify-center">
            {
              this.state.favorites.map(restaurant =>
                <li className="col-90 cool-effect" key={restaurant.details.id}>
                  <div className="row padding-tb10">
                    <div className="col-20 flex center-all">
                      <div className="flex center-all">
                        <img className="image-size-adjust border-radius" src={restaurant.details.image_url} />
                      </div>
                    </div>
                    <div className="col-80 center-all">
                      <div className="row">
                        {restaurant.details.name}
                      </div>
                      <div className="row">
                        <div className="col-one-thirds"><ReactStars value={restaurant.details.rating} edit={false} isHalf={true} /></div>
                        <div className="col-one-thirds">{restaurant.details.review_count} reviews</div>
                        <div className="col-one-thirds">{restaurant.details.price}</div>
                      </div>
                      <div className="row overflow">
                        {`${restaurant.details.location.address1}, ${restaurant.details.location.city}, ${restaurant.details.location.state} ${restaurant.details.location.zip_code}`}
                      </div>
                    </div>
                  </div>
                </li>
              )
            }
          </ul>
        </div>
      </>
    );
  }
}
