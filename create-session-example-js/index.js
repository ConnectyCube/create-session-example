const crypto = require("crypto");
const axios = require("axios");

let appConfig = {
  applicationId: 8056,
  authKey: "8-RapJEU3yVdLR4",
  authSecret: "azj3WKRTbTkeHad",
};
let userData = { email: "usertest@gmail.com", password: "Parole1299" };

const getSignatureForUserSession = (appConfig, user) => {
  let nonce = Math.floor(Math.random() * 1000000);
  let timestamp = Math.floor(Date.now() / 1000);

  let strToHash = `application_id=${appConfig.applicationId}&auth_key=${appConfig.authKey}&nonce=${nonce}&timestamp=${timestamp}&user[email]=${user.email}&user[password]=${user.password}`;

  let signature = crypto
    .createHmac("sha1", appConfig.authSecret)
    .update(strToHash)
    .digest("hex");

  return { signature, nonce, timestamp };
};

let { signature, nonce, timestamp } = getSignatureForUserSession(
  appConfig,
  userData
);

let data = {
  application_id: appConfig.applicationId,
  auth_key: appConfig.authKey,
  nonce: nonce,
  signature: signature,
  timestamp: timestamp,
  user: userData,
};

axios
  .post("https://api.connectycube.com/session", data, {
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => console.log("[response]", response.data))
  .catch((response) => console.log("[error response]", response));
