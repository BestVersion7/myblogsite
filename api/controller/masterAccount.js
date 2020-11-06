const pool = require("../../database");
const jwt = require("jsonwebtoken");

// master
exports.signUpMaster = async (req, res) => {
    const { master_account_email, master_account_password } = req.body;
    try {
        await pool.query(
            "INSERT INTO masterAccount(master_account_email, master_account_password) VALUES ($1, $2);",
            [master_account_email, master_account_password]
        );
        res.send("success");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("fail");
    }
};

exports.signInMaster = async (req, res) => {
    const { master_account_email, master_account_password } = req.body;
    try {
        const data = await pool.query(
            "SELECT * FROM masterAccount WHERE master_account_email = $1 AND master_account_password = $2 AND master_account_id=1;",
            [master_account_email, master_account_password]
        );
        if (data.rowCount < 1) {
            return res.status(500).send("bad");
        } else {
            const token = jwt.sign(
                {
                    master_account_id: data.rows[0].master_account_id,
                },
                process.env.JWTSECRET,
                {
                    expiresIn: "1h",
                }
            );
            res.cookie("master", token);
            res.json("success");
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("fail");
    }
};

exports.verifyMasterRoute = async (req, res) => {
    try {
        const { master } = req.cookies;
        const results = await jwt.verify(master, process.env.JWTSECRET);
        if (!results) {
            return res.status(500).json("bad request");
        } else {
            res.json("success");
        }
    } catch (err) {
        res.status(500).send("bad ");
        // console.error(err.message);
    }
};
