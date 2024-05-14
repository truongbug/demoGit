import React, { useState } from "react";
import "./CSS/LoginSign.css";

export const LoginSign = () => {

// useState được sử dụng để lưu trữ các biến trạng thái như state và formData.
// setState cập nhật trạng thái state giưa đang nhập và đăng kí
const [state,setState]= useState("Login");
const [formData,setFormData] = useState({
  username:"",
  password:"",
  email:""
})

// cập nhật formDatakhi người dùng nhập dữ liệu vào các trường nhập.
const changeHandler = (e) =>{
  setFormData({...formData,[e.target.name]:e.target.value})
}

// thưc hiện yêu cầu http để đăng nhập
const login = async () =>{
  console.log("Login Function Executed",formData);
  let responseData;
  await fetch('http://localhost:3001/login',{
    method:'POST',
    headers:{
      Accept:'application/form-data',
      'Content-Type':'application/json',
    },
    body: JSON.stringify(formData),
  }).then((response)=> response.json()).then((data)=>responseData=data)

  // localStorage lưu trữ token xác thực đăng nhập/đăng kí thành công để duy trì trạng thái của các phiên làm việc
  if(responseData.success){
    localStorage.setItem('auth-token',responseData.token);
    window.location.replace("/");
  }
  else{
    alert(responseData.errors)
  }
}

// thực hiện yêu cầu http để đăng kí
const signup = async () => {
  console.log("Signup Function Executed", formData);
  let responseData;
  await fetch("http://localhost:3001/signup", {
    method: "POST",
    headers: {
      Accept: "application/formData",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => (responseData = data));

  if (responseData.success) {
    localStorage.setItem("auth-token", responseData.token);
    window.location.replace("/");
  } else {
    alert(responseData.errors);
  }
};
// hiển thị giao diện tương ứng khí người dùng chọn đăng nhập hoặc đăng kí
  return (
    <div className="loginsign">
      <div className="loginsign-container">
        <h1>{state}</h1>
        <div className="loginsign-fields">
          {state==="Sign Up"?
          <input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="Your Name" />:<></>}
          <input name="email" value={formData.email} onChange={changeHandler} type="text" placeholder="Email Address" />
          <input name="password" value={formData.password} onChange={changeHandler} type="text" placeholder="Password" />
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>Continue</button>
        {state==="Sign Up"?<p className="loginsign-login">
          Đăng nhập ở đây? <span onClick={()=>{setState("Login")}}>Đăng nhập</span>
        </p>:<p className="loginsign-login">
          Đăng kí ở đây? <span onClick={()=>{setState("Sign Up")}}>Đăng kí</span>
        </p>}
        
        <div className="loginsign-agree">
          <input type="checkbox" name="" id="" />
          <p>Tôi đồng ý với điều khoản và chính sách bảo mật.</p>
        </div>
      </div>
    </div>
  );
};
