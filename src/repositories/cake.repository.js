import { connectionDB } from "../database/db.js";

async function createCake(cake){

    return await connectionDB.query("INSERT INTO cakes (name, price, description, image) VALUES ($1, $2, $3, $4);", [cake.name, cake.price, cake.description, cake.image]);

}

async function verifyCakeByName(name){

    try {

       const cake = await connectionDB.query("SELECT * FROM cakes WHERE name=$1;", [name]);

       if(cake.rowCount > 0) return true;
       else return false;

    } catch (error) {
        console.log(error);
    }
}

async function verifyCake(cakeId){

    try {

        const cakeExists = await connectionDB.query("SELECT * FROM cakes WHERE id=$1;", [cakeId]);

        return (cakeExists.rowCount > 0)

    } catch (error) {

        console.log(error);
    }
}

const cakeRepository = {
    createCake,
    verifyCake,
    verifyCakeByName
};

export default cakeRepository;