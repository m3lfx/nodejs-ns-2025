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

exports.getSingleItem = (req, res) => {
    //http://localhost:4000/api/v1/items/id
    const sql = 'SELECT * FROM item  WHERE item_id = ?'
    const values = [parseInt(req.params.id)];
    try {
        connection.execute(sql, values, (err, result, fields) => {
            if (err instanceof Error) {
                console.log(err);
                return;
            }

            return res.status(200).json({
                success: true,
                result
            })
        });
    } catch (error) {
        console.log(error)
    }
}

exports.createItem = (req, res) => {

    console.log(req.file ,req.body)
    const item = req.body
    const image = req.file

    const { description, cost_price, sell_price, quantity } = req.body;
    if (req.file) {
        imagePath = req.file.path.replace(/\\/g, "/");
    }

    if (!description || !cost_price || !sell_price) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const sql = 'INSERT INTO item (description, cost_price, sell_price, image) VALUES (?, ?, ?, ?)';
    const values = [description, cost_price, sell_price, imagePath];

    connection.execute(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Error inserting item', details: err });
        }
        console.log(result)
        const itemId = result.insertId

        const stockSql = 'INSERT INTO stock (item_id, quantity) VALUES (?, ?)';
        const stockValues = [itemId, quantity];

        connection.execute(stockSql, stockValues, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Error inserting item', details: err });
            }

            return res.status(201).json({
                success: true,
                itemId: result.insertId,
                image: imagePath,
                quantity
            });
        });
    });
}

