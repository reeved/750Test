import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';

function App() {
  const [pressed, setPressed] = useState(null);

  const getButtonState = () => {
    axios.get(`/21`).then((response) => {
      console.log(response.data);
      setPressed(response.data.state);
    });
  };

  const setButtonState = () => {
    const body = {
      newState: !pressed,
    };
    axios.put(`/21`, body);
  };

  const handleClick = () => {
    getButtonState();
    setButtonState();
    getButtonState();
  };

  useEffect(() => {
    console.log('Use Effect ran.');
    getButtonState();
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={`${styles.button} ${pressed ? styles.pressed : ''}`}
        onClick={() => handleClick()}
      >
        {pressed === null ? (
          <>
            <Spinner animation='border' />
            <span>Loading...</span>
          </>
        ) : pressed ? (
          `Button is Pressed`
        ) : (
          'Press button!'
        )}
      </div>
      <div className={styles.credits}>
        <h4>Made by: Reeve D'Cunha (rdcu227)</h4>
      </div>
    </div>
  );
}

export default App;
