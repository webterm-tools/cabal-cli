const libsodium = require("./polyfills/libsodium");

libsodium.then(() => {
  require("cabal/cli.js")
})