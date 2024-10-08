
const baseUrl = `http://localhost:8080`

function apiCall(path, method='GET', body=null){
    const url = `${baseUrl}${path}`
    return fetch(url, {
        method, 
        headers:{
            "Content-Type":"application/json; charset=utf-8"
        },
        ...(body && {body: JSON.stringify(body)})
    })
        .then(resp => resp.json())
        .then(resp => resp)
        .catch(err => {
            console.log(err);
        })
}

const getTodos = ()=> apiCall('/todos')

function updateTodo(todoId, body={}){
    const result = apiCall(`/todos/${todoId}`, 'PUT', body)
    return result
}

export {getTodos, updateTodo}