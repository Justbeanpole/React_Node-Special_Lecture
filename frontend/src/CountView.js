function CountView(props){
    return (
    <div>
        <h1>{props.count}</h1>
        <div>
            <button onClick={()=>props.handleCalc('-')}>-</button>
            <button onClick={props.handleChangeColor}>배경색 변경</button>
            <button onClick={()=>props.handleCalc('+')}>+</button>
        </div>
    </div>
    )
}
export default CountView