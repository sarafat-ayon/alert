const intro = (request, response) => {
  const formatted = {
    success: true,
    message: 'Data successfully loaded',
    data: {
      title: '<h1>Crushing Your <b>Communication</b> Risk</h1>',
      description:`Communication is one of the greatest risks a company faces. Whether
      these risks are financial or reputational, exposure is growing
      <br />
      with new technologies. Is your power to mitigate your risks ready to
      scale with the future?`,
      color: '#C2C2C2',
      media: '/images/landing/intro.png',
      mediaType: 'image',
    },
    errors: [],
  }
  response.send(formatted)
}

module.exports = {
  intro,
}
