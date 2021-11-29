const { EventEmitter } = require("events");

function createUtp() {
  
  const server = new EventEmitter();
  
  server.send = (buffer, startIndex, length, port, host) => {
  }

  server.listen = () => {
    server.emit('listening')
  }

  server.connect = (port, host) => {
  }

  server.bind = (port, addr) => {
  }

  server.address = () => {
  }

  server.close = () => {
  }
  
  return server
}

module.exports = createUtp