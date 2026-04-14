import React, { useContext, useEffect, useState } from 'react';
import "./navbaar.css";
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { Drawer, IconButton, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink, useNavigate } from 'react-router-dom';
import { Logincontext } from '../context/Contextprovider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Rightheader from './Rightheader';

const Navbaar = () => {
    const navigate = useNavigate();
    const [text, setText] = useState("");
    const [open, setOpen] = useState(null);
    const [liopen, setLiopen] = useState(true);
    const [dropen, setDropen] = useState(false);

    const { products } = useSelector(state => state.getproductsdata);
    const { account, setAccount, setSearchText } = useContext(Logincontext);

    useEffect(() => {
        const getdetailsvaliduser = async () => {
            try {
                const res = await fetch("/validuser", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    credentials: "include"
                });
                if (res.ok) {
                    const data = await res.json();
                    if (res.status === 201) {
                        setAccount(data);
                    }
                }
            } catch (error) {
                console.log("Auth check failed:", error.message);
            }
        };
        getdetailsvaliduser();
    }, [setAccount]);

    const handleClick = (event) => setOpen(event.currentTarget);
    const handleClose = () => setOpen(null);
    const handelopen = () => setDropen(true);
    const handleClosedr = () => setDropen(false);

    const getText = (value) => {
        setText(value);
        setSearchText(value);
        setLiopen(false);
    };

    const logoutuser = async () => {
        try {
            const res = await fetch("/logout", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            if (res.status === 201) {
                setAccount(false);
                setOpen(null);
                toast.success("User Logout", { position: "top-center" });
                navigate("/");
            }
        } catch (error) {
            console.log("Logout failed:", error.message);
        }
    };

    return (
        <header>
            <nav>
                <div className="left">
                    <IconButton className="hamburgur" onClick={handelopen}>
                        <MenuIcon style={{ color: "#fff" }} />
                    </IconButton>

                 <Drawer
                 anchor="left"
                  open={dropen}
                    onClose={handleClosedr}
                  PaperProps={{
                    sx: {
                       width: 260,
                       backgroundColor: "#fff",
                           zIndex: 2000
        }
    }}
>
    <Rightheader userlog={logoutuser} logclose={handleClosedr} />
</Drawer>

                    <div className="navlogo">
                        <NavLink to="/">
                            <img src="./amazon_PNG25.png" alt="logo" />
                        </NavLink>
                    </div>

                    <div className="nav_searchbaar">
                        <input
                            type="text"
                            onChange={(e) => getText(e.target.value)}
                            placeholder="Search Your Products"
                        />
                        {text &&
                            <List className="extrasearch" hidden={liopen}>
                                {products && products.filter(product =>
                                    product.title.longTitle.toLowerCase().includes(text.toLowerCase())
                                ).map(product => (
                                    <ListItem key={product.id}>
                                        <NavLink to={`/getproductsone/${product.id}`} onClick={() => setLiopen(true)}>
                                            {product.title.longTitle}
                                        </NavLink>
                                    </ListItem>
                                ))}
                            </List>
                        }
                    </div>
                </div>

                <div className="right">
                    <div className="nav_btn">
                        <NavLink to="/login">Sign in</NavLink>
                    </div>

                    <NavLink to={account ? "/buynow" : "/login"}>
                        <div className="cart_btn">
                            <Badge badgeContent={account ? account.carts.length : 0} color="secondary">
                                <i className="fas fa-shopping-cart"></i>
                            </Badge>
                            <p>Cart</p>
                        </div>
                    </NavLink>

                    <Avatar
                        className={account ? "avtar2" : "avtar"}
                        onClick={handleClick}
                    >
                        {account ? account.fname[0].toUpperCase() : ""}
                    </Avatar>

                    <Menu
                        anchorEl={open}
                        open={Boolean(open)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <Divider />
                        {account && (
                            <MenuItem onClick={logoutuser}>
                                <LogoutIcon style={{ fontSize: 16, marginRight: 5 }} />
                                Logout
                            </MenuItem>
                        )}
                    </Menu>
                    <ToastContainer />
                </div>
            </nav>
        </header>
    );
};

export default Navbaar;