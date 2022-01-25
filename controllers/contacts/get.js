const contacts = require('../../models/contacts');

const get = async (req, res) => {
    const result= await contacts.listContacts();
    res.json({
        status: "success",
        code: 200,
        data: {
            result: result
        }
    });
};

module.exports = get;