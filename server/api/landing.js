// eslint-disable-next-line require-await
const about = async (request, response) => {
  const formatted = {
    success: true,
    message: 'Successfully data loaded',
    data: {
      title: 'About',
      description:
        '<p data-v-fc5aff78="">\n' +
        '            Sharp Archive started when we found ourselves in the same position\n' +
        '            as many of our new users. Our background is in the financial\n' +
        '            services industry - required by regulation to archive all\n' +
        '            communications.\n' +
        '            <br data-v-fc5aff78=""> <br data-v-fc5aff78="">\n' +
        '            We looked at many products that did this and read every review we\n' +
        '            could find. We were stunned by four things:\n' +
        '            <br data-v-fc5aff78="">\n' +
        '            1) How expensive the products were <br data-v-fc5aff78="">\n' +
        '            2) That companies seemed to keep your data hostage (or put it in\n' +
        '            an unusable format) <br data-v-fc5aff78="">\n' +
        '            3) How the software looked like it was from 1995 <br data-v-fc5aff78="">\n' +
        '            4) Unethical sales practices users were reporting <br data-v-fc5aff78=""> <br data-v-fc5aff78="">\n' +
        '            The best ideas come from solving your own problems. If Sharp\n' +
        '            Archive existed when we were looking for a solution, we wouldn’t\n' +
        '            have created it. <br data-v-fc5aff78=""> <br data-v-fc5aff78="">\n' +
        '            As we worked, our passion grew. At first, our goal was to create a\n' +
        '            product at a lower price point. We felt that those required to do\n' +
        '            this would appreciate paying less. However, as we formalized the\n' +
        '            concept of “communication risk,” Sharp Archive blossomed into a\n' +
        '            risk mitigation machine. <br data-v-fc5aff78=""> <br data-v-fc5aff78="">\n' +
        '            We’re proud that we can still deliver the most affordable\n' +
        '            archiving solution on the market, while also providing this\n' +
        '            through arguably the best user interface with cutting edge\n' +
        '            features that help you mitigate communication risk. <br data-v-fc5aff78=""><br data-v-fc5aff78="">\n' +
        '            When you use Sharp Archive, it is like hiring an army of\n' +
        '            communication supervisors. It helps you use technology to leverage\n' +
        '            existing compliance capacity</p>',
      media: 'https://www.youtube.com/watch?v=PeucNXpdNKA',
      mediaType: 'video',
    },
  }
  response.send(formatted)
}

