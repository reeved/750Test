import styles from './App.module.css'

function App() {

  const pressed = 0;

  return (
    <div className={styles.container}>
      <div>
        <h1>HELLO</h1>
      </div>
      <div className={`${styles.button} ${pressed ? styles.pressed : ''}`}>
        {pressed ? `Button is Pressed` : 'Press button!'}
      </div>
    </div>
  );
}

export default App;
