
import ReactDOM from 'react-dom/client';

//刷新页面
let memoizedState=[];//hooks 存放在这个数组
let cursor=0;//当前 memoizedState 下标


function useState(initValue) {
  memoizedState[cursor] =memoizedState[cursor] || initValue;

  const CurrentCursor=cursor;
  function setState(newState) {
    memoizedState[CurrentCursor] = newState;
    console.log(memoizedState[CurrentCursor],CurrentCursor);
    render();
  }
  return [memoizedState[cursor++], setState];
}

function useEffect(callback,depArray)
{
  const hasNoDeps=!depArray;
  const deps=memoizedState[cursor];
  const hasChangeDeps=deps?!depArray.every((el,i)=>el===deps[i])
  :true;
  if(hasNoDeps||hasChangeDeps)
  {
    callback();
    memoizedState[cursor]=depArray;
  }
  cursor++;
}
function App() {
  const [count, setCount] = useState(0);
  const [age,setAge]=useState(20);
  useEffect(()=>{
    console.log("已经点击按钮");
  },[count]);
  return (
    <div className='App'>
      <p>You clicked{count} times</p>
      <button onClick={() => setCount(count + 1)}>点击我</button>
      <p>当前{age} 年龄</p>
      <button onClick={() => setAge(age + 1)}>点击我增加年龄</button>
    </div>
  );
}
const root= ReactDOM.createRoot(document.getElementById('root'));
function render() {
  console.log("触发渲染");
  cursor=0;
   root.render(
    <App />
  );
}
root.render(
    <App/>
);
