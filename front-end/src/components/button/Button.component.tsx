import styles from './Button.module.css';
interface IButtonProps {
  text?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}
// Pass the text the button will have and the onClick event
export const Button: React.FC<IButtonProps> = ({ text, onClick }) => {
  return (
    <button className={`btn btn-success flex-wrap ${styles.space}`} onClick={onClick}>
      {text}
    </button>
  )
};
