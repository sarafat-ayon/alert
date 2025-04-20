const postQuestion = (request, response) => {
    if (request.body.query) {
        const formatted = {
            success: true,
            message: 'Query Successfully Submitted',
            data: {
                id: 1,
                question: request.body.query,
                email: request.body.email
            },
            errors: [],
        }
        response.send(formatted)
    } else {
        const formatted = {
            success: false,
            message: 'Something is wrong please try again later!!',
            data: {},
            errors: [],
        }
        response.send(formatted)
    }

}
const problem = (request, response) => {
    if (request.body.query) {
        const formatted = {
            success: true,
            message: 'Problem Successfully Submitted',
            errors: [],
        }
        response.send(formatted)
    } else {
        const formatted = {
            success: false,
            message: 'Something is wrong please try again later!!',
            data: {},
            errors: [],
        }
        response.send(formatted)
    }

}

const about = (request, response) => {
    const formatted = {
        success: true,
        message: 'Data successfully loaded',
        data: {
            title: 'About US',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque tempor hendrerit magna, eu scelerisque lectus scelerisque ac. Pellentesque elementum massa eget sem hendrerit ultrices. Aenean ornare orci odio, vel mattis lorem lacinia in. Pellentesque orci tortor, fermentum id tempor a, lobortis et purus. Cras nulla leo, mattis sed rhoncus non, volutpat a lectus. Cras urna mauris, porttitor sed vestibulum in, tincidunt quis nulla. Vestibulum quis neque sit amet nisi semper auctor sed nec justo. Integer aliquam rutrum mauris, non posuere nisl finibus sit amet. Nam ut fringilla lectus, ut molestie ligula. Maecenas gravida in arcu a ullamcorper.'
        },

    }
    response.send(formatted)
}

const troubleshoot = (request, response) => {
    const formatted = {
        success: true,
        message: 'Data successfully loaded',
        data: {
            title: 'TroubleShoot',
            description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
        }
    }
    response.send(formatted)
}

const faq = (request, response) => {
    const formatted = {
        success: true,
        message: 'Data successfully loaded',
        data: {
            title: 'FAQ',
            faqs: [
                {
                    question: 'Why are your archiving prices so much less than other services?',
                    answer: 'Because we value cleverness over cost. we use technology to help us be efficient and to pass those savings on to you.'
                },
                {
                    question: 'Will you increase your prices?',
                    answer: 'Not anytime soon. As our user base grows, our costs go down per user.'
                },
                {
                    question: 'Are you going to add other archiving services?',
                    answer: "We created this company because we saw that there wasn't an affordable and transparent social media archiving service. If enough of our users want to feature or service, we will create it as quickly as possible. If you want something, please drop us a note and we'll see what we can do."
                }
            ],


        },
    }
    response.send(formatted)
}
const contact = (request, response) => {
    const formatted = {
        success: true,
        message: 'Data successfully loaded',
        data: {
            title: "Contact",
            email: "help@greenstaradvisors.com",
            phone: "1-888-111-2222",
        },
    }
    response.send(formatted)
}






module.exports = {
    postQuestion,
    problem,
    about,
    troubleshoot,
    faq,
    contact,
}



