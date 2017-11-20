import React, { Component } from 'react';
import { client } from '../js';


class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userInput: {
                name: '',
                speech: ''
            },
            conv: []
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }


    onChange(event) {
        const userInput = {
            name: event.target.name,
            speech: event.target.value
        };

        this.setState({ userInput });
    }


    onSubmit(event) {
        event.preventDefault();

        // Fetch user input from state
        const userInput = this.state.userInput;
        const speech = userInput.speech;

        // Empty input
        if(speech === '') {
            return;
        }

        // Conversation speed
        setTimeout( () => {
            // Add user speech to conversation state
            this.setState({
                conv: this.state.conv.concat(userInput)
            });
    
            // Auto scroll to bottom of conversation
            window.scrollTo(0, document.body.scrollHeight);
        }, 1);


        // Talk to chatbot
        this.talkToBot(speech);


        // Clear input field on enter
        this.setState({
            userInput: {
                name: '',
                speech: ''
            }
        });
    }


    talkToBot(speech) {
        // Talk to chatbot

        const promise = client.textRequest(speech);
        
                // Successful request
                promise.then( bot => {
                    const botInput = {
                        name: 'bot',
                        speech: bot.result.fulfillment.speech
                    }
        
                    // Response time, just for natural conversation feel.
                    setTimeout( () => {
                        // Add bot speech to conversation state
                        this.setState({
                            conv: this.state.conv.concat(botInput)
                        });
        
                        // Auto scroll to bottom of conversation
                        window.scrollTo(0, document.body.scrollHeight);
                    }, 2000);
        
                });
        
                // Failed request
                promise.catch( error => {
                    console.log(error);
                });
    }



    // Render conversation
    renderConv() {
        const conv = this.state.conv.map( (sp, id) => {
            const speech = sp.speech;
            const name = sp.name; 
            const speechBubble = name === 'user' ? 'user-speech' : 'bot-speech';

            return(
                <li className={ speechBubble } key={ id }>
                    <div>
                    { speech }
                    </div>
                </li>
            );
        });

        return conv;
    }



  render() {
    const userInput = this.state.userInput.speech;

    return (
      <div className="chat-interface">
        <div className="conv-wrapper" id="conv-window">
            <ul>
                { this.renderConv() }
            </ul>
        </div>

        <div className="input-wrapper">
            <form onSubmit={ this.onSubmit }>
                <input placeholder="Say something..."
                    value={ userInput }
                    name="user"
                    autoComplete="off"
                    onChange={ this.onChange } />
            </form>
        </div>
      </div>
    );
  }
}

export default Chat;
