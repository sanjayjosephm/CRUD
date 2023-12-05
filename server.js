const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const server = express();
const cors = require('cors'); 
server.use(cors());
server.use(bodyParser.json())

const db = mysql.createConnection({
    host : 'localhost',
    port:'3306',
    user: 'root',
    password:'admin123',
    database: 'db_connect'
})

db.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    else{
        console.log('Connected!');
    }

    server.listen(8080,function check(error){
        if(error){
            console.log("Error..."+error.stack);
        }
        else{
            console.log("Successfully running!")
        }
    })
});

server.post("/api/student/add", (req, res) => {
    let details = {
        id : req.body.id,
        student_name: req.body.student_name,
        course_name: req.body.course_name,
        fee: req.body.fee,
    };
    let sql = "INSERT INTO school_db SET ?";
    db.query(sql, details, (error) => {
      if (error) {
        res.send({ status: false, message: "Student created Failed" });
        console.log(error.stack)
      } else {
        res.send({ status: true, message: "Student created successfully" });
      }
    });
});

server.get("/api/student", (req, res) => {
    var sql = "SELECT * FROM db_connect.school_db";
    db.query(sql, function (error, result) {
      if (error) {
        console.log("Error Connecting to DB");
      } else {
        res.send({ status: true, data: result });
      }
    });
});

server.get("/api/student/:id",(req,res)=>{
    var id = req.params.id;
    var sql = "SELECT * FROM db_connect.school_db WHERE id="+id;
    console.log(id)
    db.query(sql,function(error,result){
        if(error){
            console.log("Error in getting the Student Details");
        }
        else{
            res.send({status:true,data:result});
        }
    })
})

server.put("/api/student/update/:id",(req,res)=>{
    var student_name = req.body.student_name;
    var course_name = req.body.course_name;
    var fee = req.body.fee;
    let sql = 
      "UPDATE db_connect.school_db SET student_name='"+
      student_name +
      "' , course_name='"+
      course_name+"' , fee='"+
      fee+"' WHERE id="+req.params.id;
    let a = db.query(sql,(error,result) => {
      if(error){
        res.send({status:false,message:"Update failed"})
      }
      else{
        res.send({status:true,message:"Student Updated Successfully"})
      }
    });
});

server.delete("/api/student/delete/:id",(req,res)=>{
  let sql = "DELETE FROM db_connect.school_db WHERE id="+req.params.id;
  let a = db.query(sql,(error,result)=>{
    if(error){
      res.send({status:false,message:"Deletion Failed"})
    }
    else{
      res.send({status:true,message:"Student Deleted Successfully"})
    }
  })
})