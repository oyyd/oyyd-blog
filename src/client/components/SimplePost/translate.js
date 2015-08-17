import marked from 'marked';

let commands = [];
commands.push({
  reg: /\$sidenote\((.*?)\)/,
  handler: (()=>{
    let sideNoteCount = 0;
    return (content)=>{
      sideNoteCount ++;
      return `<label for="${sideNoteCount}" class="margin-toggle sidenote-number"></label>` +
      `<input type="checkbox" id="${sideNoteCount}" class="margin-toggle"/>` +
      `<span class="sidenote">${content}</span> `;      
    }
  })()
});

commands.push({
  reg: /\$publicdate\((.*?)\)/,
  handler: (content)=>{
    return content;
  }
});

function translate(content){
  let result = marked(content);
  for(let command of commands){
    let regResult = command.reg.exec(result);
    while(regResult){
      let match = regResult[0];
      let text = regResult[1];
      result = result.replace(match, command.handler(text));
      regResult = command.reg.exec(result);
    }    
  }
  return result;
}

export default translate;
