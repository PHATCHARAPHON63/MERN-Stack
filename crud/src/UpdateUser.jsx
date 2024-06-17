//crud\src\UpdateUser.jsx

import { useEffect } from "react";
import React,{useState} from "react";
import { useParams ,useNavigate} from "react-router-dom";
import axios from "axios";



function UpdateUser(){
    const {id} = useParams()
    const [FirstName, setFirstName] = useState()
    const [LastName, setLastName] = useState()
    const [nickname, setnickname] = useState()
    const [birthdate, setbirthdate] = useState()
    const [age, setage] = useState()
    const [gender, setgender] = useState()
    const navigate = useNavigate()


    useEffect(()=> {
        axios.get('http://localhost:3001/getUser/'+id)
        .then(result => {console.log(result)
          setFirstName(result.data.FirstName)
          setLastName(result.data.LastName)
          setnickname(result.data.nickname)
          setbirthdate(result.data.birthdate)
          setage(result.data.age)
          setgender(result.data.gender)
        })
        .catch(err => console. log(err))
    }, [id])

    const Update = (e) => {
      e.preventDefault();
    
      // แปลงรูปแบบ birthdate เป็น yyyy-MM-dd ก่อนส่ง
      const formattedBirthdate = birthdate ? birthdate.split('T')[0] : ''; // แปลงรูปแบบวันที่
    
      axios.put(`http://localhost:3001/updateUser/${id}`, {
        FirstName,
        LastName,
        nickname,
        birthdate: formattedBirthdate, 
        age,
        gender
      })
        .then(result => {
          console.log(result.data); // ตรวจสอบผลลัพธ์จาก server
          navigate('/');
        })
        .catch(err => {
          console.error("เกิดข้อผิดพลาดในการอัพเดต:", err);
          if (err.response) {
            // แสดงข้อผิดพลาดจาก server หากมี
            console.error("Server response:", err.response.data);
            // คุณสามารถแสดงข้อผิดพลาดให้ผู้ใช้เห็นได้ที่นี่ เช่น alert(err.response.data.message);
          } else {
            console.error("Network error:", err.message);
            // คุณสามารถแจ้งผู้ใช้ว่ามีปัญหาในการเชื่อมต่อเครือข่าย
          }
        });
    };

    return(
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="container"> 
        <div className="row justify-content-center"> 
          <div className="col-md-6 bg-white rounded p-3">
          <form onSubmit={Update}>
            <div className="w-100 bg-white rounded p-3">
              <h2>Update User</h2>
      
              <div className="mb-2">
                <label htmlFor="FirstName">ชื่อ</label>
                <input type="text" id="FirstName" placeholder="กรอกชื่อ" className="form-control"
                value={FirstName} onChange={(e) => setFirstName(e.target.value)}/>
              </div>
              <div className="mb-2">
                <label htmlFor="LastName">นามสกุล</label>
                <input type="text" id="LastName" placeholder="กรอกนามสกุล" className="form-control"
                value={LastName} onChange={(e) => setLastName(e.target.value)}/>
              </div>
      
              <div className="mb-2">
                <label htmlFor="nickname">ชื่อเล่น</label>
                <input type="text" id="nickname" placeholder="กรอกชื่อเล่น" className="form-control"
                value={nickname} onChange={(e) => setnickname(e.target.value)} />
              </div>

              <div className="mb-2">
                <label htmlFor="birthdate">วันเดือนปีเกิด (dd-mm-yyyy)</label>
                <input type="date" id="birthdate" className="form-control"
                value={birthdate} onChange={(e) => setbirthdate(e.target.value)} />
              </div>
      
              <div className="mb-2">
                <label htmlFor="age">อายุ</label>
                <input type="number" id="age" placeholder="กรอกอายุ" className="form-control"
                value={age} onChange={(e) => setage(e.target.value)}/>
              </div>

              <div className="mb-2">
                <label htmlFor="gender">เพศ</label>
                <select id="gender" className="form-control" value={gender} onChange={(e) => setgender(e.target.value)} >
                  <option value="">เลือกเพศ</option>
                  <option value="ชาย">ชาย</option>
                  <option value="หญิง">หญิง</option>
                  <option value="อื่นๆ">อื่นๆ</option>
                </select>
              </div>
      
              <button className="btn btn-success">Update</button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
    
        
        
    )
}
export default UpdateUser;