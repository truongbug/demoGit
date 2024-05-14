import React from "react";
import "./Hero.css";
import hand_icon from "../Asset/hand_icon.png";
import arrow_icon from "../Asset/arrow.png";

import hero_img from "../Asset/hero_img.png";

export const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>Hãy Sống Theo Cách Của Bạn</h2>
        <div>
          <div className="hero-hand-icon">
            <p>Hello</p>
            <img src={hand_icon} alt="" />
          </div>
          <p>Phong cách nói lên </p>
          <p>chất riêng</p>
        </div>
        <div className="hero-latest-btn">
          <div>Bộ Sưu Tập</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_img} alt="" />
      </div>
    </div>
  );
};
