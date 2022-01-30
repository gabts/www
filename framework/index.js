const { minify } = require("html-minifier");
const postProcess = require("./post-process");
const render = require("./render");

/**
 * Transpiles and processes a html template and it's sub templates into a single
 * file.
 * @param {string} fileName
 * @returns {string}
 */
function framework(fileName) {
  const html = postProcess(render(fileName));
  return minify(html, {
    html5: true,
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
  });
}

module.exports = framework;
