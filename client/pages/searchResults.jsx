import React from 'react';
import Home from './home';
import Header from '../components/header';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: []
    };
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'search') {
      return <SearchResults />;
    }
  }

  componentDidMount() {
    fetch(`/api/restaurants?category=${window.location.hash.substring(window.location.hash.indexOf('=') + 1, window.location.hash.indexOf('&'))}&location=${window.location.hash.substring(window.location.hash.lastIndexOf('=') + 1)}`)
      .then(response => response.json())
      .then(restaurants => {
        this.setState({ searchResults: restaurants });
        console.log(restaurants);
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
          <ul className="row justify-center">
        {
        this.state.searchResults.map(restaurant =>
            <li className="col-90" key={restaurant.id}>
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
                    <div className="col-thirds">{restaurant.rating}</div>
                    <div className="col-thirds">{restaurant.review_count} reviews</div>
                    <div className="col-thirds">{restaurant.price}</div>
                  </div>
                  <div className="row overflow">
                    {`${restaurant.location.display_address[0]} ${restaurant.location.display_address[1]}`}
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

// <ul>
//   <li>
//     <div className=
//     <div className="row">
//       Cluck Chicken
//     </div>
//     <div className="row">
//       <div className="col-thirds">*****</div>
//       <div className="col-thirds">361 reviews</div>
//       <div className="col-thirds">$$</div>
//     </div>
//     <div className="row">
//       17915 MacArthur Blvd Irvine, CA 92614
//     </div>
//   </li>
// </ul>
