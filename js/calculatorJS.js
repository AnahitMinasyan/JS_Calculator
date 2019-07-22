function Calculator() {

  this.operators = ["+","-","*","/"];

  var result = 0;
  var reset = false;

  this.isNumeric = function(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  }

  this.convertExpression = function(str) {
    if (str.length === 0) return 0;

  var arr = str.split(" ");
    for(var i = 0; i < arr.length; i++) {
      if (this.isNumeric(arr[i])) {
        arr[i] = Number(arr[i]);
      }
    }
    return arr;
  };

  this.multiplyDivide = function(arr) {
    var resMulDiv = 0;

      for (var i = 0; i < arr.length; i++) {

          switch(arr[i]) {
            case '*':
                resMulDiv = arr[i-1] * arr[i+1];
              arr.splice(i-1,3,resMulDiv);
              i--;
              break;
            case '/':
              if (arr[i+1] === 0) {
              throw new Error("dividing by zero");

              }
              else {
                  resMulDiv = arr[i-1] / arr[i+1];
              }
              arr.splice(i-1,3,resMulDiv);
              i--;
              break;
            default:
              break;
          }
      }
    return arr;
  };

  this.addSub = function(arr) {
    var resAddSub = 0;

      for (var i = 0; i < arr.length; i++) {

          switch(arr[i]) {
            case '+':
                resAddSub = arr[i-1] + arr[i+1];
              arr.splice(i-1,3,resAddSub);
              i--;
              break;
            case '-':
                resAddSub = arr[i-1] - arr[i+1];
              arr.splice(i-1,3,resAddSub);
              i--;
              break;
            default:
              break;
          }
      }
    return arr;
  };

  this.equals = function(str) {
    if (str.length === 0) return "";

    var arr = this.convertExpression(str);

    if (arr.length === 0)
      result = 0;

    arr = this.multiplyDivide(arr);
    arr = this.addSub(arr);

      if ( arr.length !== 1 || !Number(arr[0]) ) {
        throw new Error("Operations incomplete");
      }
      result = arr[0];
    return result;
  };

  this.setReset = function(value) {
    reset = value;
  };

  this.getReset = function() {
    return reset;
  }
}

var init = function() {

  var calculator = new Calculator();
  var inputOutput = document.getElementById("inputOutput");

  var calculate = function(event) {
    var element = event.target || event.srcElement;
    var operatorEl = element.innerHTML;
    var operators = calculator.operators;

      if (calculator.isNumeric(operatorEl)) {

        if (calculator.getReset()) {
          inputOutput.value = operatorEl;
        }
        else {
          inputOutput.value += operatorEl;
        }
        calculator.setReset(false);

      }
      else if (operatorEl === ".") {

        if (calculator.isNumeric(inputOutput.value.substr(-1))) {
          inputOutput.value += operatorEl;
            calculator.setReset(false);
        }

      }
      else if (operators.indexOf(operatorEl) !== -1) {

        if (operators.indexOf(inputOutput.value.substr(-2,1)) === -1) {
          inputOutput.value += " " + operatorEl + " ";
            calculator.setReset(false);
        }
          
      }
      else if (operatorEl === "=" && !calculator.getReset()) {

        inputOutput.value = calculator.equals(inputOutput.value);
          calculator.setReset(true)

      }
      else if (operatorEl === "C") {

        inputOutput.value = "";
          calculator.setReset(true);

      }
      else {

        throw new Error("unknown entry");

      }
  };

    var calc = document.getElementById("calculator");
    var buttons = calc.getElementsByTagName("button");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", calculate);
    }

};

document.addEventListener("DOMContentLoaded", init);