import joi from 'joi';

export const bookValidationSchema = (bookData) => {
    const schema = joi.object({
        ISBN: joi.string()
        .pattern(/^[0-9\-]+$/)
        .required()
        .messages({
            "string.empty": "ISBN is required",
            "string.pattern.base": "ISBN must contain only numbers and dashes",
        }),

        title: joi.string()
        .min(2)
        .required()
        .messages({
            "string.empty": "Title is required",
            "string.min": "Title should have at least 2 characters",
        }),

        author: joi.string()
        .min(2)
        .required()
        .messages({
            "string.empty": "Author is required",
            "string.min": "Author should have at least 2 characters",
        }),

        genre: joi.string()
        .required()
        .messages({
            "string.empty": "Genre is required",
        }),

        publisherYear: joi.number()
        .integer()
        .min(1000)
        .max(new Date().getFullYear())
        .required()
        .messages({
            "number.base": "Publisher Year must be a number",
            "number.min": "Publisher Year must be a valid year",
            "number.max": "Publisher Year cannot be in the future",
            "any.required": "Publisher Year is required",
        }),

        copiesAvailable: joi.number()
        .integer()
        .min(0)
        .default(1)
        .messages({
            "number.min": "Copies Available cannot be negative"
        }),

        shelfLocation: joi.string()
        .required()
        .messages({
            "string.empty": "Shelf Location is required",
        }),

        publisher: joi.object({
            name: joi.string()
            .required()
            .messages({
                "string.empty": "Publisher name is required",
            }),
            phonenumber: joi.string()
            .pattern(/^[0-9\-+() ]+$/)
            .required()
            .messages({
                "string.empty": "Publisher phone number is required",
                "string.pattern.base": "Publisher phone number must contain only numbers and valid characters",
            }),
        }).required().messages({
            "object.base": "Publisher information is required",
        })
    });
    
    return schema.validate(bookData);
};