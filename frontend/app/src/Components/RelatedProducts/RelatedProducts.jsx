import React, { useEffect, useState } from "react";
import "./RelatedProducts.css";
import { Item } from "../Item/Item";

export const RelatedProducts = () => {
  
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/popularinmen')
      .then((response) => response.json())
      .then((data) => setPopularProducts(data));
      
  }, []);
  return (
    <div className="relatedproducts">
      <h1>Sản phẩm liên quan</h1>
      <hr />
      <div className="relatedproducts-item">
        {popularProducts.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.id.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};
