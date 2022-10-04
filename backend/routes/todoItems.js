const router = require('express').Router();

const todoItemsModel = require('../models/todoItems');

router.post('/api/item', async (req, res) => {
  try {
    const newItem = new todoItemsModel({
      item: req.body.item,
    });

    const saveItem = await newItem.save();
    res.status(200).json('Item Added');
  } catch (err) {
    res.json(err);
  }
});

router.get('/api/items', async (req, res) => {
  try {
    const allTodoItems = await todoItemsModel.find({});

    res.status(200).json(allTodoItems);
  } catch (err) {
    res.json(err);
  }
});

// Updating the item

router.put('/api/item/:id', async (req, res) => {
  try {
    const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json('item updated');
  } catch (err) {
    res.json(err);
  }
});

// deleting item
router.delete('/api/item/:id', async (req, res) => {
  try {
    const updateItem = await todoItemsModel.findByIdAndDelete(req.params.id);
    res.status(200).json('item Deleted');
  } catch (err) {
    res.json(err);
  }
});

//export router

module.exports = router;
