//1. create form element
//  - inside the form,use Array.from({length:},callBackFunctionInMapFunction)
//2. listening for the submit event that happens on the form use onSubmit={}
//  - the event will happen as soon as we click the button or hit enter while
//    we are in the input element

import { useState } from "react";
import Logo from "./logo.js";
import Form from "./form.js";
// import { PackingList } from "./PackingList.js";   //named import
import PackingList from "./PackingList.js";
//❌ import Item from "./Item.js";  //import in packinglist file
import Stats from "./Stats.js";
//controlled elements
//explain    -> by default,input fields maintain their own state inside the DOM,
//              inside the HTML element itself.This makes it hard to read the values.
//what we do -> in react ,we usually like to keep all the state in one central place
//              inside the react application,not inside the DOM
//              in order to do that ,we use a technique call controlled elements
//              with this technique,it's react who controls and owns the state of these
//              input fields not DOM.
//              - form data changes over time, we need to use state to maintain our
//                application in sync with it.
//1.define a state
//2.use the state on the element we want to control
//  basically force the element to always take the value of the state variable
//  then update the state variable with using the onChange handler
//  - add listener onChange to input field
//3.set inputValue to stateValue  value={stateValue}

//  keep state and DOM in sync! so we can manipulate the state use setter function
//  to also manipulate the DOM.
//  each time the input value change,use setter function to update the changed value
//  to stateValue:setterFunction(e.target.value).Which will then re-render this view
//  and then the new state value will get placed there as the value
//  - we always both need the value and the change in the input tag

//life up state - move state to the closest common parent component
//whenever multiple sibling components need access to the same state.
//We move that piece of state to the first common parent component.
//background:
//inside Form component,we define a state(and setter function) to allow us use setter
//function to add items to the state.But we never use/render the state itself inside
//the Form component.We need to use/render the state in the Packinglist component
//which is a sibling component to Form component.So we lift the state up to their closest
//common component -> App
//steps: 1.lift up state itself and all the logic about updating the state(e.g setter function)
//         to the closest common parent component
//       2.pass state itself / and the functio(for updating the state) to child components
//         where need to access the state,or need to update the state.

//explanation:
//1.lift state that will need to be accessed by multiple child sibling components.
//2.pass the state into the child component(PackingList) as props  so that list can be
//  rendered according to the state passed in
//3.in order to enable the child component(Form) to update the state,we need to lift up
//  the handleAddItems function(which contains the setter function()),then pass the
//  handleAddItems function as a prop to the Form component.In this way ,we can update
//  state inside Form(child) component
//  -inside the child component,receive and destruct the props and call it with newly
//   add item information
//  -1 is the home of the items/state itself. 3 is all the logic about updating the state
//  should be in the same component.now 1 + 3 are sitting in the parent component,then we
//  can give access to the child sibling components by passing state itself and the setter
//  function as props.So all child components can access to the same state in the parent
//  component.
//  -note: we can pass anything as a prop,including function.we can pass the function as
//         a prop,then access/use the function inside child component.

//derived state
//derived state/variable is computed from an existing piece of state or from props
//when the existing state updated,the component will be re-rendered.
//the derived state(variable) will also be recalculate based on new situdation
// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "charger", quantity: 12, packed: true },
//   { id: 4, description: "tooth brush", quantity: 12, packed: false },
//   { id: 5, description: "wallet", quantity: 12, packed: false },
//   { id: 6, description: "passport", quantity: 12, packed: true },
// ];

export default function App() {
  const [items, setItems] = useState([]);
  //❌ const [numItems, setNumItems] = useState(0);
  // const numItems = items.length;
  function handleAddItems(item) {
    //adding new items to the state
    setItems((items) => [...items, item]);
  }
  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        //update an object in an array
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearAll() {
    //create a web API function to double check
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    // setItems((items) => []);
    if (confirmed) setItems([]);
  }
  return (
    <div>
      <Logo />
      {/* naming convention onFunctioName = handleFunctionName */}
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onToggleItem={handleToggleItem}
        onClearAll={handleClearAll}
      />
      <Stats items={items} />
    </div>
  );
}
