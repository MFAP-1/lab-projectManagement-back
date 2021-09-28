const express = require("express");
const router = express.Router();
const TaskModel = require("../models/Task.model");
const ProjectModel = require("../models/Project.model");

// CRUD de projeto

// Definindo nossos route listeners

// Crud (Create) => POST
router.post("/task", async (req, res, next) => {
  try {
    const result = await TaskModel.create(req.body);

    // Adicionado a referência da tarefa recém-criada no projeto
    await ProjectModel.updateOne(
      { _id: req.body.projectId },
      { $push: { tasks: result._id } }
    ); // O operador $push serve para adicionar um novo elemento à uma array no documento

    return res.status(201).json(result);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
