const assert = require("assert");
const render = require("../render");

(function () {
  const res = render("framework/test/templates/index.html", {
    title: "foo",
    word: "bar",
    number: 1337,
  });
  assert.strictEqual(
    res,
    "<div><small>1337</small><h1>foo</h1><p>bar</p></div>"
  );
})();
