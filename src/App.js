import React, { useState ,useEffect} from 'react';
import Plot from 'react-plotly.js';


const App = () =>{
  const [stockChartXValues,setStockChartXValues] = useState([]);
  const [stockChartYValues,setStockChartYValues] = useState([]);

  const [text, setText] = useState('FB');
  const [query, setQuery] = useState('FB');

  const onSubmit = (e) => {
    e.preventDefault();
    setQuery(text);
    setText('');
  }


  useEffect(() => {
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${query}&apikey=${process.env.REACT_APP_CLIENT_ID}`)
        .then(response => response.json())
        .then(data => {
          console.log(data['Time Series (Daily)'])
          const x = Object.keys(data['Time Series (Daily)']);
          console.log(x)
          const y =Object.values(data['Time Series (Daily)']).map(open => open['1. open'] )
          console.log(y)
          setStockChartXValues(x)
          setStockChartYValues(y)
      })
  }, [query])

  return (
    <div>
    <form onSubmit={onSubmit}>
    <input
      type="text"
      onChange={e => setText(e.target.value)}
      value={text}
    />
    <button type="submit">
      Search
    </button>
  </form>
    <Plot
      data={[
        {
          x: stockChartXValues,
          y: stockChartYValues,
          type: 'scatter',
          mode: 'lines+markers',
          marker: {color: 'red'},
        },
      ]}
      layout={{width: 500, height: 500, title: 'A Fancy Plot'}}
    />
    </div>
  );
}

export default App;