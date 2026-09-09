const express = require('express');
const data = require('./data/data');
const fs = require('fs')
const path = require('path')
const crypto = require('crypto');
const filePath = path.join(__dirname,'../data/data.js')
function createItem(req,res){
    let {itemName,type,place,date,contact} = req.body;
    const valide = ['lost','found']
    if (!itemName || !type || !place || !date || !contact){
        return res.status(400).json({"error": "Missing require fields"})
    }
    if (!valide.includes(type)){
        return res.status(400).json({"error": "Type not valid"})
    }
    fs.readFile(filePath,'utf-8',(err,data)=>{
        if (err){
            return res.status(400).json({ error: "Error Reading Data" })
        }
        const items = JSON.parse(data);
        let newItem = {
        id: crypto.randomUUID(),
        itemName,
        type,
        place,
        date,
        contact,
        status: "open",
        };
        items.unshift(newItem);
        fs.writeFileSync(dataPath, JSON.stringify(items));
        return res.status(201).json(newItem);
    })
}
function getItems(req,res){

}
function getItemById(req,res){

}
function updateItem(req,res){

}
function claimItem(req,res){

}
function deleteItem(req,res){

}
module.exports = {createItem,getItems,getItemById,updateItem,claimItem,deleteItem}