const fs = require("fs");
const findBlock = require("./find-block");
const { minify } = require("./utils");

/**
 * Transpiles a html template.
 * @param {string} fileName
 * @param {void | Record<string, any>} props
 * @returns {string}
 */
function __render(fileName, props) {
  let file = fs.readFileSync(fileName, { encoding: "utf-8" });

  for (let i = 0; i < file.length - 1; i++) {
    const variableInterpolation = findBlock("{{", "}}", file, i);
    if (variableInterpolation) {
      const propKey = variableInterpolation.content.trim();
      const propValue = props?.[propKey];
      if (propValue !== undefined) {
        const value = propValue.toString();
        const before = file.substring(0, variableInterpolation.startIndex);
        const after = file.substring(variableInterpolation.endIndex + 1);
        file = before + value + after;
        i += value.length;
      }
    }

    const renderScript = findBlock("<script render>", "</script>", file, i);
    if (renderScript) {
      const renderFunc = `(() => {
        const __render = require("./render");
        const __props = JSON.parse('${JSON.stringify(props || {})}');
        ${renderScript.content}
      })();`;
      const renderedHtml = eval(renderFunc);
      const before = file.substring(0, renderScript.startIndex);
      const after = file.substring(renderScript.endIndex + 1);
      file = before + renderedHtml + after;
      i += renderedHtml.length;
    }
  }

  return minify(file);
}

module.exports = __render;
