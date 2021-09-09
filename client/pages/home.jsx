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
    console.log(this.state.categories);
    const foodGenre = this.state.categories.map(element => {
      return (
      <div className="col-half" key={element.name}>
          <div className="space-evenly flex border-category col-75 genre-height">
          <h4>{element.name}</h4>
          <img className="icon" src={element.icon} alt={element.name} />
        </div>
      </div>
      );
    }
    );
    console.log('ahhhhh', foodGenre);
    return (
      <>
        <Header />
        <div className="container justify-center margin-top-20">
          <form>
            <input type="text" placeholder="Location" required></input>
            <div className="container categories flex justify-start">
              {foodGenre}
            </div>
          </form>
        </div>

        <div className="container categories flex justify-start">
          <div className="row justify-around">
            <button>test1</button>
            <button>test2</button>
          </div>
          <div className="row justify-around">
            <button>test3</button>
            <button>test4</button>
          </div>
        </div>
      </>
    );
  }
}
