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

describe('Probar las rutas de los copies',()=>{
    it('Deberia de obtener la lista de copies', (done)=>{
        supertest(app).get('/copies/')
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
