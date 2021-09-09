import React from 'react';
import Header from './components/header';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    fetch('/api/categories')
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(result => {
        this.setState({ categories: result }, () => {
          console.log(this.state.categories);
        });
        console.log(result);
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const foodGenre = this.state.categories.map(element => {
      return (
        <div className="col-half" key={element.name}>
          <div className="row center-all">
            <div className="height-and-width">
              <button key={element.name} type="radio" className="border-category">
                <div className="row center-all">
                  <div className="col-half">
                    <h3 className="remove-margin">{element.name}</h3>
                  </div>
                  <div className="col-half">
                    <div className="row row-reverse">
                      <img src={element.icon} className="height-category" />
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      );
    }
    );
    return (
      <>
        <Header />
        <div className="container margin-top-20">
          <div className="row">
            <form className="justify-center">
              <input type="text" placeholder="Location" required></input>
            </form>
          </div>
        </div>
        <div className="container categories flex justify-start">
          <div className="row-column margin-tb2">
            <div className="row">
              {[foodGenre[0], foodGenre[7]]}
            </div>
            <div className="row">
              {[foodGenre[1], foodGenre[8]]}
            </div>
            <div className="row">
              {[foodGenre[2], foodGenre[9]]}
            </div>
            <div className="row">
              {[foodGenre[3], foodGenre[10]]}
            </div>
            <div className="row">
              {[foodGenre[4], foodGenre[11]]}
            </div>
            <div className="row">
              {[foodGenre[5], foodGenre[12]]}
            </div>
            <div className="row">
              {[foodGenre[6], foodGenre[13]]}
            </div>
          </div>
        </div>

        {/* <div className="container categories flex justify-start">
          <div className="row justify-around">
            <button>test1</button>
            <button>test2</button>
          </div>
          <div className="row justify-around">
            <button>test3</button>
            <button>test4</button>
          </div>
        </div> */}
      </>
    );
  }
}
