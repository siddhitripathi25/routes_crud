const express = require('express');
const data = require('../data/data');
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
        fs.writeFileSync(filePath, JSON.stringify(items));
        return res.status(201).json(newItem);
    })
}
function getItems(req,res){
    let {type,status,place} = req.query;
    fs.readFile(filePath,'utf-8',(err,data)=>{
        if (err){
            return res.status(400).json({'error':'Error reading file'})
        }
        let newdata = JSON.parse(data)
        let filteredArr;
        if (type!=undefined){
            filteredArr=newdata.filter((a)=>a.type.toLowerCase()==type.toLowerCase())
        }
        if (status!=undefined){
            filteredArr=filteredArr.filter((b)=>a.status.toLowerCase()==status.toLowerCase())
        }
        if (place!=undefined){
            filteredArr=filteredArr.filter((c)=>c.place.toLowerCase()==place.toLowerCase())
        }
        res.status(200).json({'message': 'Sent successfully'})

    })
    
}
function getItemById(req,res){
    const { itemName, type, place, date, contact } = req.body;
    fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(400).json({ error: "Error Reading Data" });
    }
    const items = JSON.parse(data);
    const item = items.findIndex((item) => item.id === req.params.id);
    if (item === -1) {
      return res.status(404).json({ error: "Item not found" });
    }
    items[item] = {
      ...items[item],
      itemName,
      type,
      place,
      date,
      contact,
    };
    fs.writeFileSync(filePath, JSON.stringify(items));
    return res.status(200).json(items[item]);
  });
}
function updateItem(req,res){

}
function claimItem(req,res){

}
function deleteItem(req,res){

}
module.exports = {createItem,getItems,getItemById,updateItem,claimItem,deleteItem}