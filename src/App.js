import { useState } from 'react'
import List from './List';
import Alert from './Alert'

function App() {

  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      showAlert(true, 'danger', 'please enter value')
    }
    else if (name && isEditing) {

    }
    else {
      showAlert(true, 'success', 'item added to the list')
      const newItem = {id: new Date().getTime().toString(), title:name}
      setList([...list, newItem])
      setName('')
    }
  } 

  const showAlert = (show=false, type='', msg='') => {
    setAlert({show, type, msg})
  }

  const clearList = () => {
    showAlert(true, 'danger', 'empty list')
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed')
    setList(list.filter((item)=> item.id !== id))
  }

  return (
    <section className="section-center">
    <form className='grocery-form' onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
      <h3>Grocery Bud</h3>
      <div className="form-control">
        <input type="text" className='grocery' placeholder='add grocery item' value={name} onChange={(e) => setName(e.target.value)} />
        <button type="submit" className='submit-btn'>
          {isEditing ? 'edit' : 'submit'}
        </button>
      </div>
    </form>
    {/* Grocery Container */}
    {
      list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} />
          <button onClick={clearList} className='clear-btn'>
            Clear Item
          </button>
      </div>
      )
    }
    
     
    </section>
  );
}

export default App;
