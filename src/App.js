import React, { useEffect, useState } from 'react';
import LineChart from 'react-linechart';
import '../node_modules/react-linechart/dist/styles.css';


const App = () => {
  const [points, setPoints] = useState([
    { x: 1, y: 2 },
    { x: 3, y: 5 },
    { x: 7, y: -3 }
  ])
  const [name, setName] = useState()

  // var points = [
  //   { x: 1, y: 2 },
  //   { x: 3, y: 5 },
  //   { x: 7, y: -3 }
  // ]
  var wss = null;

  
  useEffect(() => {
    wss = new WebSocket('ws://localhost:8000/ws');
    wss.onopen = function (event) {
      console.log('connected');
    }
    wss.onopen = () => wss.send('Hello From Client')
    wss.onmessage = (event) => {
      // setPoints([...{x:event.data,y:event.data-3}])
      
      // points.push({x:event.data,y:event.data-3})
      // console.log(event.data)
      // const {a,b}  =event.data
      var data = event.data
      data = data.replace("("," ")
      data = data.replace(")"," ")
      
      data = data.split(',')
      setPoints(points => [...points, {x:parseInt(data[0]),y:parseInt(data[1])}])

      console.log(data)
    }
    },[points])
    
    console.log(points);
  const data = [
    {
      color: "steelblue",
      points: points
    }
  ];
  return (
    <div>
      <div className="App">
        <h1>My First LineChart</h1>
        <LineChart
          width={1000}
          height={500}
          data={data}
        />
      </div>
      <h1 onClick={(e)=>setName("My Name is MD Rafiqul Islam")}>{name?name:"Click Me"}</h1>
    </div>
  )
}

export default App


