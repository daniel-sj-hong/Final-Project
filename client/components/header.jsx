import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOn: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => {
      return { isModalOn: !prevState.isModalOn };
    });
  }

  render() {

    return (
      <>
        <header className="header-color flex justify-center">
          <p className="header">Choice.ly</p>
          <i onClick={this.toggle} className="fas fa-bars app-icon"></i>
        </header>
          {this.state.isModalOn &&
            <>
              <div onClick={this.toggle} className={'modal-background absolute'}></div>
              <div className={'app-drawer absolute'}>
                <h1 className="margin-top-0 margin-left-20">Menu</h1>
                <ul className="padding-0">
                  <li className="list-item" onClick={this.toggle}><a className="padding-10" href="#favorites">Favorites</a></li>
                  <li className="list-item" onClick={this.toggle}><a className="padding-10" href="#">Back to categories</a></li>
                </ul>
              </div>
            </>
          }
      </>
    );

  }

}
