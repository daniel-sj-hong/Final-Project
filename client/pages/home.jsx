import React from 'react';
import Header from './components/header';
import FoodButton from './components/buttons';
// import Submit from './components/submit';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selected: '',
      location: ''
    };
    this.highlighted = this.highlighted.bind(this);
    this.locationChange = this.locationChange.bind(this);
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

  locationChange() {
    this.setState({ location: event.target.value });
  }

  highlighted(target) {
    if (this.state.selected === target) {
      event.preventDefault();
      this.setState({ selected: '' });
    } else {
      event.preventDefault();
      this.setState({ selected: target });
    }
  }

  render() {
    const foodGenre = this.state.categories.map(element => <FoodButton key={element.name} name={element.name} icon={element.icon} state={this.state.selected} highlighted={this.highlighted} />);
    return (
      <>
        <Header />
        <form>
          <div className="container margin-top-20">
            <div className="row justify-center">
                <input onChange={this.locationChange} type="text" placeholder="Location" required></input>
            </div>
          </div>
          <div className="container categories flex">
            {foodGenre}
          </div>
          <div className="justify-center">
            <h1>ahh</h1>
          </div>
        </form>
      </>
    );
  }
}
