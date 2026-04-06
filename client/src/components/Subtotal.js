import React from 'react'
import { useEffect, useState } from 'react';

const Subtotal = ({iteam}) => {
    const [price, setPrice] = useState(0);

    useEffect(() => {
        totalAmount();
    }, [iteam]); // ✅ already correct, iteam is the right dependency

    const totalAmount = () => {
        let total = 0
        iteam.map((item) => {
            total += item.price.cost
            return total // ✅ fix: return value from map
        });
        setPrice(total)
    }

    return (
        <div className="sub_item">
            <h3>Subtotal ({iteam.length} items):<strong style={{ fontWeight: "700", color: "#111" }}> ₹{price}.00</strong></h3>
        </div>
    )
}

export default Subtotal