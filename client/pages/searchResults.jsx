import React from 'react';
import Home from './home';

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
        <h1>search page</h1>
      </>
    );
  }
}
