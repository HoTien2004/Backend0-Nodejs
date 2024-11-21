const Customer = require("../models/customer");
const aqp = require("api-query-params");

const createCustomerService = async (customerData) => {
    try {
        let result = await Customer.create({
            name: customerData.name,
            address: customerData.address,
            phone: customerData.phone,
            email: customerData.email,
            description: customerData.description,
            image: customerData.imageURL
        } )
        return result;
    } catch (err) {
        console.log(">>> Check error: ", err.message);
        return null;;
    }
}

const createArrayCustomerService = async (arr) => {
    try {
        let result = await Customer.insertMany(arr);
        return result;
    } catch (err) {
        console.log(">>> Check error: ", err.message);
        return null;
    }
}

const getAllCustomerService = async (limit, page, queryString) => {
    try {
        let result = null;
        if (limit && page) {
            let offset = (page - 1) * limit;
            const { filter } = aqp(queryString);
            delete filter.page;
            console.log(">> Check filter: ", filter);
            
            result = await Customer.find(filter).skip(offset).limit(limit).exec();
            
        } else {
            result = await Customer.find({});
        }
        return result;
    } catch (err) {
        console.log(">>> Check error: ", err.message);
        return null;
    }
}

const putUpdateCustomerService = async (id) => {
    try {
        let result = await Customer.updateOne({ _id: id});
        return result;
    } catch (err) {
        console.log(">>> Check error: ", err.message);
        return null;
    }
}

const deleteACustomerService = async (id) => {
    try {
        let result = await Customer.deleteById(id);
        return result;
    } catch (err) {
        console.log(">>> Check error: ", err.message);
        return null;
    }
}

const deleteArrayCustomerServices = async (arrIds) => {
    try {
        let result = await Customer.delete({ _id: { $in: arrIds } });
        return result;
    } catch (err) {
        console.log(">>> Check error: ", err.message);
        return null;
    }
}

module.exports = {
    createCustomerService,
    createArrayCustomerService,
    getAllCustomerService,
    putUpdateCustomerService,
    deleteACustomerService,
    deleteArrayCustomerServices
}