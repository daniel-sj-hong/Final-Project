import React from 'react';
import Header from './components/header';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <>
        <Header />
        <div className="container">

        </div>
        <form>
          <input type="text" placeholder="Location" required></input>
        </form>
      </>
    );
  }
}
