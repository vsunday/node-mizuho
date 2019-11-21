const fetch = require('node-fetch');

const url = 'https://www.mizuhobank.co.jp/market/csv/quote.csv';
const thisMonth = (new Date()).getFullYear() + '/' + ((new Date()).getMonth() + 1);

String.prototype.indexOf2nd = function(searchValue) {
  return this.indexOf(searchValue, this.indexOf(searchValue)+1);
};

String.prototype.sliceTo2nd = function(targetValue) {
  return this.slice(0, this.indexOf2nd(targetValue));
};

module.exports = async () => {
  const response = await fetch(url);
  const body = await response.text();
  const b = body.trim().split('\r\n');
      
  let index;
  for (let i = b.length-1; i >= 0; i--) {
    if (!b[i].startsWith(thisMonth)) {
      index = i;
      break;
    }
  }
  
  return b.slice(index, index+3).map(x => x.sliceTo2nd(',')).join('\r\n');
};