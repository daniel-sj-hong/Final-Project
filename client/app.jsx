import React from 'react';
import Home from './pages/home';
import parseRoute from './lib/parseRoute';
import SearchResults from './pages/searchResults';
import Details from './pages/details';
import Favorites from './pages/favorites';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
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
      return <Home />;
    }
    if (route.path === 'search') {
      return <SearchResults params={this.state.route.params} />;
    }
    if (route.path === 'details') {
      return <Details params={this.state.route.params} />;
    }
    if (route.path === 'favorites') {
      return <Favorites params={this.state.route.params} />;
    }
  }

  render() {
    return (
      <>
        { this.renderPage() }
      </>
    );
  }
}
