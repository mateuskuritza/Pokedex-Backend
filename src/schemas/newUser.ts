import Joi from "joi";
const schema = Joi.object({
    'email': Joi.string().email().required(),
    'password': Joi.string().required(),
    'confirmPassword': Joi.string().required().valid(Joi.ref('password'))
});

export default schema