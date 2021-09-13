import React from 'react';
import Home from './home';
import Header from '../components/header';

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {

    return (
      <>
        <Header />
        <div className="row justify-center">
          <h1>search page</h1>
        </div>
        <div className="container search-results-container">
          <div className="row">
            <ul className="row justify-center">
              <li className="col-90">
                <div className="row">
                  <div className="col-20 align-center flex center-all">
                    <div className="flex col-90 max-height-90 center-all ">
                      <img className="col-100 border-radius" src="../images/bawk.jpg" />
                    </div>
                  </div>
                  <div className="col-80">
                    <div className="row">
                      Cluck Chicken
                    </div>
                    <div className="row">
                      <div className="col-thirds">*****</div>
                      <div className="col-thirds">361 reviews</div>
                      <div className="col-thirds">$$</div>
                    </div>
                    <div className="row">
                      17915 MacArthur Blvd Irvine, CA 92614
                    </div>
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
