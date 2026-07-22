const chai = require('chai');
const assert = chai.assert;

const ConvertHandler = require('../controllers/convertHandler.js');
let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

  suite('Function convertHandler.getNum(input)', function () {

    test('convertHandler should correctly read a whole number input.', function () {
      assert.equal(convertHandler.getNum('32L'), 32);
    });

    test('convertHandler should correctly read a decimal number input.', function () {
      assert.equal(convertHandler.getNum('3.1mi'), 3.1);
    });

    test('convertHandler should correctly read a fractional input.', function () {
      assert.equal(convertHandler.getNum('1/2km'), 0.5);
    });

    test('convertHandler should correctly read a fractional input with a decimal.', function () {
      assert.equal(convertHandler.getNum('5.4/3lbs'), 1.8);
    });

    test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function () {
      assert.equal(convertHandler.getNum('3/2/3kg'), 'invalid number');
    });

    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function () {
      assert.equal(convertHandler.getNum('kg'), 1);
    });

  });

  suite('Function convertHandler.getUnit(input)', function () {

    test('convertHandler should correctly read each valid input unit.', function () {
      const units = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];

      units.forEach(unit => {
        assert.equal(convertHandler.getUnit(unit), unit);
      });
    });

    test('convertHandler should correctly return an error for an invalid input unit.', function () {
      assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
    });

  });

  suite('Function convertHandler.getReturnUnit(initUnit)', function () {

    test('convertHandler should return the correct return unit for each valid input unit.', function () {
      assert.equal(convertHandler.getReturnUnit('gal'), 'L');
      assert.equal(convertHandler.getReturnUnit('L'), 'gal');
      assert.equal(convertHandler.getReturnUnit('mi'), 'km');
      assert.equal(convertHandler.getReturnUnit('km'), 'mi');
      assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
      assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
    });

  });

  suite('Function convertHandler.spellOutUnit(unit)', function () {

    test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function () {
      assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
      assert.equal(convertHandler.spellOutUnit('L'), 'liters');
      assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
      assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
      assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
      assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
    });

  });

  suite('Function convertHandler.convert(num, unit)', function () {

    test('convertHandler should correctly convert gal to L.', function () {
      assert.approximately(convertHandler.convert(5, 'gal'), 18.9271, 0.1);
    });

    test('convertHandler should correctly convert L to gal.', function () {
      assert.approximately(convertHandler.convert(5, 'L'), 1.32086, 0.1);
    });

    test('convertHandler should correctly convert mi to km.', function () {
      assert.approximately(convertHandler.convert(5, 'mi'), 8.0467, 0.1);
    });

    test('convertHandler should correctly convert km to mi.', function () {
      assert.approximately(convertHandler.convert(5, 'km'), 3.10686, 0.1);
    });

    test('convertHandler should correctly convert lbs to kg.', function () {
      assert.approximately(convertHandler.convert(5, 'lbs'), 2.26796, 0.1);
    });

    test('convertHandler should correctly convert kg to lbs.', function () {
      assert.approximately(convertHandler.convert(5, 'kg'), 11.0231, 0.1);
    });

  });

});