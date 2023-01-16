class VendingAPI {
  _apiBase = 'http://localhost:3001/';
  // _apiBase = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/' : 'https://rinat-lucky.github.io/';
  
  getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
    return res.json();
  };

  getProducts = async () => await this.getResource(`${this._apiBase}products`);
  getCoinsToPay = async () => await this.getResource(`${this._apiBase}coinsToPay`);
  getCoinsToRefund = async () => await this.getResource(`${this._apiBase}coinsToRefund`);
}

export default VendingAPI;