const connection = require('../config/database');

exports.getAllItems = (req, res) => {
    const sql = 'SELECT * FROM item i INNER JOIN stock s ON i.item_id = s.item_id';

    try {
        connection.query(sql, (err, rows, fields) => {
            if (err instanceof Error) {
                console.log(err);
                return;
            }

            console.log(rows);
           
            return res.status(200).json({
                rows,
            })
        });
    } catch (error) {
        console.log(error)
    }

}