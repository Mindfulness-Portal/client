import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../redux/apiCalls";
import SweetAlert from "react-bootstrap-sweetalert";
// import { useNavigate } from "react-router";
import styled from "styled-components";
import { mobile } from "../responsive";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://res.cloudinary.com/midefulness/image/upload/v1657441688/samples/bike.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 50%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  color: black;
`;

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  const isfail = useSelector((state) => state.user.error);
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState([]);
  // const navigate  = useNavigate();
  const [allShow, setAllShow] = useState(false);
  const [allErrorShow, setAllErrorShow] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  // const navigation = useNavigate();

  const checkLogin = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        let response = await fetch(
          `https://mindfulness-portal.herokuapp.com/api/v1/user/${user._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              // token: token,
            },
            body: JSON.stringify({
              password: password,
              confirm_password: confirmPassword,
            }),
          }
        );
        let json = await response.json();
        setData(json);
        setAllShow(true);
        dispatch(logout());
        // window.location.href = "http://localhost:3000/login";
        navigation("/login");
      } catch (error) {
        setAllErrorShow(true);
      }
    } else {

    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Forget Password</Title>
        <Form onSubmit={checkLogin}>
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button>Change Password</Button>
        </Form>
      </Wrapper>
      <SweetAlert
        show={allShow}
        success
        title="Password Changed!"
        // text="SweetAlert in React"
        onConfirm={() => setAllShow(false)}
      ></SweetAlert>
      <SweetAlert
        show={allErrorShow}
        danger
        title="Password Changed Unsuccessfully!"
        // text="SweetAlert in React"
        onConfirm={() => setAllErrorShow(false)}
      ></SweetAlert>
      <SweetAlert
        show={allErrorShow}
        warning
        title="Enter Same Confirm Password!"
        // text="SweetAlert in React"
        onConfirm={() => setAllErrorShow(false)}
      ></SweetAlert>
    </Container>
  );
};

export default UpdatePassword;
