/**
 * Removes line breaks and white spaces which are more than one space long.
 * @param {string} html
 * @returns {string}
 */
function minify(html) {
  return html.replace(/(\r\n|\n|\r|\s\s+)/gm, "");
}

module.exports = { minify };
