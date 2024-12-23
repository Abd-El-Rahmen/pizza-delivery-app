import Pizza from "../models/Pizza.js";

const fetchRandomPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find({});
    const shuffledPizzas = pizzas.sort(() => Math.random() - 0.5);
    const randomPizzas = shuffledPizzas.slice(0, 6);
    res.status(200).json({
      success: true,
      data: randomPizzas,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

const searchInPizzas = async (req, res) => {
  try {
    const { category = [], name = "" } = req.query;
    let filters = {};

    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    if (name.length) {
      filters.name = { $regex: name, $options: "i" };
    }

    const pizzas = await Pizza.find(filters);

    res.status(200).json({
      success: true,
      data: pizzas,
    });
  } catch (error) {
    console.log(error);
    return res.statu(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

const fetchAllPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find({});

    res.status(200).json({
      success: true,
      data: pizzas,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

const addPizza = async (req, res) => {
  try {
    const { name, img, variants, categorie, description } = req.body;
    const pizzaAlreadyExist = await Pizza.findOne({ name: name });
    if (pizzaAlreadyExist)
      return res.json({
        success: false,
        message: "Pizza name already exist please change the name",
      });

    const newPizza = new Pizza({
      name,
      img,
      variants,
      categorie,
      description,
    });
    await newPizza.save();

    res.status(200).json({
      success: true,
      message: "Pizza Added",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

const updatePizza = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, img, variants, categorie, description } = req.body;
    const findPizza = await Pizza.findById(id);
    if (!findPizza) {
      return res.status(404).json({
        success: false,
        message: "Pizza not found",
      });
    }
    findPizza.name = name;
    findPizza.img = img;
    findPizza.variants = variants;
    findPizza.categorie = categorie;
    findPizza.description = description;
    await findPizza.save();

    res.status(200).json({
      success: true,
      message: "Pizza Updated",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

const deletePizza = async (req, res) => {
  try {
    const { id } = req.params;

    const findPizza = await Pizza.findByIdAndDelete(id);
    if (!findPizza) {
      return res.status(404).json({
        success: false,
        message: "Pizza not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Pizza Deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

export {
  fetchRandomPizzas,
  searchInPizzas,
  fetchAllPizzas,
  addPizza,
  updatePizza,
  deletePizza,
};
