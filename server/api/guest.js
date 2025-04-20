const faq = async (request, response) => {
    const formatted = {
        success: true,
        message: 'Successfully data loaded',
        data: {
            title: 'FAQ',
            subtitle: '',
            faqs: [
                {
                    title: 'What happens when I connect my account?',
                    description: "<p data-v-5cccc4d0=\"\">\n" +
                        "            All past and future communication will be archived into an archive\n" +
                        "            owned and controlled by the person or company who sent the\n" +
                        "            request. They will retain this record which makes it subject to\n" +
                        "            legal discovery or regulatory review.\n" +
                        "          </p> <br data-v-5cccc4d0=\"\"> <p data-v-5cccc4d0=\"\">\n" +
                        "            With social media, normally, all posts, media, likes, comments,\n" +
                        "            and other similar activity is archived for a period of time (or\n" +
                        "            indefinately). This archiving activity may extend beyond your\n" +
                        "            association with the person or company. They control how long this\n" +
                        "            is and are able to download it and retain it at their discretion.\n" +
                        "          </p>",

                },
                {
                    title: 'Why am I being asked to do this?',
                    description: "<p data-v-5cccc4d0=\"\">\n" +
                        "            In short, you should ask the person who sent it to you. In many\n" +
                        "            industries, companies are required to keep an archive of all\n" +
                        "            communications. If you want to learn more about the various\n" +
                        "            industries required to do this or our privacy policy, please visit\n" +
                        "            us at sharparchive.com or click on our logo.\n" +
                        "          </p> <br data-v-5cccc4d0=\"\"> <p data-v-5cccc4d0=\"\">\n" +
                        "            If you were not expecting this request or it doesn't feel right to\n" +
                        "            you, you should definately not connect your account. Once you\n" +
                        "            connect your account, the archiving process starts immediately.\n" +
                        "          </p>",
                },
                {
                    title: 'Isn’t this a violation of my privacy?',
                    description: "<p data-v-5cccc4d0=\"\">\n" +
                        "            Possibly. For most of our users, they are only archiving business\n" +
                        "            communication so the notion of privacy has more latitude. Again,\n" +
                        "            we would direct you back to the person or company requesting this.\n" +
                        "          </p>",
                },

            ]
        }
    }
    response.send(formatted)
}

module.exports = {
    faq,
}