const taskRoute = require("./task.route");
const userRoute = require("./user.route");
const departmentRoute = require("./department.route")
const jobPositionRoute = require("./jobPosition.route")
const authMiddleware = require("../../middlewares/client/auth.middleware");
const checkAdminAccess = require('../middleware/checkAdmin.middleware')
const employeeRoute = require('./employee.route')
const recruitmentRoute = require('./recruitment.route')
const activityRoute = require('./activity.route')
const cvRoute = require('./cv.route')
module.exports = (app) => {
    app.use("/tasks", authMiddleware.requireAuth, taskRoute);

    app.use("/users", userRoute);
    app.use("/task", taskRoute)
    app.use('/department', checkAdminAccess.checkAdminAccess, departmentRoute)
    app.use('/jobposition', jobPositionRoute)
    app.use('/employee', employeeRoute)
    app.use('/recruitment', recruitmentRoute)
    app.use('/activity', activityRoute)
    app.use('/cv', cvRoute)
}