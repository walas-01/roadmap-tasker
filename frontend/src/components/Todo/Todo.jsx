import './Todo_style.css'

function Todo(){
  return(
    <div className='todoCard'>
      <h3 className='todoCard-tittle'>Today ToDos</h3>

      <div className='todoCard-body'>
        <p>Task1</p>
        <p>Task2</p>
        <p>Task3</p>
      </div>

    </div>
  )
}

export default Todo