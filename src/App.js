import { useState, useReducer } from 'react'


// set up a reducer 
// return takes in the action.type
// then splits it up into different cases 
// each case modifies on the inital state and return previous state
// the dipatching an action includes a payload for which modifies the state speicifed in the reducer function
// the inital state sets up the ds that going to be modified
// two type of actions one to add one to delete 
// to add we just add the current text which we hold in a state through two way binding 
// for delete we keep a random id of each todo we add and filter out the id that matches the current one selected 
// map the state, specifically the todos object within the state, to li items on the page 

const Reducer = () => {
    const [text, setText] = useState('')

    const initialState = {
        todos: []
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'DELETE': 
                return {
                    ...state, 
                    todos: [...state.todos.filter(todo => todo.id !== action.payload)]
                }
            case 'ADD':
                return {
                    ...state, 
                    todos: [...state.todos, action.payload]
                }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const deleteHandler = (id) => {
        dispatch({ type: 'DELETE', payload: id})
    }

    const submitHandler = () => {
        if (text === "") return
        dispatch({ type: 'ADD', payload: {
            id: Math.random(),
            text
        }})
        setText('')
    }

    return (
        <>
        <input 
            value={text}
            onChange={e => setText(e.target.value)}

        />
        <button onClick={submitHandler}>Submit</button>
        <ul>
            {state.todos.map((todo) => (
                <div key={todo.id}>
                <li>{todo.text}</li>
                <button onClick={() => deleteHandler(todo.id)}>X</button>
                </div>
            ))}
        </ul>
        </>
    )
}

export default Reducer
