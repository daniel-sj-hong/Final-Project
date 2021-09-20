import React from 'react';
import Header from '../components/header';
import FoodButton from '../components/buttons';

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
    this.handleSearch = this.handleSearch.bind(this);
  }

  locationChange() {
    this.setState({ location: event.target.value });
  }

  highlighted(target) {
    if (this.state.selected === target) {
      this.setState({ selected: '' });
    } else {
      this.setState({ selected: target });
    }
  }

  handleSearch() {
    event.preventDefault();
    window.location.hash = `#search?category=${this.state.selected}&location=${this.state.location}`;
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

  render() {
    const foodGenre = this.state.categories.map(element => <FoodButton key={element.name} name={element.name} icon={element.icon} state={this.state.selected} highlighted={this.highlighted} />);
    return (
      <>
        <Header />
        <form onSubmit={this.handleSearch}>
          <div className="container margin-top-20">
            <div className="row justify-center">
              <input value={this.state.location} onChange={this.locationChange} type="text" placeholder="Location" className="location-input" required></input>
            </div>
          </div>
          <div className="container categories flex">
            {foodGenre}
          </div>
          <div className="row justify-center">
            <button type="submit" className="submit-button">Search</button>
          </div>
        </form>
      </>
    );
  }
}
