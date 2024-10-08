import {statusConstant} from '../config/constant'

function TodoItem(props){
    return (
        <>
        <div className='todo-item'>
            <h4>[{statusConstant[props.status]}] {props.title}</h4>
            <div>
                {['WAIT', 'INPROGRESS', 'DONE'].map(btn => (
                    <button 
                        key={btn}
                        onClick={()=>props.onChangeStatus(props.id, btn)}
                    >
                        {statusConstant[btn]}
                    </button>
                ))}
            </div>
        </div>
        </>
    )
}
export default TodoItem