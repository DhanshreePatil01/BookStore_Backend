import HttpStatus from 'http-status-codes';
import * as customerdetails from '../services/customer.service';

//controller to add address
export const addAddress = async (req, res, next) => {
    try {
      const data = await customerdetails.addAddress(req.body);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'Address successfully Added'
      });
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      })
      next(error);
    }
  };
