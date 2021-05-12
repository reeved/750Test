import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import ParticleConfig from './particles-config';
import Particles from 'react-tsparticles';

function App() {
  const [pressed, setPressed] = useState(null);
  const [nClicks, setClicks] = useState(0);

  const handleClick = () => {
    setPressed(!pressed);
    setClicks(nClicks + 1);

    const body = {
      // Need to set it to !pressed to keep it in sync
      newState: !pressed,
      clicks: nClicks + 1,
    };
    axios.put(`/Button1`, body);
  };

  useEffect(() => {
    axios.get(`/Button1`).then((response) => {
      setPressed(response.data.state);
      setClicks(response.data.clickCount);
    });
  }, []);

  return (
    <>
      <Particles params={ParticleConfig} canvasClassName={styles.particles} />

      <div className={styles.container}>
        <div className={styles.buttonContainer}>
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
          <h3>{`Button has been clicked ${nClicks} times`}</h3>
        </div>

        <div className={styles.credits}>
          <h4>Made by: Reeve D'Cunha (rdcu227)</h4>
        </div>
      </div>
    </>
  );
}

export default App;
