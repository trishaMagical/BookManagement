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
    database: "crud_projects",
});
//See All the Api's
app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM `bookmanagementlogin` WHERE id =?";
    db.query(sqlGet, id, (error, result) => {
        if (error) {
            console.log(error);
        }
        // console.log("Result", result);
        res.send(result);
    })

})
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
//Update User
app.put("/updateuser/:id", (req, res) => {
    console.log("Server started",req.body);
    var sql="UPDATE `bookmanagementlogin` SET ";
    sql+="`firstname`='"+req.body.firstname+"',";
    sql+="`email`='"+req.body.email+"',";
    sql+="`password`='"+req.body.password+"' ";
    sql+="WHERE `bookmanagementlogin`.`id`='"+req.params.id+"'";
  console.log(sql);
  db.query(sql,function(err){
  if(err) throw err;
  console.log("success");
  res.send("sucseefull Updated data")
  });

})
//Delete user
app.get("/deleteuser/:id", (req, res) => {
    let id = req.params.id;
    console.log("id", id);
    let sql = "DELETE FROM `bookmanagementlogin` WHERE id='" + id + "'";
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
app.get("/api/login/:email/:password", (req, res) => {
    console.log("Server Sarted");
    let sqlLogin = "SELECT  `email`,`firstname`  FROM `bookmanagementlogin` WHERE email=? AND password = ?";
    db.query(sqlLogin, [req.params.email, req.params.password], (error, result) => {
        if (error) {
            console.log(error);
        }
        // console.log("Result", result);
        res.send(result);
    })
})
//all category books
app.get("/allcategory/:email", function(req,res){
    console.log("category list according to email id");
    var sql= "SELECT  * FROM `categorybooks` WHERE email =?";
    db.query(sql,[req.params.email],(error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    })
})
//add category
app.post("/insertcategory/:email",function(req,res){
    console.log("Server started", req.body.category);
    
    let categories = "SELECT * FROM `categorybooks` WHERE email=? AND category=? ";
    db.query(categories, [req.params.email, req.body.category], (error, result) => {
        if (error) {
            console.log(error);
        }
        console.log("Result", result);
        //res.send(result);
        if (result.length === 0) {
            let sql = "INSERT INTO `categorybooks` (`email`,`category`) VALUES ";
            sql += "('" + req.params.email + "',";
            sql += "'" + req.body.category + "')";
            console.log(sql);
            db.query(sql, function (err) {
                if (err) throw err;
                console.log("success");
                res.send("sucseefull added data");
            });
        }
        else {
            res.send (" Categoryname Already exist");
        }
    })
    
})
//update category
app.put("/updatecategory/:id/:email", function(req,res){
    console.log("UpdateCategories", req.body.category, req.params.id,req.params.email);

    var sql = "UPDATE `categorybooks` SET ? WHERE id = ?";
    db.query(sql, [{ category: req.body.category }, req.params.id,req.params.email], (error, result) => {
        if (error) {
            console.log(error);
        }
        console.log("Result", result);
        res.send(result);

    })

 })
 
 //delete category
 app.get("/deletecategory/:email/:category", (req, res) => {
    let email = req.params.email;
    let category = req.params.category;
    console.log("category", category);
    let sql = "DELETE FROM `categorybooks` WHERE email='" + email + "' AND category='"+category+"'";
    db.query(sql, function (err, rows) {
        if (err) {
            console.log("somthing error in the query");
        }
         else {
            let sql2 ="DELETE FROM `books` WHERE email='" + email + "' AND category='"+category+"'";
            db.query(sql2, function (err, rows){
                if(err){
                    console.log("somthing error in the query");
                }
                else{
                    console.log("succesful");
                    res.json(rows);
                }
            })
            
        }
    });
})
//all books according to the category
app.get("/allbooks/:email/:category", function(req,res){
    console.log("category list according to email id");
    var sql= "SELECT  * FROM `books` WHERE email =? AND category =?";
    db.query(sql,[req.params.email,req.params.category],(error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
    })
})
//add books according to the category
app.post("/insertbooks/:email/:category", function(req,res){
    console.log("Trisha");
    console.log("Server started", req.body.bookname);
    
    let todos = "SELECT * FROM `books` WHERE email=? AND category=?AND bookname=?  ";
    db.query(todos, [req.params.email,req.params.category, req.body.bookname,], (error, result) => {
        if (error) {
            console.log(error);
        }
        console.log("Result", result);
        //res.send(result);
        if (result.length === 0) {
            let sql = "INSERT INTO `books` ( `category`,`bookname`,`email`) VALUES ";
            sql += "('" + req.params.category + "',";
            sql += "'" + req.body.bookname + "',";
            sql += "'" + req.params.email + "')";
            console.log(sql);
            db.query(sql, function (err) {
                if (err) throw err;
                console.log("success");
                res.send("sucseefull added data");
            });
        }
        else {
            res.send ("Already exist");
        }
    
    })
    
})
// update books 
app.put("/updatebooks/:id/:email", (req, res) => {
    console.log("Update BookName", req.params.id, req.body.bookname,req.params.email);
    let sql = "UPDATE `books` SET ? WHERE id = ? AND email =?";
    db.query(sql, [{ bookname: req.body.bookname }, req.params.id,req.params.email], (error, result) => {
        if (error) {
            console.log(error);
        }
        console.log("Result", result);
        res.send(result);

    })

})
// delete books
app.get("/deletebooks/:id/:email", (req, res) => {
    let id = req.params.id;
    let email = req.params.email;
    console.log("id", id);
    let sql = "DELETE FROM `books` WHERE id='" + id + "' AND email='" + email + "' ";
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












