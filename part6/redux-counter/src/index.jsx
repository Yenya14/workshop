import { createRoot } from "react-dom/client";
// import {useState} from "react";
import {createStore} from "redux";

const counterReducer = (state = 0, action) => {
    // console.log("action is", action);
    // console.log("state is", state);
    // if(action.type === "ADD"){
    //     const newState = state + 1;
    //     return newState;
    // }
    // return state;
    switch (action.type) {
        case 'ADD':
          return state + 1
        case 'SUBSTRACT':
          return state - 1
        case 'ZERO':
          return 0
        default: 
          return state
      }
}

const store = createStore(counterReducer)

const App = () => {
    // const [counter, setCounter] = useState(0)

    const addCounter = () => {
        // setCounter(counter + 1)
        store.dispatch({type: "ADD"})
    }

    const subtractCounter = () => {
        // setCounter(counter - 1)
        store.dispatch({type: "SUBSTRACT"})

    }

    const makeZero = () => {
        // setCounter(0)
        store.dispatch({type: "ZERO"})

    }

    return(<div>
        <div>{store.getState()}</div>
        <button onClick={addCounter}>add</button>
        <button onClick={subtractCounter}>subtract</button>
        <button onClick={makeZero}>zero</button>
        </div>
    )
}

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App/>);
store.subscribe(()=>(
    root.render(<App/>)
))