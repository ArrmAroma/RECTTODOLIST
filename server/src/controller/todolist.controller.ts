import e, { Request, Response } from "express";
import Todo from "../model/todolist.model";
import { createTodoSchema, updateTodoSchema, deleteTodoSchema, toggleFinishedSchema } from "./todolist.validate"

interface responseData {
  code: number,
  success: boolean,
  message: object | string,
  error?: object | string,
  data?: object | string,
}

export const getTodos = async (req: Request, res: Response) => {
  let responseData: responseData = { code: 200, success: true, message: {} };
  try {
    const todos = await Todo.find();

    if (todos.length === 0) {
      responseData.message = "Not found data."
    }

    responseData.data = { todolist: todos };
    res.status(responseData.code).json(responseData);
    return;
  } catch (err) {
    responseData.code = 500;
    responseData.success = false;
    responseData.message = "Server Error";
    res.status(responseData.code).json(responseData);
    return;
  }
};

export const createTodo = async (req: Request, res: Response) => {
  let responseData: responseData = { code: 200, success: true, message: {}, data: {} };
  try {
    // validate request body
    const { error, value: dataValidate } = createTodoSchema.validate(req.body, { abortEarly: false });
    if (error) {
      responseData.code = 400;
      responseData.success = false;
      responseData.message = error.details[0].message;
      responseData.error = error.details[0];
      return res.status(responseData.code).json(responseData);
    }

    // check required fields
    if (!dataValidate.name || !dataValidate.date_start) {
      responseData.code = 400;
      responseData.success = false;
      responseData.message = "กรุณากรอกข้อมูลให้ครบถ้วน";
      return res.status(responseData.code).json(responseData);
    }

    // create new todo
    const newTodo = new Todo({
      name: dataValidate.name,
      date_start: dataValidate.date_start,
      finished: false,
    });

    await newTodo.save();

    // response แบบเดียวกับ getTodos
    responseData.code = 201;
    responseData.success = true;
    responseData.message = "Create todo successfully";
    responseData.data = { todolist: [newTodo] };

    return res.status(responseData.code).json(responseData);

  } catch (err) {
    responseData.code = 500;
    responseData.success = false;
    responseData.message = "Server error";
    return res.status(responseData.code).json(responseData);
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  let responseData: responseData = { code: 200, success: true, message: {}, data: {} };
  try {
    const { id } = req.params;
    const { error, value: dataValidate } = updateTodoSchema.validate({id, ...req.body}, { abortEarly: false });
    if (error) {
      responseData.code = 400;
      responseData.success = false;
      responseData.message = error.details[0].message;
      responseData.error = error.details[0];
      return res.status(responseData.code).json(responseData);
    }

    

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { name: dataValidate.name, date_start: dataValidate.date_start },
      { new: true }
    );

    if (!updatedTodo) {
      responseData.code = 404;
      responseData.success = false;
      responseData.message = "ไม่พบรายการ";
      return res.status(responseData.code).json(responseData);
    }

    responseData.code = 200;
    responseData.success = true;
    responseData.message = "อัปเดตรายการเรียบร้อย";
    responseData.data = { todolist: [updatedTodo] };

    return res.status(responseData.code).json(responseData);

  } catch (err) {
    responseData.code = 500;
    responseData.success = false;
    responseData.message = "Server error";
    return res.status(responseData.code).json(responseData);
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  let responseData: responseData = { code: 200, success: true, message: {}, data: {} };
  try {
    const { error, value: dataValidate } = deleteTodoSchema.validate(req.params, { abortEarly: false });
    if (error) {
      responseData.code = 400;
      responseData.success = false;
      responseData.message = error.details[0].message;
      responseData.error = error.details[0];
      return res.status(responseData.code).json(responseData);
    }

    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      responseData.code = 404;
      responseData.success = false;
      responseData.message = "ไม่พบรายการ";
      return res.status(responseData.code).json(responseData);
    }

    responseData.code = 200;
    responseData.success = true;
    responseData.message = "ลบรายการเรียบร้อย";
    responseData.data = { todolist: [deletedTodo] };

    return res.status(responseData.code).json(responseData);

  } catch (err) {
    responseData.code = 500;
    responseData.success = false;
    responseData.message = "Server error";
    return res.status(responseData.code).json(responseData);
  }
};



export const toggleFinished = async (req: Request, res: Response) => {
  let responseData: responseData = { code: 200, success: true, message: {} };
  try {
    const { id } = req.params;
    const { finished } = req.body;

    console.log(id, finished);


    const { error } = toggleFinishedSchema.validate({ id, finished });
    if (error) {
      responseData.code = 400;
      responseData.success = false;
      responseData.message = error.details[0].message;
      res.status(responseData.code).json(responseData);
      return;
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { finished },
      { new: true }
    );

    if (!updatedTodo) {
      responseData.code = 404;
      responseData.success = false;
      responseData.message = "ไม่พบรายการ";
      res.status(404).json(responseData);
      return;
    }

    responseData.data = { todolist: [updatedTodo] };
    res.status(200).json(responseData);

  } catch (err) {
    console.error(err);
    responseData.code = 500;
    responseData.success = false;
    responseData.message = "Server error";
    res.status(500).json(responseData);
  }
};
