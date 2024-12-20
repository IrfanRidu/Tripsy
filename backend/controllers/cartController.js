import UserModel from "../models/userModel.js";

//add cart

export const addToCart = async (req, res) => {
  try {
    let userData = await UserModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;

    if (!cartData[req.body.itemId]) {

        cartData[req.body.itemId]=1
    }
    else {

        cartData[req.body.itemId]+= 1
    }
    await UserModel.findByIdAndUpdate(req.body.userId,{cartData});



    return res.json({
      message: "Item add successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

//remove cart
export const removeFromCart = async (req, res) => {

    try {
        let userData = await UserModel.findById(req.body.userId );
        let cartData = await userData.cartData;
    
        if (cartData[req.body.itemId]>0) {
    
            cartData[req.body.itemId]-= 1
        }

        await UserModel.findByIdAndUpdate(req.body.userId,{cartData});
    
    
    
        return res.json({
          message: "Item removed successfully",
          error: false,
          success: true,
        });
      } catch (error) {
        return res.status(500).json({
          message: error.message || error,
          error: true,
          success: false,
        });
      }
    };



///get cart
export const getCart = async (req, res) => {
    try {
        let userData = await UserModel.findById(req.body.userId );
        let cartData = await userData.cartData;
    
        return res.json({
          cartData,
          message: "Item fetched successfully",
          error: false,
          success: true,
        });
      } catch (error) {
        return res.status(500).json({
          message: error.message || error,
          error: true,
          success: false,
        });
      }
    };



