const assert = require("assert");
const render = require("../render");

(function () {
  const res = render("framework/test/templates/index.html", {
    title: "foo",
    word: "bar",
  });
  assert.strictEqual(res, "<div><h1>foo</h1><p>bar</p></div>");
})();
