const express = require('express');
const router = express.Router();

const {
    Employee
} = require('../models/employee');

// Getting all the employees.
router.get('/getAll', async (req, res) => {
    const employees = await Employee.find();

    if (employees.length > 0) {
        return res.status(200).send(employees);
    }

    return res.status(400).send('No employees found...');
});

// Getting an employee by Id.
router.get('/getById/:id', async (req, res) => {
    const employee = await Employee.findById(req.params.id);

    if (employee) {
        return res.status(200).send(employee);
    }

    return res.status(400).send('Employee with the given Id not found...');
});

// Searching an employee by name.
router.get('/search', async (req, res) => {
    const employees = await Employee.find({
        $text: {
            $search: req.query.name
        }
    });

    if (employees.length > 0) {
        return res.status(200).send(employees);
    }

    return res.status(400).send('Cound not find any result...');
});

// Adding a new employee.
router.post('/add', async (req, res) => {
    const emp = new Employee({
        name: req.body.name,
        job: req.body.job,
        hiredate: req.body.hiredate,
        salary: req.body.salary,
        department: req.body.department,
        location: req.body.location
    });

    const result = await emp.save();

    if (result) {
        return res.status(200).send(result);
    }

    return res.status(400).send('Error adding employee');
});

// Deleting an employee.
router.delete('/deleteById/:id', async (req, res) => {
    const result = await Employee.deleteOne({
        _id: req.params.id
    });

    if (result) {
        return res.status(200).send('Employee removed successfully.');
    }

    return res.status(400).send('Error deleting employee.');
});

module.exports = router;