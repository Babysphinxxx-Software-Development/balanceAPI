const express = require('express');
const request = require('request');
const app = express();
const port = 3000;

const userBalances = {
  "user-1": {
    "BTC": "0.5",
    "ETH": "2",
  },
  "user-2": {
    "BTC": "0.1",
  },
  "user-3": {
    "ETH": "5"
  },
}

function convertToUsd(balance, convertPair)
{
  return new Promise((resolve, reject) => {
    let usdBalance = null;

    let usd = null;
    const url = 'https://www.bitstamp.net/api/v2/ticker/' + convertPair + '/';
    console.log('url ', url);
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        body = JSON.parse(body);
        usdBalance = balance * body["open"];
        resolve(usdBalance);
      }
    });
  });
}

async function getCurrencyBalance(username, type)
{
  let balance = null;

  if (username in userBalances && type in userBalances
  [username])
  {
    balance = userBalances[username][type];
  }

  return balance;
}

app.get('/getTotalUsdBalance/:username', async (req, res) => {
  const username = req.params.username;
  let usd = 0;

  // BTC Convert
  // Checking user got BTC rate;
  const btcBlance = await getCurrencyBalance(username, "BTC");

  if (btcBlance)
  {
    usdBalance = await convertToUsd(btcBlance, "btcusd");
    console.log('usdBalance : ', usdBalance);
    if (usdBalance)
    {
      usd += usdBalance;
    }
  }

  // ETH Convert
  const ethBalance = await getCurrencyBalance(username, "ETH");

  if (ethBalance)
  {
    usdBalance = await convertToUsd(ethBalance, "ethusd");
    if (usdBalance)
    {
      usd += usdBalance;
    }
  }

  usd = (Math.round(usd * 100) / 100).toFixed(2);
  usd = usd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
  res.json({
    "user": username,
    "USD": usd
  })
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
