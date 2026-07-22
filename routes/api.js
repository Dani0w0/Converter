'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res) {

      const input = req.query.input;

      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);

      const invalidNumber = initNum === 'invalid number';
      const invalidUnit = initUnit === 'invalid unit';

      if (invalidNumber && invalidUnit) {
        return res.send('invalid number and unit');
      }

      if (invalidNumber) {
        return res.send('invalid number');
      }

      if (invalidUnit) {
        return res.send('invalid unit');
      }

      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const returnNum = convertHandler.convert(initNum, initUnit);

      res.json({
        initNum,
        initUnit,
        returnNum,
        returnUnit,
        string: convertHandler.getString(
          initNum,
          initUnit,
          returnNum,
          returnUnit
        )
      });

    });

};