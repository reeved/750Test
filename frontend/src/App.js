import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import ParticleConfig from './particles-config';
import Particles from 'react-tsparticles';
import Button from './Components/Button';

function App() {
  // Initialise to null for loading functionality because pressed will always be true/false from DB responses
  const [pressed, setPressed] = useState(null);
  const [nClicks, setClicks] = useState(0);

  const handleClick = () => {
    setPressed(!pressed);
    setClicks(nClicks + 1);

    const body = {
      // Need to set it to !pressed to keep it in sync
      state: !pressed,
      clickCount: nClicks + 1,
    };
    axios.put(`/Button1`, body);
  };

  useEffect(() => {
    // Custom Hook i.e. USEGET not created since this is only run once
    // Get Button data from DB only on initial Page render
    axios
      .get(`/Button1`)
      .then((response) => {
        // GET Request was successful and state data is updated based on response
        setPressed(response.data.state);
        setClicks(response.data.clickCount);
      })
      .catch((err) => {
        // If the GET Request failed, then it means the buttonName does not exist.
        console.log(err);
        // Initialise button on the frontend
        setPressed(false);
        setClicks(0);

        const body = {
          buttonName: 'Button1',
        };
        // Creates a new Button in the DB since it didn't exist before
        axios.post(`/`, body);
      });
  }, []);

  return (
    <>
      <Particles params={ParticleConfig} canvasClassName={styles.particles} />

      <div className={styles.container}>
        <div className={styles.buttonContainer}>
          {pressed === null ? (
            <Spinner animation='border' />
          ) : (
            <Button
              pressed={pressed}
              nClicks={nClicks}
              handleClick={handleClick}
            />
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
