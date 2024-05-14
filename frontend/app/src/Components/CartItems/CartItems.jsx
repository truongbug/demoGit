import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Asset/cart_cross_icon.png";

export const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } =
    useContext(ShopContext);
    
  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        console.log(all_product)
        if (cartItems[e.id] > 0) {
          return (
            <div>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className="carticon-product-icon" />
                <p>{e.name}</p>
                <p>{e.new_price}VND</p>
                <button className="cartitems-quantity">
                  {cartItems[e.id]}
                </button>
                <p>{e.new_price * cartItems[e.id]}VND</p>
                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }

        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Tổng hóa đơn</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Tổng tiền</p>
              <p>{getTotalCartAmount()}VND</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Phí vận chuyển</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Tổng tiền</h3>
              <h3>{getTotalCartAmount()}VND</h3>
            </div>
          </div>
          <button>Đặt hàng</button>
        </div>
        <div className="cartitems-promocode">
          {/* <p>Mã khuyến mãi</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="Mã khuyến mãi" />
            <button>Sử dụng</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};
