import citiesRepository from '../../src/domain/cities/repository/worldCitiesRespository.js';
import sinon from 'sinon';

//Test unitarios se prueban las funciones de worldCitiesRepository para saber que todo funciona como debería

describe('Cities Repository', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Deberían devolver todas las ciudades', () => {
    const cities = citiesRepository.getAllCitiesRepository();
    expect(cities).toBeInstanceOf(Array);
  });

  it('Debería devolver ciudades por nombre de país', () => {
    const country = 'Russia';
    const searchStub = sinon.stub(citiesRepository, 'searchCitiesByCountryName').returns([{ country: 'Russia' }]);
    const cities = citiesRepository.searchCitiesByCountryName(country);
    expect(cities).toEqual([{ country: 'Russia' }]);
    expect(searchStub.calledOnce).toBeTruthy();
  });

  it('Debería devolver ciudad por nombre de país y ciudad', () => {
    const city = 'Moscow';
    const country = 'Russia';
    const searchStub = sinon.stub(citiesRepository, 'searchCityByCityNameAndCountry').returns([{ name: 'Moscow', country: 'Russia' }]);
    const cities = citiesRepository.searchCityByCityNameAndCountry(city, country);
    expect(cities).toEqual([{ name: 'Moscow', country: 'Russia' }]);
    expect(searchStub.calledOnce).toBeTruthy();
  });
});
