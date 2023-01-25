const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('valid input', function(done){
        chai.request(server)
            .get('/api/convert?input=10L')
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, 10);
                assert.equal(res.body.initUnit, 'L'); 
                assert.equal(res.body.returnNum, 2.64172);
                assert.equal(res.body.returnUnit, 'gal'); 
                done();
            })
    });
    test('invalid input', function(done){
        chai.request(server)
            .get('/api/convert?input=32g')
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.text, 'invalid unit');
                done();
            })
    });
    test('invalid number', function(done){
        chai.request(server)
            .get('/api/convert?input=3/7.2/4kg')
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.text, 'invalid number');
                done();
            })
    });
    test('invalid number AND unit', function(done){
        chai.request(server)
            .get('/api/convert?input=3/7.2/4kilomegagram')
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.text, 'invalid number and unit');
                done();
            })
    });
    test('no number', function(done){
        chai.request(server)
            .get('/api/convert?input=kg')
            .end(function(err, res){
                assert.equal(res.status, 200);
                assert.equal(res.body.initNum, 1);
                assert.equal(res.body.initUnit, 'kg'); 
                assert.equal(res.body.returnNum, 2.20462);
                assert.equal(res.body.returnUnit, 'lbs'); 
                done();
            })
    });
});
