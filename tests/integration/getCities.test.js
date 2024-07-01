import request from 'supertest';
import { server } from '../../src/index';

describe('Cities API', () => {
  afterAll(() => {
    server.close();
  });

  it('Debería devolver 200 para un país válido', async () => {
    const response = await request(server).get('/api/cities/by_country/Peru');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('Debería devolver 200 sin cidudades para un país inexistente', async () => {
    const response = await request(server).get('/api/cities/by_country/wadyia');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'No se encontraron ciudades para el país ingresado' });
  });

  it('Debería devolver 400 para país inválido con números', async () => {
    const response = await request(server).get('/api/cities/by_country/3928742839487623884');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Solo se aceptan caracteres no numéricos' });
  });

  it('should return 400 for short country name', async () => {
    const response = await request(server).get('/api/cities/by_country/ñ');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'El país/ciudad ingresado debe tener al menos 3 caracteres' });
  });
});
