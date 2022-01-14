import { Fragment } from "react";
import styles from './TheHeader.module.css'
import mealsImg from '../../assets/meals.jpg'
import HeaderCartButton from "./HeaderCartButton";

const TheHeader = (props) => {
  return <Fragment>
      <header className={styles.header}>
          <h1>React Meals</h1>    
          <HeaderCartButton onClick={props.onShowCart}/>     
      </header>
      <div className={styles['main-image']}>
          <img src={mealsImg} alt="A table full of food" />
      </div>
  </Fragment>;
};

export default TheHeader;