// eslint-disable-next-line require-await
const faq = async (request, response) => {
  const formatted = {
    success: true,
    message: 'Successfully data loaded',
    data: {
      title: 'FAQ',
      subtitle: '',
      faqs: [
        {
          title: 'What’s a Feed?',
          description:
            'This is our term for a single stream of data into your archive or what is on your end, a ch' +
            'annel of communication. This may be a single Twitter or email account. Or it could be ' +
            'an instant messaging account or a phone number for text archiving. Each of these individuall' +
            'y are “feeds” which you can add or delete from your archive at any time.',
        },
        {
          title: 'What is the price for services?',
          description:
            '<p class="">\n' +
            '            We use single plan pricing that is simple, transparent, and a la\n' +
            '            carte. Personally, we get annoyed with forgetting to cancel software\n' +
            '            before the renewal date. We don’t like the feeling of evaluating\n' +
            '            basic vs. professional and wanting a single feature at the higher\n' +
            '            level, but not wanting to pay for the other things we don’t need.\n' +
            '\n' +
            '            <br><br>\n' +
            '            We only offer monthly billing (no annual or long term contracts). We\n' +
            '            have a flat monthly cost of $32, plus we charge $4 per feed and\n' +
            '            $0.10 for each GB of storage. You can scale up or down your services\n' +
            '            at any point in time. When adding or deleting a feed, the cost is\n' +
            '            always prorated. This means that you only pay for the days that you\n' +
            '            use it. If you choose to end service mid-cycle, we credit your\n' +
            '            account the remainer of the cycle.\n' +
            '            <br><br>\n' +
            '            Let’s say for easy math you are archiving 7 feeds. This works out to\n' +
            '            $60 ($32 + $4 x 7 feeds). <br>\n' +
            '            <br>\n' +
            '            For storage, the cost is $0.10 per GB of storage per month. To get a\n' +
            '            sense of this, it’s going to depend on:\n' +
            '            <br>\n' +
            '\n' +
            '            - How many accounts you have <br>\n' +
            '            - How often the accounts are posting (more posts = more storage)\n' +
            '            <br>\n' +
            '            - What format you are archiving it in (picture formats such as JPG\n' +
            '            take up more storage than simple formats like CSV) <br>\n' +
            '            - How long you are storing the data (obviously keeping it longer\n' +
            '            makes your storage larger) <br>\n' +
            '            <br>\n' +
            '            We’ll use an extreme example. Let’s say a feed post three times per\n' +
            '            day and wish to store your archive in JPG format (the most data\n' +
            '            intensive). This will be about 0.012 GB in new storage per month.\n' +
            '            The first month cost would be $0.0003 (yes, this is three one\n' +
            '            hundredths of a penny). But this would build up and after five\n' +
            '            years, this storage cost would balloon to 0.72 GB and would cost\n' +
            '            $0.018 per month (yes, as in 1.8 cents). <br>\n' +
            '            <br>\n' +
            '\n' +
            '            You may ask, “Why bother charging people for it?” This adds up for\n' +
            '            us and we feel that the best approach is to incentivize our users to\n' +
            '            manage their own storage costs.\n' +
            '            <br>\n' +
            '            <br>\n' +
            '            Pro tip: if you want to have keep your storage cost as low as\n' +
            '            possible with us, have us automatically send your archive to you\n' +
            '            while also automatically deleting it as frequently as possible. Keep\n' +
            '            in mind that many regulations require you to store your archive\n' +
            '            offsite. <br>\n' +
            '          </p>',
        },
        {
          title: 'Do you provide enterprise discounts?',
          description:
            '<span>The short answer is no. We believe in simple and transparent pricing that can fairly scale up or down with use. Everybody gets the same pricing relative to their use. In fairness to everyone, we do not negotiate our prices.</span>',
        },
        {
          title: 'How will billing work?',
          description:
            '<p class="">\n' +
            '            Each month your payment will be drawn automatically and you will\n' +
            '            receive an invoice detailing the costs. The invoice is emailed to\n' +
            '            you and a copy is automatically stored for you in your account where\n' +
            '            you can download it.\n' +
            '            <br><br>\n' +
            '            The invoice has two parts (1) costs billed in arrears (2) costs\n' +
            '            billed in advance. We bill you in arrears for the last month’s\n' +
            '            storage costs and partial months for new feeds added (minus a credit\n' +
            '            for feeds terminated). We bill you in advance for the next month’s\n' +
            '            service. We realize that this is a little weird, but our goal is to\n' +
            '            enable users to only pay for their usage and to refund users who\n' +
            '            terminate feeds or close their accounts in the middle of a cycle.\n' +
            '            <br><br>\n' +
            '            Your cycle starts on the day you start services. For example, today\n' +
            '            is [Friday, September 30, 2021]. If you start service today, your\n' +
            '            billing cycle always start on the [28rd] of the month. [We start it\n' +
            '            on the 28th because of February and we wish to have it consistent\n' +
            '            for you throughout the year.] <br><br>This invoice clearly\n' +
            '            details the costs and how they were calculated. Here is a sample\n' +
            '            invoice.\n' +
            '          </p>',
        },
        {
          title: 'How does it work if I add services?\n',
          description:
            'In the same spirit of transparency and fairness, if you add services mid-cycle,' +
            ' you only pay for the days you use. It costs $6 per feed. If you add a new feed mid-month, ' +
            'then you only pay $3 for that month which is added to your next bill. Because we bill feed costs' +
            ' in advance, you would see $3 for 15 days of the previous' +
            ' cycle, and then $6 in advance for the next cycle.',
        },
        {
          title: 'How does closing my account work?',
          description:
            '<p class="">\n' +
            '            Your experience with us will always be transparent and efficient,\n' +
            '            even your final one. Closing your account is never more than three\n' +
            '            clicks away from any place within Sharp Archive. It’s also in a\n' +
            '            logical location (1) Settings (2) Account (3) Close Account (you’ll\n' +
            '            see the button down in the billing area). <br><br>\n' +
            '            Above the button, you’ll see how much you would be refunded if you\n' +
            '            close your account. This amount is updated daily. Yes, we give you\n' +
            '            money to close your account. We feel that the best way to know that\n' +
            '            you love us and our service is if you choose to stay even if we paid\n' +
            '            you to leave. <br><br>Besides, we bill in advance, so it only\n' +
            '            seems fair to refund you the rest of the month minus any storage\n' +
            '            costs up that point. For example, let’s say you are paying $60 per\n' +
            '            month (or $2 per day) in archiving and $3 per month (or $0.10 per\n' +
            '            day) in storage. If you close your account 10 days into a 30 day\n' +
            '            month, we would refund you the $40 for the archiving ($2 x 10 days),\n' +
            '            but subtract $1 ($0.10 x 10 days) for the storage cost for a net\n' +
            '            refund amount of $39. <br><br>\n' +
            '            And that’s it. If you break up with us, we’re not going to throw all your  stuff out on the lawn.\n' +
            '          </p>',
        },
        {
          title: `Is there a free version or free trial?`,
          description: `Nope. It’s better for both of us to give you open access to a demo version of Sharp Archive. This demo doesn’t require you to provide your contact information or set an appointment with a sales rep - we hate that too. You’ll see what it does and how it does it. It should be enough to make your buying decision. If you sign up, onboarding usually takes less than 5 seconds per feed. To see that demo, click here.<br><br>
          As far as a free trial, you have the power to not pay for things you don’t need. Because we refund the remainder of the monthly cost to you, effectively you only pay for each day you use it. If you are new, try it out and only pay for one day of use. If you try it for a couple of days and it’s not what you want, please let us know and we can refund your money.
          `,
        },
        {
          title:
            'I’m a raving fan of Sharp Archive, how can I help you grow?\n',
          description:
            '<p class="">\n' +
            '            Golly gee, that’s nice of you. There are three main ways that you\n' +
            '            can help us: <br>\n' +
            '            1) Take a moment and remember how you found us. Was it through a\n' +
            '            review website? Was it through an online forum? Please go back there\n' +
            '            and share what you’ve found. <br>2) If you feel we’ve earned it,\n' +
            '            the best way to help is is to write glowing online reviews to help\n' +
            '            others discover us.<br>3) We pride ourselves on\n' +
            '            rapidly implementing  excellent ideas. If you give us an\n' +
            '            excellent idea, we like to show off how quickly we can make it real\n' +
            '            for you. Feel free to take challenge us below. These go straight\n' +
            '            to our development team and we may include you in the process if it\n' +
            '            interests you.\n' +
            '          </p>',
        },
      ],
    },
  }
  response.send(formatted)
}

