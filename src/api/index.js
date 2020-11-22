const ROOT = 'https://conduit.productionready.io/api/';
export const DEFAULT_IMG = 'https://static.productionready.io/images/smiley-cyrus.jpg';

export const getArticles = async (page = 1) => {
  const response = await fetch(`${ROOT}articles?limit=5&offset=${page * 5 - 5}`);
  return await response.json();
};

export const getArticle = async (slug = 'test-s66vwz') => {
  const response = await fetch(`${ROOT}articles/${slug}`);
  return await response.json();
};

export const signUpRequest = async (body) => {
  const response = await fetch(`${ROOT}users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body),
  });

  return response.json();
};

export const authRequest = async (body) => {
  const response = await fetch(`${ROOT}users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

export const getUser = async (token) => {
  const response = await fetch(`${ROOT}user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Token ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Could not fetch ${ROOT}user, received ${response.status}`);
  }
  return response.json();
};
