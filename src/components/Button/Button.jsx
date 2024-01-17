import styles from './Button.module.css';


const Button = ({ variant, onClick, children }) => {

    return (
        <button onClick={onClick} className={styles[variant]}>{children}</button>
    )
}


export default Button;