const webpack = require("webpack");
const path = require("path");

module.exports =   {
  entry: {
    app: "./index.js",
  },
  output: {
    path: path.resolve("./dist"),
    filename: "index.js",
    library: {
      type: "commonjs2"
    }
  },
  mode: "development",
  target: "webworker",
  optimization: {
    nodeEnv: false,
  },
  module: {
    rules: [
      {
        test: require.resolve("utp-wasm/binding-inline.js"),
        use: {
          loader: 'exports-loader',
          options: {
            exports: "single Module",
            type: 'commonjs'
          }
        }
      },
    ]
  },
  resolve: {
    alias: {
      // dgram: require.resolve("./polyfills/dgram.js"),
      //"noise-protocol": path.join(__dirname, "./node_modules/noise-protocol"),
      "utp-native": require.resolve("utp-wasm"), //require.resolve("./polyfills/no-utp"), 
      "mkdirp": require.resolve("./polyfills/mkdirp"),
      "multicast-dns": require.resolve("./polyfills/multicast-dns"),
      "utp-wasm": require.resolve("utp-wasm"),
      "supports-color": require.resolve("./polyfills/supports-color"),
      "sodium-js": require.resolve("sodium-javascript"),
      "random-access-memory": require.resolve("random-access-memory"),
      "random-access-file": require.resolve("random-access-memory"),
      "hyperswarm": require.resolve("hyperswarm"),
      "ws": require.resolve("@network-stackify/ws")
    }
  },
  externals: {
    //This feels good being able to separate the two scripts dependencies, God bless.
    dgram: "dgram",
    assert: "assert",
    buffer: "buffer",
    child_process: "child_process",
    console: "console",
    constants: "constants",
    crypto: "crypto",
    domain: "domain",
    events: "events",
    fs: "fs",
    http: "http",
    https: "https",
    net: "net",
    os: "os",
    path: "path",
    punycode: "punycode",
    process: "process",
    querystring: "querystring",
    readline: "readline",
    repl: "repl",
    stream: "stream",
    string_decoder: "string_decoder",
    sys: "sys",
    timers: "timers",
    tls: "tls",
    tty: "tty",
    url: "url",
    util: "util",
    vm: "vm",
    zlib: "zlib",
    cluster: "cluster",
    dns: "dns",
    http2: "http2",
    perf_hooks: "perf_hooks",
    v8: "v8",
    worker_threads: "worker_threads",

    "graceful-fs": "graceful-fs"
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/(sodium-javascript|sodium-native|sodium-universal)/,
      (resource) => {
        if (/(cabal|hmac-blake2b)/.test(resource.context)) { 
          resource.request = require.resolve("./polyfills/libsodium")
        }
      }
    ),
  ]
}