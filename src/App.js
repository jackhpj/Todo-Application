import { useEffect, useState } from "react";

function App() {

  const [activeTab, setActiveTab] = useState('All');
  const [inputValue, setInputValue] = useState('');
  const [toDos, setToDos] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('my-todos'));
    if (data) {
      setToDos(data);
    }
    console.log(toDos)
    console.log(data)
  }, [])

  useEffect(() => {
    localStorage.setItem('my-todos', JSON.stringify(toDos))
  }, [toDos])

  function submitTodo(){
    if(inputValue === null || inputValue === ''){
      alert('Please enter something to add a todo');
      return
    }
      let newToDo = {
        Description: inputValue,
        Completed: false
      }
      setInputValue('');
      setToDos(toDos => [...toDos, newToDo]);
  }

  function setCompleted(index){
    setToDos(
      toDos.map(
        todo => toDos.indexOf(todo) === index ? { ...todo, Completed: true } : todo
      )
    )
  }

  function deleteTodo(index){
    if(index === 'all'){
      console.log('test')
      setToDos(
        toDos.filter(
          todo => todo.Completed === false
        )
      )
    } else {
      setToDos(
        toDos.filter(
          todo => toDos.indexOf(todo) !== index
        )
      )
    }
  }

  return (
    <div className="App h-screen bg-gradient-to-b from-sky-400 to-sky-200">
      <div className="flex-col w-1/4 m-auto justify-center ">
        <h2 className="text-center text-3xl font-semibold mb-4">#Todo List</h2>
        <div className="grid grid-cols-3 grid-rows-1 mb-2">
          <div className="grid grid-cols-1 grid-rows-1 h-12 border-b-2 hover:border-blue-500 w-full" style={activeTab === 'All' ? {borderBottom: '2px solid #3B82F6'} : {}}>
            <button className='rounded-lg font-medium' onClick={() => setActiveTab('All')}>All</button>
          </div> 
          <div className="grid grid-cols-1 grid-rows-1 h-12 border-b-2 hover:border-blue-500 w-full" style={activeTab === 'Active' ? {borderBottom: '2px solid #3B82F6'} : {}}>
            <button className='rounded-lg font-medium' onClick={() => setActiveTab('Active')}>Active</button>
          </div>
          <div className="grid grid-cols-1 grid-rows-1 h-12 border-b-2 hover:border-blue-500 w-full" style={activeTab === 'Completed' ? {borderBottom: '2px solid #3B82F6'} : {}}>
            <button className='rounded-lg font-medium' onClick={() => setActiveTab('Completed')}>Completed</button>
          </div>
        </div>

        <div className="todos">
          {/* Display Input if on All or Active Tab */}
          {activeTab === 'All' || activeTab === 'Active' ? 
          <div>
            <input type='text' value={inputValue} className="border-solid border-2 border-blue-500 rounded-lg m-4 w-9/12 h-10" onChange={(e) => setInputValue(e.target.value)} 
            placeholder="Details" />
            <button className="bg-blue-600 rounded-md" type="submit" onClick={submitTodo}>
              <h2 className="m-2 text-white font-medium">Add</h2>
            </button>
          </div>
          : ''}
          <ul className="ml-4 text-l">
            {/* Display All todos */}
            {activeTab === 'All' ? toDos.map((todo, index) => 
                <div className="flex mb-1" key={index}>
                  <li className='hover-underline-animation font-medium' style={todo.Completed === true ? {textDecoration: 'line-through'} : {}}>{todo.Description}</li>
                  {todo.Completed === false ? <button onClick={() => setCompleted(index)} className='hover-underline-animation ml-2'>✅</button> : ''}
                </div>
              ) : 
              // Display Active todos
              activeTab === 'Active' ? 
              toDos.filter(todo => 
                todo.Completed === false
              ).map((todo, index) => 
                <div className="flex mb-1" key={index}>
                  <li className="hover-underline-animation font-medium">{todo.Description}</li>
                  <button onClick={() => setCompleted(index)} type='submit' className='hover-underline-animation ml-2'>✅</button>
                </div>
              )
              // Display Completed todos
              : 
              <div>
                {toDos.filter(todo => 
                  todo.Completed === true
                ).map((todo, index) => 
                  <div className="flex mb-1" key={index}>
                    <li className="hover-underline-animation line-through font-medium">{todo.Description}</li>
                    <button onClick={() => deleteTodo(index)} type='submit' className='hover-underline-animation ml-2'>🗑</button>
                  </div>
                )}
                <button className="bg-red-500 rounded-md font-medium mt-4" onClick={() => deleteTodo('all')}>
                  <h2 className="m-2">
                    Delete All
                  </h2>
                </button>
              </div>
              }     
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
