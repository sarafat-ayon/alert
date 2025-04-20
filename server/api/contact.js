const contact = (request, response) => {
    const formatted = {
      success: true,
      message: 'Data successfully loaded',
      data: {
        title: "Contact",
        email: "help@greenstaradvisors.com",
        phone: "1-888-111-2222"
      },
      errors: [],
    }
    response.send(formatted)
  }
  
  module.exports = {
    contact,
  }