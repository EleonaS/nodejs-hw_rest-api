const  { Contact } = require('../../models');

const get = async (req, res) => {
    const result= await Contact.find({});
    res.json({
        status: "success",
        code: 200,
        data: {
            result: result
        }
    });
};

module.exports = get;