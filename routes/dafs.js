

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
});

module.exports = routes;
