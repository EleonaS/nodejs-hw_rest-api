const  { Contact } = require('../../models');

const get = async (req, res) => {
   
    const { _id } = req.user;
    
    const { page = 1, limit = 1 } = req.query;
    const skip = (page-1)*limit;
    const result= await Contact.find({owner:_id}, "", {skip, limit:Number(limit)}).populate("owner", "_id email");
    res.json({
        status: "success",
        code: 200,
        data: {
            result: result
        }
    });
};

module.exports = get;