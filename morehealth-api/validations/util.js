const checkEmpty = (parameter) => {
    if (parameter == '' || parameter == undefined) {
        return true
    }
    return false
}

module.exports = {
    checkEmpty
}