import styles from './Button.module.css';

function Button({ pressed, nClicks, handleClick }) {
  return (
    <>
      <div
        className={`${styles.button} ${pressed ? styles.pressed : ''}`}
        onClick={() => handleClick()}
      >
        {pressed ? `Button is Pressed` : 'Button is Unpressed'}
      </div>

      <h3>{`Button has been clicked ${nClicks} times`}</h3>
    </>
  );
}

export default Button;
