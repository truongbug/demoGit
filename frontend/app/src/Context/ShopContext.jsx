import React, { createContext, useEffect, useState } from "react";


export const ShopContext = createContext(null);

// Hàm này trả về một giỏ hàng mặc định có 300 mục, mỗi mục ban đầu có giá trị là 0.
const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300+1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {

  const [all_product,setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

// thực hiện các tác vụ bất đồng bộ, như gửi yêu cầu HTTP để lấy dữ liệu từ máy chủ khi thành phần được tạo ra hoặc cập nhật.
useEffect(()=>{
  fetch('http://localhost:3001/allproducts')
  .then((response)=>response.json())
  .then((data)=>setAll_Product(data))

  // để lấy thông tin giỏ hàng từ máy chủ nếu người dùng đã đăng nhập.
  if(localStorage.getItem('auth-token')){
    fetch('http://localhost:3001/getcart',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'auth-token':`${localStorage.getItem('auth-token')}`,
        'Content-Type':'application/json',
      },
      body:"",
    }).then((response)=>response.json())
    .then((data)=>setCartItems(data));
  }
},[])

// thêm sản phẩm vào giỏ hàng , cập nhật CartItem  và gửi yêu cầu đến máy chủ đẻ cập nhật giỏ hàng
  const addToCart = (itemId) => {
    setCartItems((prev) => ({...prev, [itemId]:prev[itemId] + 1 }));
    if(localStorage.getItem('auth-token')){
      fetch('http://localhost:3001/addtocart',{
        method:'POST',
        headers:{
          Accept:'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json',
        },
        body:JSON.stringify({"itemId":itemId}),
      })
      .then((response)=>response.json())
      .then((data)=>console.log(data));
    }
  };

  // xóa sản phẩm khỏi giỏ hàng , cập nhật CartItem  và gửi yêu cầu đến máy chủ đẻ cập nhật giỏ hàng
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(localStorage.getItem('auth-token')){
      fetch('http://localhost:3001/removefromcart',{
        method:'POST',
        headers:{
          Accept:'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type':'application/json',
        },
        body:JSON.stringify({"itemId":itemId}),
      })
      .then((response)=>response.json())
      .then((data)=>console.log(data));
    }
  };

  // tính tổng số tiền của giỏ hàng
  const getTotalCartAmount = () => {
    let totalAmount = 0; 
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (Product) => Product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount; 
  };

  // tính số mặt hàng của giỏ hàng
  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;