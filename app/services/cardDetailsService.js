let model = require('../models/cardDetails');

exports.saveCardDetails = (id, data)=>{
    return new Promise((resolve , reject)=>{
        model.findOne({cardNumber:data.cardNumber}).exec((err , result)=>{
            if(err)reject(err);
            if(!result){
                let details ={
                    name:data.name,
                    cardNumber:data.cardNumber,
                    expDate:data.expDate,
                    cvv:data.cvv,
                    publicId:id,
                }
                model.create(details).then(created =>{
                    if(created){
                        resolve({success:true , message:'Card details saved successfully !!!'})
                    }else{
                        resolve({success:false , message:'Error saving card details'})
                    }
                }).catch(err =>{ reject(err)})
            }else{
                resolve({success:false, message:'Card details already exists'})
            }
        })
    })
}

exports.getSingleCardDetails = (publicId , id)=>{
    console.log(id , 'id located')
    return new Promise((resolve , reject)=>{
        model.findOne({publicId:publicId , _id:id},{createdAt:0}).exec((err, result)=>{
            if(err)reject(err);
            if(result){
                resolve({success:true , message:'Card details', data:result});
            }else{
                resolve({success:false , message:'unable to get card details'});
            }
        })
    })
}

exports.getAllCardDetails = (publicId)=>{
    return new Promise((resolve , reject)=>{
        model.find({publicId:publicId},{createdAt:0}).exec((err, found)=>{
            if(err)reject(err);
            if(found){
                resolve({success:true , message:'Card details', data:found});
            }else{
                resolve({success:false , message:'unable to get card details'});
            }
        })
    })
}

exports.deleteCardDetails = (id)=>{
    return new Promise((resolve , reject)=>{
        model.findByIdAndRemove({_id:id}).exec((err, deleted)=>{
            if(err)reject(err);
            if(deleted){
                resolve({success:true , message:'Card details deleted successfully '})
            }else{
                resolve({success:false , message:'Error occured while deleting card details'})
            }
        })
    })
}