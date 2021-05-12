import styles from './App.module.css'

function App() {

  const pressed = 0;

  return (
    <div className={styles.container}>
      <div className={`${styles.button} ${pressed ? styles.pressed : ''}`}>
        {pressed ? `Button is Pressed` : 'Press button!'}
      </div>
      <div className={styles.credits}>
        <h4>Made by: Reeve D'Cunha (rdcu227)</h4>
      </div>
    </div>
  );
}

export default App;
