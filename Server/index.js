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
app.listen(5002, () => {
    console.log("server is running ");
    
})












