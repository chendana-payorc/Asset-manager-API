const pool = require('../config/db');

const DepartmentModel = {
 
  async createDepartment(name) {
    const qb = await pool.get_connection();
    try {
      const result = await qb.insert('departments', {
        name,
       
      });
      qb.release();
      return result;
    } catch (err) {
      qb.release();
      throw err;
    }
  },

  async getAllDepartments() {
    const qb = await pool.get_connection();
    try {
      const result = await qb.select('*').get('departments');
      qb.release();
      return result;
    } catch (err) {
      qb.release();
      throw err;
    }
  },

  async getDepartmentById(id) {
    const qb = await pool.get_connection();
    try {
      const result = await qb.select('*').where({ id }).get('departments');
      qb.release();
      return result && result.length > 0 ? result[0] : null;
    } catch (err) {
      qb.release();
      throw err;
    }
  },

  async updateDepartment(id, name, status) {
    const qb = await pool.get_connection();
    try {
      const result = await qb
        .update('departments', { name, status }, { id });
      qb.release();
      return result;
    } catch (err) {
      qb.release();
      throw err;
    }
  },

  async deleteDepartment(id) {
    const qb = await pool.get_connection();
    try {
      const result = await qb.delete('departments', { id });
      qb.release();
      return result;
    } catch (err) {
      qb.release();
      throw err;
    }
  }
};

module.exports = DepartmentModel;
