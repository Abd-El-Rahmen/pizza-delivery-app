import Cart from "../models/Cart.js";
import Pizza from "../models/Pizza.js";

const addToCart = async (req, res) => {
  try {
    const { userId, pizzaId, quantity, selectedVariant } = req.body;

    if (
      userId &&
      pizzaId &&
      selectedVariant &&
      (quantity > 0 || quantity === "-1")
    ) {
      const pizza = await Pizza.findById(pizzaId);
      if (!pizza) {
        return res.status(404).json({
          success: false,
          message: "Pizza not found",
        });
      }
      let cart = await Cart.findOne({
        userId: userId,
      });
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }

      const findCurrentPizzaIndex = cart.items.findIndex(
        (item) => item.pizzaId.toString() === pizzaId
      );
      if (findCurrentPizzaIndex === -1) {
        cart.items.push({ pizzaId, selectedVariant, quantity });
      } else {
        if (
          cart.items[findCurrentPizzaIndex].quantity + Number(quantity) > 10 ||
          cart.items[findCurrentPizzaIndex].quantity + Number(quantity) < 1
        ) {
          return res.json({
            success: false,
            cart: cart,
            message: "Your Quantity Should Be Between 1 and 10",
          });
        }
        cart.items[findCurrentPizzaIndex].quantity += Number(quantity);
      }
      await cart.save();
      res.status(200).json({
        success: true,
        data: cart,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid Data Provided",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const fetchCartItems = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User id required",
      });
    }
    const cart = await Cart.findOne({ userId }).populate({
      path: "items.pizzaId",
      select: "name img categorie ",
    });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const validItems = cart.items.filter((item) => item.pizzaId);
    if (validItems.length > cart.items.length) {
      cart.items = validItems;
      await cart.save();
    }

    const populateCartItems = validItems.map((item) => ({
      pizzaId: item.pizzaId._id,
      img: item.pizzaId.img,
      name: item.pizzaId.name,
      selectedVariant: item.selectedVariant,
      quantity: item.quantity,
    }));

    return res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { userId, pizzaId } = req.params;

    if (!userId || !pizzaId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data provided!",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found!",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.pizzaId.toString() !== pizzaId
    );

    await cart.save();
    res.status(200).json({
      success: true,
      message: "Cart Item Removed",
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the cart item.",
      error: error.message,
    });
  }
};

export { addToCart, fetchCartItems, deleteCartItem };
