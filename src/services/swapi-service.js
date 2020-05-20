export default class SwapiService {
  _apiBase = `https://swapi.dev/api`;

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url} received status ${res.status}` )
    } 
  
    const body = await res.json();
    return body;
  }

  async getAllPeople () {
    const res = await this.getResource('/people/');
    return res.results.map(this._transformPerson);
  }

  getPerson(id) {
    return this.getResource(`/people/${id}`);
  }

  async getAllPlanets() {
    const res = await this.getResource('/planets/');
    return res.results.map(this._transformPlanet);
  }

  async getPlanet(id) {
    const planet = await this.getResource(`/planets/${id}`);
    return this._transformPlanet(planet);
  }

  async getAllStarships() {
    const res = await this.getResource('/starships/');
    return res.results.map(this._transformStarships);
  }

  getStarship(id) {
    return this.getResource(`/starships/${id}`);
  }

  _extractId(item) {
    const idReg = /\/([0-9]*)\/$/;
    return item.url.match(idReg)[1];
  }

  _transformPlanet(planet) {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    }
  }

  _transformStarships(starship) {
    return {
      id: this._extractId(starship),
      name: starship.name,
      manufacturer: starship.manufacturer,
      model: starship.model,
      constInCredits: starship.constInCredits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity
    }
  }

  _transformPerson(person) {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birthYear,
      eyeColor: person.eyeColor,
    }
  }
}
  