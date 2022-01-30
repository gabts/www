const findBlock = require("./find-block");

/**
 * Post process transpiled html file.
 * @param {string} html
 * @returns {string}
 */
function postProcess(html) {
  const styleSheets = new Set();
  for (let i = html.length; i > 0; i--) {
    const styleBlock = findBlock("<style>", "</style>", html, i);
    if (styleBlock) {
      styleSheets.add(styleBlock.content);
      const before = html.substring(0, styleBlock.startIndex);
      const after = html.substring(styleBlock.endIndex + 1);
      html = before + after;
      i = styleBlock.startIndex;
    }
  }

  let headEndIndex = 0;
  for (let i = 0; i < html.length; i++) {
    const headBlock = findBlock("<head>", "</head>", html, i);
    if (headBlock) {
      headEndIndex = headBlock.endIndex - "</head>".length;
      break;
    }
  }

  let processedHtml = html.substring(0, headEndIndex);
  processedHtml += "<style>";

  [...styleSheets].reverse().forEach((styleSheet) => {
    processedHtml += styleSheet;
  });

  processedHtml += "</style>";
  processedHtml += html.substring(headEndIndex + 1);

  return processedHtml;
}

module.exports = postProcess;
