import React from 'react';
import Home from './pages/home';
import parseRoute from './lib/parseRoute';
import SearchResults from './pages/searchResults';

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
  }

  render() {
    return (
      <>
        { this.renderPage() }
      </>
    );
  }
}
