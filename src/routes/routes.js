const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth");
const { registerUser, loginUser } = require("../controllers/userController");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");


//=========user APIs ============>>>

router.post("/register", registerUser);
router.post("/login", loginUser);

//=========Product APIs ============>>>

router.post("/products", createProduct);
router.get("/products", authMiddleware, getProducts);
router.get("/products/:id", authMiddleware, getProductById);
router.put("/products/:id", authMiddleware, updateProduct);
router.delete("/products/:id", authMiddleware, deleteProduct);

module.exports = router;
