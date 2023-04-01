import customerdb from "../models/customer.model";

//service to add address
export const addAddress = async (body) => {

    //checks if customer exists
    let customer = await customerdb.findOne({ userID: body.userID });
  
    //if no customer it will create new one and return
    if (!customer) {
      customer = await customerdb.create({
        userID: body.userID,
        addresses: [{
          name: body.name,
          phoneNumber: body.phoneNumber,
          addressType: body.addressType,
          fullAddress: body.fullAddress,
          city: body.city,
          landmark: body.landmark,
          state: body.state,
          pinCode: body.pinCode,
          locality: body.locality
        }]
      });
      return customer;
    }
  
    let newCustomer;
  
    if (body.addressIndex >= 0) {
      const updateAddress = {
        $addToSet: {
          [`addresses.${body.addressIndex}.name`]: body.name,
          [`addresses.${body.addressIndex}.phoneNumber`]: body.phoneNumber,
          [`addresses.${body.addressIndex}.addressType`]: body.addressType,
          [`addresses.${body.addressIndex}.fullAddress`]: body.fullAddress,
          [`addresses.${body.addressIndex}.city`]: body.city,
          [`addresses.${body.addressIndex}.landmark`]: body.landmark,
          [`addresses.${body.addressIndex}.state`]: body.state,
          [`addresses.${body.addressIndex}.pinCode`]: body.pinCode,
          [`addresses.${body.addressIndex}.locality`]: body.locality
        }
      };
      newCustomer = await customerdb.updateOne({ _id: customer._id }, updateAddress);
    } else {
      const pushAddress = {
        $push: {
          addresses: {
            name: body.name,
            phoneNumber: body.phoneNumber,
            addressType: body.addressType,
            fullAddress: body.fullAddress,
            city: body.city,
            landmark: body.landmark,
            state: body.state,
            pinCode: body.pinCode,
            locality: body.locality
          }
        }
      };
      newCustomer = await customerdb.updateOne({ _id: customer._id }, pushAddress);
    }
  
    return newCustomer;
  };