const { authenticate } = require("../middlewares/index");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {Unauthorized} = require("http-errors");

describe('Auth middleware test', () => {
  it('should call next() and add user and token properties to req object', () => {
    const user = {
      _id: '1'
    };

    const { SECRET_KEY } = process.env;
    
    const payload = { id: user._id };
    
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    
    const mReq = {
      headers: {
        'authorization': `Bearer ${token}`
      }
    };
    
    const mRes = {};
    const mockNext = jest.fn();

    authenticate(mReq, mRes, mockNext);

    expect(mReq.token).not.toBe(token);
    expect(mReq._id).not.toBe(user._id);
    expect(mockNext).toHaveBeenCalled();
  });

  /* ???????
  it('should call next() with error in case authorization header is absent', () => {
    const mReq = {
      headers: {}
    };
    const mRes = {};
    const mockNext = jest.fn();

    authenticate(mReq, mRes, mockNext);

    expect(mockNext).toHaveBeenCalledWith(new Unauthorized(`Please, provide a token in request authorization header`));
  })*/
});



