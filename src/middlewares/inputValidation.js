const Joi = require('joi');

function validateCreateTaskReq(req,res,next) {
    const JoiSchema = Joi.object({ description: Joi.string().max(50).required() });


    const {error} =  JoiSchema.validate(req.body);

    if(error){
        return res.status(401).send({
            isSuccess: false,
            message : error.message
        })
    }

    next();

  
    
}

module.exports = {
    validateCreateTaskReq: validateCreateTaskReq
}