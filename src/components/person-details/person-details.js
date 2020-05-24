import React, { Component } from 'react';
import './person-details.css';

import SwapiService from '../../services/swapi-service';
import PersonDetailsView from './person-details-view';

import Spinner from '../spinner';

class PersonDetails extends Component {

  swapiService = new SwapiService();

  state = {
    person: {
      id: null, 
      name: null, 
      gender: null,
      birthYear: null, 
      eyeColor: null
    },
    loading: true
  };

  componentDidMount() {
    this.updatePerson();
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.props.personId !== prevProps.personId) {
      this.updatePerson();
    }
  }
  

  updatePerson() {
    const { personId } = this.props;
    if (!personId) {
      return;
    }

    this.swapiService
      .getPerson(personId)
      .then((person) => {
        this.setState({ person, loading: false });
      });
  }

  render() {

    const { person, loading} = this.state;
    
    const hasData = !loading;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <PersonDetailsView person={person}/> : null;

    return(
      <div className="person-details card">
        { spinner }
        { content }
      </div>
    );
  }
  
};

export default PersonDetails;