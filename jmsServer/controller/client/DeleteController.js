const conn = require("../../db/Conn");
const deleteCategory = async (req, res, next) => {
    const catid = req.params.id;
    try {
        // Check if the category exists
        const category = await conn.query('SELECT * FROM category_jms WHERE _id = $1', [catid]);

        if (category.rows.length === 0) {
            return res.send({ status: "400", data: "Category not found!" });
        }

        // Delete the category
        await conn.query('DELETE FROM category_jms WHERE _id = $1', [catid]);

        return res.send({ status: "201", data: "Category Deleted Successfully!" });
    } catch (err) {
        console.error(err);
        return res.send({ status: "500", data: "Error Occurred" });
    }
};


module.exports = { deleteCategory }