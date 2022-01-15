const fs = require("fs");
const { render } = require("./framework");

const html = render("templates/index.html");
fs.writeFileSync("./public/index.html", html);
