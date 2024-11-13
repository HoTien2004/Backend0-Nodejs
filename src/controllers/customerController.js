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
    }
}