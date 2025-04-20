import { defineStore } from "pinia"

export const useCommunication = defineStore('communication', {
  state: () => {
    return {
      allExpanded: false,
      AllEmails: [
        {
          id: 1,
          name: "Bob Smith",
          subject: "Olenna you have 27 new...",
          message: "I’ve invited you to fill out a form which will help us help you.Thank you so much for meeting with me today. It was such a pleasure to learn more about the team and position, and I’m very excited about the opportunity to join [Company Name] and help [bring in new clients/develop world-class content/anything else awesome you would be doing] with your team.",
          lastMessageTime: '11:08 am',
          showAttachmentIcon: false,
          showComplaintFlag: false,
          showFraudFlag: false,
          showSexualHarassmentFlag: false,
          showWorkplaceViolenceFlag: false,
          selectedUser: false,
          showContent: false,
          showEmails: [
            {
              collapse: {
                name: 'Bob Smith',
                email: 'bobsmith123@gmail.com',
                isAttachment: false,
                isFlag: false,
                time: 'September 20, 2021 10:11 am',
              },
              showDetails: {
                isShowDetails: false,
                from: 'Bob Smith (bobsmith123@gmail.com)',
                to: 'Janet Fillory (jfillory@gmail.com)',
                time: 'September 20, 2021 10:11 am',
                isFeedback: false,
                isAttachment: false,
                isShowSignature: false,
                isShowDisclosure: false,
                isFraud: true,
                isFlag: true,
                signature: {
                  name: 'Bob Smith',
                  position: 'Sales Representative',
                  cell: '303-555-1234',
                  street: '123 Anywhere St',
                  region: 'Booneyville, ME 12345',
                },
                disclosure: {
                  content:
                    'ABC Company puts the security of the client at a high priority. Therefore, we have put efforts into ensuring that the message is error and virus-free. Unfortunately, full security of the email cannot be ensured as, despite our efforts, the data included in emails could be infected, intercepted, or corrupted. Therefore, the recipient should check the email for threats with proper software, as the sender does not accept liability for any damage inflicted by viewing the content of this email.',
                },
              },
            },
          ],
        },
        {
          id: 2,
          name: "Elena Casarosa",
          subject: "Let's have dinner on Sunday",
          message: "Hi Olenna, Silva and Titus. It's was...I’ve invited you to fill out a form which will help us help you.Thank you so much for meeting with me today. It was such a pleasure to learn more about the team and position, and I’m very excited about the opportunity to join [Company Name] and help [bring in new clients/develop world-class content/anything else awesome you would be doing] with your team.",
          lastMessageTime: 'Sep 27',
          showAttachmentIcon: false,
          showComplaintFlag: false,
          showFraudFlag: false,
          showSexualHarassmentFlag: false,
          showWorkplaceViolenceFlag: false,
          selectedUser: false,
          showContent: false,
          showEmails: [
            {
              collapse: {
                name: 'Elena Casarosa',
                email: 'elenacasarosa@gmail.com',
                isAttachment: false,
                isFlag: false,
                time: 'September 20, 2021 10:11 am',
              },
              showDetails: {
                isShowDetails: false,
                from: 'Elena Casarosa (elenacasarosa@gmail.com)',
                to: 'Booby Sandy (sandiana@gmail.com)',
                time: 'September 25, 2021 10:11 am',
                isFeedback: false,
                isAttachment: false,
                isShowSignature: false,
                isShowDisclosure: false,
                isFraud: true,
                isFlag: true,
                signature: {
                  name: 'Elena Casarosa',
                  position: 'Marketing Representative',
                  cell: '303-555-1234',
                  street: '123 Anywhere St',
                  region: 'Sunmar, ME 12345',
                },
                disclosure: {
                  content:
                    'ABC Company puts the security of the client at a high priority. Therefore, we have put efforts into ensuring that the message is error and virus-free. Unfortunately, full security of the email cannot be ensured as, despite our efforts, the data included in emails could be infected, intercepted, or corrupted. Therefore, the recipient should check the email for threats with proper software, as the sender does not accept liability for any damage inflicted by viewing the content of this email.',
                },
              },
            },
          ],
        },
        {
          id: 3,
          name: "Janet Fillory",
          subject: "Let's have dinner on Sunday",
          message: "Hi Olenna, Silva and Titus. It's was...I’ve invited you to fill out a form which will help us help you.Thank you so much for meeting with me today. It was such a pleasure to learn more about the team and position, and I’m very excited about the opportunity to join [Company Name] and help [bring in new clients/develop world-class content/anything else awesome you would be doing] with your team.",
          lastMessageTime: 'Sep 27',
          showAttachmentIcon: false,
          showComplaintFlag: false,
          showFraudFlag: false,
          showSexualHarassmentFlag: false,
          showWorkplaceViolenceFlag: false,
          selectedUser: false,
          showContent: false,
          showEmails: [
            {
              collapse: {
                name: 'Janet Fillory',
                email: 'jfillory@gmail.com',
                isAttachment: false,
                isFlag: false,
                time: 'August 10, 2019 10:11 am',
              },
              showDetails: {
                isShowDetails: false,
                from: 'Janet Fillory (jfillory@gmail.com)',
                to: 'Elena Casarosa (elenacasarosa@gmail.com)',
                time: 'August 10, 2019 10:11 am',
                isFeedback: false,
                isAttachment: false,
                isShowSignature: false,
                isShowDisclosure: false,
                isFraud: true,
                isFlag: true,
                signature: {
                  name: 'Janet Fillory',
                  position: 'Admin Reqruiter',
                  cell: '303-555-1234',
                  street: '123 Anywhere St',
                  region: 'Andamaria, ME 12345',
                },
                disclosure: {
                  content:
                    'ABC Company puts the security of the client at a high priority. Therefore, we have put efforts into ensuring that the message is error and virus-free. Unfortunately, full security of the email cannot be ensured as, despite our efforts, the data included in emails could be infected, intercepted, or corrupted. Therefore, the recipient should check the email for threats with proper software, as the sender does not accept liability for any damage inflicted by viewing the content of this email.',
                },
              },
            },
          ],
        },
      ],
    }
  },

  actions: {
    showCurrentContent(payload) {
      this.AllEmails.map((item) => {
        if (item.id === payload) {
          return (item.showContent = true)
        } else {
          return (item.showContent = false)
        }
      })
    },

    showSelectedEmailDetails(payload) {
      this.AllEmails.map((item) => {
        if (item.id === payload) {
          item.showEmails.map((select) => {
            return (select.showDetails.isShowDetails = true)
          })
          return 0;
        } else {
          return 0;
        }
      })
    },

    expandAll() {
      if (this.allExpanded === true) {
        this.allExpanded = false

        for (let i = 0; i < this.AllEmails.length; i++) {
          const email = this.AllEmails[i].showEmails

          email.map((select) => {
            return (select.showDetails.isShowDetails = false)
          })
        }
      } else if (this.allExpanded === false) {
        this.allExpanded = true

        for (let j = 0; j < this.AllEmails.length; j++) {
          const email = this.AllEmails[j].showEmails

          email.map((select) => {
            return (select.showDetails.isShowDetails = true)
          })
        }
      }
    }
  }
})