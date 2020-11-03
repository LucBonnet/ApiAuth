# Authentication API

A Rest API with TypeScript, Express, JWT authentication and SQLite TypeORM.

## Requirements

For development, you will only need Node.js and a node global package (npm or Yarn) installed in your environment

### Node
  ### Installation
  [Official Node.js website](https://nodejs.org/)
  
  If the installation was successful, you will can to run the following command.

    $ node --version
    v12.19.0

    $ npm --version
    6.14.8

  If you need to update 'npm', you can run the following command.

    $ npm install npm -g

  ### Yarn installation
  Just run the following command.

    $ npm install -g yarn

## Installation

    $ git clone https://github.com/LucBonnet/ApiAuth.git
  
    $ cd ApiAuth
  
    $ yarn install

## Configure app

Create a .env file in root directory and copy this command, changging "Key" to a secrete key for your JWT.

    JWT_SECRET_KEY = "Key";

## Running the project
 
    $ yarn dev

## **Learn more**

TypeScript - https://www.typescriptlang.org/docs/

Express - https://expressjs.com/

JWT - https://jwt.io/introduction/

TypeORM - https://typeorm.io/
