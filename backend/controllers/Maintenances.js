import Maintenance from "../models/MaintenanceModel.js";
import User from "../models/UserModel.js";
import { response } from "express";
import { Op } from "sequelize";
export const getMaintenances = async (req, res) => {
    try { let response;
        if (req.post === "admin") {
            response = await Maintenance.findAll({
                attributes: ['uuid', 'date', 'name', 'sim',  'found_problems', 'how_to_fix', 'status'],
                include: [{model: User, attributes: ['name', 'email'] }]});
        }
        else {
            response = await Maintenance.findAll({
                attributes: ['uuid', 'date', 'name', 'sim',  'found_problems', 'how_to_fix', 'status'],
                where: { userId: req.userId },
                include: [{ model: User, attributes: ['name', 'email'] }]
            });
        }
        res.status(200).json(response);
    } catch (error) {res.status(500).json({ msg: error.message }); }
}
export const getMaintenanceById = async (req, res) => {
    try { const maintenance = await Maintenance.findOne({ where: {uuid: req.params.id }});
        if (!maintenance) return res.status(404).json({ msg: "Data not found" });
        let response;
        if (req.post === "admin") {
            response = await Maintenance.findAll({
                attributes: ['uuid', 'date', 'name', 'sim', 'found_problems', 'how_to_fix', 'status'],
                where: { id: maintenance.id},
                include: [{
                    model: User, attributes: ['name', 'email']
                }]
            }); }
        else { response = await Maintenance.findOne({
                attributes: ['uuid', 'date', 'name', 'sim', 'found_problems', 'how_to_fix', 'status'],
                where: { [Op.and]: [{ id: maintenance.id }, { userId: req.userId }]},
                include: [{  model: User, attributes: ['name', 'email'] }] }); 
            }
        res.status(200).json(response);
    } catch (error) { res.status(500).json({ msg: error.message }); } 
}

export const createMaintenance = async (req, res) => {
    const { date, name, sim, found_problems, how_to_fix, status } = req.body;
    try {await Maintenance.create({ date: date,name: name,sim: sim,
            found_problems: found_problems, how_to_fix: how_to_fix,
            status: status, userId: req.userId
        });
        res.status(201).json({ msg: "Maintenance created succesfuly" })}
    catch (error) { res.status(500).json({ msg: error.message });}
}
export const updateMaintenance = async (req, res) => {
    try {const maintenance = await Maintenance.findOne({ where: {uuid: req.params.id}});
        if (!maintenance) return res.status(404).json({ msg: "Data not found" });
        const { date, name, sim, found_problems, how_to_fix, status} = req.body;
        if (req.post === "admin") {
            await Maintenance.update({ date, name, sim, found_problems, how_to_fix, status}, {
                where: {id: maintenance.id},});
        } else { if (req.userId !== maintenance.userId) return res.status(403).json
            ({ msg: "Forbidden access" })
            await Maintenance.update({ date, name, sim,  found_problems, how_to_fix, status}, {
                where: { [Op.and]: [{ id: maintenance.id }, { userId: req.userId }] }
            });
        } res.status(200).json({ msg: "Maintenance updated successfuly" });
    } catch (error) { res.status(500).json({ msg: error.message });}
}
export const deleteMaintenance = async (req, res) => {
    try {const maintenance = await Maintenance.findOne({
        where: {uuid: req.params.id }});
      if (!maintenance) return res.status(404).json({ msg: "Data not found" });
      if (req.post === "admin") {
        await Maintenance.destroy({where: { id: maintenance.id}, });
      } else {if (req.userId !== maintenance.userId) return res.status(403)
        ({ msg: "Forbidden access" })
        await Maintenance.destroy({  
            where: {[Op.and]: [{ id: maintenance.id }, { userId: req.userId }]}
        }); }
      res.status(200).json({ msg: "Maintenance deleted successfully" });
    } catch (error) { res.status(500).json({ msg: error.message }); }
  }