import React from 'react';
import styles from './button.css';

export default ({ value }) => (
    <button className={styles.button}>{value}</button>
);
