class VendingAPI {
  _apiBase = 'http://localhost:3001/';
  
  getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
    return res.json();
  };

  getProducts = async () => await this.getResource(`${this._apiBase}products`);
  getCoinsToRefund = async () => await this.getResource(`${this._apiBase}coinsToRefund`);
}

export default VendingAPI;
