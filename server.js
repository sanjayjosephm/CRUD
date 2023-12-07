const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const server = express();
const cors = require('cors'); 
server.use(cors());
server.use(bodyParser.json())
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// const db = mysql.createConnection({
//     host : 'localhost',
//     port:'3306',
//     user: 'root',
//     password:'admin123',
//     database: 'db_connect'
// })

// async function main() {
//   const users = await prisma.Student.findMany();
//   console.log(users);
// }

// main()
//   .catch(e => {
//     throw e
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   });

// db.connect(function(err) {
//     if (err) {
//       console.error('error connecting: ' + err.stack);
//       return;
//     }
//     else{
//         console.log('Connected!');
//     }

//     server.listen(8080,function check(error){
//         if(error){
//             console.log("Error..."+error.stack);
//         }
//         else{
//             console.log("Successfully running!")
//         }
//     })
// });

server.listen(8080, function check(error) {
  if (error) {
    console.log('Error...' + error.stack);
  } else {
    console.log('Successfully running!');
  }
});

// server.post("/api/student/add", (req, res) => {
//     let details = {
//         id : req.body.id,
//         student_name: req.body.student_name,
//         course_name: req.body.course_name,
//         fee: req.body.fee,
//     };
//     let sql = "INSERT INTO school_db SET ?";
//     db.query(sql, details, (error) => {
//       if (error) {
//         res.send({ status: false, message: "Student created Failed" });
//         console.log(error.stack)
//       } else {
//         res.send({ status: true, message: "Student created successfully" });
//       }
//     });
// });

server.post('/api/student/add', async (req, res) => {
  try {
    const newStudent = await prisma.student.create({
      data: {
        id: req.body.id,
        student_name: req.body.student_name,
        course_name: req.body.course_name,
        fee: req.body.fee,
      },
    });
    res.send({ status: true, message: 'Student created successfully', data: newStudent });
    console.log("Added successfully")
  } catch (error) {
    console.error(error);
    res.send({ status: false, message: 'Student creation failed' });
  }
});

// server.get("/api/student", (req, res) => {
//     var sql = "SELECT * FROM db_connect.school_db";
//     db.query(sql, function (error, result) {
//       if (error) {
//         console.log("Error Connecting to DB");
//       } else {
//         res.send({ status: true, data: result });
//       }
//     });
// });

server.get('/api/student', async (req, res) => {
  try {
    const allStudents = await prisma.student.findMany();
    res.send({ status: true, data: allStudents });
  } catch (error) {
    console.error(error);
    res.send({ status: false, message: 'Error fetching students' });
  }
});

// server.get("/api/student/:id",(req,res)=>{
//     var id = req.params.id;
//     var sql = "SELECT * FROM db_connect.school_db WHERE id="+id;
//     console.log(id)
//     db.query(sql,function(error,result){
//         if(error){
//             console.log("Error in getting the Student Details");
//         }
//         else{
//             res.send({status:true,data:result});
//         }
//     })
// })

server.get('/api/student/:id', async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    res.send({ status: true, data: student });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, message: 'Error fetching student details' });
  }
});

// server.put("/api/student/update/:id",(req,res)=>{
//     var student_name = req.body.student_name;
//     var course_name = req.body.course_name;
//     var fee = req.body.fee;
//     let sql = 
//       "UPDATE db_connect.school_db SET student_name='"+
//       student_name +
//       "' , course_name='"+
//       course_name+"' , fee='"+
//       fee+"' WHERE id="+req.params.id;
//     let a = db.query(sql,(error,result) => {
//       if(error){
//         res.send({status:false,message:"Update failed"})
//       }
//       else{
//         res.send({status:true,message:"Student Updated Successfully"})
//       }
//     });
// });

server.put('/api/student/update/:id', async (req, res) => {
  try {
    const updatedStudent = await prisma.student.update({
      where: { id: parseInt(req.params.id) },
      data: {
        student_name: req.body.student_name,
        course_name: req.body.course_name,
        fee: req.body.fee,
      },
    });
    res.send({ status: true, message: 'Student updated successfully', data: updatedStudent });
  } catch (error) {
    console.error(error);
    res.send({ status: false, message: 'Student update failed' });
  }
});

// server.delete("/api/student/delete/:id",(req,res)=>{
//   let sql = "DELETE FROM db_connect.school_db WHERE id="+req.params.id;
//   let a = db.query(sql,(error,result)=>{
//     if(error){
//       res.send({status:false,message:"Deletion Failed"})
//     }
//     else{
//       res.send({status:true,message:"Student Deleted Successfully"})
//     }
//   })
// })

server.delete('/api/student/delete/:id', async (req, res) => {
  try {
    const deletedStudent = await prisma.student.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.send({ status: true, message: 'Student deleted successfully', data: deletedStudent });
  } catch (error) {
    console.error(error);
    res.send({ status: false, message: 'Student deletion failed' });
  }
});

server.on('close', async () => {
  await prisma.$disconnect();
});