/* global gapi */

import {apiKey, clientId, discoveryDocs} from './gapi-config';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";


export function loadGapi(cb) {
  window.gapi.load("client:auth2", () => initClient(cb));
}

async function initClient(cb) {
  // 2. Initialize the JavaScript client library.
  await window.gapi.client.init({
    apiKey: apiKey,
    clientId: clientId,
    discoveryDocs: discoveryDocs,
    scope: SCOPES
  });

  // Listen for sign-in state changes.
  gapi.auth2.getAuthInstance().isSignedIn.listen(() => {
    fetchParticipants()
      .then(participents => cb(participents));
  });

  if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
    fetchParticipants()
      .then(participents => cb(participents));
  } else {
    gapi.auth2.getAuthInstance().signIn();
  }
  console.log('after login status', gapi.auth2.getAuthInstance().isSignedIn.get());
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
async function fetchParticipants() {
  const participantsRes = await gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1pjtRcgHYwVR7i8l4pJgatTHoUzIjHJmAvGmpDVld14k',
    range: 'B2:E',
  });

  return participantsRes.result.values;
}
