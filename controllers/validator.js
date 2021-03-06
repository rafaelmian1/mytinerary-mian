const joi = require("joi");
const validator = (req, res, next) => {
  const schema = joi.object({
    first_name: joi
      .string()
      .trim()
      .pattern(/\p{L}+$/u)
      .required()
      .messages({
        "string.empty": "First name field must be completed",
        "string.pattern.base": "First name field must not contain numbers",
        "string.min": "First name must be at least 2 characters long",
      }),
    last_name: joi
      .string()
      .trim()
      .pattern(/\p{L}+$/u)
      .required()
      .messages({
        "string.empty": "Last name field must be completed",
        "string.pattern.base": "Last name field must not contain numbers",
        "string.min": "Last name must be at least 2 characters long",
      }),
    email: joi.string().trim().required().email().messages({
      "string.empty": "Email field must be completed",
      "string.email": "Email must be a valid email",
    }),
    password: joi.string().min(8).required().messages({
      "string.empty": "Password field must be completed",
      "string.min": "Password must be at least 8 characters long",
    }),
    img: joi.string().required().messages({
      "string.empty": "Image field must be completed",
    }),
    country: joi.string().invalid("choose").required().messages({
      "string.empty": "You must select a country",
      "any.invalid": "You must select a country",
    }),
    google: joi.boolean().default(false),
  });
  const validation = schema.validate(req.body, { abortEarly: false });
  if (!validation.error) {
    next();
  } else {
    res.json({
      error: validation.error.details.map((error) => {
        return { field: error.context.key, message: error.message };
      }),
    });
  }
};
module.exports = validator;
