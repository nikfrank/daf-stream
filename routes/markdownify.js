const inlines = ['b', 'i', 'a', 'span', 'h2'];

const tagToMd = ({ tag, text, attr })=>
  ( tag === 'a' ) ? (
    `[${text}](${attr.href}) `
    
  ) : ( tag === 'h2' ) ? (
    `## ${text} `

  ) : ( tag === 'b' ) ? (
    `**${text.trim()}** `
    
  ) : ( tag === 'i' ) ? (
    `_${text.trim()}_ `
    
  ) : ( tag === 'span' ) ? (
    `${text.trim()} `
    
  ) : text.replace('\n', '\n\n');

module.exports = (tagsNtext)=> {
  // convolve over the tags, put the inline tags in
  
  let markdown = '';

  let tagStack = [{}];

  let currentText = '';
  
  for( let i=0; i < tagsNtext.length; ++i ){
    const { tag, attr, close, text } = tagsNtext[i];
    
    
    if( tag && !close ) {
      markdown += currentText;
      currentText = '';
      
      if( inlines.indexOf(tag) === -1){
        markdown += '\n\n';

        tagStack = tagStack.map( itag =>
          inlines.indexOf(itag.tag) === -1 ? itag : (
            Object.assign({}, itag, { tag: 'span' })
          ) );
      }
      
      tagStack.push({ tag, attr }) 

    } else if (tag && close) {
      markdown += tagToMd(
        Object.assign({}, tagStack.pop(), { text: currentText })
      );
      
      currentText = '';

    } else currentText += ' '+text;
  }

  return markdown;
}
