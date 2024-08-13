const checkMobileNumber = (value: string) => {
  const condition = new RegExp(/^(?!0000)[6,7,8,9][0-9]{9}$/);
  return condition.test(value);
};

const checkEmail = (value: string) => {
  const condition = new RegExp(
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,3}(?:\.[A-Za-z]{2,3})?\b$/,
  );
  return condition.test(value);
};

const checkPassword = (value: string) => {
  const condition = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|<>?])[A-Za-z\d!@#$%^&*()_+{}|<>?]{8,25}$/,
  );
  return condition.test(value);
};

const checkCompanyName = (value: string) => {
  const condition = new RegExp(
    /^[a-zA-Z0-9&!@#$%^*()_+{}|:"<>?[\]\;\',.\/ -]+$/,
  );
  return condition.test(value);
};

const checkUniqueCode = (value: string) => {
  const condition = new RegExp(/^[a-zA-Z0-9]+$/);
  return condition.test(value);
};

const checkName = (value: string) => {
  const condition = new RegExp(/^[a-zA-Z ]+$/);
  return condition.test(value);
};

const checkNumber = (value: string) => {
  const condition = new RegExp(/^[0-9]+$/);
  return condition.test(value);
};

const nonZeroValue = (amount: string) => {
  const condition = new RegExp(/^0([-.]?[0]*)$/);
  return condition.test(amount);
};

const isValidDate = (dateString: string) => {
  // Check the format using regex
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/((19|20)\d\d)$/;
  if (!regex.test(dateString)) return false;

  // Parse the date parts
  const parts = dateString.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  // Check the ranges of month and year
  if (year < 1900 || year > 2099 || month === 0 || month > 12) return false;

  // Check the number of days in the month
  const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
    monthLengths[1] = 29;
  }

  // Check the day
  return day > 0 && day <= monthLengths[month - 1];
};

export {
  checkMobileNumber,
  checkEmail,
  checkPassword,
  checkCompanyName,
  checkUniqueCode,
  checkName,
  checkNumber,
  nonZeroValue,
  isValidDate,
};
