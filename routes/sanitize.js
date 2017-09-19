const htmlparser = require("htmlparser2");

module.exports = (raw)=> (new Promise(resolve => {
  let tagsNtext = [];

  const parser = new htmlparser.Parser({
    onopentag: (name, attr)=>{
      if( name !== 'br' )
        tagsNtext.push({ tag: name, attr });
    },
    
    ontext: (text)=>{
      if( text.match( /\w/ ) )
        tagsNtext.push({ text });
    },
    
    onclosetag: (name)=>{
      if( name === 'br') return;
      if(name === 'html') resolve(tagsNtext);
      else tagsNtext.push({ tag: name, close: true });
    }
  }, {decodeEntities: true});
  parser.write(raw);
  parser.end();
}) );
