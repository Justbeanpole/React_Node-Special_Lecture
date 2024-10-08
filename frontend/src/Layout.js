import './styles/common.css';
import {useState, useEffect} from 'react'
/* 모듈화 방법 1 */
import {statusConstant} from './config/constant'
/* 모듈화 방법 2 */
// import {constant} from './config'
// const {statusConstant} = constant
import TodoItem from './components/TodoItem'
import { getTodos, updateTodo } from './api/todoApi';


function Layout(){
    /* === State === */
    const [todoTitle, setTodoTitle] = useState('')
    const [todoList, setTodoList] = useState([])
    
    /* === Function === */
    /**
     * 입력값 변경 처리 함수
     * --
     * @param {*} event 
     */
    const handleChange = (event) => {
        setTodoTitle(event.target.value)
    }

    /**
     * 할일 추가 함수
     * --
     */
    const handleAddItem = () => {
        const len = todoList.length
        const key = todoList[len-1].key + 1
        const newItem = {
            key,
            title: todoTitle,
            status: statusConstant['WAIT']
        }
        setTodoList([
            ...todoList,
            newItem
        ])
        setTodoTitle('')
    }

    /**
     * 상태변경 함수
     * --
     * @param {*} key 
     * @param {*} status 
     */
    const handleChangeStatus = async (key, status) => {
        const result = await updateTodo(key, {status})
        setTodoList(result)
    }

    /**
     * TodoItem 만들기 함수
     * --
     * @param {*} todo 
     * @returns 
     */
    const handleCreateItem = (todo)=>{
        console.log(todo);
        
        return (
            <TodoItem  
                key={`todo_item_${todo.id}`}
                id={todo.id}
                title={todo.title}
                status={todo.status}
                onChangeStatus={handleChangeStatus}
            />
        )
    }

    /* === Hook === */
    useEffect(()=>{
        const call = async ()=>{
            const result = await getTodos();
            if(result.status !== 200){
                alert('데이터를 불러올 수 없습니다.')
                return;
            }
            setTodoList(result.data)
        }
        call()
    }, [])


    const handleFilterTodoList = (status = "WAIT") => {
        return todoList ? todoList.filter(todo => todo.status === status) : []
    }
    

    /* === View === */
    const todoListWait = handleFilterTodoList('WAIT')
    const todoListInprogress = handleFilterTodoList('INPROGRESS') 
    const todoListDone = handleFilterTodoList('DONE')
    return (
        <>
            <div id="layout">
                <div className="column">
                    <h1>진행 전</h1>
                    <div className='todo-form'>
                        <input 
                            name="todoTitle"
                            value={todoTitle}
                            onChange={handleChange}
                            placeholder='할일을 입력해주세요' 
                        />
                        <button onClick={handleAddItem}>추가</button>
                    </div>
                    {todoListWait.map(handleCreateItem)}
                    
                </div>
                <div className="column">
                    <h1>진행중</h1>

                    {todoListInprogress.map(handleCreateItem)}
                </div>
                <div className="column">
                    <h1>완료</h1>

                    {todoListDone.map(handleCreateItem)}
                </div>
            </div>
        </>
    )
}

export default Layout;