
const errorMessage = (message, status) => {
    return {
        error: message,
        status: status
    }
}

const successMessage = (message, data) => {
    return {
        message: message,
        data: data
    }
}


module.exports = {errorMessage, successMessage}