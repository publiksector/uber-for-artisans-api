const model = require('../models/category');

//create category
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

//get all categories with pagination
exports.getAllCategories = ( pagenumber = 1, pagesize = 20) =>{
    return new Promise((resolve , reject)=>{
        model.find({}).skip((parseInt(pagenumber - 1) * parseInt(pagesize))).limit(parseInt(pagesize))
        .exec((err, found) => {
            if (err) reject(err);
            if (found) {
                var maps = found.sort(function (a, b) {
                    return b.name.length - a.name.length;

                })
                resolve({ success: true, message: 'categories found', data: maps })
            } else {
                resolve({ success: false, message: 'Could  not find data' })
            }
        })
    })
}

exports.getCategoryById = (id)=>{
    return new Promise((resolve , reject)=>{
        model.findById({_id:id}).exec((err , result)=>{
            if(err)reject(err);
            if(result){
                resolve({success:true , message:'found category', data:result})
            }else{
                resolve({success:false , message:'unable to find category'});
            }
        })
    })
}

exports.updateCategory = (data,id , image)=>{
    return new Promise((resolve , reject)=>{
        const detail = {
            name:data.name,
            imageUrl:image.imageUrl,
            iconUrl:image.iconUrl,
        }
        model.update({_id:id},detail).then(created =>{
            if(created){
                resolve({success:true , message:'Category updated successfully !!!'})
            }else{
                resolve({success:false , message:'Error updating category!!!'})
            }
        }).catch(err => reject(err));
    })
}

exports.deleteCategory = (id)=>{
    return new Promise((resolve , reject)=>{
        model.findByIdAndRemove({_id:id}).exec((err , deleted)=>{
            if(err)reject(err);
            if(deleted){
                resolve({success:true , message:'Category deleted successfully !!'})
            }else{
                resolve({success:true , message:'Error enocuntered while deleting category !!'})
            }
        })
    })
}