// eslint-disable-next-line require-await
const peopleSay = async (request, response) => {
    const formatted = {
      success: true,
      message: 'Successfully data loaded',
      data: {
        title: `<h1>What <b>Peoples</b> Are Saying</h1>`,
        subtitle: "",
        reviews:
          [
            {
              logo: '/images/people-say/acme-logo-1.png',
              message: `Sharp Archive is absolute dream. Before we always worried about our communication exposure, but we didn’t have the resources to monitor every message. Our company would have needed three full time positions to do what this does in real time.`,
              avatar: '/images/people-say/images.png',
              name: 'Bob Smith',
              designation: 'Chief Compliance Officer',
              rating: 4.5,
            },
            {
              logo: '/images/people-say/acme-logo-2.png',
              message: `This does exactly what we needed it to do. The interface is simple and elegant and it simply works. We appreciate that we can cancel at any time, but there’s nothing better, let alone at this price point.` +
                '',
                avatar: '/images/people-say/images.png',
                name: 'Bob Smith',
              designation: 'Chief Compliance Officer',
              rating: 4.5,
            },
            {
              logo: '/images/people-say/acme-logo-3.png',
              message: `We came to Sharp Archive after a difficult experience with a lawsuit. If we had known about some rogue activities of one of our team members, we could have addressed the problem and avoided this painful situation.`,
                avatar: '/images/people-say/images.png',
                name: 'Bob Smith',
              designation: 'Chief Compliance Officer',
              rating: 4.0,
            }
          ]
      }
    }
    response.send(formatted)
  }
  

  module.exports = {
    peopleSay,
  }
  