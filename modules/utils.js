import keys from "~/pages/keys.js";

export default {
  hexEncode(plain) {
    let hex;
    let i;
    let result = "";
    for (i = 0; i < plain.length; i++) {
      hex = plain.charCodeAt(i).toString(16);
      result += ("000" + hex).slice(-4);
    }
    return result;
  },
  hexDecode(cipher) {
    const hexes = cipher.match(/.{1,4}/g) || [];
    let back = "";
    for (let j = 0; j < hexes.length; j++) {
      back += String.fromCharCode(parseInt(hexes[j], 16));
    }
    return back;
  },
  validation(username, token) {
    const target = keys.find(k => k.username === username);
    return target && target.token === token
  }
};
