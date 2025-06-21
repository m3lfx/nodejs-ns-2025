const connection = require('../config/database');

exports.createOrder = (req, res, next) => {
    console.log(req.body)
    const { userId, cart, } = req.body;
    const dateOrdered = new Date();
    const dateShipped = new Date();

    connection.beginTransaction(err => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Transaction error', details: err });
        }

        // Get customer_id from userId
        const sql = 'SELECT customer_id FROM customer WHERE user_id = ?';
        connection.execute(sql, [parseInt(userId)], (err, results) => {
            if (err || results.length === 0) {
                return connection.rollback(() => {
                    if (!res.headersSent) {
                        res.status(500).json({ error: 'Customer not found', details: err });
                    }
                });
            }

            const customer_id = results[0].customer_id;

            // Insert into orderinfo
            const orderInfoSql = 'INSERT INTO orderinfo (customer_id, date_placed, date_shipped) VALUES (?, ?, ?)';
            connection.execute(orderInfoSql, [customer_id, dateOrdered, dateShipped], (err, result) => {
                if (err) {
                    return connection.rollback(() => {
                        if (!res.headersSent) {
                            res.status(500).json({ error: 'Error inserting orderinfo', details: err });
                        }
                    });
                }

                const order_id = result.insertId;

                // Insert each cart item into orderline
                const orderLineSql = 'INSERT INTO orderline (orderinfo_id, item_id, quantity) VALUES (?, ?, ?)';
                let errorOccurred = false;
                let completed = 0;

                if (cart.length === 0) {
                    return connection.rollback(() => {
                        if (!res.headersSent) {
                            res.status(400).json({ error: 'Cart is empty' });
                        }
                    });
                }

                cart.forEach((item, idx) => {
                    connection.execute(orderLineSql, [order_id, item.item_id, item.quantity], (err) => {
                        if (err && !errorOccurred) {
                            errorOccurred = true;
                            return connection.rollback(() => {
                                if (!res.headersSent) {
                                    res.status(500).json({ error: 'Error inserting orderline', details: err });
                                }
                            });
                        }

                        
                        completed++;
                        
                        if (completed === cart.length && !errorOccurred) {
                            connection.commit(err => {
                                if (err) {
                                    return connection.rollback(() => {
                                        if (!res.headersSent) {
                                            res.status(500).json({ error: 'Commit error', details: err });
                                        }
                                    });
                                }
                                if (!res.headersSent) {
                                    res.status(201).json({
                                        success: true,
                                        order_id,
                                        dateOrdered,
                                        message: 'transaction complete',

                                        cart
                                    });
                                }
                            });
                        }
                    });
                });
            });
        });
    });
}

