import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import currencyExchange from "./currency";

// let promise = currencyExchange.getRate();

// promise.then(function(response) {
//   console.log(response);
//   const rate = JSON.parse(response);
  
// });



// async function makeApiCall(currencyRate) {
//   const response = await fetch("https://v6.exchangerate-api.com/v6/0e4ceb531a8fd479db853a71/latest/USD");
//   const jsonifiedResponse = await response.json();
//   return jsonifiedResponse;
// }
  


function clearFields() {
  $('#rates').val();
  $('.showErrors').text("");
}

function getCurrency(response, dollarAmount, currency) {
  if (response.conversion_rates) {
    console.log(response);
    const convertedAmount = (dollarAmount * response.conversion_rates[currency]);
    console.log(convertedAmount);
    $('.calculate').text(`The Base exchange rate is ${response.conversion_rates.USD}. Your converted amount is ${convertedAmount}`);
  } else {
    $('.showErrors').text(`There was an error: ${response.conversion_rates}`);
    
  }
}
async function makeApiCall(currency, dollarAmount) {
  const response = await currencyExchange.getRate();
  getCurrency(response, dollarAmount, currency);
}

$(document).ready(function() {
  $('form#rate').submit(function(event){
    event.preventDefault();
    let currency = $('input:radio[name=rates]:checked').val();
    let dollarAmount = parseInt($('#dollarValue').val());
    clearFields();
    makeApiCall(currency, dollarAmount);
    

  });
});