import React from "react";
import styles from "./CurrencySelector.module.css";

const CurrencySelector = ({ label, options, selected, onChange }) => {
  return (
    <div className={styles.selectWrapper}>
      <label>{label}</label>
      <select value={selected} onChange={(e) => onChange(e.target.value)} className={styles.select}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
