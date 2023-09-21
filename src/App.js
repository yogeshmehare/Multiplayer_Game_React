import './App.css';
import Board from './components/Board';
import toast, { Toaster } from 'react-hot-toast';
import {useState} from "react";
import BoardMultiPlayerOnline from './components/BoardMultiPlayerOnline';

function App() {
  const [singlePlayer, setSinglePlayer] = useState(false)

  return (
    <div className="App">
      <Toaster/>

      <div class="split left">
        <div class="centered">
        {!singlePlayer && <Board notify={notify}/>}
        </div>
      </div>

      <div class="split right">
        <div class="centered">
        {!singlePlayer && <BoardMultiPlayerOnline notifyError={notifyError}/>}
        </div>
      </div>
      

    </div>
  );
}

const notify = (winnerPlayerSign) => {
  console.log(winnerPlayerSign);
  toast("Good Job! Player with " + winnerPlayerSign + " Won Congo!!", {
    icon: '👏',
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
    duration:5000,
    position:"top-center",
  })
};

const notifyError = (error) => {
  toast.error(error,{
      position:"bottom-center",
     duration:3000
    }
  )
}

export default App;
