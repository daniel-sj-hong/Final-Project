import React from 'react';
import Header from '../components/header';
import FoodButton from '../components/buttons';
// import Submit from './components/submit';

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
    const foodGenre = this.state.categories.map(element => <FoodButton key={element.name} name={element.name} icon={element.icon} state={this.props.selected} highlighted={this.props.highlighted} />);
    return (
      <>
        <Header />
        <form onSubmit={this.props.handleSearch}>
          <div className="container margin-top-20">
            <div className="row justify-center">
                <input onChange={this.props.locationChange} type="text" placeholder="Location" required></input>
            </div>
          </div>
          <div className="container categories flex">
            {foodGenre}
          </div>
          <div className="row justify-center">
            <button type="submit">Search</button>
          </div>
        </form>
      </>
    );
  }
}
