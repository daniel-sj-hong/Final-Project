import React from 'react';
import Home from './pages/home';
import parseRoute from './lib/parseRoute';
import SearchResults from './pages/searchResults';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selected: '',
      location: '',
      searchResults: [],
      route: parseRoute(window.location.hash)
    };
    this.highlighted = this.highlighted.bind(this);
    this.locationChange = this.locationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.renderPage = this.renderPage.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home highlighted={this.highlighted} handleSearch={this.handleSearch} locationChange={this.locationChange} selected={this.state.selected} />;
    }
    if (route.path === 'search') {
      return <SearchResults />;
    }
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

  handleSearch() {
    event.preventDefault();
    fetch(`/api/restaurants?category=${this.state.selected}&location=${this.state.location}`)
      .then(response => response.json())
      .then(restaurants => {
        this.setState({ searchResults: restaurants });
        window.location.hash = '#search';
      });
  }

  render() {
    return (
      <>
        { this.renderPage() }
      </>
    );
  }
}
