/* global gapi */

import {apiKey, clientId, discoveryDocs} from './gapi-config';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";


export function loadGapi(cb) {
  window.gapi.load("client:auth2", () => initClient(cb));
}

async function initClient(cb) {
  try {
    // 2. Initialize the JavaScript client library.
    await window.gapi.client.init({
      apiKey: apiKey,
      clientId: clientId,
      discoveryDocs: discoveryDocs,
      scope: SCOPES
    });

    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(() => {
      Promise.all([
        fetchParticipants(),
        fetchRoomlist()
      ])
        .then(data => cb(null, data[0], data[1]), error => cb(error));
    });

    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
      Promise.all([
        fetchParticipants(),
        fetchRoomlist()
      ])
        .then(data => cb(null, data[0], data[1]), error => cb(error));
    } else {
      gapi.auth2.getAuthInstance().signIn();
    }
    console.log('after login status', gapi.auth2.getAuthInstance().isSignedIn.get());
  } catch (e) {
    cb(e);
  }
}

/**
 * Fetches all participants
 */
async function fetchParticipants() {
  const participantsRes = await gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1pjtRcgHYwVR7i8l4pJgatTHoUzIjHJmAvGmpDVld14k',
    range: 'B2:H',
  });

  // const parts = participantsRes.result.values;
  // console.log(parts[0])
  // const names = {};
  // parts.sort((a,b) => a[0].localeCompare(b[0])).forEach(n => names[n[6]] ? names[n[6]].push(n[0]) : names[n[6]] = [n[0]]);
  // console.log('names', Object.keys(names).map(k => [k, names[k]]))

  let participantDetails = participantsRes.result.values;
  console.log('participants', participantDetails.length, 'first result', participantDetails[0]);
  return participantDetails;
}

/**
 * Fetches the room list
 */
async function fetchRoomlist() {
  const roomsRes = await gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1pjtRcgHYwVR7i8l4pJgatTHoUzIjHJmAvGmpDVld14k',
    range: 'RoomSigns!A2:E',
  });

  // const parts = roomsRes.result.values;
  // console.log(parts[0])
  // const names = {};
  // parts.sort((a,b) => a[0].localeCompare(b[0])).forEach(n => names[n[6]] ? names[n[6]].push(n[0]) : names[n[6]] = [n[0]]);
  // console.log('names', Object.keys(names).map(k => [k, names[k]]))

  let roomList = roomsRes.result.values;
  console.log('rooms', roomList.length, 'first result', roomList[0]);
  return roomList;
}
