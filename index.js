const inquirer = require("inquirer")
const generateTable = (promptAnswer) => {
    if (promptAnswer.initialPrompt === "view all departments") {

    } else if (promptAnswer.initialPrompt === 'view all roles') {

    } else if (promptAnswer.initialPrompt === 'view all employees') {
        
    } else if (promptAnswer.initialPrompt ===  'add a department') {
        
    } else if (promptAnswer.initialPrompt === 'add a role') {
        
    } else if (promptAnswer.initialPrompt === 'add an employee') {
        
    } else if (promptAnswer.initialPrompt === 'update an employee role') {
        
    }
     

   

}
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: "initialPrompt",
            message: "What would you like to do?",
            choices: ['view all departments','view all roles','view all employees','add a department','add a role','add an employee','update an employee role']
        }
    ])
};

function init() {
    promptUser()
    .then(generateTable)
}
init()