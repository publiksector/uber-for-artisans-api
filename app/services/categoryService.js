const model = require('../models/category');
exports.createCategory = (data , image)=>{
    return new Promise((resolve , reject)=>{
        const detail = {
            name:data.name,
            imageUrl:image.imageUrl,
            iconUrl:image.iconUrl,
        }
        model.create(detail).then(created =>{
            if(created){
                resolve({success:true , message:'Category created successfully !!!'})
            }else{
                resolve({success:false , message:'Error creating category!!!'})
            }
        }).catch(err => reject(err));
    })
}