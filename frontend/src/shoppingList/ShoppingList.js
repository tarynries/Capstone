import React, { useState } from "react";

function ShoppingList({ recipes }) {
    const [item, setItem] = useState("");
    const [shoppingList, setShoppingList] = useState([]);

    const handleChange = (event) => {
        setItem(event.target.value);
    };

    const addItem = () => {
        if (item.trim() !== "") {
            const newItem = { name: item.trim(), checked: false };
            setShoppingList([...shoppingList, newItem]);
            setItem("");
            toggleCheck(shoppingList.length); // Check the newly added item
        }
    };

    const toggleCheck = (index) => {
        setShoppingList((prevList) => {
            const newList = [...prevList];
            newList[index].checked = !newList[index].checked;
            return newList;
        });
    };

    return (
        <div>
            <h2>Shopping List</h2>
            <h3>Misc Items</h3>
            <div>
                <input
                    type="text"
                    placeholder="Add item"
                    value={item}
                    onChange={handleChange}
                />
                <button onClick={addItem}>Add Item</button>
            </div>
            <ul style={{ listStyleType: "none" }}>
                {shoppingList.map((item, index) => (
                    <li
                        key={index}
                        style={{ textDecoration: item.checked ? "line-through" : "none" }}
                    >
                        <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => toggleCheck(index)}

                        // need to add functionality here to be able to check the box of the newly added items 
                        />
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ShoppingList;

