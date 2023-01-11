import { connectionDB } from "../database/db.js";

async function createOrder(order){

    return await connectionDB.query(`INSERT INTO orders ("clientId","cakeId", quantity, "totalPrice", "createdAt") VALUES($1, $2, $3, $4, $5);`,
     [order.clientId, order.cakeId, order.quantity, order.totalPrice.toFixed(2), new Date()])

}

async function getAll(date){

    return date? 

    await connectionDB.query(`SELECT to_json(clients.*) as client,  
    json_build_object('id', cakes.id, 'name', cakes.name, 'price', round(cakes.price,2)::varchar(255), 'description', cakes.description, 'image', cakes.image) as cake,
     orders.id as "orderId", to_char(orders."createdAt", 'YYYY-MM-DD HH24:MI') as "createdAt", orders.quantity, round(orders."totalPrice",2) as "totalPrice"
    FROM orders JOIN clients ON clients.id = orders."clientId" JOIN cakes ON cakes.id = orders."cakeId" WHERE "createdAt"::date = $1;`, [date]) :

    await connectionDB.query(`SELECT to_json(clients.*) as client,  
    json_build_object('id', cakes.id, 'name', cakes.name, 'price', round(cakes.price,2)::varchar(255), 'description', cakes.description, 'image', cakes.image) as cake,
     orders.id as "orderId", to_char(orders."createdAt", 'YYYY-MM-DD HH24:MI') as "createdAt", orders.quantity, round(orders."totalPrice",2) as "totalPrice"
    FROM orders JOIN clients ON clients.id = orders."clientId" JOIN cakes ON cakes.id = orders."cakeId";`);
}

async function getOne(id){

    return await connectionDB.query(`SELECT to_json(clients.*) as client,  
    json_build_object('id', cakes.id, 'name', cakes.name, 'price', round(cakes.price,2)::varchar(255), 'description', cakes.description, 'image', cakes.image) as cake,
     orders.id as "orderId", to_char(orders."createdAt", 'YYYY-MM-DD HH24:MI') as "createdAt", orders.quantity, round(orders."totalPrice",2) as "totalPrice"
    FROM orders JOIN clients ON clients.id = orders."clientId" JOIN cakes ON cakes.id = orders."cakeId" WHERE orders.id=$1;`, [id]);
}

async function getOrdersByClient(clientId){

    return await connectionDB.query(`SELECT orders.id as "orderId", orders.quantity,  to_char(orders."createdAt", 'YYYY-MM-DD HH24:MI') as "createdAt",  round(orders."totalPrice",2) as "totalPrice", cakes.name as "cakeName" FROM orders JOIN cakes ON orders."cakeId"=cakes.id WHERE "clientId"=$1;`, [clientId]);
}

const orderRepository = {
    createOrder,
    getAll,
    getOne,
    getOrdersByClient
}

export default orderRepository;