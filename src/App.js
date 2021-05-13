import { useState, useEffect } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import { FormControl, InputLabel, Input } from '@material-ui/core';
import Message from './Message'
import db from "./firebase"
import firebase from 'firebase'
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
  ])
  const [username, setUsername] = useState("")


  useEffect(() => {
    setUsername(prompt("Enter the user name here"))
  }, [])

  useEffect(() => {
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
      })
  }, [])

  const sendMessage = (event) => {
    //all the logic to send message will come here
    event.preventDefault();

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()//to set the messages based to regional time value ie, US UK India has different time stamps
    })
    setInput('')
  }
  return (
    <div className="App">
      <h1>Welcome to MiUMessenger🚀</h1>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQehjbW94WFMXKZV4rnU1PHdq_dMJ-lwrFO_A&usqp=CAU"></img>
      <form className="app__form">
        <FormControl className="app__formControl">
          <InputLabel>Send Message</InputLabel>
          <Input className="app__input" value={input} onChange={(event) => setInput(event.target.value)} />

          <IconButton
            className="app__iconButton" disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {
          messages.map(({ id, message }) => (
            <Message key={id} username={username} message={message} />//flip move is an animation module that gieves transition effects but to implement it we have to put keys else the apl breaks
          ))
        }
      </FlipMove>
    </div>

  );
}

export default App;
