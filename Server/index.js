const { application, query } = require("express");
const express = require("express");
const app = express();
//const bodyParser = require("body-parser");
const mysql = require("mysql2");
//const cors = require("cors");
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    next();
});
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "crud_project",
});
//add new user
app.post("/addNewlogin", function (req, res) {
    console.log("Server started", req.body);
    let sql = "INSERT INTO `bookmanagementlogin` (`firstname`,`email`,`password`) VALUES ";
    sql += "('" + req.body.firstname + "',";
    sql += "'" + req.body.email + "',";
    sql += "'" + req.body.password + "')";
    console.log(sql);
    db.query(sql, function (err) {
        if (err) throw err;
        console.log("success");
        res.send("sucseefull added data");
    });
})
app.put("/updateuser/:id", (req, res) => {
    console.log("Update bookmanagementlogin", req.params.id);
    let sql = "UPDATE `bookmanagementlogin` SET ? WHERE id = ?";
    db.query(sql, [{  }, req.params.id], (error, result) => {
        if (error) {
            console.log(error);
        }
        console.log("Result", result);
        res.send(result);

    })

})
//all category books
app.get("/allcategory", function(req,res){
    console.log("category list");
    var sql= "SELECT  * FROM categorybooks";
    db.query(sql,(error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    })
})
//add category
app.post("/insertcategory",function(req,res){
    console.log("Insert Category");
    let sql = "INSERT INTO `categorybooks` (`category`) VALUES ";
    sql += "('" + req.body.category + "')";
    console.log(sql);
    db.query(sql, function (err) {
        if (err) throw err;
        console.log("success");
        res.send("sucseefull added data");
    });
})
//update category
app.put("/updatecategory/:id", function(req,res){
    console.log("UpdateCategories", req.body.category, req.params.id);

    var sql = "UPDATE `categorybooks` SET ? WHERE id = ?";
    db.query(sql, [{ category: req.body.category }, req.params.id], (error, result) => {
        if (error) {
            console.log(error);
        }
        console.log("Result", result);
        res.send(result);

    })

 })
 //delete category
 app.get("/deletecategory/:id", (req, res) => {
    let id = req.params.id;
    console.log("id", id);
    let sql = "DELETE FROM `categorybooks` WHERE id='" + id + "'";
    db.query(sql, function (err, rows) {
        if (err) {
            console.log("somthing error in the query");
        }
         else {
            console.log("success");
            res.json(rows);
        }
    });
})
//all books according to the category
app.get("/allbooks/:category", function(req,res){
    console.log("Category Books",req.params.category);
    var sql= "SELECT  * FROM `books` WHERE  category =?";
    db.query(sql,[req.params.category],(error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    })
})
//add books according to the category
app.post("/insertbooks/:category", function(req,res){
    let sql ="INSERT INTO `books` (`category`, `bookname`) VALUES ";
    sql += "('" + req.params.category + "',";
    sql += "'" + req.body.bookname + "')";
    console.log(sql);
    db.query(sql, function (err) {
        if (err) throw err;
        console.log("success");
        res.send("sucseefull added data");
    })
    
})
// update books 
app.put("/updatebooks/:id", (req, res) => {
    console.log("Update BookName", req.params.id, req.body.bookname);
    let sql = "UPDATE `books` SET ? WHERE id = ?";
    db.query(sql, [{ bookname: req.body.bookname }, req.params.id], (error, result) => {
        if (error) {
            console.log(error);
        }
        console.log("Result", result);
        res.send(result);

    })

})
// delete books
app.get("/deletebooks/:id", (req, res) => {
    let id = req.params.id;
    console.log("id", id);
    let sql = "DELETE FROM `books` WHERE id='" + id + "'";
    db.query(sql, function (err, rows) {
        if (err) {
            console.log("somthing error in the query");
        }
         else {
            console.log("success");
            res.json(rows);
        }
    });
})
app.listen(5002, () => {
    console.log("server is running ");
    
})












