import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import currencyExchange from "./currency";

function clearFields() {
  $('#rates').val();
  $('.showErrors').text("");
}

function getCurrency(response, dollarAmount, currency) {
  if (response.conversion_rates) {
    const convertedAmount = (dollarAmount * response.conversion_rates[currency]);
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