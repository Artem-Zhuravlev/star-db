import React, { Component } from 'react';
import Spinner from '../spinner';
import PlanetView from './planet-view';
import SwapiService from '../../services/swapi-service';

import './random-planet.css';


class RandomPlanet extends Component {

  swapiService = new SwapiService();

  state = {
    planet: {
      id: null,
      name: null,
      population: null,
      rotationPeriod: null,
      diameter: null
    },
    loading: true
  }

  constructor() {
    super();
    this.updatePlanet();
  }

  onPlanetLoaded = (planet) => {
    this.setState({planet, loading: false})
  }

  onError = (err) => {

  }

  updatePlanet() {
   //const id = Math.floor(Math.random() * 25 + 2);
    const id = 123123123;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError)
  }

  render() {

    const { planet, loading } = this.state;

    const spinner = loading ? <Spinner /> : null;
    const content = !loading ? <PlanetView planet={planet}/> : null;
    
    return(
      <div className="random-planet jumbotron rounded">
        { spinner }
        { content }
      </div> 
    );
  }
};

export default RandomPlanet;


