import { useRef, useState } from "react";
import styles from "./Checkout.module.css";

const isNotEmpty = (value) => value.trim() !== "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postal: true
    })
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = isNotEmpty(enteredName);
    const enteredStreetIsValid = isNotEmpty(enteredStreet);
    const enteredPostalIsValid = isFiveChars(enteredPostal);
    const enteredCityIsValid = isNotEmpty(enteredCity);

    setFormInputsValidity({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        postal: enteredPostalIsValid,
        city: enteredCityIsValid
    })
    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredCityIsValid;
    
    if(!formIsValid) {
        return
    }

    props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        postal: enteredPostal,
        city: enteredCity
    })

  };
  const invalidClassesControl = input => {
    return `${styles.control} ${formInputsValidity[input] ? '' : styles.invalid}`
}

  return (
    <form onSubmit={confirmHandler}>
      <div className={invalidClassesControl('name')}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={invalidClassesControl('street')}>
        <label htmlFor="street">Street</label>
        <input ref={streetInputRef} type="text" id="street" />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={invalidClassesControl('postal')}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalInputRef} type="text" id="postal" />
        {!formInputsValidity.postal && <p>Please enter a valid postal code!</p>}
      </div>
      <div className={invalidClassesControl('city')}>
        <label htmlFor="city">City</label>
        <input ref={cityInputRef} type="text" id="city" />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};
export default Checkout;
