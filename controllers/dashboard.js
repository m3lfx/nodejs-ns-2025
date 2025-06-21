const connection = require('../config/database');

exports.addressChart = (req, res) => {
    const sql = 'SELECT count(addressline) as total, addressline FROM customer GROUP BY addressline ORDER BY total DESC';
    try {
        connection.query(sql, (err, rows, fields) => {
            if (err instanceof Error) {
                console.log(err);
                return;
            }
            return res.status(200).json({
                rows,
            })
        });
    } catch (error) {
        console.log(error)
    }


};

exports.salesChart = (req, res) => {
    const sql = 'SELECT monthname(oi.date_placed) as month, sum(ol.quantity * i.sell_price) as total FROM orderinfo oi INNER JOIN orderline ol ON oi.orderinfo_id = ol.orderinfo_id INNER JOIN item i ON i.item_id = ol.item_id GROUP BY month(oi.date_placed)';
    try {
        connection.query(sql, (err, rows, fields) => {
            if (err instanceof Error) {
                console.log(err);
                return;
            }
            return res.status(200).json({
                rows,
            })
        });
    } catch (error) {
        console.log(error)
    }


};

exports.itemsChart = (req, res) => {
    const sql = 'SELECT i.description as items, sum(ol.quantity) as total FROM item i INNER JOIN orderline ol ON i.item_id = ol.item_id GROUP BY i.description';
    try {
        connection.query(sql, (err, rows, fields) => {
            if (err instanceof Error) {
                console.log(err);
                return;
            }
            return res.status(200).json({
                rows,
            })
        });
    } catch (error) {
        console.log(error)
    }


};