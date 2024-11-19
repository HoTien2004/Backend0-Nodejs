const fileService = require("../services/fileService");
const customerService = require("../services/customerService");

module.exports = {
    postCreateCustomer: async (req, res) => {
        let { name, address, phone, email, description } = req.body;

        let imageURL = "";

        if (!req.files || Object.keys(req.files).length === 0) {
            // do nothing
        } else {
            let results = await fileService.uploadSingleFile(req.files.image);
            imageURL = results.path;
        }
        let customerData = {
            name, address, phone, email, description, imageURL
        }

        let customer = await customerService.createCustomerService(customerData);
    
        return res.status(200).json(
            {
                errorCode: 0,
                data: customer
            }
        )
    },
    postCreateArrayCustomer: async (req, res) => {
        let customers = await customerService.createArrayCustomerService(req.body.customers);
        if (customers) {
            return res.status(200).json(
                {
                    errorCode: 0,
                    data: customers
                }
            )
        } else {
            return res.status(500).json(
                {
                    errorCode: -1,
                    data: customers
                }
            )
        }
    },

    getAllCustomers: async (req, res) => {
        console.log(">>> Check limit: ", req.query)
        let limit = req.query.limit;
        let page = req.query.page;
        let name = req.query.name;
        let result = null;

        if (limit && page) {
            result = await customerService.getAllCustomerService(limit, page, name);
        } else {
            result = await customerService.getAllCustomerService();
        }
        return res.status(200).json(
            {
                EC: 0,
                data: result
            }
        )
    },
    
    putUpdateCustomers: async (req, res) => {
        let { id, name, email, address } = req.body;
        let result = await customerService.putUpdateCustomerService(id, name, email, address);

        return res.status(200).json(
            {
                EC: 0,
                data: result
            }
        )
    },
    
    deleteACustomer: async (req, res) => {
        let id = req.body.id;
        let result = await customerService.deleteACustomerService(id);
        
        return res.status(200).json(
            {
                EC: 0,
                data: result
            }
        )
    },

    deleteArrayCustomers: async (req, res) => {
        let ids = req.body.customersId;
        console.log(">>Check ids: ", ids)
        let result = await customerService.deleteArrayCustomerServices(ids);
        
        return res.status(200).json(
            {
                EC: 0,
                data: result
            }
        )
    }
}