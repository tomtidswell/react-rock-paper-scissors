import React from 'react'

const Card = ({ player, choice, choiceClick, status, type, typeSwitch }) => {
  const choices = ['rock','paper','scissors']

  return(
    <section className={`player-card ${status} ${type}`} >
      <h2>Player {player}</h2>
      <div>
        <span onClick={()=>typeSwitch(player)}>{type}</span>
        <span className="player-status">{ choice ? '' : '...make a choice' }</span>
      </div>
      <form>
        {choices.map((possibleChoice,i) => (
          <label name={player} key={i}>
            <input
              onChange={()=>choiceClick(player, possibleChoice)}
              type="radio"
              name={player}
              value={possibleChoice}
              checked={choice === possibleChoice ? true : false}
              disabled={type === 'computer' || !['choosing','chosen'].includes(status) ? true : false}
            />
            <span>{possibleChoice}</span>
          </label>
        ))}
      </form>
    </section>
  )
}

export default Card
