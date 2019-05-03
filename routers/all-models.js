const db = require("../data/dbConfig.js");

module.exports = {
  getProjects,
  addProject,
  getProject
};

function getProjects() {
  return db("projects");
}

function getProject(projectID) {
  return db("projects as p")
    .join("actions as a", "a.id", "a.project_id")
    .select(
      "p.id",
      "p.name",
      "p.description",
      "p.completed",
      "p.actions",
      "a.description as action_description",
      "a.notes as action_notes"
    )

    .where("a.project_id", projectID)
    .andWhere("p.id", projectID);
}

function addProject(project) {
  return db("projects")
    .insert(project, "id")
    .then(([id]) => {
      return getProject(id);
    });
}
