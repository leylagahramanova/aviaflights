import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
const { DataTypes } = Sequelize;
const Maintenances = db.define('maintenances', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
    date:{
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: { 
            notEmpty:true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            notEmpty:true,
            len:[3, 100]
        }
    },  
    sim:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty:true
        }
    },
    
    found_problems: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    how_to_fix: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty:true
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty:true
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty:true
        }
    }
}, {
    freezeTableName: true
});
Users.hasMany(Maintenances);
Maintenances.belongsTo(Users, {foreignKey:'userId'});
export default Maintenances;