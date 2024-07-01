import citiesRepository from '../repository/worldCitiesRespository'

//Agregados casos para cumplir test de integración
const nonumero = (str) => /^[A-Za-z]+$/.test(str);
const valido = (str) => str.length >= 3;

exports.getAllCitiesUseCase = (ctx) => {
    ctx.body = citiesRepository.getAllCitiesRepository();
    return ctx;
}

exports.getCitiesByCountryUseCase = (ctx) => {
    const country = ctx.params.country;

    if (!valido(country)) {
        ctx.status = 400;
        ctx.body = {
            message: "El país/ciudad ingresado debe tener al menos 3 caracteres"
        };
        return ctx;
    }

    if (!nonumero(country)) {
        ctx.status = 400;
        ctx.body = {
            message: "Solo se aceptan caracteres no numéricos"
        };
        return ctx;
    }

    const cities = citiesRepository.searchCitiesByCountryName(country);

    if (cities.length === 0) {
        ctx.status = 200;
        ctx.body = {
            message: "No se encontraron ciudades para el país ingresado"
        };
    } else {
        ctx.status = 200;
        ctx.body = cities;
    }

    return ctx;
}

exports.getCitiesByCityNameAndCountryUseCase = (ctx) => {
    const ciudad = ctx.params.city;
    const pais = ctx.params.country;

    if (!valido(ciudad) || !valido(pais)) {
        ctx.status = 400;
        ctx.body = {
            message: "El país/ciudad ingresado debe tener al menos 3 caracteres"
        };
        return ctx;
    }

    const ciudades = citiesRepository.searchCityByCityNameAndCountry(ciudad, pais);

    if (ciudades.length === 0) {
        ctx.status = 200;
        ctx.body = {
            message: "No se encontraron ciudades para la ciudad y país ingresados"
        };
    } else {
        ctx.status = 200;
        ctx.body = ciudades;
    }

    return ctx;
}
