
import React from "react";
import styles from "./input.module.css";

const Input = ({ label, value, onChange }) => {
  return (
    <div className={styles.inputWrapper}>
      <label>{label}</label>
      <input type="number" value={value} onChange={(e) => onChange(e.target.value)} className={styles.input} />
    </div>
  );
};

export default Input;
