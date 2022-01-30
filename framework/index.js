const render = require("./render");
const postProcess = require("./post-process");

/**
 * Transpiles and processes a html template and it's sub templates into a single
 * file.
 * @param {string} fileName
 * @returns {string}
 */
function framework(fileName) {
  return postProcess(render(fileName));
}

module.exports = framework;
