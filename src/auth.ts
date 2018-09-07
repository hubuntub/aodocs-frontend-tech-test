import $ from 'jquery';

interface WindowGapi extends Window {
  onSignIn: (googleUser: any) => void;
}

const windowGapi = <WindowGapi>window;

let accessTokenRetrieved: (value: string) => void;
const accessTokenPromise = new Promise((resolve) => {
  accessTokenRetrieved = resolve;
});

windowGapi.onSignIn = (googleUser: any): void => {
  $('.g-signin2').remove();
  const accessToken = googleUser.getAuthResponse().access_token;

  accessTokenRetrieved(accessToken);
};

export async function getRequestHeaders(): Promise<object> {
  const userToken = await accessTokenPromise;

  return {
    headers: {
      Authorization: `Bearer ${userToken}`,
      'Content-Type': 'application/json',
    },
  };
}
