import Joi from "joi";

export const loanValidationSchema = (loanData) => {
    const schema = Joi.object({
        bookId: Joi.string()
        .required()
        .messages({
            "string.empty": "Book ID is required",
        }),

        userId: Joi.string()
        .required()
        .messages({
            "string.empty": "User ID is required",
        }),

        dueDate: Joi.date()
        .greater('now')
        .required()
        .messages({
            "date.base": "Due Date must be a valid date",
            "date.greater": "Due Date must be in the future",
            "any.required": "Due Date is required",
        }),
    });
    return schema.validate(loanData);
};