const express = require("express");
const fs = require("fs");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

const jobs = JSON.parse(
  fs.readFileSync("./data/jobs.json")
);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/dashboard", (req, res) => {

  let skills = {};
  let locations = {};
  let experience = {};

  jobs.forEach(job => {

    job.skills.forEach(skill => {
      skills[skill] = (skills[skill] || 0) + 1;
    });

    locations[job.location] =
      (locations[job.location] || 0) + 1;

    experience[job.experience] =
      (experience[job.experience] || 0) + 1;
  });

  res.render("dashboard", {
    skills,
    locations,
    experience
  });

});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});