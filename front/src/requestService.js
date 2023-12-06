
const defaultHeaders = {
  "Content-Type": "application/json",
};

export const post = (url, body, headers = defaultHeaders) =>
  fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });



export const get = (url) => fetch(url);
