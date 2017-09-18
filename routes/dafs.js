const rq = require('request-promise');
const sanitize = require('./sanitize');

const routes = model => ({
  readOne: (req, res)=>
    model.findById( req.params.id )
         .then(pon => res.json({
           schema: 'daf',
           payload: [pon].filter(i=>i),
         }) ),

  create: (req, res)=>
    model.create( req.body.payload )
         .then(pon => res.json({
           schema: 'daf',
           prevAction: 'create',
           payload: [pon],
         }) ),

  readRaw: (req, res)=>
    rq({
      method: 'GET',
      url: `http://dafyomi.co.il/${req.params.tr}/${req.params.ct}/${req.params.file}`,
    })
    .then(sanitize)
    .then(pon=> res.json({ payoad: pon.filter(({length}) => length > 1 ) }) ),
});

// kesuvos/insites/ks-dt-047.htm',

module.exports = routes;
