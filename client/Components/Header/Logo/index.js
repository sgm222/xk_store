import React, { Component } from 'react';
import styles from './styles';
import logo from 'SharedStyles/logo.jpg';
const Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <div className={styles.logo}>
        <img src={logo}></img>
      </div>
      <div className={styles.logoTitle}>小康电子商城</div>
    </div>
  );
};

export default Logo;
