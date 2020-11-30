const ROOT = 'https://conduit.productionready.io/api/';
export const DEFAULT_IMG = 'https://static.productionready.io/images/smiley-cyrus.jpg';

export const getArticles = async (page = 1) => {
  const response = await fetch(`${ROOT}articles?limit=5&offset=${page * 5 - 5}`);

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

export const updateUser = async (token, body) => {
  const response = await fetch(`${ROOT}/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(body),
  });

  return response.json();
};

export const articleCRUD = async ({ token, body, crudParam, slug = 'test-s66vwz' }) => {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: `Token ${token}`,
  };

  switch (crudParam) {
    default:
      return;
    case 'C':
      return (
        await fetch(`${ROOT}articles`, {
          method: 'POST',
          headers,
          body: JSON.stringify(body),
        })
      ).json();
    case 'R':
      return (await fetch(`${ROOT}articles/${slug}`)).json();
    case 'U':
      return (
        await fetch(`${ROOT}articles/${slug}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(body),
        })
      ).json();
    case 'D':
      return (
        await fetch(`${ROOT}articles/${slug}`, {
          method: 'DELETE',
          headers,
        })
      ).json();
  }
};

export const likesCD = async ({ token, slug, crudParam }) => {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: `Token ${token}`,
  };

  switch (crudParam) {
    case 'C':
      return (
        await fetch(`${ROOT}articles/${slug}/favorite`, {
          method: 'POST',
          headers,
        })
      ).json();
    case 'D':
      return (
        await fetch(`${ROOT}articles/${slug}/favorite`, {
          method: 'DELETE',
          headers,
        })
      ).json();
    default:
      return;
  }
};
