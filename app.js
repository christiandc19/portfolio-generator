const inquirer = require("inquirer");
// const fs = require("fs");
// const generatePage = require("./src/page-template");

const promptUser = () => {
  return inquirer.prompt ([
  {
    type: "input",
    name: "name",
    message: "What is your name? (required)",
    validate: nameInput => {
      if (nameInput) {
        return true
      } else {
        console.log("Please enter your name");
        return false;
      }
    }
},

{
  type: "input",
  name: "github",
  message: "Enter your Github Username (required)",
  validate: githubInput => {
    if (githubInput) {
      return true
    } else {
      console.log("Please enter your Github Username");
      return false;
    }
  }
},

{
  type: "confirm",
  name: "confirmAbout",
  message: "Would you like to enter an information about yourself for an 'About' section?",
  default: true
},

{
  type: "input",
  name: "about",
  message: "Provide information about yourself:",
  when: ({ confirmAbout }) => {
    if(confirmAbout) {
      return true;
    } else {
      return false;
    }
  }
},

]);
}

const promptProject = portfolioData => {
  console.log(`
 
=================

Add a New Project

=================
  `);

  if (!portfolioData.projects) {
    portfolioData.projects = [];
  } 

  return inquirer.prompt([
{
  type: "input",
  name: "name",
  message: "What is the name of your project? (Required)",
  validate: projectName => {
    if(projectName) {
      return true
    } else {
      console.log("Enter your project name");
      return false;
    }
  }
},
{
  type: "input",
  name: "description",
  message: "Provide a description of the project (Required)",
  validate: descriptionInput => {
    if(descriptionInput) {
      return true
    } else {
      console.log("Enter project description");
      return false;
    }
  }
},
{
  type: "checkbox",
  name: "languages",
  message: "What did you build this project with? (Check all the apply)",
  choices: ["JavaScript", "HTML", "CSS", "ES6", "jQuery", "Bootstrap", "Node"]
},
{
  type: "input",
  name: "link",
  message: "Enter the Github link to your project. (Required)",
  validate: linkInput => {
    if (linkInput) {
      return true
    } else {
      console.log("Enter Github link to your project");
      return false;
    }
  }
},

{
  type: "confirm",
  name: "feature",
  message: "Would you like to feature this project?",
  default: false
},
{
  type: "confirm",
  name: "confirmAddProject",
  message: "Would you like to add another project?",
  default: false
}
  ])

.then(projectData => {
  portfolioData.projects.push(projectData);
  if (projectData.confirmAddProject) {
    return promptProject(portfolioData);
  } else {
    return portfolioData;
  }
});
};

promptUser()
.then(promptProject)
.then(portfolioData => {
  console.log(portfolioData);
})


// const pageHTML = (generatePage(name, github));
// const [name, github] = profileDataArgs;

//   fs.writeFile("index.html", pageHTML, err => {
//     if (err) throw err;
//     console.log("Portfolio complete! Check out index.html to see the output!")
//   })

