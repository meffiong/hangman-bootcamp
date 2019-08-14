import React, { Component } from 'react'
import "./Hangman.css";
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
            nWrong: 0, guessed: new Set(), answer: "africa"
        }
        this.handleGuess = this.handleGuess.bind(this)
    }

    generateKeys(){
        let letters = "abcdefghijklmnopqrstuvwxyz"

        return letters.split("").map(ltr => (
            <button
                value={ltr}
                onClick = {this.handleGuess}
                disabled = {this.state.guessed.has(ltr)}
            >
                {ltr}
            </button>
        ));
    }

    guessedWord(){
        //returning each individual letter
        return this.state.answer.split("").map(ltr => (
            this.state.guessed.has(ltr) ? {ltr} : "_"
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

        return(
            <div>
                <h1>Hangman</h1>
                <img src={this.props.imgages[this.state.nWrong]} alt="hangman image" />
                <p>{this.generateKeys()}</p>
                <p></p>
            </div>
        )
    }

}

export default Hangman