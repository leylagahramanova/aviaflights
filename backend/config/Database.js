import { Sequelize } from "sequelize";
const db = new Sequelize('db-auth-db', 'root', '', {
    host: "127.0.0.1",
    dialect: "mysql",
    user: 'root',
    password: 'mypass',
    port:'3307'
    
});
export default db;  
