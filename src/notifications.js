const notificationSuccess = (message) => {
    M.toast({ html: `${message}`, classes: 'rounded green' })
}

const notificationError = (message) => {
    M.toast({ html: `${message}`, classes: 'rounded red' })
}

const notificationAlert = (message) => {
    M.toast({ html: `${message}`, classes: 'rounded yellow' })
}

module.exports = {
    notificationSuccess,
    notificationError,
    notificationAlert
}