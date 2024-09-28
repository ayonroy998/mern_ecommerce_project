import { Address } from "../Models/address.js";

export const addAddress = async (req, res) => {
  try {
    let { fullName, address, city, state, country, pincode, phoneNo } =
      req.body;
    let userId = req.user;
    let newAddress = await Address.create({
      userId,
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNo,
    });
    res.json({
      message: "Address added successfully",
      newAddress,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding address" });
  }
};

// get latest user's address
export const getLatestAddress = async (req, res) => {
  try {
    const latestAddress = await Address.findOne({ userId: req.user }).sort({
      createdAt: -1,
    });

    if (!latestAddress) {
      return res.status(404).json({ message: "No address found" });
    }

    res
      .status(200)
      .json({ message: "Latest address found!", newAddress: latestAddress });
  } catch (error) {
    res.status(500).json({ message: "Error fetching latest address", error });
  }
};
