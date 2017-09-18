const htmlparser = require("htmlparser2");

module.exports = (raw)=> (new Promise(resolve => {
  let tagsNtext = [];

  const parser = new htmlparser.Parser({
    onopentag: (name, attr)=>{
      tagsNtext.push({ tag: name, attr });
    },
    
    ontext: (text)=>{
      if( text.match( /\w/ ) )
        tagsNtext.push({ text, length: text.length });
    },
    
    onclosetag: (name)=>{
      if(name === 'html') resolve(tagsNtext);
      else tagsNtext.push({ tag: name, close: true });
    }
  }, {decodeEntities: true});
  parser.write(raw);
  parser.end();
}) );
