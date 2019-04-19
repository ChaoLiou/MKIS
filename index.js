var git = require("git-rev-sync");
var fs = require("fs");

const json = {
  version: git.short(),
  name: git.branch(),
  buildtime: (new Date()).toLocaleDateString() + ", " + (new Date()).toLocaleTimeString()
};

fs.writeFileSync("revision.json", JSON.stringify(json), {
  encoding: "utf8",
  flag: "w"
});
