import React, { Component } from 'react'
import "./Hangman.css";
import {randomWord} from './words.js'
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component{
    static defaultProps = {
        maxWrong: 6,
        imgages: [img0,img1,img2,img3,img4,img5,img6]
    }

    constructor(props){
        super(props)
        this.state = {
            nWrong: 0, guessed: new Set(), answer: randomWord()
        }
        this.handleGuess = this.handleGuess.bind(this)
        this.reset = this.reset.bind(this)
    }

    reset(){
        // Change word
        // Num guesses
        // Guessed empty
        this.setState({
            nWrong: 0, guessed: new Set(), answer: randomWord()
        })
    }

    generateKeys(){
        let letters = "abcdefghijklmnopqrstuvwxyz"

        return letters.split("").map(ltr => (
            <button
                key={ltr}
                value={ltr}
                onClick = {this.handleGuess}
                disabled = {this.state.guessed.has(ltr)}
            >
                {ltr}
            </button>
        ));
    }

    /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

    guessedWord(){
        //returning each individual letter
        return this.state.answer.split("").map(ltr => (
            this.state.guessed.has(ltr) ? ltr : "_"
        ));
    }

    handleGuess(evt){
        let ltr = evt.target.value;

        this.setState(st => ({
            guessed: st.guessed.add(ltr),
            nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
        }));
    }


    render(){
        const gameOver = this.state.nWrong >= this.props.maxWrong;
        const isWinner = this.guessedWord().join("") === this.state.answer
        let gameState = this.generateButtons();
        if(isWinner) gameState = "You Win!"
        if(gameOver) gameState = "Sorry, You lose!"
        return(
            <div className="Hangman">
                <h1>Hangman</h1>
                <img src={this.props.imgages[this.state.nWrong]} alt="hangman" />
                <p>Guessed wrong: {this.state.nWrong}</p>
                <p className="guessedWord Hangman-word">{!gameOver ? this.guessedWord() : this.state.answer }</p>
                <p>{gameState}</p>
                <button id="reset" onClick={this.reset}>New Game</button>
            </div>
        )
    }

}

export default Hangman