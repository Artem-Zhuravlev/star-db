import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';

import ErrorIndicator from '../error-indicator';
import ErrorButton from '../error-button';

import PeoplePage from '../people-page';

import ItemList from '../item-list';
import PersonDetails from '../person-details';
import SwapiService from '../../services/swapi-service';


import './app.css';

class App extends Component {

  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false
  }

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true
    })
  }
  

  render() {

    if (this.state.hasError) {
      return <ErrorIndicator />
    }
    const planet = this.state.showRandomPlanet ? 
      <RandomPlanet /> :
      null;

    return (
      <div className="container">
        <Header />
        { planet }

        <button
          className="toggle-planet btn btn-warning btn-lg"
          onClick={this.toggleRandomPlanet}>
          Toggle Random Planet
        </button>
        <ErrorButton />

        <PeoplePage />

        
      </div>
    );
  }
};

export default App;