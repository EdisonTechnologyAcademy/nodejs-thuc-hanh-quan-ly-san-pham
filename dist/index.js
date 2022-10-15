"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const listProducts = [];
const PORT = 3000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.post('/add/product', (req, res) => {
    try {
        const { name, price, description, amount } = req.body;
        if (!name || !price || !description || !amount) {
            res.status(500).send({
                status: "fail",
                code: 500,
                data: "Add product error",
            });
        }
        else {
            let id = listProducts.length + 1;
            const product = { id, name, price, description, amount };
            listProducts.push(product);
            res.json(product);
        }
    }
    catch (err) {
        return res.status(500).send({
            status: "fail",
            code: 500,
            data: "Add product error",
        });
    }
});
app.get('/list/product', (req, res) => {
    res.json(listProducts);
});
app.put('/update/product', (req, res) => {
    try {
        const { id, name, price, description, amount } = req.body;
        const index = listProducts.findIndex(value => value.id == id);
        if (index !== -1) {
            if (name) {
                listProducts[index].name = name;
            }
            ;
            if (price) {
                listProducts[index].price = price;
            }
            if (description) {
                listProducts[index].description = description;
            }
            if (amount) {
                listProducts[index].amount = amount;
            }
            res.json({ product: listProducts[index] });
        }
        else {
            return res.status(500).send({
                status: "fail",
                code: 500,
                data: "Update product error",
            });
        }
    }
    catch (err) {
        return res.status(500).send({
            status: "fail",
            code: 500,
            data: "Update product error",
        });
    }
});
app.delete('/delete/product/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = listProducts.findIndex(value => value.id === id);
        if (index !== -1) {
            listProducts.splice(index, 1);
            res.send({
                status: "success"
            });
        }
        else {
            res.send({
                status: "fail",
                code: 500
            });
        }
    }
    catch (err) {
        res.send({
            status: "fail",
            code: 500
        });
    }
});
app.listen(PORT, () => {
    console.log("App running with port: " + PORT);
});
//# sourceMappingURL=index.js.map