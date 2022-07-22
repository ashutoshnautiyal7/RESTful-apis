const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://MONGO_URL", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(()=> console.log("connected to db"))
    .catch(console.error);





//------------------------------------------------ Cutomers //  ----------------------------------------------------------
const Customer = require('./models/Customer');

app.get('/customers', async (req, res) => {
	const customers = await Customer.find();

	res.json(customers);
});

app.post('/customer/new', (req, res) => {
	const customer = new Customer({
		text: req.body.text
	})

	customer.save();

	res.json(customer);
});

app.delete('/customer/delete/:id', async (req, res) => {
	const customer = await Customer.findById(req.params.id);

	if(!customer){
        res.status(400)
        throw new Error('id not found')
    }

	await customer.remove()

	res.json({id: req.params.id})
});



app.put('/customer/update/:id', async (req, res) => {
	const customer = await Customer.findById(req.params.id);

	customer.text = req.body.text;

	customer.save();

	res.json(customer);
});

// =======================================  PRODUCT  ==============================================

const Product = require('./models/Product');

app.get('/products', async (req, res) => {
	const products = await Product.find();

	res.json(products);
});

app.post('/product/new', (req, res) => {
	const product = new Product({
		text: req.body.text
	})

	product.save();

	res.json(product);
});

app.delete('/product/delete/:id', async (req, res) => {
	const result = await Product.findById(req.params.id)

	if(!result){
		res.status(400)
		throw new Error('id not found')
	}

	await result.remove()

	res.json({id: req.params.id})


});

app.put('/product/update/:id', async (req, res) => {
	const product = await Product.findById(req.params.id);

	product.text = req.body.text;

	product.save();

	res.json(product);
});


// ==========================================Orders===============================================================

const Order = require('./models/Order');

app.get('/orders', async (req, res) => {
	const orders = await Order.find();

	res.json(orders);
});

app.post('/order/new', (req, res) => {
	const order = new Order({
		text: req.body.text
	})

	order.save();

	res.json(order);
});

app.delete('/order/delete/:id', async (req, res) => {
	const result = await Order.findById(req.params.id)

	if(!result){
		res.status(400)
		throw new Error('id not found')
	}

	await result.remove()

	res.json({id: req.params.id})


});


app.put('/order/update/:id', async (req, res) => {
	const order = await Order.findById(req.params.id);

	order.text = req.body.text;

	order.save();

	res.json(order);
});



app.listen(3001);