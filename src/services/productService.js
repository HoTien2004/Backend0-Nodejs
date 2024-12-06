const Project = require('../models/project');
const aqp = require("api-query-params");
const Task = require('../models/task');

module.exports = {
    createProject: async (data) => {
        if (data.type === "EMPTY-PROJECT") {
            let result = await Project.create(data);
            return result;
        }
        
        if (data.type === "ADD-USERS") {
            console.log(">>> Check data: ", data);
            let myProject = await Project.findById(data.projectId).exec();

            for (let i = 0; i < data.usersArr.length; i++) {
                myProject.usersInfor.push(data.usersArr[i]);
            }

            let newResult = await myProject.save();
            return newResult;
        }

        if (data.type === "ADD-TASKS") {
            console.log(">>> Check data: ", data);
            let myProject = await Project.findById(data.projectId).exec();

            for (let i = 0; i < data.taskArr.length; i++) {
                myProject.tasks.push(data.taskArr[i]);
            }

            let newResult = await myProject.save();
            return newResult;
        }

        if (data.type === "REMOVE-USERS") {
            console.log(">>> Check data: ", data);
            let myProject = await Project.findById(data.projectId).exec();

            for (let i = 0; i < data.usersArr.length; i++) {
                myProject.usersInfor.pull(data.usersArr[i]);
            }

            let newResult = await myProject.save();
            return newResult;
        }
        return null;
    },
    getProject: async (queryString) => {
        const page = queryString.page;

        const { filter, limit, population } = aqp(queryString);
        console.log('before', filter);
        console.log('aqp(queryString)', aqp(queryString));
        delete filter.page;
        console.log('after', filter);
        let offset = (page - 1) * limit;
        result = await Project.
        find(filter).
        populate(population).
        skip(offset).
        limit(limit).
        exec();
        return result;
    },
    uProject: async (data) => {
        let result = await Project.updateOne({ _id: data.id}, { ...data });
        return result;
    },
    removeProject: async (id) => {
        let result = await Project.deleteOne({ id });
        return result;
    },
   
    //Task
    createTask: async (data) => {
        if (data.type === "EMPTY-TASK") {
            let result = await Task.create(data);
            return result;
        }
        return null;
    },
    getTask: async (queryString) => {
        const page = queryString.page;
        const { filter, limit, population } = aqp(queryString);
        console.log('before', filter);
        console.log('aqp(queryString)', aqp(queryString));
        delete filter.page;
        console.log('after', filter);
        let offset = (page - 1) * limit;
        result = await Task.
        find(filter).
        // populate(population).
        skip(offset).
        limit(limit).
        exec();
        return result;
    },
    uTask: async (data) => {
        let result = await Task.updateOne({ _id: data.id}, { ...data });
        return result;
    },
    removeTask: async (id) => {
        let result = await Task.deleteOne({ id });
        // let result = await Task.deleteById({ id });
        return result;
    }
}