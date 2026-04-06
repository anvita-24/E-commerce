import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Logincontext } from "../context/Contextprovider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sign_in = () => {

    const { setAccount } = useContext(Logincontext);
    const navigate = useNavigate();

    const [logdata, setData] = useState({
        email: "",
        password: ""
    });

    const adddata = (e) => {
        const { name, value } = e.target;
        setData((pre) => ({
            ...pre,
            [name]: value
        }));
    };

    const senddata = async (e) => {
        e.preventDefault();

        const { email, password } = logdata;

        if (!email || !password) {
            toast.error("All fields are required");
            return;
        }

        try {
            const res = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.status === 400 || !data) {
                toast.error("Invalid Details 👎!", {
                    position: "top-center"
                });
            } else {
                setAccount(data);
                setData({ email: "", password: "" });
                toast.success("Login Successfully 😃!", {
                    position: "top-center"
                });
                navigate("/");
            }
        } catch (error) {
            console.log("Login error:", error.message);
        }
    };

    return (
        <section>
            <div className="sign_container">
                <div className="sign_header">
                    <img src="./blacklogoamazon.png" alt="signupimg" />
                </div>
                <div className="sign_form">
                    <form method="POST" onSubmit={senddata}>
                        <h1>Sign-In</h1>
                        <div className="form_data">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                onChange={adddata}
                                value={logdata.email}
                                id="email"
                            />
                        </div>
                        <div className="form_data">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                onChange={adddata}
                                value={logdata.password}
                                id="password"
                                placeholder="At least 6 characters"
                            />
                        </div>
                        <button type="submit" className="signin_btn">
                            Continue
                        </button>
                    </form>
                    <ToastContainer />
                </div>
                <div className="create_accountinfo">
                    <p>New to Amazon?</p>
                    <NavLink to="/signup">
                        <button>Create your Amazon Account</button>
                    </NavLink>
                </div>
            </div>
        </section>
    );
};

export default Sign_in;