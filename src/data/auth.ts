import sha256 from "crypto-js/sha256";

export const userData = {
  username: "beautifultiger295",
  password: sha256("selena").toString()
};
