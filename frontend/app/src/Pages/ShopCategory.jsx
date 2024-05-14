import React, { useContext, useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Asset/dropdown_icon.png";
import { Item } from "../Components/Item/Item";

export const ShopCategory = (props) => {
  const { all_product, setAll_Product } = useContext(ShopContext);

  
  return (
    <div className="shop-category">
      <div className="shopcategory-indexSort">   
      </div>
      <div className="shopcategory-products">
        {all_product.map((item, i) => {
          if (props.category === item.category) {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
                // lập qua các phần tử trong mảng allproduct và trả về 1 mảng mới sau khi xử lí
                
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">Trang kế tiếp</div>
    </div>
  );
};
