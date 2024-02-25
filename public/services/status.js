const checkStatus = async () => {
  try {
    return 'Hello'
  } catch (err) {
    console.error(err)
    return false
  }
}

module.exports = { checkStatus }
