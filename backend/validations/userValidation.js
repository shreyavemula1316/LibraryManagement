import joi from 'joi';

export const bookValidationSchema = (userData) => {
    const schema = joi.object({
        name: joi.string()
        .min(2)
        .required()
        .messages({
            "string.empty": "Name is required",
            "string.min": "Name should have at least 2 characters",
        }),

        email: joi.string()
        .email()
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Email must be a valid email address",
        }),

        address: joi.string()
        .messages({
            "string.base": "Address must be a string",
        }),

        phone: joi.string()
        .pattern(/^[0-9\-\+\s\(\)]+$/)
        .required()
        .messages({
            "string.pattern.base": "Phone number must contain only numbers, spaces, dashes, parentheses, or plus signs",
        }),

        password: joi.string()
        .min(6)
        .required() 
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password should have at least 6 characters",
        }),

        membershipStatus: joi.string()
        .valid('active', 'inactive', 'expired')
        .default('active')
        .messages({
            "any.only": "Membership Status must be one of 'active', 'inactive', or 'expired'",
        }),

        role: joi.string()
        .valid('staff', 'member')
        .default('member')
        .messages({
            "any.only": "Role must be either 'staff' or 'member'",
        }),
    });

    return schema.validate(userData);
};