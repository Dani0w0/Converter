function ConvertHandler() {

  const galToL = 3.78541;
  const lbsToKg = 0.453592;
  const miToKm = 1.60934;

  this.getNum = function(input) {
    let result;

    const match = input.match(/^[\d./]+/);

    if (!match) return 1;

    const numStr = match[0];

    if ((numStr.match(/\//g) || []).length > 1) {
      return 'invalid number';
    }

    if (numStr.includes('/')) {
      const parts = numStr.split('/');

      if (parts.length !== 2) {
        return 'invalid number';
      }

      result = parseFloat(parts[0]) / parseFloat(parts[1]);
    } else {
      result = parseFloat(numStr);
    }

    return result;
  };

  this.getUnit = function(input) {

    const result = input.replace(/^[\d./]+/, '');

    const unit = result.toLowerCase();

    switch(unit){
      case 'gal':
        return 'gal';
      case 'l':
        return 'L';
      case 'mi':
        return 'mi';
      case 'km':
        return 'km';
      case 'lbs':
        return 'lbs';
      case 'kg':
        return 'kg';
      default:
        return 'invalid unit';
    }

  };

  this.getReturnUnit = function(initUnit) {

    switch(initUnit){
      case 'gal':
        return 'L';
      case 'L':
        return 'gal';
      case 'mi':
        return 'km';
      case 'km':
        return 'mi';
      case 'lbs':
        return 'kg';
      case 'kg':
        return 'lbs';
    }

  };

  this.spellOutUnit = function(unit) {

    switch(unit){
      case 'gal':
        return 'gallons';
      case 'L':
        return 'liters';
      case 'mi':
        return 'miles';
      case 'km':
        return 'kilometers';
      case 'lbs':
        return 'pounds';
      case 'kg':
        return 'kilograms';
    }

  };

  this.convert = function(initNum, initUnit) {

    let result;

    switch(initUnit){

      case 'gal':
        result = initNum * galToL;
        break;

      case 'L':
        result = initNum / galToL;
        break;

      case 'mi':
        result = initNum * miToKm;
        break;

      case 'km':
        result = initNum / miToKm;
        break;

      case 'lbs':
        result = initNum * lbsToKg;
        break;

      case 'kg':
        result = initNum / lbsToKg;
        break;

    }

    return Number(result.toFixed(5));

  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {

    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;

  };

}

module.exports = ConvertHandler;