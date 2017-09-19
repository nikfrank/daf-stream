module.exports = (tagsNtext)=> {
  // convolve over the tags, put the inline tags in

  let markdown = '';
  let currentHref = '';
  let currentAtext = '';
  
  for( let i=0; i < tagsNtext.length; ++i ){
    const { tag, attr, close, text, length } = tagsNtext[i];
    if( tag ){
      // is inline tag? markdown, else ignore
      switch(tag){
        case 'b':
          markdown += '**';
          break;

        case 'i':
          markdown += '_';
          break;

        case 'p': case 'div': case 'br':
          markdown += '\n\n';
          break;

        case 'a':
          if( !close ){
            currentHref = attr.href;
          } else {
            markdown += '['+currentAtext+']('+currentHref+')';
            currentAtext = '';
            currentHref = '';
          }
          break;
      }
    } else {
      if( !currentHref )
        markdown += text.replace('\n', '\n\n');
      else currentAtext = text;
    }
  }

  return markdown;
}
