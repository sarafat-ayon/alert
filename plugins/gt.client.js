import Vue from 'vue';
import VueGtag from 'vue-gtag';

export default ({ isDev, app, $config }) => {
  if (!isDev) {
    Vue.use(VueGtag, {
      config: { id: $config.googleMeasurementId },
      includes: [
        { id: $config.googleAdsTagId1 },
        { id: $config.googleAdsTagId2 },
      ],
      appName: $config.appName,
      pageTrackerScreenviewEnabled: true
    },
      app.router);
  } else {
    console.log("Skipping GA in development")
  }
}
