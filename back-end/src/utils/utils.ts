const checkIfTokenExpired = (token: number) => {
  let isExpiredToken: boolean = false;

  if (Date.now() >= token * 1000) {
    isExpiredToken = true;
    return isExpiredToken;
  }
  return isExpiredToken;
};
module.exports = checkIfTokenExpired;
