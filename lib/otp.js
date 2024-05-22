const fetch = require("node-fetch");

class TURBO {
  constructor(apikey) {
    this.apikey = apikey;
  }
  async Request() {
    const request = fetch(
      `https://turbootp.com/api/json.php?api_key=${this.apikey}&action=services&country=indo`,
      {
        method: "GET",
      }
    ).then((res) => res.json());
    return request;
  }
  async GetServis() {
    const request = fetch(
      `https://turbootp.com/api/get-services/${this.apikey}`,
      {
        method: "GET",
      }
    ).then((res) => res.json());
    return request;
  }
  async GetNumber(id) {
    const request = fetch(
      `https://turbootp.com/api/set-orders/${this.apikey}/${id}`,
      {
        method: "GET",
      }
    ).then((res) => res.json());
    return request;
  }
  async GetNumbeMulti(id) {
    const request = fetch(
      `https://turbootp.com/api/set-orders-multiservices/${this.apikey}/${id}`,
      {
        method: "GET",
      }
    ).then((res) => res.json());
    return request;
  }
  async GetCancel(OrderId) {
    const request = fetch(
      `https://turbootp.com/api/cancle-orders/${this.apikey}/${OrderId}`,
      {
        method: "GET",
      }
    ).then((res) => res.json());
    return request;
  }
  async GetMessage(OrderId) {
    const request = fetch(
      `https://turbootp.com/api/get-orders/${this.apikey}/${OrderId}`,
      {
        method: "GET",
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/json",
          "sec-ch-ua":
            '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
        },
      }
    ).then((res) => res.json());
    return await request;
  }
}
module.exports = TURBO;
