import React from 'react';
import Header from './components/header';
import FoodButton from './components/buttons';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selected: ''
    };
    this.highlighted = this.highlighted.bind(this);
  }

  componentDidMount() {
    fetch('/api/categories')
      .then(response => {
        return response.json();
      })
      .then(result => {
        this.setState({ categories: result }, () => {
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  highlighted(target) {
    if (this.state.selected === target) {
      this.setState({ selected: '' });
    } else {
      this.setState({ selected: target });
    }
  }

  render() {
    const foodGenre = this.state.categories.map(element => <FoodButton key={element.name} name={element.name} icon={element.icon} state={this.state.selected} highlighted={this.highlighted} />);
    return (
      <>
        <Header />
        <div className="container margin-top-20">
          <div className="row justify-center">
            <form>
              <input type="text" placeholder="Location" required></input>
            </form>
          </div>
        </div>
        <div className="container categories flex">
          {foodGenre}
        </div>
      </>
    );
  }
}
