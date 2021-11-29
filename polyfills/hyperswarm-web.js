const hyperswarm = require("hyperswarm-web");
module.exports = (opts) => {
    //opts.wsProxy = "ws://localhost:50000";
    //opts.bootstrap = ["wss://swarm.cblgh.org"];
    return new hyperswarm(opts);
}