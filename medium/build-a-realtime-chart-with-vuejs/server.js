const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const Pusher = require('pusher');

const pusher = new Pusher({
  appId: '552149',
  key: '9854e6e0f0c5f95da7b6',
  secret: 'e8a5ad65d11650fa3355',
  cluster: 'ap1',
  encrypted: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(express.static(path.join(__dirname + '/app')));

app.set('port', (process.env.PORT || 5000));

let expensesList = {
  data: [
    {
        date: "April 15th 2017",
        expense: 100,
        income: 4000
    },
    {
        date: "April 22nd 2017",
        expense: 500,
        income: 2000
    },
    {
        date: "April 24th 2017",
        expense: 1000,
        income: 2300
    },
    {
        date: "April 29th 2017",
        expense: 2000,
        income: 1234
    },
    {
        date: "May 1st 2017",
        expense: 500,
        income: 4180
    },
    {
        date: "May 5th 2017",
        expense: 4000,
        income: 5000
    },
  ]
}

app.get('/finances', function(req, res) {
  res.send(expensesList);
});

app.post('/expense/add', function(req, res) {
  let expense = Number(req.body.expense);
  let income = Number(req.body.income);
  let date = req.body.date;

  let newExpense = {
    date: date,
    expense: expense,
    income: income
  };

  expensesList.data.push(newExpense);

  pusher.trigger('finance', 'new-expense', {
    newExpense: expensesList
  });

  res.send({
    success: true,
    income: income,
    expense: expense,
    date: date,
    data: expensesList
  });
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port ', app.get('port'));
});
