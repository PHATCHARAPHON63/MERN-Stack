//Users.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => { 
      try {
        const response = await axios.get('http://localhost:3001/users'); // Use correct endpoint
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    
    fetchUsers(); 
  }, []);  

  const handleDelete = async (id) => {
    // แสดงกล่องโต้ตอบเพื่อยืนยันการลบ
    if (!window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้รายนี้?")) {
      return; // หากผู้ใช้ไม่ยืนยัน ให้ยกเลิกการลบ
    }
  
    try {
      // ส่งคำร้อง DELETE ไปยังเซิร์ฟเวอร์เพื่อลบผู้ใช้ที่มี ID ตรงกัน
      const response = await axios.delete(`http://localhost:3001/deleteUser/${id}`);
  
      // ตรวจสอบผลลัพธ์จากเซิร์ฟเวอร์ (ถ้าจำเป็น)
      console.log(response); 
  
      // อัปเดต state `users` โดยเอาผู้ใช้ที่ถูกลบออก (เพื่อให้ UI อัปเดตทันที)
      setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
  
      // แสดงข้อความแจ้งเตือนว่าลบสำเร็จ
      toast.success("ลบผู้ใช้สำเร็จ");
    } catch (error) {
      // ในกรณีที่เกิดข้อผิดพลาด
      console.error("เกิดข้อผิดพลาดในการลบผู้ใช้:", error.response ? error.response.data : error.message); // แสดงรายละเอียดข้อผิดพลาด
  
      // แสดงข้อความแจ้งเตือนว่าลบไม่สำเร็จ
      toast.error("ไม่สามารถลบผู้ใช้ได้ โปรดลองอีกครั้ง");
    }
  };

  return (
    <div className="d-flex vh-100 bg-info justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className='btn btn-success'>Add +</Link>
        <div className="table-responsive">
          <table className="table">
          <thead>
            <tr>
              <th>ชื่อ</th>
              <th>นามสกุล</th>
              <th style={{ whiteSpace: 'nowrap' }}>ชื่อเล่น</th>
              <th>วันเกิด</th>
              <th>อายุ</th>
              <th>เพศ</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <td style={{ whiteSpace: 'nowrap' }}>{user.FirstName}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{user.LastName}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{user.nickname}</td>
                <td>{new Date(user.birthdate).toLocaleDateString('th-TH')}</td> 
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td style={{ whiteSpace: 'nowrap' }}>
                  <Link to={`/update/${user._id}`} className='btn btn-success me-2'>Update</Link>
                  <button className='btn btn-danger' onClick={(e) => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        
      </div>
    </div>
  );
}

export default Users;
