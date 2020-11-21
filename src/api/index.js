const ROOT = 'https://conduit.productionready.io/api/';

export const getArticles = async (page = 1) => {
  const response = await fetch(`${ROOT}articles?limit=5&offset=${page * 5 - 5}`);
  return await response.json();
};

export const getArticle = async (slug = 'test-s66vwz') => {
  const response = await fetch(`${ROOT}articles/${slug}`);
  return await response.json();
};

export const signUpRequest = async (body) => {
  const res = await fetch(`${ROOT}users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body),
  });

  return res.json();
};