const industries = async (request, response) => {
  const formatted = {
    success: true,
    message: 'Successfully data loaded',
    data: {
      title: 'Industries',
      description:
        'Whether you are required to archive or choose to be proactive, our goal is ' +
        'to help you reduce your exposure to communication risk before it becomes a fine, lawsuit, or' +
        ' headline. Sharp Archive serves companies ' +
        'across multiple core industries and can accommodate various regulatory standards.',
      content: [
        {
          layout: 'section-1',
          logo: '/images/industries/bank-purpel.png',
          title: 'Financial Services',
          titleColor: '#7D80BD',
          description:
            '\n' +
            '    <p>\n' +
            '            Banks, insurance companies, broker-dealers, and investment firms\n' +
            '            are normally subject to mandatory communication retention and eDiscovery\n' +
            '            rules and regulations.\n' +
            '          </p> <br> <p>\n' +
            '            Sharp Archive is designed to comply with the nuances of your\n' +
            '            particular requirements. Typically electronic records must be\n' +
            '            preserved exclusively in a non-rewriteable and non-erasable format\n' +
            '            with accessibility for a period of time. You can adjust your\n' +
            '            retention period and have your records automatically deleted past\n' +
            '            that period of time.\n' +
            '          </p> <br> <p>\n' +
            '            Often laws have requirements for keeping duplicate records. If you\n' +
            '            wish for us to electronically deliever your archive to you through\n' +
            '            email or upload it to a cloud folder, we can do this at your\n' +
            '            chosen interval (such as every week, month, or quarter). Often\n' +
            '            duplicate records must also be kept at an off-site location. Sharp\n' +
            '            Archive’s interpretation of this is that cloud storage should\n' +
            '            qualify as an off-site location.\n' +
            '          </p>',
          media: '/images/industries/shapes-3.png',
          mediaType: 'image',
        },
        {
          layout: 'section-2',
          logo: '/images/industries/government.png',
          title: 'Government',
          titleColor: '#8DB230',
          description:
            '<p>\n' +
            '            Social media is considered public record in all of the United\n' +
            '            States. It’s crucial that government organizations are prepared to\n' +
            '            respond to Freedom of Information Act (FOIA) requests.\n' +
            '          </p> <br> <p>\n' +
            '            FOIA has vastly expanded transparency between government and the\n' +
            '            people. From a logistics standpoint, it has also created many\n' +
            '            challenges for agencies who must abide by it.\n' +
            '          </p>  <br> <p>\n' +
            '            Sharp Archive makes answering FOIA requests quick and efficient.\n' +
            '            You can quickly search your archive by date ranges, specific\n' +
            '            feeds, or content. The results can be immediately downloaded and\n' +
            '            delivered to satisfy the request.\n' +
            '          </p>',
          media: 'https://www.youtube.com/watch?v=ex7jGbyFgpA',
          mediaType: 'image',
        },
        {
          layout: 'section-3',
          logo: '/images/industries/politician.png',
          title: 'Politicians',
          titleColor: '#265198',
          description:
            '<p>\n' +
            '            How many good causes have been ruined through problematic\n' +
            '            communication? Constantly, politicians are brought to their knees\n' +
            '            when embarassing communication is brought to light. In some\n' +
            '            instances, this was only among staff members.\n' +
            '          </p> <br/> <p>\n' +
            '            With Sharp Archive, we aim to help you get ahead of PR nightmares\n' +
            '            and be aware of situations before they are leaked.\n' +
            '          </p>  <br/> <p>\n' +
            '            Because of our automatic delivery possibilities, we can help you\n' +
            '            deliver on messages of transparency by offering real time full\n' +
            '            disclosure.\n' +
            '          </p>',
          media: '/images/industries/shapes-politician.png',
          mediaType: 'image',
        },
        {
          layout: 'section-2',
          logo: '/images/industries/law-enforcement.png',
          title: 'Law Enforcement\n',
          titleColor: '#E0AD1F',
          description:
            '<p>\n' +
            '            Serving and protecting your citizens is always challenging. Technology empowers service, but also introduces new complications and vulnerabilities. In many jurisdictions, law enforcement agencies must abide by public record laws and to be able to respond to information requests in a reasonable amount of time. <br>\n' +
            '            By archiving, it protects your agency’s communications and creates a timestamped and defendable record. Sharp Archive makes your efforts easier through near real time archiving into a searchable and instantly downloadable file based on your parameters.\n' +
            '          </p>',
          media: '/images/industries/law_enforcement.png',
          mediaType: 'image',
        },
        {
          layout: 'section-1',
          logo: '/images/industries/healthcare.png',
          title: 'Healthcare',
          titleColor: '#5E89D4',
          description:
            '<p>\n' +
            '            Like many industries, healthcare comes down to trust. Trust is very difficult to gain and very easy to lose. When it comes to serving a community, it’s imperative that reputations are protected and information is accurately provided.\n' +
            '            <br>\n' +
            '            In many states, archiving social media communication is not just a best practice, but it is required by law along with other regulations to archive incoming and outgoing correspondence, or private patient records.\n' +
            '            <br>\n' +
            '            Sharp Archive empowers you to accomplish all of this in a centralized location that helps you comply with retention and archiving requirements while also minimizing your communication risks that may result in lawsuits, fines, or internal conflict.\n' +
            '          </p>',
          media: '/images/industries/healthcare-shapes.png',
          mediaType: 'image',
        },
        {
          layout: 'section-2',
          logo: '/images/industries/educations.png',
          title: 'Education',
          titleColor: '#E05252',
          description:
            '<p>\n' +
            '            As a public entity, in many cases, school districts must maintain compliance with the Freedom of Information laws in their state. Sharp Archive makes it easy to create your own private searchable archive of all social media content to minimize this burden on your school district. You can easily and quickly download some or all of your content within minutes. <br>\n' +
            '            Social media content can pose risks to school districts. Often lawsuits are empowered when old social media posts are dug up from the past. Sharp Archive keeps you ahead of your risks by enabling you to quickly identify problematic communication.\n' +
            '          </p>',
          media: '/images/industries/education.png',
          mediaType: 'image',
        },
      ],
      footerText:
        '<p>\n' +
        '        This is meant for general educational purposes only and should not be\n' +
        '        interpreted as individual advice or negate the need for an attorney.\n' +
        '        Sharp Archive LLC assumes no liability for the accuracy or\n' +
        '        completeness of this information. Please consult with an attorney for\n' +
        '        your individual situation and the specific rules and regulations that\n' +
        '        apply to your organization.\n' +
        '      </p>',
    },
  }
  response.send(formatted)
}

