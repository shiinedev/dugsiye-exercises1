import useLocalStorage from "./hooks/useLocalStorage";
import useNotification from "./hooks/useNotification";
import useNumberStorage from "./hooks/useNumberStorage"


function App() {
 
  const [number,setNumber] = useNumberStorage("number",10);
  //const [notifications,setNotifications] = useNotification("notifications", {language:"english",notifications:false})

  const [count,setCount] = useLocalStorage<number>("score",0);
  const [notifications,setNotifications] = useLocalStorage<{language:string,notifications:boolean}>("notifications", {language:"english",notifications:false})


  return (
    <>
     <h1>{number}</h1>
     <button onClick={() => setNumber(30)}>setNumber plus 30</button>
     <h2>Notifications</h2>
     <span>{notifications.language}</span> - <span>{notifications.notifications ? "New notifications" : "No Notifications"}  </span>
     <button onClick={() => setNotifications({language:"react",notifications:true})}>set notifications</button>

    <h4>count: {count}</h4>
    <button onClick={() => setCount(count +1)}>SetCount +1</button>

    </>
  )
}

export default App
