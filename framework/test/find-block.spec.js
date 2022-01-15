const assert = require("assert");
const findBlock = require("../find-block");

(function () {
  const content = "<p>Foo</p>";
  const index = 0;
  const res = findBlock("<p>", "</p>", content, index);
  assert.notStrictEqual(res, null);
  assert.strictEqual(res.content, "Foo");
  assert.strictEqual(res.startIndex, index);
  assert.strictEqual(res.endIndex, content.length - 1);
  assert.strictEqual(
    content.substring(res.startIndex, res.endIndex + 1),
    content
  );
})();

(function () {
  const content = "{{ foo }}";
  const index = 0;
  const res = findBlock("{{", "}}", content, index);
  assert.notStrictEqual(res, null);
  assert.strictEqual(res.content, " foo ");
  assert.strictEqual(res.startIndex, index);
  assert.strictEqual(res.endIndex, content.length - 1);
  assert.strictEqual(
    content.substring(res.startIndex, res.endIndex + 1),
    content
  );
})();

(function () {
  const content = "foo<script>bar</script>baz";
  const index = 3;
  const res = findBlock("<script>", "</script>", content, index);
  assert.notStrictEqual(res, null);
  assert.strictEqual(res.content, "bar");
  assert.strictEqual(res.startIndex, index);
  assert.strictEqual(res.endIndex, 22);
  assert.strictEqual(
    content.substring(res.startIndex, res.endIndex + 1),
    "<script>bar</script>"
  );
})();

(function () {
  const content = "foo {{ bar }} baz";
  const index = 4;
  const res = findBlock("{{", "}}", content, index);
  assert.notStrictEqual(res, null);
  assert.strictEqual(res.content, " bar ");
  assert.strictEqual(res.startIndex, index);
  assert.strictEqual(res.endIndex, 12);
  assert.strictEqual(
    content.substring(res.startIndex, res.endIndex + 1),
    "{{ bar }}"
  );
})();
