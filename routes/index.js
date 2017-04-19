var express = require('express');
var router = express.Router();
var model = require('../models/model.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'pixi.js' });
});

router.get('/demo1', function(req, res, next) {
  res.render('demo1', { title: 'demo1' });
});

router.get('/demo2', function(req, res, next) {
  res.render('demo2', { title: 'demo2' });
});

router.get('/fabric', function(req, res, next) {
  res.render('fabric', { title: 'fabric' });
});

router.get('/getDeviceList',function(req,res){
  model.Device.findAll().then(function(ret){
    if(!ret){
      return res.send([]);
    }
    for(var i in ret){
      ret[i].data = ret[i].data.toString('utf-8');//JSON.parse(ret[i].data.toString('utf-8'));
    }
    res.send(ret);
  }).catch(function(err){
    console.log('error1:' + err);
  })
})



module.exports = router;
