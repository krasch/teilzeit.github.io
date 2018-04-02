"use strict";

function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}


function incomeTax(monthlyIncome){

    var income = 12 * monthlyIncome;
    var tax = -1;

    if (income <= 9000) {
       tax = 0;
    }
    else if (income <= 13996) {
        var y = (income - 9000) / 10000;
        tax = (997.8 * y + 1400) * y;
    }
    else if (income <= 54949) {
        var z = (income - 13996) / 10000;
        tax = (220.13 * z + 2397) * z + 948.49;
    }
    else if (income <= 260532) {
        tax =  0.42 * income - 8621.75;
    }
    else {
        tax = 0.45 * income - 16437.7;
    }

    return Math.round(tax) / 12;
}

function soliTax(monthlyIncome) {
    return precisionRound(incomeTax(monthlyIncome) * 0.055, 2);
}

function healthInsurance(monthlyIncome){
    var rate = (7.3 + 1.1) / 100.0;
    monthlyIncome = Math.min(monthlyIncome, 4425);
    return precisionRound(rate * monthlyIncome, 2);
}

function nursingCareInsurance(monthlyIncome){
    var rate = 1.4 / 100.0;
    monthlyIncome = Math.min(monthlyIncome, 4425);
    return precisionRound(rate * monthlyIncome, 2);
}

function pensionInsurance(monthlyIncome){
    var rate = 9.3 / 100.0;
    monthlyIncome = Math.min(monthlyIncome, 5800);
    return precisionRound(rate * monthlyIncome, 2);
}

function unemploymentInsurance(monthlyIncome){
    var rate = 1.5 / 100.0;
    monthlyIncome = Math.min(monthlyIncome, 5800);
    return precisionRound(rate * monthlyIncome, 2);
}

function updateSlider(){
    var percentage = document.getElementById("percentage").value
    document.getElementById("percentageOut").innerHTML = percentage;
}

function calculate(){
    var percentage = document.getElementById("percentage").value / 100.0;
    var monthlyIncome = document.getElementById("salary").value * percentage;

    var health = healthInsurance(monthlyIncome);
    var care = nursingCareInsurance(monthlyIncome);
    var pension = pensionInsurance(monthlyIncome);
    var unemployment = unemploymentInsurance(monthlyIncome);
    var insurances = health + care + pension + unemployment;

    var taxableIncome = monthlyIncome - health - care - pension;
    var tax = incomeTax(taxableIncome) + soliTax(taxableIncome);

    var netto = precisionRound(monthlyIncome - tax - insurances, 2);
    document.getElementById("result").innerHTML = netto + " €";
}
