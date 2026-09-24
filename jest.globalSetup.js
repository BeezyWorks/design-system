// Date-picker snapshots render timestamps in the machine's timezone. Pin it so
// every machine and CI produces the same output.
module.exports = async () => {
  process.env.TZ = 'Asia/Jerusalem'
}
