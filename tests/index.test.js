const supertest = require('supertest');

const app = require('../app');

var key = "";

describe('Probar el sistema de autenticacion', () => {
    it('Deberia de obtener un login con usuario y contrasenia correcto', (done) => {
        supertest(app).post('/login')
        .send({'email':'humberto@gmail.com', 'password':'tugfa'})
        .expect(200)
        .end(function(err, res){
            key = res.body.obj;
            done();
        });

    });
});