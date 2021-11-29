const sodium = require('sodium-js');
const libsodium = require('libsodium-wrappers');

module.exports = libsodium.ready.then(() => {
  const _sodium = Object.assign({}, sodium, libsodium);
  _sodium.libsodium = libsodium
  _sodium.sodium = sodium

  _sodium.crypto_kx_keypair = (pk, sk) => {
    const { publicKey, privateKey } = libsodium.crypto_kx_keypair("uint8array");
    pk.set(publicKey);
    sk.set(privateKey)
  }

  _sodium.randombytes_buf = (buf) => {
    const rand = libsodium.randombytes_buf(buf.length);
    buf.set(rand);
  }

  _sodium.crypto_kx_server_session_keys = (output1, output2, clientPublicKey, clientSecretKey, serverPublicKey) => {
    const { sharedRx, sharedTx } = libsodium.crypto_kx_server_session_keys(clientPublicKey, clientSecretKey, serverPublicKey, "uint8array")
    output1.set(sharedRx);
    output2.set(sharedTx)
  }

  _sodium.crypto_kx_client_session_keys = (output1, output2, clientPublicKey, clientSecretKey, serverPublicKey) => {
    const { sharedRx, sharedTx } = libsodium.crypto_kx_client_session_keys(clientPublicKey, clientSecretKey, serverPublicKey, "uint8array")
    output1.set(sharedRx);
    output2.set(sharedTx)
  }

  _sodium.crypto_generichash = (digest, message, key) => {
    const hash = libsodium.crypto_generichash(digest.length, message, key)
    digest.set(hash);
  }

  _sodium.crypto_sign_keypair = (pk, sk) => {
    const { publicKey, privateKey } = libsodium.crypto_sign_keypair();
    pk.set(publicKey)
    sk.set(privateKey)
  }

  _sodium.crypto_sign_detached = (sig, message, sk) => {
    const signature = libsodium.crypto_sign_detached(message, sk);
    sig.set(signature)
  }

  _sodium.crypto_sign_verify_detached = (sig, msg, pk) => {
    return libsodium.crypto_sign_verify_detached(sig, msg, pk);
  }

  _sodium.crypto_aead_xchacha20poly1305_ietf_decrypt = (out, secretNonce, ciphertext, additionalData, publicNonce, key) => {
    const output = libsodium.crypto_aead_xchacha20poly1305_ietf_decrypt(secretNonce, ciphertext, additionalData, publicNonce, key)
    out.set(output);
    return output.byteLength
  }

  _sodium.crypto_aead_xchacha20poly1305_ietf_encrypt = (out, plaintext, additionalData, secretNonce, publicNonce, key) => {
    const output = libsodium.crypto_aead_xchacha20poly1305_ietf_encrypt(plaintext, additionalData, secretNonce, publicNonce, key)
    out.set(output);
    return output.byteLength
  }
  
  _sodium.sodium_memzero = _sodium.memzero
  _sodium.sodium_memcmp = _sodium.memcmp
  _sodium.sodium_is_zero = _sodium.is_zero
  _sodium.sodium_increment = _sodium.increment

  module.exports = _sodium
});