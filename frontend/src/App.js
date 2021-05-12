import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.css';

function App() {
  const [pressed, setPressed] = useState(null);

  const handleClick = () => {
    axios.get(`/21`).then((response) => {
      console.log(response.data);
      setPressed(!response.data.state);
    });
    const body = {
      newState: !pressed,
    };
    axios.put(`/21`, body);
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