// eslint-disable-next-line require-await
const willYouHelp = async (request, response) => {
  setTimeout(() => {
    const formatted = {
      success: true,
      message: 'Successfully data loaded',
      data: {
        title: `<h1>
      We'll Help <b>You</b>
    </h1>`,
        subtitle: '',
        features: [
          {
            title: 'Satisfy Archiving Requirements\n',
            color: '#314317',
            image: '/images/landing/satisfy-archiving-requirments-green.png',
          },
          {
            title: 'Flag Problematic Communication\n',
            color: '#474481',
            image: '/images/landing/flag-problematic-communication.png',
          },
          {
            title: 'Reduce Communication Risk\n',
            color: '#9d1616',
            image: '/images/landing/reduce-communication-risk.png',
          },
        ],
      },
    }
    response.send(formatted)
  }, 2000)
}

// eslint-disable-next-line require-await
const addFeedExplanation = async (request, response) => {
  const formatted = {
    success: true,
    message: 'Successfully data loaded',
    data: {
      overview:
        'Today you have added 3 new feeds to your archive. Because there are 24 days left in your billing cycle, we will add $9.29 to your next invoice. Click here for explanation.',
      description:
        'We believe in radical transparency and fairness. This leads us to do things a little differently.\n' +
        '          <br data-v-36f36c89=""> <br data-v-36f36c89="">\n' +
        '          When you add\n' +
        '          a new feed in the middle of your billing cycle, it wouldn’t be fair to charge you the full $4.00. So we\n' +
        '          prorate it based on the remaining days in the cycle.\n' +
        '          <br data-v-36f36c89=""> <br data-v-36f36c89="">\n' +
        '          For example, if you add a feed halfway through your cycle\n' +
        '          (or 15 days), then we would only bill you $2.00.\n' +
        '          <br data-v-36f36c89=""> <br data-v-36f36c89="">\n' +
        '          Also, because you probably don’t want a lot of small charges,\n' +
        '          we add it to your next bill.\n' +
        '          <br data-v-36f36c89=""> <br data-v-36f36c89="">\n' +
        '          On your invoice, you’ll see two sections for “Costs Billed in Arrears” and “Costs\n' +
        '          Billed in Advance.”\n' +
        '          <br data-v-36f36c89=""> <br data-v-36f36c89="">\n' +
        '          A new feed will be in both sections. For this example, you would be billed $2.00 in\n' +
        '          arrears for the previous 15 days and $4.00 in advance for the next cycle. Future months would only be the\n' +
        '          normal $4.00 in advance.\n' +
        '          <br data-v-36f36c89=""> <br data-v-36f36c89="">\n' +
        '          Of course, in the spirit of fairness, the reverse of this is also true. If you\n' +
        '          terminate archiving a feed in the middle of a cycle, we will credit you the remaining days on your next\n' +
        '          invoice (because you have already paid us the $4.00 in advance for that feed). If you terminated a feed with\n' +
        '          9\n' +
        '          days left on a 31 day cycle, we would credit you $1.16 (9/31 x $4.00). Similarly, if you close your account\n' +
        '          entirely, we would credit you in a similar manner.\n' +
        '          <br data-v-36f36c89=""> <br data-v-36f36c89="">',
    },
  }
  response.send(formatted)
}

