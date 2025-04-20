const getImage = (request, response) => {
  const formatted = {
    success: true,
    message: 'Image Successfully Downloaded',
    data: 'http://localhost:9000/assets/img/image.jpg',
    errors: [],
  }
  response.send(formatted)
}

module.exports = {
  getImage,
}
