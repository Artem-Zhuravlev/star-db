import React, { Component } from 'react';
import Spinner from '../spinner';
import PlanetView from './planet-view';
import ErrorIndicator from '../error-indicator';
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
    loading: true,
    error: false
  };


  componentDidMount() {
    this.updatePlanet();
    this.interval = setInterval(this.updatePlanet, 1000000);
  }

  
  componentWillUnmount() { 
    clearInterval(this.interval);
  }
  

  onPlanetLoaded = (planet) => {
    this.setState({planet, loading: false})
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    });
  };

  updatePlanet = () => {
    const id = Math.floor(Math.random() * 25) + 3;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError)
  };

  render() {

    const { planet, loading, error } = this.state;

    const hasDada = !(loading || error);

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasDada ? <PlanetView planet={planet}/> : null;

    return(
      <div className="random-planet jumbotron rounded">
        { errorMessage }
        { spinner }
        { content }
      </div> 
    );
  };
};

export default RandomPlanet;