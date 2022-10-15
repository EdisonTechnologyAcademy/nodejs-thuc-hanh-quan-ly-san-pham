import express, { Express, Request, Response } from "express";
import bodyParser from 'body-parser';
import { Products } from "./model/product.model";
const listProducts: Products[] = [];

const PORT = 3000;
const app: Express = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.post('/add/product', (req: Request, res: Response) => {
  try {
    const { name, price, description, amount } = req.body;
    if (!name || !price || !description || !amount) {
      res.status(500).send({
        status: "fail",
        code: 500,
        data: "Add product error",
      });
    } else {
      let id = listProducts.length + 1;
      const product: Products = { id, name, price, description, amount };
      listProducts.push(product);
      res.json(product);
    }
  } catch (err) {
    return res.status(500).send({
      status: "fail",
      code: 500,
      data: "Add product error",
    });
  }
});

app.get('/list/product', (req: Request, res: Response) => {
  res.json(listProducts);
});

app.put('/update/product', (req: Request, res: Response) => {
  try {
    const { id, name, price, description, amount } = req.body;
    const index = listProducts.findIndex(value => value.id == id);
    if (index !== -1) {
      if (name) {
        listProducts[index].name = name;
      };
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
    } else {
      return res.status(500).send({
        status: "fail",
        code: 500,
        data: "Update product error",
      });
    }

  } catch (err) {
    return res.status(500).send({
      status: "fail",
      code: 500,
      data: "Update product error",
    });
  }
});

app.delete('/delete/product/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const index = listProducts.findIndex(value => value.id === id);
    if (index !== -1) {
      listProducts.splice(index, 1);
      res.send({
        status: "success"
      })
    } else {
      res.send({
        status: "fail",
        code: 500
      })
    }
  } catch (err) {
    res.send({
      status: "fail",
      code: 500
    })
  }
});


app.listen(PORT, () => {
  console.log("App running with port: " + PORT);
});