const getPDF = (request, response) => {
    const formatted = {
        success: true,
        message: 'PDF Successfully fetched',
        data: "http://localhost:9000/assets/pdf/Md.Sarafat Ullah_AUST_CSE_2015.pdf",
        errors: [],
    }
    response.send(formatted)
}

module.exports = {
    getPDF,
}
