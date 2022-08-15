const mysql = require("mysql2");
const db = require("./db/connection");
const cTable = require("console.table");
const express = require("express");
const inquirer = require("inquirer");
const { Console } = require("console");

function getDepartments() {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.error(err);
    }
    console.table(rows);
    initialize();
  });
}

function getRoles() {
  const sql = `SELECT * FROM roles`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.error(err);
    }
    console.table(rows);
    initialize();
  });
}

function getEmployees() {
  const sql = `SELECT * FROM employee`;
  db.query(sql, (err, rows) => {
    if (err) {
      console.error(err);
    }
    console.table(rows);
    initialize();
  });
}

function addDepartments() {
  inquirer
    .prompt({
      type: "input",
      name: "name",
      message: "Enter the name of the department you would like to create: ",
    })
    .then(function (data) {
      const sql = `INSERT INTO departments (name) VALUES (?)`;
      const params = [data.name];
      db.query(sql, params, (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Department added!");
        initialize();
      });
    })
    .catch(function (err) {
      console.log(err);
    });
}

function addRole() {
  db.query("select id from departments", (err, department_ids) => {
    let ids = department_ids.map((element) => element.id);
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "Enter the new role name: ",
        },
        {
          type: "number",
          name: "salary",
          message: "Enter the salary: ",
        },
        {
          type: "list",
          name: "id",
          choices: ids,
        },
      ])
      .then(function (data) {
        const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
        const params = [data.title, data.salary, data.id];
        db.query(sql, params, (err, result) => {
          if (err) {
            console.error(err);
            return;
          }
          initialize();
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first",
        message: "Enter employee first name: ",
      },
      {
        type: "input",
        name: "last",
        message: "Enter employee last name: ",
      },
      {
        type: "list",
        name: "id",
        message: "Choose employee role id:",
        choices: ["1", "2", "3"],
      },
      {
        type: "list",
        name: "manager",
        message: "Choose employee manager id:",
        choices: ["1", "4", "7"],
      },
    ])
    .then(function (data) {
      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
      const params = [data.first, data.last, data.id, data.manager];
      db.query(sql, params, (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Employee added!");
        initialize();
      });
    })
    .catch(function (err) {
      console.log(err);
    });
}

function updateEmployee() {
  db.query("select id, first_name from employee", (err, emp) => {
    let employee = emp.map((element) => element.first_name);
    inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message:
            "Please select the employee whose role you'd like to update:",
          choices: employee,
        },
        {
          type: "list",
          name: "role",
          message: "Please select the employee's new role:",
          choices: ["1", "2", "3"],
        },
      ])
      .then(function (data) {
        const empId = emp.filter((item) => item.first_name === data.employee)[0]
          .id;
        const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
        const params = [data.role, empId];
        db.query(sql, params, (err, result) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log("Employee role updated!");
          initialize();
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  });
}

function quit() {
  console.log("Goodbye!");
  process.exit();
}

function initialize() {
  inquirer.prompt(mainMenu).then((selection) => {
    switch (selection.choices) {
      case "View Departments":
        getDepartments();
        break;
      case "View Roles":
        getRoles();
        break;
      case "View Employees":
        getEmployees();
        break;
      case "Add a department":
        addDepartments();
        break;
      case "Add an employee":
        addEmployee();
        break;
      case "Add a role":
        addRole();
        break;
      case "Update employee role":
        updateEmployee();
        break;
      case "Quit":
        quit();
        break;
    }
    console.log(selection.choices + " chosen");
  });
}

const mainMenu = {
  type: "list",
  name: "choices",
  message: "Plese Select an option to manage the database:",
  choices: [
    "View Departments",
    "View Roles",
    "View Employees",
    "Add a department",
    "Add a role",
    "Add an employee",
    "Update employee role",
    "Quit",
  ],
};

initialize();
