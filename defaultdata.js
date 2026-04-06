const productdata = require("./constant/productsdata");
const Products = require("./models/productsSchema");

const DefaultData = async () => {
    try {
        const count = await Products.countDocuments();
        if (count === 0) {
            const storeData = await Products.insertMany(productdata);
            console.log("Products inserted: " + storeData.length);
        } else {
            console.log("Products already exist, skipping insert");
        }
    } catch (error) {
        console.log("error: " + error.message);
    }
};

module.exports = DefaultData;