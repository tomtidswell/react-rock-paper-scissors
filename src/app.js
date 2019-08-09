import React, { Component } from 'react'
import ReactDom from 'react-dom'
import './style.scss'
import Card from './components/Card'

class App extends Component{
  constructor(){
    super()
    this.state = {
      playerData: [
        { player: 'one', status: 'choosing', type: 'human', choice: '' },
        { player: 'two', status: 'chosen', type: 'computer', choice: this.chooseRandom()}
      ]
    }
    this.choiceClick = this.choiceClick.bind(this)
    this.changeStatus = this.changeStatus.bind(this)
    this.typeSwitch = this.typeSwitch.bind(this)
  }

  typeSwitch(player){
    const playerData = this.state.playerData.map(data => {
      if(data.player === player) {
        //these ifs all detect if we are switching from human:
        // -- If we are, set the status to chosen, choose a random number and set the type to computer.
        // -- If we arent, set the status to choosing, the choice to blank and the type to human
        const status = data.type === 'human' ? 'chosen' : 'choosing'
        const choice = data.type === 'human' ? this.chooseRandom() : ''
        const type = data.type === 'human' ? 'computer' : 'human'
        return {...data, type, choice, status }
      }
      return data
    })
    this.setState({ playerData })
  }

  choiceClick(player, choice){
    const playerData = this.state.playerData.map(data => {
      if(data.player === player) return {...data, choice, status: 'chosen' }
      return data
    })
    this.setState({ playerData })
  }

  changeStatus(updates){
    const p1 = updates[0]
    const p2 = updates[1]
    console.log(p1, p2)
    const playerData = this.state.playerData.map(data => {
      if(data.player === p1.player) return {...data, ...p1 }
      if(data.player === p2.player) return {...data, ...p2 }
      return data
    })
    this.setState({ playerData })
  }

  chooseRandom(){
    const choices = ['rock','paper','scissors']
    return choices[Math.floor(Math.random()*choices.length)]
  }

  checkWinner(){
    const p1choice = this.state.playerData[0].choice
    const p2choice = this.state.playerData[1].choice
    const victoryLogic = [
      { choice: 'rock',     beats: ['scissors'] },
      { choice: 'paper',    beats: ['rock'] },
      { choice: 'scissors', beats: ['paper'] }
    ]

    //stop checking if one of the choices hasnt been made
    if (!p1choice || !p2choice) return

    //Identify the victory logic for player 1's choice
    const playerOneLogic = victoryLogic.find( item => item.choice === p1choice )

    //Filter out a draw scenario and then use the victory logic from p1 to see if they should win
    if (p1choice === p2choice) {
      this.changeStatus([{ player: 'one', status: 'draw' },{ player: 'two', status: 'draw' }])
    } else if(playerOneLogic.beats.includes(p2choice)){
      this.changeStatus([{ player: 'one', status: 'win' },{ player: 'two', status: 'lose' }])
    } else {
      this.changeStatus([{ player: 'one', status: 'lose' },{ player: 'two', status: 'win' }])
    }
  }

  render(){
    return (
      <main>
        <Card {...this.state.playerData[0]} choiceClick={this.choiceClick} typeSwitch={this.typeSwitch} />
        <div>
          <button onClick={()=>this.checkWinner()}>Go</button>
        </div>
        <Card {...this.state.playerData[1]} choiceClick={this.choiceClick}  typeSwitch={this.typeSwitch}/>
      </main>
    )
  }
}

ReactDom.render(<App />,document.getElementById('root'))
