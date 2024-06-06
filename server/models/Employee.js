const mongoose = require('mongoose')
const EmployeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    title: String,
    pdf:String,
})
const EmployeeModal = mongoose.model("employees",EmployeeSchema)
module.exports = EmployeeModal;