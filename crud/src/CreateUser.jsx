import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CreateUser() {
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [nickname, setnickname] = useState("");
    const [birthdate, setbirthdate] = useState("");
    const [age, setage] = useState("");
    const [gender, setgender] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const Submit = (e) => {
        e.preventDefault();
        if (!FirstName || !LastName || !nickname || !birthdate || !age || !gender) {
            setErrorMessage("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }
        setErrorMessage(""); // clear error message
        axios.post("http://localhost:3001/createUser", { FirstName, LastName, nickname, birthdate, age, gender })
            .then(result => {
                console.log(result);
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 bg-white rounded p-3">
                        <form onSubmit={Submit}>
                            <h2>Add User</h2>
                            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                            <div className="mb-2">
                                <label htmlFor="FirstName">ชื่อ</label>
                                <input
                                    type="text"
                                    placeholder="กรอกชื่อ"
                                    className="form-control"
                                    value={FirstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="FirstName">นามสกุล</label>
                                <input
                                    type="text"
                                    placeholder="กรอกนามสกุล"
                                    className="form-control"
                                    value={LastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="nickname">ชื่อเล่น</label>
                                <input
                                    type="text"
                                    placeholder="กรอกชื่อเล่น"
                                    className="form-control"
                                    value={nickname}
                                    onChange={(e) => setnickname(e.target.value)}
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="birthdate">วันเดือนปีเกิด (dd-mm-yyyy)</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={birthdate}
                                    onChange={(e) => setbirthdate(e.target.value)}
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="age">อายุ</label>
                                <input
                                    type="number"
                                    placeholder="กรอกอายุ"
                                    className="form-control"
                                    value={age}
                                    onChange={(e) => setage(e.target.value)}
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="gender">เพศ</label>
                                <select
                                    className="form-control"
                                    value={gender}
                                    onChange={(e) => setgender(e.target.value)}
                                >
                                    <option value="">เลือกเพศ</option>
                                    <option value="ชาย">ชาย</option>
                                    <option value="หญิง">หญิง</option>
                                    <option value="อื่นๆ">อื่นๆ</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-success">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateUser;