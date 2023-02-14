
import { useState,useEffect } from 'react'
import './App.css'
import iconPaper from './assets/icon-paper.svg'
import iconRock from './assets/icon-rock.svg'
import iconScissors from './assets/icon-scissors.svg'

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
      <img className='imageSelection' src={OPTION[option]?.src} />
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

const ResultGameContainer = ({optionSelected}) =>{

  const [contador,setContador] = useState(0)

  const [optionPicked,setOptionPicked] = useState(null)

  const RESULT_LIST = [
    'ROCK',
    'PAPER',
    'SCISSORS'
  ]

  const CONDITIONS ={
    ROCK: {PAPER:'YOU WIN',SCISSORS:'YOU LOSE',ROCK:'DRAW'},
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
  


  useEffect(()=>{
    //optionPicked BOT - optionSelected PLAYER

    
  
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

        <div className='result_information'>
          <div className='information_data'>
          <label>YOU LOSE</label>
          <Button buttonStats={'FILLED'} text='PLAY AGAIN' />
          </div>

          <div>
            <Button text='RULES'/>
          </div>

        </div>



      </section>


  )

}


function App() {

  const [gameData,setGameData] = useState(null);
  const [clicked,setClicked] = useState(false)


  const recieveData = (data) =>{
    setGameData(data)
    setClicked(true)
  }


  return (
    <>
    <header className='ScoreContainer'>
      <div className='ScoreContainer_title'>
        <label>ROCK</label>
        <label>PAPER</label>
        <label>SCISSOR</label>
      </div>
      <div className='ScoreContainer_score'>
        <label className='score_name'>SCORE</label>
        <label className='score_value'>12</label>
      </div>
    </header>

    <main className='Game'>
      {clicked == false && (<GameContainer dataFunction={recieveData}></GameContainer>)}
      {clicked == true && (<ResultGameContainer optionSelected={gameData}></ResultGameContainer>)}
    </main>

    </>
  )
}

export default App
