const checkIfTokenExpired = (token: number) => {
  let isExpiredToken: boolean = false;

  var dateNow = new Date();
  if (token < dateNow.getTime()) {
    isExpiredToken = true;
  }
};
module.exports = checkIfTokenExpired;
