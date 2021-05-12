import axios from 'axios';
import styles from './App.module.css';

function App() {
  const dbServerURI = 'http://localhost:3001';
  const pressed = 0;

  const handleClick = () => {
    axios.get(`/21`).then((response) => console.log(response));
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.button} ${pressed ? styles.pressed : ''}`}
        onClick={() => handleClick()}
      >
        {pressed ? `Button is Pressed` : 'Press button!'}
      </div>
      <div className={styles.credits}>
        <h4>Made by: Reeve D'Cunha (rdcu227)</h4>
      </div>
    </div>
  );
}

export default App;
