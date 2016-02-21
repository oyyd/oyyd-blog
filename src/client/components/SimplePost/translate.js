import { marked, } from 'marked-chartjs-binding';

function initCommands() {
  let commands = [];

  commands.push({
    reg: /\$sidenote\((.*?)\)/,
    handler: (() => {
      let sideNoteCount = 0;
      return (content) => {
        sideNoteCount++;
        return `<sup id="${sideNoteCount}" class="margin-toggle` +
          ` sidenote-number">${sideNoteCount}</sup>` +
        `<span for="${sideNoteCount}" class="mdl-tooltip sidenote">${content}</span> `;
      };
    })(),
  });

  commands.push({
    reg: /\$publicdate\((.*?)\)/,
    handler: (content) => {
      return content;
    },
  });

  return commands;
}

function translate(content) {
  const commands = initCommands();

  let result = marked(content);
  for (let command of commands) {
    let regResult = command.reg.exec(result);
    while (regResult) {
      let match = regResult[0];
      let text = regResult[1];
      result = result.replace(match, command.handler(text));
      regResult = command.reg.exec(result);
    }
  }

  return result;
}

export default translate;
