function ConvertHandler() {
  
  function findIndex(input){
    let regex = /[A-Za-z]/;
    let inputArray = input.split('');
    for (let index in inputArray) {
      if (inputArray[index].match(regex)) {
        return index;
      }
    }
  }

  this.getNum = function(input) {
    let result;
    result = input.split('').slice(0,findIndex(input)).join('');
    if (result == '') {return result = 1;};
    if (Number(result)===0) {return result =undefined;};
    let fractionNum = result.split('/');
    if (fractionNum.length == 1) {
      result = Number(fractionNum[0]);
    } else if (fractionNum.length == 2 && Number(fractionNum[1]) != 0) {
        result = Number(fractionNum[0])/Number(fractionNum[1]);
    } else {
      result = undefined;
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let regex_unit = /^(L|gal|mi|km|lbs|kg)$/i;
    let result; 
    result = input.split('').slice(findIndex(input)).join('').toLowerCase();
    if (result === 'l') {result = 'L';};
    if (regex_unit.test(result)) {
      return result;
    } else {
      result = undefined;   
    }
    return result;
  };

  this.getReturnUnit = function(initUnit) {
    let result;
    switch (initUnit) {
      case 'gal': 
                  result = 'L';
                  break;
      case 'L': 
                  result = 'gal';
                  break;
      case 'lbs':
                  result = 'kg';
                  break;
      case 'kg':
                  result = 'lbs';
                  break;
      case 'mi':  
                  result = 'km';
                  break;
      case 'km': 
                  result = 'mi';
                  break;
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch (unit) {
      case 'gal': 
                  result = 'gallons';
                  break;
      case 'L': 
                  result = 'liters';
                  break;
      case 'lbs':
                  result = 'pounds';
                  break;
      case 'kg':
                  result = 'kilograms';
                  break;
      case 'mi':  
                  result = 'miles';
                  break;
      case 'km': 
                  result = 'kilometers';
                  break;
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case 'gal': 
                  result = initNum*galToL;
                  break;
      case 'L': 
                  result = initNum/galToL;
                  break;
      case 'lbs':
                  result = initNum*lbsToKg;
                  break;
      case 'kg':
                  result = initNum/lbsToKg;
                  break;
      case 'mi':  
                  result = initNum*miToKm;
                  break;
      case 'km': 
                  result = initNum/miToKm;
                  break;
    }
    return Number(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    let initUnitString = this.spellOutUnit(initUnit);
    let returnUnitString = this.spellOutUnit(returnUnit);
    result = `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`
    return result;
  };
  
}

module.exports = ConvertHandler;
