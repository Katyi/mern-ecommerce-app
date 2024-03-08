export const handleValidation = (user, setErrors) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const formErrors = {};
  let formIsValid = true;
  // username
  if (!user.username) {
    formIsValid = false;
    formErrors.username = "Required";
  }
  // Fullname
  if (!user.fullname) {
    formIsValid = false;
    formErrors.fullname = "Required";
  }
  // birthday
  if (user.birthday && user?.birthday.length < 10) {
    formIsValid = false;
    formErrors.birthday = "Date is not valid";
  }
  // Phone
  if (user.phone.length < 17) {
    formIsValid = false;
    formErrors.phone = "Phone is not valid";
  }
  // email
  if (!user.email) {
    formIsValid = false;
    formErrors.email = "Required";
  } else if (!emailRegex.test(user.email)) {
    formIsValid = false;
    formErrors.email = "Email is not valid";
  }
  setErrors(formErrors)
  return formIsValid;
};