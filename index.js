const express = require('express');
const app = express();
const moment = require('moment-timezone');

const server = app.listen(3000, function(){
    console.log('Server listening on port 3000');
  });

app.set('view-engine', 'pug');

app.use(express.static('public'));

//Global defer function
function defer() {
    let res, rej;
  
    let promise = new Promise((resolve, reject) => {
      res = resolve;
      rej = reject;
    });
  
    promise.resolve = res;
    promise.reject = rej;
  
    return promise
  
  }

  app.get('/', (req, res) => {
    res.render('index.pug', {});
  });

  app.get('/prevue', (req, res) => {
    res.render('prevue.pug', {schedule: {
      current_time: moment().startOf("hour"),
      date: moment().format("LLLL"),
      ttl: moment().startOf("hour").add(1, "hour").diff(moment(), "minutes"),
      channels: [
        {"number": 2, "name": "PRVU", "program": "Prevue Guide 24/7", "duration": 120},
        {"number": 5, "name": "JOSHI", "program": "AJW Wrestling: 1984", "duration": 60},
        {"number": 6, "name": "WEXP", "program": "News Hour With John Smith", "duration": 30},
        {"number": 8, "name": "MTV", "program": "Headbanger's Ball", "duration": 60},
        {"number": 9, "name": "PURO", "program": "Best Of AJPW", "duration": 60},
      ]
    }});
  });