const estimatedCost = async (request, response) => {
  const formatted = {
    success: true,
    message: 'Successfully data loaded',
    data: {
      baseCost: 32.0,
      feedCost: 4.0,
      storageCost: 0.1,
      estimatedStoragePerMonth: 0.2,
    },
  }
  response.send(formatted)
}

const features = async (request, response) => {
  const formatted = {
    success: true,
    message: 'Successfully data loaded',
    data: [
      {
        key: 'right-image',
        // media:"https://www.youtube.com/watch?v=q6rk7iZQkP4",
        // mediaType: 'video',
        media: '/images/landing/simple-pic.png',
        mediaType: 'image',
        section1: {
          title: 'Simple',
          color: '#8db230',
          itemsColor: '#656565',
          items: [
            'Communication is automatically archived in real time.',
            'Search your entire archive or limit it to specific dates, feeds, users, or groups.',
            'Download any and all of your archive (or have us automatically deliver it to you).',
            'Your archive is stored for as long as you choose.',
          ],
        },
        section2: {
          title: 'Compliant',
          color: '#7d80bd',
          itemsColor: '#656565',
          items: [
            'Designed to meet multiple industry standards such as FOIA, HIPAA, FINRA 10-06 and 11-39, NASD 130, SEC 17a(3) and 17a(4), FRCP, GDPR, and MiFID II',
            'Communication is captured and stored in real time (always less than one day) to ensure compliance with FINRA, SEC, MiFID, FOIA, GDPR, CCPA, FCA, and FERC            ',
            'Archive stored according to WORM rule (Write Once, Read Many)            ',
            'Records and actions are time stamped using the ANSI x9.95 standard with SHA1 digital signatures to produce a non-refutable record from a specified date',
            'Multiple options for retention scheduling and legal hold. Content can be easily retrieved for eDiscovery professionals, litigators, or regulators.            ',
          ],
        },
      },
      {
        key: 'left-image-desc',
        // media:"https://www.youtube.com/watch?v=q6rk7iZQkP4",
        // mediaType: 'video',
        media: '/images/landing/alert-picture.png',
        mediaType: 'image',
        section1: {
          title: 'Alerts in Real Time',
          color: '#e05252',
          itemsColor: '#656565',
          items: [
            'Automatically and immediately flags problematic communication.',
            'Received notifications through email and/or text (or not at all) and whichever frequency you choose including immediately.',
            'Alerts can be customized or choose from library of alerts based on your industry.',
            'Document your flagged communications, record permanent notes, and generate reports of those actions',
          ],
        },
      },
      {
        key: 'left-image',
        // media:"https://www.youtube.com/watch?v=q6rk7iZQkP4",
        // mediaType: 'video',
        media: '/images/landing/mask-group.png',
        mediaType: 'image',
        media2: '/images/landing/computer-with-button.png',
        section1: {
          title: 'Secure',
          color: '#F96D00',
          itemsColor: '#656565',
          items: [
            'Mandatory strong passwords and two-factor authentication for all users.',
            'Your archive is encrypted using AES 256-bit encryption and stored on an AWS-powered cloud.',
          ],
        },
        section2: {
          title: 'Flexible',
          color: '#E0AD1F',
          itemsColor: '#656565',
          items: [
            'Only pay for what you use - simple à la carte pricing.',
            'No contracts or commitments. Pay each month. Cancel anytime.',
            'Closing your account takes only three clicks. The button is easy to find and in a logical location.',
            'Should you cancel your account, your data goes with you and we securely delete it.',
          ],
        },
      },
    ],
  }
  response.send(formatted)
}

module.exports = {
  about,
  faq,
  industries,
  features,
  willYouHelp,
  addFeedExplanation,
  estimatedCost,
}
