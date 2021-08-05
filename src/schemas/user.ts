import Joi from "joi";
const schema = Joi.object({
    'email': Joi.string().email().required(),
    'password': Joi.string().required(),
});

export default schema