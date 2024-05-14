const port = 3001;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");


app.use(express.json());
app.use(cors());

// Ket noi mongoBD
mongoose.connect("mongodb+srv://xuantruong:19032003t@cluster0.wzbsxw7.mongodb.net/WebsiteBanAoKhoac")

//Tao API
app.get("/",(req,res)=>{
    res.send("Express App is Running")
})

//Image shop

const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb) =>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.fieldname)}`)
    }
})

const upload = multer({storage:storage})

// creating upload endpoint for images
app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'),(req, res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

// Định nghãi model Product

const Product = mongoose.model("Product",{
    id:{
        type: Number,
        requires:true,

    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    new_price:{
        type: Number,
        required: true,
    },
    old_price:{
        type: Number,
        required: true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    avilable:{
        type:Boolean,
        default:true,
    }
})

// tạo API để thêm 1 sản phẩm vào mongooBD
app.post('/addproduct', async (req,res)=>{
    // Kiểm tra nếu new_price và old_price không phải là số, trả về lỗi
    if(isNaN(req.body.new_price) || isNaN(req.body.old_price)) {
        return res.status(400).json({ success: false, message: "New price and old price must be numbers." });
    }

    let products = await Product.find({});
    let id;

    if(products.length > 0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else{
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });

    console.log(product);

    try {
        await product.save();
        console.log("Save");
        res.json({
            success: true,
            name: req.body.name,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to save product." });
    }
})


// tạo API để xóa sản phẩm trong mongoBD

app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name,

    })
})

// tạo API chỉnh sửa sản phẩm
// app.post('/editproduct', async (req, res) => {
//     try {
//         const { id, newName, newPrice, newDescription } = req.body;

//         // Tìm sản phẩm dựa trên id
//         const product = await Product.findOne({ id });

//         // Nếu không tìm thấy sản phẩm
//         if (!product) {
//             return res.status(404).json({ success: false, errors: "Không tìm thấy sản phẩm" });
//         }

//         // Cập nhật thông tin sản phẩm
//         product.name = newName || product.name;
//         product.price = newPrice || product.price;
//         product.description = newDescription || product.description;

//         // Lưu lại sản phẩm đã chỉnh sửa
//         await product.save();

//         // Trả về thông tin sản phẩm đã chỉnh sửa
//         res.json({
//             success: true,
//             name: product.name,
//             image:product.image,
//             category:product.category,
//             new_price:product.new_price,
//             old_price:product.old_price,
        
//         });
//     } catch (error) {
//         console.error("Lỗi khi chỉnh sửa sản phẩm:", error);
//         res.status(500).json({ success: false, errors: "Đã xảy ra lỗi khi chỉnh sửa sản phẩm" });
//     }
// });


// tạo API để lấy tất cả các sản phẩm từ cơ sở dữ liệu và trả về chúng dưới dạng một mảng JSON.
app.get('/allproducts',async (req,res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})

// định nghĩa model User
const Users = mongoose.model('Users',{
    name:{
        type: String,
    },
    email:{
        type: String,
        unique: true,
    },
    password:{
        type: String,
    },
    cartData:{
        type: Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

// xử lí yêu cầu POST tới endpoint để đăng ký một người dùng mới vào hệ thống.
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    // Kiểm tra xem có thiếu thông tin không
    // if (!name) {
    //     return res.status(400).json({ success: false, errors: "Vui lòng nhập tên người dùng." });
    // }
    if (!email) {
        return res.status(400).json({ success: false, errors: "Vui lòng nhập địa chỉ email." });
    }
    if (!password) {
        return res.status(400).json({ success: false, errors: "Vui lòng nhập mật khẩu." });
    }
    

    // Kiểm tra xem email có đúng dạng "@gmail.com"
    const emailPattern = /\b[A-Za-z0-9._%+-]+@gmail\.com\b/;
    if (!emailPattern.test(email)) {
        return res.status(400).json({ success: false, errors: "Địa chỉ email không hợp lệ. Vui lòng sử dụng địa chỉ email của Gmail." });
    }

    // Kiểm tra xem email đã được sử dụng chưa
    let check = await Users.findOne({ email });
    if (check) {
        return res.status(400).json({ success: false, errors: "Email đã được sử dụng" });
    }

    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
    

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    };
    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });
});



// creating endpoit for user login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ success: false, errors: "Vui lòng nhập đầy đủ tài khoản và mật khẩu" });
    }

    let user = await Users.findOne({ email });

    if (user) {
        const passCompare = password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            return res.json({ success: true, token });
        } else {
            return res.status(401).json({ success: false, errors: 'Mật khẩu không đúng' });
        }
    } else {
        return res.status(404).json({ success: false, errors: "Email không tồn tại" })
    }
});


// creating endppoint for newcollection data
app.get('/newcollections', async (req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
})

//creating endpoint for popular in men section
app.get('/popularinmen',async (req,res)=>{
    let products = await Product.find({category:"men"});
    let popular_in_men =products.slice(0,4);
    console.log("Popular in men fetched");
    res.send(popular_in_men);
})

//creating middelware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
      res.status(401).send({ errors: "Please authenticate using valid token" });
    } else {
      try {
        const data = jwt.verify(token, "secret_ecom");
        req.user = data.user;
        next();
      } catch (error) {
        res
          .status(401)
          .send({ errors: "Please authenticate using a valid token" });
      }
    }
  };

// creating endpoint for adding products in cartdata
app.post('/addtocart', fetchUser, async (req,res)=>{
    console.log("Added",req.body.itemId);
    let userData = await Users.findOne({_id: req.user.id});
    userData.cartData[req.body.itemId] +=1;
    await Users.findOneAndUpdate({_id: req.user.id},{cartData: userData.cartData});
    res.send("Added")
})

// creating endpoint to remove product from cartdata
app.post('/removefromcart',fetchUser,async(req,res)=>{
    console.log("Removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")
})

// creating endpoint to get cartdata
app.post("/getcart", fetchUser, async (req, res) => {
    console.log("GetCart");
    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.cartData);
  });

app.listen(port,(error)=>{
    if(!error) {
        console.log("Server Running on Port "+port)
    }
    else{
       console.log("Error :"+ error) 
    }
})