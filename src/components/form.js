import { useState } from "react";
//when submit event is triggered ,react will call the handleSubmit
//function.It will along pass into the function ,the event object
//the event object - an object with all the information about the
//current event

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  // const [items, setItems] = useState([]);

  // function handleAddItems(item) {
  //   //React is all about immutability
  //   //CAN NOT mutate array when use setter function in state.
  //   //Just create a new array containing the original and newly added part
  //   // ❌setItems((items)=>items.push(item))

  //   //adding new items to the state
  //   setItems((items) => [...items, item]);
  // }

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: new Date() };
    setQuantity(1);
    setDescription("");
    // handleAddItems(newItem);
    onAddItems(newItem);
    // initialItems.push(newItem);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip 😍 ?</h3>
      <select
        value={quantity}
        onChange={(e) => {
          setQuantity(e.target.value);
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num}>{num}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={
          (e) => setDescription(e.target.value)
          // console.log(e.target.value);
        }
      ></input>
      <button>Add</button>
    </form>
  );
}
