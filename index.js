const express = require('express');
const { resolve } = require('path');
let cors = require('cors');
const app = express();
const port = 3000;

app.use(express.static('static'));
app.use(cors());

function calculateReturns(boughtAt, marketPrice, quantity) {
  let returns = (marketPrice - boughtAt) * quantity;

  return returns;
}

function calculateReturnPercentage(boughtAt, returns) {
  let returnPerc = (returns / boughtAt) * 100;

  return returnPerc;
}

function checkProfitLoss(returnPercentage) {
  if (returnPercentage > 0) {
    return 'Profit';
  } else {
    return 'Loss';
  }
}

function calculateTotalReturnPercentage(stock1, stock2, stock3, stock4) {
  let returnPerc = (stock2 + stock3 + stock4 + stock1).toString();

  return returnPerc;
}

app.get('/calculate-returns', (req, res) => {
  let boughtAt = parseFloat(req.query.boughtAt);
  let marketPrice = parseFloat(req.query.marketPrice);
  let quantity = parseInt(req.query.quantity);

  let result = calculateReturns(boughtAt, marketPrice, quantity).toString();

  res.send(result);
});

app.get('/total-returns', (req, res) => {
  let totalReturns = Object.values(req.query)
    .reduce((total, stock) => total + parseFloat(stock), 0)
    .toString();

  res.send(totalReturns);
});

app.get('/calculate-return-percentage', (req, res) => {
  let boughtAt = parseFloat(req.query.boughtAt);
  let returns = parseFloat(req.query.returns);

  let result = calculateReturnPercentage(boughtAt, returns).toString();
  res.send(result);
});

app.get('/total-return-percentage', (req, res) => {
  let stock1 = parseFloat(req.query.stock1);
  let stock2 = parseFloat(req.query.stock2);
  let stock3 = parseFloat(req.query.stock3);
  let stock4 = parseFloat(req.query.stock4);

  let result = calculateTotalReturnPercentage(stock1, stock2, stock3, stock4);

  res.send(result);
});

app.get('/status', (req, res) => {
  let returnPercentage = parseFloat(req.query.returnPercentage);
  let result = checkProfitLoss(returnPercentage);
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
