<template>
  <section>
    <div class="h-screen bg-ash-dark">
      <h2 class="pt-52 text-center text-yellow-primary text-5xl font-bold">
        Terms of Use
      </h2>
    </div>
    <div class="px-20">
      <div>
        <h3>PERMISSIBLE SUBSTANCE</h3>
        <p>
          SharpArchive strictly prohibited storage and/or display of the
          following material on its servers. This includes uploading to web
          sites, or transmitting by any material (by e-mail, uploading, posting
          or otherwise).
        </p>
        <ul>
          <li>
            Mature Sites: We prohibit any adult (pornographic) web-sites on our
            servers, including pedophile sites, sites linking to pornographic
            sites (outside links) and pornographic advertisements on your own
            site.
          </li>
          <li>
            Prohibited use: devxhub.com services may not be used for illegal
            purposes, or in support of illegal activities. Copyright or
            trademark breach: Use of the devxhub.com service to transmit any
            material (by e-mail, uploading,
          </li>
          <li>
            Sharing of Viruses, Spyware, and Malware: Distributions of software
            that attempts to and/or causes damage, harassment, or annoyance to
            persons, data, and/or computer systems are prohibited. Distribution
            of software that monitors computer or computer user activity without
            the computer user\’s knowledge and consent is prohibited.
          </li>
          <li>
            Spamming: Spamming (sending unsolicited commercial or bulk emails)
            using our servers is strictly not allowed. DO NOT SEND SPAM EMAIL
            FROM OUR SERVERS. To protect our servers we may impose limits on the
            number of emails sent within a particular time frame from our
            servers.
          </li>
          <li>
            Terrorization: Use of the devxhub.com service to transmit any
            material (by e-mail, uploading, posting or otherwise) that threatens
            or encourages bodily harm or destruction of property.
          </li>
          <li>
            Harm to minors: Use of the devxhub.com service to harm, or attempt
            to harm, minors in any way, including, but not limited to child
            pornography.
          </li>
        </ul>
      </div>

      <div>
        <h3>SERVER UTILIZE</h3>
        <p>
          We want to allow our customers to use our servers the best way, but in
          order to protect other users; we may, temporarily or not, suspend a
          shared hosting site if this site slows down our servers or uses too
          much server resource. In this case, we will try to find a solution
          together with the customer. <br />

          You may not use your site to publish material, which devxhub.com
          determines, at its sole discretion, to be unlawful, indecent or
          objectionable. For purposes of this policy, “material” refers to all
          forms of communications including narrative descriptions, graphics
          (including photographs, illustrations, images, drawings, and logos),
          executable programs, video recordings, and audio recordings.
        </p>
      </div>

      <div>
        <h3>SCRIPTS</h3>
        <p>
          You are responsible for ensuring that any scripts that you install do
          not compromise the security of our servers. This includes, but is not
          limited to:
        </p>
        <ul>
          <li>
            Ensuring that it is not possible to abuse such scripts to gain
            access to the file system of the server.
          </li>
          <li>
            Ensuring that it is not possible to abuse such scripts to send
            emails to third parties.
          </li>
          <li>
            Ensuring that you update any installed scripts with the latest
            releases, which often contain security fixes.
          </li>
        </ul>
      </div>

      <div>
        <h3>SERVER PRESERVATION</h3>
        <p>
          We might have, from time to time, to perform maintenance, upgrades or
          replacements to our servers. We reserve the right to suspend access to
          such server during the required time to do the maintenance, upgrade or
          exchange the server, for no more than 4 hours. In this event, the
          users will be sent an e- mail at least 24 hours before the due date
          and time for maintenance.
        </p>
      </div>

      <div>
        <h3>LIABILITY</h3>
        <ul>
          <li>
            sharparchive.com will not be responsible for any damages your
            business may suffer.
          </li>
          <li>
            sharparchive.com makes no warranties of any kind, expressed or
            implied for services we provide.
          </li>
          <li>
            sharparchive.com disclaims any warranty or merchantability or
            fitness for a particular purpose. This includes loss of data
            resulting from delays, non-deliveries, wrong delivery, and any and
            all service interruptions caused by Cclassiphosting.com, its
            employees, suppliers, customers or any third party.
          </li>
        </ul>
      </div>
    </div>

    <landing-footer class="pt-52 pb-24"></landing-footer>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import LandingFooter from '~/components/setup/LandingFooter.vue'

export default {
  auth: false,
  name: 'TermsOfUse',
  components: { LandingFooter },
  computed: {
    ...mapState({
      starterExpanded: 'starterExpanded',
      isSticky: 'isSticky',
      headerWidth: 'headerWidth',
    }),
  },
  mounted() {
    this.setHeaderWidth(true)
  },
  methods: {
    ...mapActions({
      setStorageFormatSelect: 'setStorageFormatSelect',
      setIsSticky: 'set_sticky',
      setHeaderWidth: 'set_header_width',
    }),
    ...mapActions('feeds', ['disableSecurityPaymentTab']),
    closeStarterModal() {
      this.setStorageFormatSelect(false) // this is for setup button with available formate select
      this.disableSecurityPaymentTab()
      this.expand_starter_modal(false)
      this.maximize_starter_modal(false)
      this.updateSetupContent('starter-button')
      setTimeout(() => {
        this.updateSetupContent('starter-button')
      }, 500)
    },
    ...mapActions({
      expand_starter_modal: 'expand_starter_modal',
      maximize_starter_modal: 'maximize_starter_modal',
      updateSetupContent: 'updateSetupContent',
    }),
  },
}
</script>

<style lang="scss" scoped>
h3 {
  color: #00ffff;
  @apply text-3xl mt-14 mb-4 font-semibold;
}
p {
  @apply text-gray-600 text-2xl text-justify;
}
ul li {
  list-style: visible;
  @apply text-gray-600 text-2xl text-justify list-inside ml-4;
}
</style>
