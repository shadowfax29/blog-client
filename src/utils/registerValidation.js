import validator from "validator";
const registerValidation = (value) => {
  const errors = {};
  const arr = ["png", "jpeg"];

  if (value.username.trim().length === 0) {
    errors.username = "username is required";
  }
  if (value.email.trim().length === 0) {
    errors.email = "email is required";
  } else if (!validator.isEmail(value.email)) {
    errors.email = "email should be valid format";
  }
  if (value.password.trim().length === 0) {
    errors.password = "password is required";
  } else if (
    value.password.trim().length < 8 ||
    value.password.trim().length > 128
  ) {
    errors.password = "password length should be 8 - 128 character length";
  }
  if (value.bio.length === 0 || value.bio.trim() === " ") {
    errors.bio = "Bio is required";
  }
  if (
    !value.profilePicture ||
    !value.profilePicture.name ||
    value.profilePicture.name.trim().length === 0
  ) {
    errors.profilePicture = "profile picture is required";
  } else if (!arr.includes(value.profilePicture.name.split(".")[1])) {
    errors.profilePicture = "Only valid file format is png or jpeg";
  }

  return errors;
};

export default registerValidation;
