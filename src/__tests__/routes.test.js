//importa os módulos e arquivos necessários
const request = require('supertest');
const server = require('../app.js');

//o que será executado antes de todos os testes
beforeAll(async () => {
    console.log('Iniciando os testes');
 });


 //o que será executado após todos os testes
afterAll(() => {
    //o server close irá encerrar nossa aplicação, evitando problemas da porta já estar em uso
    
 console.log('fim dos testes');
 });

 describe('inicio dos testes', () => {
    test('acessa a rota index e verifica o conteúdo que é exibido ', async () => {
        const response = await request(server).get('/');
       expect(response.status).toEqual(200);
       expect.objectContaining({ title: 'LocalizationFinderAPI', version: '1.0.0' });
    });

    test('testa o login ', async () => {

        const loginData = {
            mail : "rafaelcordeirobarros@gmail.com",
            password : "senha1234"
        };
        
       const response = await request(server).post('/auth/login').send(loginData);
       expect(response.status).toEqual(200);
       expect(response.text).toContain("{\"auth\":true,\"token\":\"");
    });

    test('testa falha no login ', async () => {

        const loginData = {
            mail : "emailInexistente",
            password : "senha1234"
        };
        
       const response = await request(server).post('/auth/login').send(loginData);
       expect(response.status).toEqual(500);
       expect(response.text).toEqual("{\"message\":\"Falha ao efetuar login. Usuário e/ou senha inválidos!\"}");
    });



});