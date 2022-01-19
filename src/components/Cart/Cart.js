import Modal from "../UI/Modal";
import styles from "./Cart.module.css";
import { Fragment, useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { baseUrl } from "../../global";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [hasError, setHasError] = useState(null);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      }),
    };
    try {
      const response = await fetch(`${baseUrl}/api/orders`, options);
      if (response.status !== 200) {
        throw new Error();
      }
      if(response.status === 200){
        cartCtx.clearCart()
      }
    } catch (error) {
      setHasError("Something went wrong! Please, try again later!");
    } finally {
      setIsSubmitting(false);
      setDidSubmit(true);
    }
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <Fragment>
      <p>Succesfully received the order!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  const errorModalContent = (
    <Fragment>
      <p>{hasError}</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && !hasError && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && !hasError && didSubmitModalContent}
      {!isSubmitting && hasError && errorModalContent}
    </Modal>
  );
};

export default Cart;
