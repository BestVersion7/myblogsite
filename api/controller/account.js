const pool = require("../../database");
const jwt = require("jsonwebtoken");

// account
exports.signUp = async (req, res) => {
    const { first_name, last_name, account_email, account_password } = req.body;
    try {
        const newAccount = await pool.query(
            "INSERT INTO account (first_name, last_name, account_email, account_password) VALUES ($1, $2, $3, $4) RETURNING *",
            [first_name, last_name, account_email, account_password]
        );
        res.json(newAccount.rows[0]);
    } catch (err) {
        res.status(500).json("account id already exists");
        console.log(err.message);
    }
};

exports.fetchAccountByDecodeJWT = async (req, res) => {
    try {
        const { jan } = req.cookies;
        const data = jwt.verify(jan, process.env.JWTSECRET);
        const { account_id } = data;
        console.log(account_id)
        res.json(account_id);
    } catch (err) {
        res.status(404).json("not found");
        console.error(err.message);
    }
};

exports.signIn = async (req, res) => {
    try {
        const { account_email, account_password } = req.body;
        const findId = await pool.query(
            "SELECT account_id from account WHERE account_email = $1 AND account_password= $2",
            [account_email, account_password]
        );
        if (findId.rowCount < 1) {
            res.status(400).send("bad response");
        } else {
            const token = jwt.sign(
                {
                    account_id: findId.rows[0].account_id,
                },
                process.env.JWTSECRET,
                {
                    expiresIn: "1h",
                }
            );
            res.cookie("jan", token, { maxAge: 1000 * 60 * 60 });
            res.json(findId.rows[0]);
        }
        // res.json(findId.rows[0])
    } catch (err) {
        console.error(err.message);
    }
};

exports.signOut = (req, res) => {
    res.clearCookie("jan");
    res.json("cleared cookie");
};
