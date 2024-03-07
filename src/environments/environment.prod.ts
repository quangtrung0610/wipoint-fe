// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  apiService: 'https://wipoint.wicocheck.com/wipoint-service/v1',
  androidAppUrl: 'https://play.google.com/store/apps/details?id=asia.tmtco.wipoint',
  iosAppUrl:
    'https://apps.apple.com/us/app/wipoint-t%C3%ADch-%C4%91i%E1%BB%83m-v%C3%A0-%C4%91%E1%BB%95i-qu%C3%A0/id6450163016',

  apiKey: {
    xapiKey: 'wipix',
    xApiSecret: 'wCJ9XO2N1H6EQmgNE4uCKFiGmveRAnOi',
  },

  apiPath: {
    qrcode: {
      base: '/wipix/qrcode',
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
