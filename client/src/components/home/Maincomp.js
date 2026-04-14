import React, { useEffect, useState } from 'react'
import Banner from './Banner'
import "../home/home.css";
import Slide from './Slide';
import { Divider } from '@mui/material';
import { getProducts } from '../redux/actions/action';
import { useSelector, useDispatch } from "react-redux";


const Maincomp = () => {

    const { products } = useSelector(state => state.getproductsdata);
    const dispatch = useDispatch();
    const [sort, setSort] = useState("");

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])

    // sorting logic
    const sortedProducts = [...(products || [])].sort((a, b) => {
        if (sort === "lowToHigh") return a.price.cost - b.price.cost;
        if (sort === "highToLow") return b.price.cost - a.price.cost;
        return 0;
    });

    return (
        <>
            <div className="home_section">

                {/* ✅ Sort Dropdown */}
                <div style={{ padding: "10px 20px", background: "#f3f3f3", display: "flex", alignItems: "center", gap: "10px" }}>
                    <label style={{ fontWeight: "bold", fontSize: "14px" }}>Sort By Price:</label>
                    <select
                        onChange={(e) => setSort(e.target.value)}
                        style={{
                            padding: "5px 10px",
                            borderRadius: "4px",
                            border: "1px solid #a6a6a6",
                            cursor: "pointer",
                            fontSize: "14px"
                        }}
                    >
                        <option value="">Default</option>
                        <option value="lowToHigh">Price: Low to High</option>
                        <option value="highToLow">Price: High to Low</option>
                    </select>
                </div>

                <div className="banner_part">
                    <Banner />
                </div>
                <div className="slide_part">
                    <div className="left_slide">
                        <Slide title="Deal Of The Day" products={sortedProducts} />
                    </div>
                    <div className="right_slide">
                        <h4>Festive latest launches</h4>
                        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Jupiter/Launches/T3/DesktopGateway_CategoryCard2x_758X608_T3._SY608_CB639883570_.jpg" alt="rightimg" />
                        <a href="#">see more</a>
                    </div>
                </div>

                <Slide title="Deal of the Day" products={sortedProducts} />

                <div className="center_img">
                    <img src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg" alt="" />
                </div>

                <Slide title="Best Seller" products={sortedProducts} />
                <Slide title="Upto 80% off" products={sortedProducts} />
            </div>

            <Divider />
        </>
    )
}

export default Maincomp;