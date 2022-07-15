import sha256 from "crypto-js/sha256";

export const userData = {
  username: "abc",
  password: sha256("abc").toString()
};
