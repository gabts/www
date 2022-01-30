const assert = require("assert");
const { minify } = require("html-minifier");
const render = require("../render");

(function () {
  const res = render("framework/test/templates/index.html", {
    title: "foo",
    word: "bar",
    number: 1337,
  });
  assert.strictEqual(
    minify(res, { collapseWhitespace: true }),
    "<div><small>1337</small><h1>foo</h1><p>bar</p></div>"
  );
})();
