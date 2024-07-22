import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name_, set_name] = useState("");
  const [nickname, setNickname] = useState("");
  const [university, setUniversity] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "password2":
        setPassword2(value);
        break;
      case "name_":
        set_name(value);
        break;
      case "nickname":
        setNickname(value);
        break;
      case "university":
        setUniversity(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post('http://10.92.15.63:8000/api/v1/user/signup/', {
        username,
        email,
        password,
        password2,
        name_,
        nickname,
        university
      });

      if (response.status === 201) {
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Error response:', error.response.data);
        setError(`회원가입 실패: ${JSON.stringify(error.response.data)}`);
      } else {
        console.error('Error during signup:', error);
        setError("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="signup-page">
      <header className="Signup-header">
        <button className="back-button" onClick={handleGoBack}>
          ←
        </button>
      </header>
      <div className="img-container">
        <img src="/new_logo.png" alt="이미지 설명" />
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            name="username"
            placeholder="아이디"
            value={username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          <input
            type="email"
            name="email"
            placeholder="이메일"
            value={email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={password}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          <input
            type="password"
            name="password2"
            placeholder="비밀번호 재확인"
            value={password2}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          <input
            type="text"
            name="name_"
            placeholder="이름"
            value={name_}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          <input
            type="text"
            name="nickname"
            placeholder="닉네임"
            value={nickname}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          <input
            type="text"
            name="university"
            placeholder="대학교"
            value={university}
            onChange={handleChange}
          />
        </label>
        <br />
        {error && <p className="error">{error}</p>}
        <div className="container">
          <button type="submit" className="signbutton">
            회원가입 완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
