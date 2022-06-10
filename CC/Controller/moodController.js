const Model = require("../Model/moodmodel.js");

const addModel =  async(req, res, next) => {
    try {
        const InputDate = new Date().toISOString();
        const {
            MoodID,
            MoodEmot,
            MoodNotes,
            MoodOwner,
            CreatedBy
        } = req.body

        const newModel = new Model ({
            MoodID,
            MoodEmot,
            MoodNotes,
            MoodOwner,
            InputDate,
            CreatedBy
        })

        await newModel.save();
        res.json({
            status:'true',
            message: 'success', 
            newModel
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            status:'false',
            message: 'Internal Server Error'
        });
    }
}

const getAllModel = async(req, res, next) => {
    try {
        const getAllModel = await Model.findAll({});
        res.json({
            status:'true',
            message: 'success', 
            getAllModel
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            status:'false',
            message: 'Internal Server Error'
        });
    }
}

const getModelByID =  async(req, res, next) => {
    try {
        const id = req.params.ID;

        const getModel = await Model.findOne({
            where: { MoodID:id }
        });

        if (id !== undefined) {
            res.json({
                status: 'true',
                message: 'success',
                getModel
            });
        }

        else {
            res.status(404).json({
                status: 'false',
                message: "Model doesn't found"
            });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            status:'false',
            message: 'Internal Server Error'
        });
    }
}


module.exports = {addModel, getAllModel, getModelByID
};