const rq = require('request-promise');
const sanitize = require('./sanitize');
const markdownify = require('./markdownify');

const trs = {
  berachos: 'br',
  shabbos: 'sh',
  eruvin: 'ev',
  pesachim: 'ps',
  shekalim: 'sk',
  yoma: 'yo',
  sukah: 'su',
  beitzah: 'bt',
  rhashanah: 'rh',
  taanis: 'tn',
  megilah: 'mg',
  mkatan: 'mo',
  chagigah: 'cg',
  yevamos: 'ye',
  kesuvos: 'ks',
  nedarim: 'nd',
  nazir: 'nz',
  sotah: 'so',
  gitin: 'gi',
  kidushin: 'kd',
  bkama: 'bk',
  bmetzia: 'bm',
  bbasra: 'bb',
  sanhedrin: 'sn',
  makos: 'ma',
  shevuos: 'sv',
  azarah: 'az',
  eduyos: 'ed',
  avos: 'av',
  horayos: 'ho',
  zevachim: 'zv',
  menachos: 'mn',
  chulin: 'ch',
  bechoros: 'be',
  erchin: 'er',
  temurah: 'tm',
  kerisus: 'kr',
  meilah: 'ml',
  tamid: 'ml', // td
  kinim: 'ml', // kn
  midos: 'ml', // mi
  nidah: 'ni',
  zeraim: '',
  taharos: '',
};

const cts = {
  d4kids: 'dfk',
  insites: 'dt',
  backgrnd: '',
  reviewq: 'rq',
  reviewa: 'ra',
  review: 'rg',
  engCharts: 'eg',
  points: 'ps',
  halachah: 'hl',
  quiz: 'qz',
  tosfos: 'ts',
  revachLdaf: '',
  AudioVideo: '',
  navigator: 'nav',
  palm: '', // lol
  yosefdas: '',
  hebcharts: 'tl',
  hebrew: 'gm',
  chidon: 'cd',
  yerushalmi: 'yr',
  yeraudio: 'yer',
  peer: 'pr',
  discuss: 'qa',
  discussHebrew: 'qh',
};

const buildFilename = ({ tr, ct, file }) => (
  trs[tr]+'-'+cts[ct]+'-'+
   ('000'+file).substr(-3)+'.htm'
);

const LOGbuildFilename = (...a)=> {
  const o = buildFilename(...a);
  console.log(o);
  return o;
};

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
      url: `http://dafyomi.co.il/${req.params.tr}/${req.params.ct}/${LOGbuildFilename(req.params)}`,
    })
      .then(sanitize)
      .then(pon=> pon.filter(tag => ((tag.text||'a').match(/\w/) ) ) )
      .then(markdownify)
      .then(pon=> res.send( pon ) )
});
// also need to save this to the database


// kesuvos/insites/ks-dt-047.htm',
module.exports = routes;
