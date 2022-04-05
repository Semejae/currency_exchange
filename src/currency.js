export default class currencyExchange {  
  static async getRate() {
    try {
      // const response = await fetch('https://v6.exchangerate-api.com/v6/0e4ceb531a8fd479db853a71/latest/USD');
      const url = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`;
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
}
console.log();
