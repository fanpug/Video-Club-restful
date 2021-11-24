const supertest = require('supertest');

const app = require('../app');

var key = "";

describe('Probar el sistema de autenticacion', () => {
    it('Deberia de obtener un login con usuario y contraseña correcto', (done) => {
        supertest(app).post('/login')
        .send({'email':'humberto@gmail.com', 'password':'tugfa'})
        .expect(200)
        .end(function(err, res){
            key = res.body.obj;
            done();
        });

    });
});

describe('Probar las rutas de los usuarios', ()=>{
    it('Deberia obtener la lista de usuarios', (done)=>{
        supertest(app).get('/users/')
        .set('Authorization', `Bearer ${key}`)
        .end(function(err, res){
            if(err){
                done(err);
            }else{
                expect(res.statusCode).toEqual(200);
                done();
            }
        });
    });
});