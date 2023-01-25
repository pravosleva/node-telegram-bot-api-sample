module.exports = {
  delay: (ms) => new Promise((res, _rej) => setTimeout(res, ms))
}
