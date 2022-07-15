import sha256 from "crypto-js/sha256";

export const authData = {
  username: "beautifultiger295",
  rawPassword: "selena",
  get password() {
    return sha256(this.rawPassword).toString();
  }
};
