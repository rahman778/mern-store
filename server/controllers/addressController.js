import Address from "../models/addressModel.js";
import ErrorHandler from "../utils/errorHandler.js";

// add address api
export const addAddress = async (req, res) => {
  try {
    const user = req.user;

    const address = new Address({
      ...req.body,
      user: user._id
    });
    const addressDoc = await address.save();

    res.status(200).json({
      success: true,
      message: `Address has been added successfully!`,
      address: addressDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
};

// fetch all addresses api
export const getAllAddress =  async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id });

    res.status(200).json({
      addresses
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
};

export const getAddress =  async (req, res) => {
  try {
    const addressId = req.params.id;

    const addressDoc = await Address.findOne({ _id: addressId });

    if (!addressDoc) {
      res.status(404).json({
        message: `Cannot find Address with the id: ${addressId}.`
      });
    }

    res.status(200).json({
      address: addressDoc
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const update = req.body;
    const query = { _id: addressId };

    await Address.findOneAndUpdate(query, update, {
      new: true
    });

    res.status(200).json({
      success: true,
      message: 'Address has been updated successfully!'
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
};

export const deleteAddress =  async (req, res) => {
  try {
    const address = await Address.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: `Address has been deleted successfully!`,
      address
    });
  } catch (error) {
    res.status(400).json({
      error: 'Your request could not be processed. Please try again.'
    });
  }
};

