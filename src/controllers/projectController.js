const productService = require('../services/productService');

module.exports = {
    postCreateProject: async (req, res) => {
        let result = await productService.createProject(req.body);
        return res.status(200).json(
            {
                EC: 0,
                data: result
            }
        )
    },
    getAllProject: async (req, res) => {
        let result = await productService.getProject(req.query);
        return res.status(200).json(
            {
                EC: 0,
                data: result
            }
        )
    },
    updateProject: async (req, res) => {
        let result = await productService.uProject(req.body);
        return res.status(200).json(
            {
                EC: 0,
                data: result
            }
        )
    },
    deleteProject: async (req, res) => {
        let result = await productService.removeProject(req.body.id);
        return res.status(200).json(
            {
                EC: 0,
                data: result
            }
        )
    }
}