const { EventEmitter } = require("events");

function multicast() {
  const multicast = new EventEmitter();

  multicast.query = () => { 
  }

  multicast.destroy = () => { 
  }

  multicast.response = () => { 
  }

  return multicast
}

module.exports = multicast