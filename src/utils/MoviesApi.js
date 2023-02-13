function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
}

class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  getMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(checkResponse);
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co',
  headers: {},
});