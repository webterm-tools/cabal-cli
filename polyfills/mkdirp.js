const fs = require('fs');

const functions = {
  native: async (path, opts) => {
    opts = getOpts(opts)
    return await fs.promises.mkdir(path, opts)
  },
  manual: async (path, opts) => {
    opts = getOpts(opts)
    return await fs.promises.mkdir(path, opts)
  },

  sync: (path, opts) => {
    opts = getOpts(opts)
    return fs.mkdirSync(path, opts)
  },
  nativeSync: (path, opts) => {
    opts = getOpts(opts)
    return fs.mkdirSync(path, opts)
  },
  manualSync: (path, opts) => {
    opts = getOpts(opts)
    return fs.mkdirSync(path, opts)
  },
}

function getOpts(opts) {
  if (!opts)
  opts = { mode: 777 }
  else if (typeof opts === 'object')
  opts = { mode: opts.mode || 777 }
  else if (typeof opts === 'number')
  opts = { mode: opts }
  else if (typeof opts === 'string')
  opts = { mode: parseInt(opts) }
  else
  throw new TypeError('invalid options argument')

  opts.recursive = true
  return opts;
}

module.exports = functions.native
Object.assign(module.exports, functions);