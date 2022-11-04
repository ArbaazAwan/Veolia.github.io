// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  getSitesUrl: 'http://127.0.0.1:3000/site',
  getSiteByIdUrl: 'http://127.0.0.1:3000/site/',
  postSiteUrl: 'http://127.0.0.1:3000/site',
  updateSiteUrl: 'http://127.0.0.1:3000/site/',
  deleteSiteUrl: 'http://127.0.0.1:3000/site/',

  getUsersUrl: 'http://127.0.0.1:3000/user',
  getUserByIdUrl: 'http://127.0.0.1:3000/user/',
  postUserUrl: 'http://127.0.0.1:3000/user',
  updateUserUrl: 'http://127.0.0.1:3000/user/',
  deleteUserUrl: 'http://127.0.0.1:3000/user/',

  getClientsUrl: 'http://127.0.0.1:3000/client',
  getClientByIdUrl: 'http://127.0.0.1:3000/client/',
  postClientUrl: 'http://127.0.0.1:3000/client',
  updateClientUrl: 'http://127.0.0.1:3000/client/',
  deleteClientUrl: 'http://127.0.0.1:3000/client/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
