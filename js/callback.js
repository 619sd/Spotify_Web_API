const clientId = '4340319ae0c4474292cdcd5a01fa141e';
const redirectUri = 'https://619sd.github.io/Spotify_Web_API/callback';

const code = new URLSearchParams(window.location.search).get('code');
const codeVerifier = localStorage.getItem('code_verifier');

async function getAccessToken(code, verifier) {
  const body = new URLSearchParams({
    client_id: clientId,
    grant_type: 'authorization_code',
    code,
    redirect_uri: redirectUri,
    code_verifier: verifier
  });

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body
  });

  const data = await response.json();
  localStorage.setItem('access_token', data.access_token);
  window.location = '/'; // redirect to main app
}

if (code) {
  getAccessToken(code, codeVerifier);
}