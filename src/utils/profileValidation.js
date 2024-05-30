const profileValidation = (value) => {
    const errors = {};
    if (value.username.trim().length === 0) {
      errors.username = "firstname is required   ";
    }
    if (value.email.trim().length === 0) {
      errors.email = "email is required";
    }
    if (value.bio.trim().length === 0) {
        errors.bio = "bio is required";
      }
   
    return errors;
  };
  
  export default profileValidation;
  