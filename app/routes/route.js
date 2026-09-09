const express = require("express");
const router = express.Router();
const {createItem,getItems,getItemById,updateItem,claimItem,deleteItem} = require("../controllers/items.controller");

router.post("/", createItem);
router.get("/", getItems);
router.get("/:id", getItemById);
router.put("/:id", updateItem);
router.patch("/:id/claim", claimItem);
router.delete("/:id", deleteItem);

module.exports = router;