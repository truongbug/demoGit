import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import { Breadcrum } from '../Components/Breadcrums/Breadcrum'
import { ProductDisplay } from '../Components/ProductDisplay/ProductDisplay'
import { DescriptionBox } from '../Components/DescriptionBox/DescriptionBox'
import { RelatedProducts } from '../Components/RelatedProducts/RelatedProducts'

// Hiển thị chi tiết sản phẩm dựa trên productID được trích xuất từ URL
const Product = () => {
  const { all_product } = useContext(ShopContext);
  console.log(all_product);
  const { productId } = useParams(); // lấy productId từ URL
  console.log(productId);
  const product = all_product.find((e) => e.id === Number(productId)); // tìm kiếm sản phẩm trong allproduct có id giống với productId đã được trích xuât từ URL
  if (product) {
    const productId = product.id;
    console.log("ID của sản phẩm là:", productId);
  } else {
    console.log("Không tìm thấy sản phẩm có ID tương ứng");
  }

  // Render ra các thành phần của component để hiển thị tt sản phẩm và các thành phần liên quan
  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
};

export default Product;
