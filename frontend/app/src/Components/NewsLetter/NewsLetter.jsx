import React from "react";
import "./NewsLetter.css";

export const NewsLetter = () => {
  return (
    <div className="newsletter">
      <h1>Nhận ưu đãi độc quyền trên email của bạn</h1>
      <p>Đăng kí để nhận được thông báo về sản phẩm mới</p>
      <div>
        <input type="email" placeholder="Your Email" />
        <button>Subscribe</button>
      </div>
    </div>
  );
};
