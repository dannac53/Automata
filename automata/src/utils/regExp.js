const regExp = {
  name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  code: /^[1-9][0-9\d]{0,7}$/,
  date: /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/,
  address: /^[a-zA-Z0-9\s-|#]*$/,
  tel: /^\d{7}$/,
  phone: /^3\d{9}$/,
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z-]+\.[a-zA-Z]{2,3}$/,
};
export { regExp };
