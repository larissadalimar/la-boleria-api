import orderRepository from "../repositories/order.repository.js";

export async function create(req, res){

    const order = req.body;

    try {
        
        await orderRepository.createOrder(order);

        res.sendStatus(201);

    } catch (error) {
        
        res.status(500).send(error.message);
    }
}

export async function getAll(req, res){

    const date = req.query.date;

    try {

        const orders = await orderRepository.getAll(date);

        if(orders.rowCount < 1) return res.status(404).send([]);
        else return res.status(200).send(orders.rows);
        
    } catch (error) {

        res.status(500).send(error.message);
    }
}

export async function getOne(req, res){

    const id = req.params.id;

    try {
        
        const order = await orderRepository.getOne(id);

        if(order.rowCount < 1) return res.sendStatus(404);
        else return res.status(200).send(order.rows);

    } catch (error) {
        
        res.status(500).send(error.message);
    }
}

export async function getOrdersByClient(req, res){

    const clientId = req.params.id;

    try {

        const orders = await orderRepository.getOrdersByClient(clientId);

        return res.status(200).send(orders.rows)
        
    } catch (error) {
        
        res.status(500).send(error.message);
    }
}