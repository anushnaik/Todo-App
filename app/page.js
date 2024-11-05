"use client";
import React, { useState } from "react";
import "./page.css";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [list, setList] = useState([]);

  // Adding new items
  const updateInput = (value) => {
    setUserInput(value);
  };

  const handleAction = () => {
    if (userInput.trim() === "") return;

    const newItem = {
      id: Math.random(),
      value: userInput,
      isSelected: false,
    };
    setList([...list, newItem]);

    setUserInput("");
  };

  // Deleting the items
  const deleteItem = (id) => {
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
  };

  // Clear all items
  const clearAll = () => {
    setList([]);
  };

  // Toggle selection state of an item
  const toggleSelect = (id) => {
    const updatedList = list.map((item) =>
      item.id === id ? { ...item, isSelected: !item.isSelected } : item
    );
    setList(updatedList);
  };

  return (
    <div className="bg-[#f5f9ff] h-full flex justify-center items-center min-h-screen">
      <div className="w-[90%] md:w-[70%] h-270 mx-auto bg-white rounded-3xl overflow-hidden shadow-lg">
        <div className="px-5 md:px-10 py-10 w-full md:w-[75%] mx-auto min-h-[600px] max-h-auto flex flex-col">
          <div className="text-4xl font-bold mb-10 mt-10">Daily To Do List</div>

          <div className="relative mb-10">
            <input
              value={userInput}
              onChange={(e) => updateInput(e.target.value)}
              type="search"
              id="search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
              placeholder="Add New item List"
              required
            />
            <button
              onClick={handleAction}
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
            >
              Add
            </button>
          </div>

          {/* Scrollable list */}
          <div style={{ maxHeight: "280px", overflowY: "auto", flexGrow: 1 }}>
            {list.length > 0 ? (
              <>
                {list.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <button
                      className="bg-white h-8 w-8 rounded-3xl"
                      onClick={() => toggleSelect(item.id)}
                    >
                      <div
                        className={`mt-1 h-7 w-7 ${
                          item.isSelected ? "check-icon" : "uncheck-icon"
                        }`}
                      ></div>
                    </button>
                    <span
                      style={{
                        fontSize: "1.2rem",
                        flexGrow: "1",
                        textDecoration: item.isSelected
                          ? "line-through"
                          : "none",
                        color: item.isSelected ? "#888" : "#000",
                        marginLeft: "20px",
                      }}
                    >
                      <div className="hover:text-blue-500 break-words leading-none">
                        {item.value}
                      </div>
                    </span>
                    <button
                      className="text-gray-500 mr-5 font-medium hover:text-red-500"
                      onClick={() => deleteItem(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-gray-500">List is Empty!</div>
            )}
          </div>

          <div className="mt-auto sticky bottom-0 bg-white text-[#777] py-4 border-t flex justify-between">
            <div>{`${list.length} items`}</div>
            <button className="hover:text-red-500" onClick={clearAll}>
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
