import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [itemText, setItemText] = useState(' ');
  const [listItems, setListItems] = useState([]);
  const [isUpdate, setIsUpdate] = useState(' ');
  const [updateItemText, setUpdateItemText] = useState(' ');
  // ading new item to database

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5055/api/item', {
        item: itemText,
      });
      setItemText(res);
      setItemText('');
    } catch (err) {
      console.log(err);
    }
  };
  // function to fetch all data from db

  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.get('http://localhost:5055/api/items');
        setListItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getItemsList();
  }, [listItems]);

  // delete items

  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5055/api/item/${id}`);
      const newListItems = listItems.filter((item) => item._id !== id);
      setListItems(newListItems);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  // update item

  const UpdateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5055/api/item/${isUpdate}`,
        { item: updateItemText }
      );
      setUpdateItemText('');
      setIsUpdate('');
      console.log(res.data);
    } catch {}
  };

  const renderUpdateForm = () => (
    <form
      className="update-form"
      onSubmit={(e) => {
        UpdateItem(e);
      }}
    >
      <input
        className="update-new-input"
        type="text"
        placeholder="new item"
        onChange={(e) => {
          setUpdateItemText(e.target.value);
        }}
        value={updateItemText}
      />
      <button className="update-new-btn" type="submit">
        Update
      </button>
    </form>
  );
  return (
    <div className="App">
      <h1> TODO APP </h1>
      <form className="form" onSubmit={(e) => addItem(e)}>
        <input
          type="text"
          placeholder="ADD TODO ITEM"
          onChange={(e) => setItemText(e.target.value)}
          value={itemText}
        />
        <button type="submit">ADD</button>
      </form>
      <div className="todo-listItems">
        {listItems.map((item) => (
          <div className="todo-item">
            {isUpdate === item._id ? (
              renderUpdateForm()
            ) : (
              <>
                <p className="item-content">{item.item}</p>
                <button
                  className="update-item"
                  onClick={() => {
                    setIsUpdate(item._id);
                  }}
                >
                  Update
                </button>
                <button
                  className="delete-item"
                  onClick={() => {
                    deleteItem(item._id);
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
