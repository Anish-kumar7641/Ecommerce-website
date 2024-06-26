import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {

    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""
    })

    const uploadOnCloudinary = async (pic) => {
        const data = new FormData();
        data.append("file", pic);
        data.append("upload_preset", "ecommerce");
    
        try {
          const response = await fetch(
            "https://api.cloudinary.com/v1_1/dopytmv8c/image/upload",
            {
              method: "post",
              body: data,
            }
          );
          const responseData = await response.json();
          return responseData.secure_url;
        } catch (error) {
          console.log("Not uploaded in cloudinary");
        }
      };

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }
    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }

    const Add_Product = async () => {
        // console.log(productDetails);
        let responseData;
        let product = productDetails; // copy of product object
        let formData = new FormData();
        formData.append('product', image); //append image in formdata
        console.log('trying to upload data')
        const data= await uploadOnCloudinary(image);
        // await fetch('http://localhost:4000/upload', {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //     },
        //     body: formData,
        // }).then((resp) => resp.json()).then((data) => { responseData = data }) 
        //we will get response and we will parse data and save data in responseData variable


        //sending product to addproduct endpoint
        if (data) {
            product.image = data;
            console.log(product);
            await fetch ('https://ecommerce-website-polr.onrender.com/addproduct',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("Product Added"):alert("Failed")
            })
        }
    }

    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product Title</p>
                <input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='Type here' />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type='text' name='old_price' placeholder='Type here' />
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type='text' name='new_price' placeholder='Type here' />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className="add-product-selector" id="">
                    <option value="women">Women</option>
                    <option value="men">men</option>
                    <option value="kid">kid</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumbnail-img' alt="" />
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
            </div>
            <button onClick={() => { Add_Product() }} className='addproduct-btn'>Add</button>
        </div>
    )
}

export default AddProduct
