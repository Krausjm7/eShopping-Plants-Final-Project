import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice'; // Ensure these are correctly imported
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  // Select the 'items' array from the 'cart' slice of your Redux store
  const cart = useSelector(state => state.cart.items);
  // Get the dispatch function to send actions to the Redux store
  const dispatch = useDispatch();

  // --- Helper Functions for Calculations ---

  /**
   * Calculates the total monetary amount for all items in the cart.
   * It iterates over the cart items, extracts quantity and cost,
   * converts the cost string to a number, multiplies by quantity,
   * and sums them up.
   * @returns {string} The total amount formatted to 2 decimal places.
   */
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      // Convert the cost string (e.g., "$10.00") to a number
      const itemCost = parseFloat(item.cost.substring(1));
      total += item.quantity * itemCost;
    });
    return total.toFixed(2); // Format to 2 decimal places
  };

  /**
   * Calculates the total monetary cost for a single item (cost multiplied by its quantity).
   * It extracts the numeric value from the item's cost string.
   * @param {object} item - The cart item object.
   * @returns {string} The subtotal for the item formatted to 2 decimal places.
   */
  const calculateTotalCost = (item) => {
    // Extract the numeric value from the item's cost string
    const itemCost = parseFloat(item.cost.substring(1));
    return (item.quantity * itemCost).toFixed(2); // Format to 2 decimal places
  };

  // --- Handlers for User Interactions ---

  /**
   * Handles the "Continue Shopping" button click.
   * Calls the onContinueShopping prop function passed from the parent component.
   * @param {Event} e - The click event object.
   */
  const handleContinueShopping = (e) => {
    e.preventDefault(); // Prevent default link behavior if applicable
    if (onContinueShopping) {
      onContinueShopping(e); // Call the prop function passed from ProductList
    }
  };

  /**
   * Handles the "Checkout" button click.
   * For now, it shows an alert indicating future functionality.
   * @param {Event} e - The click event object.
   */
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  /**
   * Handles incrementing an item's quantity in the cart.
   * Dispatches the updateQuantity action to increase the item's quantity by 1.
   * @param {object} item - The cart item object to increment.
   */
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, amount: item.quantity + 1 }));
  };

  /**
   * Handles decrementing an item's quantity in the cart.
   * If quantity is greater than 1, it decrements. If it would drop to 0,
   * it dispatches removeItem to remove the plant type altogether.
   * @param {object} item - The cart item object to decrement.
   */
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      // If quantity is more than 1, just decrement it
      dispatch(updateQuantity({ name: item.name, amount: item.quantity - 1 }));
    } else {
      // If quantity is 1 and decremented, remove the item entirely from the cart
      dispatch(removeItem(item.name));
    }
  };

  /**
   * Handles removing an item completely from the cart.
   * Dispatches the removeItem action.
   * @param {object} item - The cart item object to remove.
   */
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // --- Component Render ---

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {/* Conditional rendering: Show "Your cart is empty" if no items, otherwise show cart items */}
        {cart.length === 0 ? (
          <p style={{ color: 'black', textAlign: 'center', padding: '20px' }}>Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div className="cart-item" key={item.name}> {/* Using item.name as key, assuming unique names */}
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                {/* Display item cost, formatted from string */}
                <div className="cart-item-cost">{item.cost}</div> {/* Display original cost string */}
                <div className="cart-item-quantity">
                  <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                </div>
                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;