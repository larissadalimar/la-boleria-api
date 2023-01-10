import { connectionDB } from "../database/db.js";

async function createOrder(order){

    return await connectionDB.query(`INSERT INTO orders ("clientId","cakeId", quantity, "totalPrice", "createdAt") VALUES($1, $2, $3, $4, $5);`,
     [order.clientId, order.cakeId, order.quantity, order.totalPrice, new Date()])

}

async function getAll(date){

    return date? 
    await connectionDB.query(`SELECT orders.*, clients.* as client, cakes.* as cake FROM orders JOIN clients ON clients.id = orders."clientId" JOIN cakes ON cakes.id = orders."cakeId" WHERE "createdAt"=$1;`, [date]) :
    await connectionDB.query(`SELECT orders.id as "orderId", orders.quantity, orders."totalPrice", orders."createdAt", to_json(clients.*) as client, to_json(cakes.*) as cake 
    FROM orders JOIN clients ON clients.id = orders."clientId" JOIN cakes ON cakes.id = orders."cakeId";`);
}

async function getOne(id){

    return await connectionDB.query(`SELECT orders.id as "orderId", orders.quantity, orders."totalPrice", orders."createdAt", to_json(clients.*) as client, to_json(cakes.*) as cake 
    FROM orders JOIN clients ON clients.id = orders."clientId" JOIN cakes ON cakes.id = orders."cakeId" WHERE orders.id=$1;`, [id]);
}

async function getOrdersByClient(clientId){

    return await connectionDB.query(`SELECT orders.id as "orderId", orders.quantity, orders."totalPrice", orders."createdAt", cakes.name as "cakeName" FROM orders JOIN cakes ON orders."cakeId"=cakes.id WHERE "clientId"=$1;`, [clientId]);
}

const orderRepository = {
    createOrder,
    getAll,
    getOne,
    getOrdersByClient
}

export default orderRepository;