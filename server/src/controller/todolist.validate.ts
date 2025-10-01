import Joi from "joi";

export const createTodoSchema  = Joi.object({
  name: Joi.string().max(255).required().messages({
    "string.empty": "กรุณากรอกชื่องาน",
    "string.max": "ไม่สามารถ add ข้อความที่ยาวเกิน 255 ตัวอักษรได้",
    "any.required": "กรุณากรอกชื่องาน",
  }),
  date_start: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/) // YYYY-MM-DD
    .required()
    .messages({
      "string.empty": "กรุณาเลือกวันที่",
      "string.pattern.base": "รูปแบบวันที่ไม่ถูกต้อง (YYYY-MM-DD)",
    }),
});

export const updateTodoSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "ต้องระบุรหัส ID",
    "string.empty": "ID ไม่ถูกต้อง"
  }),
  name: Joi.string().trim().min(1).required().messages({
    "string.empty": "กรุณากรอกชื่อ",
    "any.required": "ต้องระบุชื่อ"
  }),
  date_start: Joi.date().iso().required().messages({
    "date.base": "วันที่ไม่ถูกต้อง",
    "date.format": "วันที่ต้องเป็นรูปแบบ YYYY-MM-DD",
    "any.required": "กรุณาเลือกวันที่"
  })
});


export const deleteTodoSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "ต้องระบุรหัส ID",
    "string.empty": "ID ไม่ถูกต้อง"
  })
});




export const toggleFinishedSchema = Joi.object({
  id: Joi.string().required().messages({
    "any.required": "ต้องระบุรหัส ID",
    "string.empty": "ID ไม่ถูกต้อง"
  }),
  finished: Joi.boolean().required()
});
