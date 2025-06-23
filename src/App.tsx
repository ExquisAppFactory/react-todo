import React, { useState } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: 'Learn React', completed: false },
    { id: 2, title: 'Build a todo app', completed: true },
    { id: 3, title: 'Deploy the app', completed: false }
  ]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        title: inputValue,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f0f2f5',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        padding: '30px'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#333',
          marginBottom: '30px',
          fontSize: '2.5rem'
        }}>
          Todo List
        </h1>

        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '30px'
        }}>
          <input
            type="title"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new todo..."
            style={{
              flex: 1,
              padding: '12px',
              border: '2px solid #ddd',
              borderRadius: '5px',
              fontSize: '16px',
              outline: 'none'
            }}
          />
          <button
            onClick={addTodo}
            style={{
              padding: '12px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Add
          </button>
        </div>

        <div>
          {todos.length === 0 ? (
            <p style={{
              textAlign: 'center',
              color: '#666',
              fontSize: '18px',
              margin: '40px 0'
            }}>
              No todos yet. Add one above!
            </p>
          ) : (
            todos.map(todo => (
              <div
                key={todo.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '15px',
                  margin: '10px 0',
                  backgroundColor: todo.completed ? '#f8f9fa' : 'white',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  style={{
                    marginRight: '15px',
                    transform: 'scale(1.2)',
                    cursor: 'pointer'
                  }}
                />
                <span
                  style={{
                    flex: 1,
                    fontSize: '16px',
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#666' : '#333'
                  }}
                >
                  {todo.title}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '5px',
          textAlign: 'center'
        }}>
          <p style={{ margin: '5px 0', color: '#666' }}>
            Total: {todos.length} | 
            Completed: {todos.filter(t => t.completed).length} | 
            Remaining: {todos.filter(t => !t.completed).length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;