const express = require('express');
const employeeRouter = express.Router();
const ROLES_LIST = require('./../../config/roles_list');  
const verifyRoles = require('./../../middleware/verifyRoles');

const {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployee
} = require('../../controllers/empController');  // adjust the path as needed

employeeRouter.route('/')
  .get(getAllEmployees)
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createEmployee)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateEmployee)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee);

employeeRouter.route('/:id')
  .get(getEmployee);

module.exports = employeeRouter;