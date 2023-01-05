CREATE TABLE cakes (
 id SERIAL PRIMARY KEY,
 name varchar UNIQUE NOT NULL,
 price numeric NOT NULL,
 image varchar NOT NULL,
 description text 
);

CREATE TABLE clients (
 id SERIAL PRIMARY KEY,
 name varchar UNIQUE NOT NULL,
 address varchar NOT NULL,
 phone varchar NOT NULL
);

CREATE TABLE orders (
 id SERIAL PRIMARY KEY,
 quantity integer NOT NULL,
 "totalPrice" numeric NOT NULL,
 "createdAt" TIMESTAMP DEFAULT now() NOT NULL,
 "clientId" INTEGER REFERENCES clients(id),
 "cakeId" INTEGER REFERENCES cakes(id)
);