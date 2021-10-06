import React from 'react';
import Header from '../components/header';
import ReactStars from 'react-rating-stars-component';

export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      isModalOn: false,
      isLoading: true,
      random: null,
      rating: 0
    };
    this.toggleOn = this.toggleOn.bind(this);
    this.toggleOff = this.toggleOff.bind(this);
  }

  componentDidMount() {
    fetch('/api/favorites', {
    })
      .then(response => response.json())
      .then(result => {
        this.setState({ favorites: result, isLoading: false });
      });
  }

  toggleOn() {
    const random = Math.floor(Math.random() * this.state.favorites.length);
    this.setState({ isModalOn: true, random: this.state.favorites[random], rating: this.state.favorites[random].details.rating });
  }

  toggleOff() {
    this.setState({ isModalOn: false });
  }

  render() {
    if (this.state.isLoading) return null;
    if (this.state.favorites.length === 0) {
      return (
        <>
          <Header />
          <h3 className="align-center margin-top-50">No restaurants have been favorited</h3>
        </>
      );
    }

    let hideBG = '';
    let hideModal = '';
    if (!this.state.isModalOn) {
      hideBG = 'hidden';
      hideModal = 'hidden';
    }

    return (
      <>
        <Header />
        <div className="row justify-center">
          <h2 className="favorites-text">Favorites</h2>
        {this.state.random &&
        <>
          <div className={`modal-background absolute ${hideBG}`}></div>
          <div className={`modal-container absolute ${hideModal}`}>

            <h1>Eat here!</h1>
            <div className="row bubble-inside-modal">
              <div className="row padding-tb10">
                <div className="col-20 flex center-all">
                  <img className="image-size-adjust border-radius" src={this.state.random.details.image_url} alt={this.state.random.details.name} />
                </div>
                <div className="col-80 center-all">
                  <div className="row">
                    {this.state.random.details.name}
                  </div>
                  <div className="row">

                    <div className="col-one-thirds"><ReactStars key={this.state.random.favoritesId} value={this.state.rating} edit={false} isHalf={true} /></div>
                    <div className="col-one-thirds">{this.state.random.details.review_count} reviews</div>
                    <div className="col-one-thirds">{this.state.random.details.price}</div>
                  </div>
                  <div className="row overflow">
                    {`${this.state.random.details.location.address1}, ${this.state.random.details.location.city}, ${this.state.random.details.location.state} ${this.state.random.details.location.zip_code}`}
                  </div>
                </div>
              </div>
            </div>
            <div className="row close-button-row">
              <button onClick={this.toggleOff} className="close-button">Close</button>
            </div>

         </div>
            </>
            }
            </div>

        <div className="container search-results-container restrict-height">
          <ul className="row justify-center">
            {
              this.state.favorites.map(restaurant =>
                <li className="col-90" key={restaurant.details.id}>
                  <a href={`#details?alias=${restaurant.details.alias}`}>
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
                  </a>
                </li>
              )
            }
          </ul>
        </div>
        <div className="row justify-center">
          <button onClick={this.toggleOn} className="randomize-button">Randomize</button>
        </div>
      </>
    );
  }
}
