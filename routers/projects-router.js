const router = require("express").Router();

const db = require("./all-models");

const sendUserError = (status, message, res) => {
  res.status(status).json({ error: message });
  return;
};

router.get("/", (req, res) => {
  db.getProjects()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      sendUserError(500, "Something went wrong when getting projects", res);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.getProject(id)
    .then(project => {
      //   if (!project.completed) {
      //     project.completed = "false";
      //   } else {
      //     project.complete = "true";
      //   }
      res.json(project);
    })
    .catch(error => {
      console.log(error);
      sendUserError(500, error, res);
      return;
    });
});

router.post("/", (req, res) => {
  const { name, description, completed, actions } = req.body;
  if (!name || !description) {
    sendUserError(
      400,
      "Please provide a name and description for the project",
      res
    );
    return;
  }
  db.addProject({
    name,
    description,
    completed,
    actions
  })
    .then(response => {
      res.status(201).json(`The project '${name}' has been added! `);
    })
    .catch(error => {
      console.log(error);
      sendUserError(500, error, res);
      return;
    });
});

module.exports = router;
