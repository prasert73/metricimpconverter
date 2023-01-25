const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('whole number', function(done){
        let input = '30L';
        assert.equal(convertHandler.getNum(input), 30);
        done();
    });
    test('decimal number', function(done){
        let input = '30.1L';
        assert.equal(convertHandler.getNum(input), 30.1);
        done();
    });
    test('fractional', function(done){
        let input = '3.3L';
        assert.equal(convertHandler.getNum(input), 3.3);
        done();
    });
    test('fractional input with decimal', function(done){
        let input = '1.2/3.2L';
        assert.equal(convertHandler.getNum(input), 1.2/3.2);
        done();
    });
    test('double fraction', function(done){
        let input = '1.2//12';
        assert.equal(convertHandler.getNum(input), undefined);
        done();
    });
    test('fractional input with decimal', function(done){
        let input = 'L';
        assert.equal(convertHandler.getNum(input), 1);
        done();
    });
    test('valid input unit', function(done){
        let input = '12L';
        assert.equal(convertHandler.getUnit(input), 'L');
        done();
    });
    test('invalid input unit', function(done){
        let input = '12Lo';
        assert.equal(convertHandler.getUnit(input), undefined);
        done();
    });
    test('correct return unit', function(done){
        let input = 'L';
        assert.equal(convertHandler.getReturnUnit(input), 'gal');
        done();
    });
    test('correct spelled-out', function(done){
        let input = 'L';
        assert.equal(convertHandler.spellOutUnit(input), 'liters');
        done();
    });
    test('convert gal to L', function(done){
        let input = [5, 'gal'];
        assert.equal(convertHandler.convert(input[0],input[1]), 18.92705);
        done();
    });
    test('convert L to gal', function(done){
        let input = [5, 'L'];
        assert.equal(convertHandler.convert(input[0],input[1]), 1.32086);
        done();
    });
    test('convert mi to km', function(done){
        let input = [5, "mi"];
        assert.equal(convertHandler.convert(input[0],input[1]), 8.0467);
        done();
    });
    test('convert km to mi', function(done){
        let input = [5, 'km'];
        assert.equal(convertHandler.convert(input[0],input[1]), 3.10686);
        done();
    });
    test('convert lbs to kg', function(done){
        let input = [5,'lbs'];
        assert.equal(convertHandler.convert(input[0],input[1]), 2.26796);
        done();
    });
    test('convert kg to lbs', function(done){
        let input = [5,'kg'];
        assert.equal(convertHandler.convert(input[0],input[1]), 11.02312);
        done();
    });
});