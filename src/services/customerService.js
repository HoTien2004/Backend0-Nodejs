const Customer = require("../models/customer");

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

const getAllCustomerService = async () => {
    try {
        let result = await Customer.find({});
        return result;
    } catch (err) {
        console.log(">>> Check error: ", err.message);
        return null;
    }
}

module.exports = {
    createCustomerService,
    createArrayCustomerService,
    getAllCustomerService
}