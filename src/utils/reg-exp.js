export const RegExp = {
  loginLatin: /[A-Za-z]/,
  loginNumber: /[0-9]/,
  loginRussian: /[А-Яа-я]/,
  exceptForTheSpace: /\s/,
  capitalLatin: /[A-Z]/,
  latinAndNumerals: /(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
  allLatinAndNumerals: /^[a-zA-Z0-9]+$/,
  email: /^([a-zA-Z][a-zA-Z0-9-_]{2,15})*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
};
