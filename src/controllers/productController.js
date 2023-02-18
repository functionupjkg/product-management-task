const db = require("../db");
const { isValidName, isValidNumber } = require("../validator/validations");

//=========create product API ============>>>

const createProduct = async (req, res) => {
  try {
    const { name, price, quantity, active } = req.body;
    if (!name || !price || !quantity || !active) {
      return res.status(400).send({
        status: false,
        message: "Product name, price, quantity & active data are required",
      });
    }
    if (!name)
      return res
        .status(400)
        .send({ status: false, message: "Product name is required" });

    if (!isValidName(name.trim()))
      return res
        .status(400)
        .send({ status: false, message: "Product name is not Valid or Empty" });

    //price validation
    if (!price)
      return res
        .status(400)
        .send({ status: false, message: "Please enter price" });

    if (!isValidNumber(price))
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid price" });
    if (!quantity)
      return res
        .status(400)
        .send({ status: false, message: "Please enter quantity" });

    if (!isValidNumber(quantity))
      return res
        .status(400)
        .send({ status: false, message: "Enter a valid quantity" });

    db.query(
      "INSERT INTO products (name, price, quantity, active) VALUES (?, ?, ?, ?)",
      [name, price, quantity, active],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .send({ status: false, message: "Internal Server Error" });
        }
        return res
          .status(201)
          .send({ satus: true, message: "Product created", data: result });
      }
    );
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//=========get all product API ============>>>

const getProducts = (req, res) => {
  try {
    db.query("SELECT * FROM products", (err, results) => {
      if (err) {
        return res
          .status(404)
          .send({ status: false, message: "Products are not found" });
      }
      if (results.length === 0) {
        return res
          .status(404)
          .send({ status: false, message: "Product not found" });
      }

      return res.status(200).send({ status: true, data: results });
    });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};

//=========get product by id API ============>>>

const getProductById = (req, res) => {
  try {
    const id = req.params.id;
    if (!id)
      return res.status(400).send({
        status: false,
        message: "id is not present",
      });

    if (!isValidNumber(id))
      return res
        .status(400)
        .send({ status: false, message: "ProductId is Invalid" });

    db.query("SELECT * FROM products WHERE id = ?", [id], (err, results) => {
      if (err) {
        return res
          .status(500)
          .send({ status: false, message: "Internal Server Error" });
      }
      if (results.length === 0) {
        return res
          .status(404)
          .send({ status: false, message: "Product not found" });
      }
      return res.send(results[0]);
    });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

//=========update product API ============>>>

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id)
      return res.status(400).send({
        status: false,
        message: "id is not present",
      });

    if (!isValidNumber(id))
      return res
        .status(400)
        .send({ status: false, message: "ProductId is  Invalid" });

    const { name, price, quantity, active } = req.body;
    if (!name || !price || !quantity || !active) {
      return res
        .status(400)
        .send("Product name, price, and quantity are required");
    }
    db.query(
      "UPDATE products SET name = ?, price = ?, quantity = ?, active = ? WHERE id = ?",
      [name, price, quantity, active, id],
      (err, result) => {
        if (err) {
          return res.status(500).send("Internal Server Error");
        }
        return res
          .status(200)
          .send({ status: true, message: "Product updated" });
      }
    );
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//=========delete product API ============>>>

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id)
      return res.status(400).send({
        status: false,
        message: "id is not present",
      });

    if (!isValidNumber(id))
      return res
        .status(400)
        .send({ status: false, message: "ProductId is  Invalid" });

    db.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
      if (err) {
        return res
          .status(400)
          .send({ status: false, message: "Product not found" });
      }
      return res.status(200).send({ status: true, message: "Product deleted" });
    });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
