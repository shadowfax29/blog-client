export default function PostValidation(value) {
  const errors = {};
  const validExtensions = ['png', 'jpeg', 'jpg'];
  
  if (value.title.trim().length === 0) {
      errors.title = "Title is required";
  }
  
  if (!value.featuredImage) {
      errors.featuredImage = "Featured picture is required";
  } else if (!validExtensions.includes(value.featuredImage.name.split('.').pop().toLowerCase())) {
      errors.featuredImage = "Only valid file formats are png, jpeg, or jpg";
  }
  
  if (value.context.trim().length === 0) {
      errors.context = "Context is required";
  }
  
  return errors;
}
