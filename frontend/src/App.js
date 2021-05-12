import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import ParticleConfig from './particles-config';
import Particles from 'react-tsparticles';

function App() {
  const [pressed, setPressed] = useState(null);

  const handleClick = () => {
    setPressed(!pressed);

    const body = {
      newState: pressed,
    };
    axios.put(`/Button1`, body);
  };

  useEffect(() => {
    axios.get(`/Button1`).then((response) => {
      console.log(response.data);
      setPressed(response.data.state);
    });
  }, []);

  return (
    <>
      <Particles params={ParticleConfig} canvasClassName={styles.particles} />

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
            'Button is Unpressed'
          )}
        </div>
        <div className={styles.credits}>
          <h4>Made by: Reeve D'Cunha (rdcu227)</h4>
        </div>
      </div>
    </>
  );
}

export default App;
