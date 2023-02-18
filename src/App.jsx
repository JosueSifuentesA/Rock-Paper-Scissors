
import { useState,useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css'
import iconPaper from './assets/icon-paper.svg'
import iconRock from './assets/icon-rock.svg'
import iconScissors from './assets/icon-scissors.svg'
import iconRules from './assets/image-rules.svg'


const Button = ({buttonFunction=undefined,buttonStats = undefined,text='button'}) =>{
  
  const typeOption = {
    TRANSPARENT : {class:'button_transparent'},
    FILLED:{class:'button_filled'}
  }

  let classType


  
  if(buttonStats === undefined){
    classType = typeOption.TRANSPARENT.class
  }else{
    if(buttonStats == 'TRANSPARENT'){
      classType = typeOption.TRANSPARENT.class
    }else{
      classType = typeOption.FILLED.class
    }
  }
  


  const buttonModule2 = buttonFunction === undefined
  ?
  <button className={classType}>{text}</button>
  :
  <button className={classType} onClick={buttonFunction}>{text}</button>


  
  return buttonModule2


}

const OptionContainer = ({className,image,option,dataFunction = undefined}) =>{
  
  const OPTION = {
    ROCK : {class:'Rock',src:iconRock},
    PAPER: {class:'Paper',src:iconPaper},
    SCISSORS:{class:'Scissors',src:iconScissors},
    null:{class:'NoOption',src:null}
  }

  const handleClick = ()=>{
    if(dataFunction){

      dataFunction(option)
    }
  }
  
  return (
    <div onClick={handleClick} className={`${OPTION[option]?.class}`}>
      <img className='imageSelection' src={OPTION[option]?.src} alt={`${OPTION[option]?.class} icon`} />
    </div>
  )
}

const GameContainer = ({dataFunction}) =>{

  const recieveDataFromOption = (data) =>{
    dataFunction(data)
  }


  return(
    <section className='Game_selector'>
          <OptionContainer dataFunction={recieveDataFromOption} className={'red'}
            option={'ROCK'} image={iconRock}></OptionContainer>

          <OptionContainer dataFunction={recieveDataFromOption} className={'blue'}
            option={'PAPER'} image={iconPaper}></OptionContainer>

          <OptionContainer dataFunction={recieveDataFromOption} className={'yellow'}
            option={'SCISSORS'} image={iconScissors}></OptionContainer>
          
          <div className='imageBackground'/>

      </section>
  )


}

const ResultGameContainer = ({optionSelected,dataFunction = undefined,recieveRestart=undefined,showRules=undefined}) =>{

  const [condition,setCondition] = useState(null)
  const [optionPicked,setOptionPicked] = useState(null)



  const RESULT_LIST = [
    'ROCK',
    'PAPER',
    'SCISSORS'
  ]

  const CONDITIONS ={
    ROCK: {PAPER:'YOU LOSE',SCISSORS:'YOU WIN',ROCK:'DRAW'},
    PAPER:{ROCK:'YOU WIN',SCISSORS:'YOU LOSE',PAPER:'DRAW'},
    SCISSORS:{ROCK:'YOU LOSE',SCISSORS:'DRAW',PAPER:'YOU WIN'}
  }

  useEffect( ()=>{
    
    const timer = setTimeout(()=>{ 
    const newOptionPicked = parseInt(Math.random() * (2-0)+0)

    setOptionPicked(RESULT_LIST[newOptionPicked]);

    },1500)

    return () => {
      clearTimeout(timer);
    };


  },[])
  
  const checkResult = ()=>{
    if(CONDITIONS[optionSelected][optionPicked] === 'YOU WIN' ||CONDITIONS[optionSelected][optionPicked] === 'YOU LOSE' ||CONDITIONS[optionSelected][optionPicked] === 'DRAW'){
      const newCondition = CONDITIONS[optionSelected][optionPicked]
      setCondition(newCondition)
      dataFunction({condition:newCondition,clicked:false})
    }
  }

  const restartGame = () =>{
    recieveRestart(false)
  }


  useEffect(()=>{
    checkResult()
  },[optionPicked])

  return(

    <section className='Game_result'>
                
      <div className='result result_playerOption' >
          <OptionContainer option={optionSelected}/>
          <label>YOU PICKED</label>
        </div>

        <div className='result result_computerOption'  >
          <OptionContainer option={`${optionPicked}`}/>
          <label>THE HOUSE PICKED</label>
        </div>

        <TransitionGroup className={'result_information'}>
        {optionPicked &&(
          <CSSTransition classNames="scale" timeout={6000}>

        <div className='result_information'>
          <div className='information_data'>
          <label>{condition}</label>
          <Button buttonFunction={restartGame} buttonStats={'FILLED'} text='PLAY AGAIN' />
          </div>

          <div>
            <Button buttonFunction={showRules} text='RULES'/>
          </div>


        </div>
          </CSSTransition>
        )}
        </TransitionGroup>



      </section>


  )

}


function App() {

  const [gameData,setGameData] = useState(null);
  const [clicked,setClicked] = useState(false)
  const [rules ,setRules] = useState(false)
  const [contador,setContador] = useState(()=>{
    if(window.localStorage.getItem('scores') === null) { return 0} else {return JSON.parse(window.localStorage.getItem('scores'))}
  })


  const recieveData = (data) =>{
    setGameData(data)
    setClicked(true)
  }

  const recieveCounter = (data) =>{

    let counter = contador;

    if(data.condition === 'YOU WIN'){
      setContador(counter+1)
    }else if(data.condition ==='YOU LOSE'){
      setContador(counter-1)
    }else if (data.condition === 'DRAW'){
      setContador(counter)
    }else{
      console.log('Procesando....')
    }

  }

  const showRules = () =>{
    setRules(!rules)
  }

  useEffect(()=>{
    if(contador < 0 ){
      setContador(0)
    }

    window.localStorage.setItem('scores',contador)

  },[contador])


  const recieveRestart = (data) =>{
    setClicked(data)
  }


  return (
    <>
    
    
    {rules && (<div className='messageContainer'>
      <div className='messageContainer_window' >
        <div className='messageContainer_header'>
        <h1>RULES</h1>
        <button onClick={showRules} className='window_btn' />
        </div>
        <img style={{width:'fit-content'}} src={iconRules}/>
      </div>
    </div>)}



    <header className='ScoreContainer'>
      <div className='ScoreContainer_title'>
        <label>ROCK</label>
        <label>PAPER</label>
        <label>SCISSOR</label>
      </div>
      <div className='ScoreContainer_score'>
        <label className='score_name'>SCORE</label>
        <label className='score_value'>{contador}</label>
      </div>
    </header>

    <main className='Game'>
      {clicked == false && (<GameContainer dataFunction={recieveData}></GameContainer>)}
      {clicked == true && (<ResultGameContainer showRules={showRules} recieveRestart={recieveRestart} dataFunction={recieveCounter} optionSelected={gameData}></ResultGameContainer>)}    
    </main>

    </>
  )
}

export default App
