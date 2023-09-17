import './App.css';
import Board from './components/Board';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Toaster/>
      <Board notify={notify}/>
    </div>
  );
}

const notify = (winnerPlayerSign) => {
  console.log(winnerPlayerSign);
  toast("Good Job! Player with " + winnerPlayerSign + " Icon Won Congo!!", {
    icon: '👏',
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  })
};

export default App;
