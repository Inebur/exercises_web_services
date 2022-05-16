import { useState } from 'react'

// a proper place to define a component
const StatisticLine = (props) => {
  return (
      <tr>

        <td>{props.text}</td>
        <td>{props.stat}</td>    

      </tr>   
  )
}


const Statistics = (props) => {

  if(props.infos.all == 0)
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  else
    return(
      <div>

        <table>
          <tbody>
            <StatisticLine text="good" stat = {props.infos.good} />
            <StatisticLine text="neutral" stat = {props.infos.neutral} />
            <StatisticLine text="bad" stat = {props.infos.bad} />
            <StatisticLine text="all" stat = {props.infos.all} />
            <StatisticLine text="average" stat = {props.infos.average} />
            <StatisticLine text="positive" stat = {props.infos.positive + " %" } />
          </tbody>
        </table>

      </div>
    )
}

const Button = (props) =>{
  const infos = props.infos
  const setInfos = props.infosState
  const handleClickGood = () => {
    setInfos({...infos, good : infos.good + 1, all : infos.all + 1, 
      average : (infos.good + 1 - infos.bad)/(infos.all +1),
      positive : (infos.good + 1)*100/(infos.all + 1)} )
    
  }
    

  const handleClickNeutral = () => {
    setInfos({...infos, neutral : infos.neutral + 1, all : infos.all + 1, 
      average : (infos.good - infos.bad)/(infos.all +1),
      positive : infos.good *100/(infos.all + 1)} )
  }

  const handleClickBad = () => {
    setInfos({...infos, bad : infos.bad + 1, all : infos.all + 1, 
      average : (infos.good - (infos.bad + 1))/(infos.all +1),
      positive : infos.good*100/(infos.all + 1)} )
  }

  if(props.text == "good")
    return (
      <div>
        <button onClick={handleClickGood} >good</button>
      </div> 
    )
  else if (props.text == "neutral")
    return (
      <div>
        <button onClick={handleClickNeutral} >neutral</button>
      </div>  
    )
  else  
    return (
      <div>
        <button onClick={handleClickBad} >bad</button>
      </div>
    )

}


const App = () => {
  // save clicks of each button to its own state

  const [infos, setInfos] = useState({
    good : 0, 
    neutral : 0, 
    bad : 0, 
    all : 0, 
    average : 0,
    positive : 0
  })
  

  return (
    <div>
      <h1>give feedback</h1>

      <Button text ="good"  infos = {infos} infosState = {setInfos}/>
      <Button text ="neutral"  infos = {infos} infosState = {setInfos} />
      <Button text ="bad"  infos = {infos} infosState = {setInfos} />


      <h2>statistics</h2>
      <Statistics infos={infos} />

    </div>
  )

  
}

export default App