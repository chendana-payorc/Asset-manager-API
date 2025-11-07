const pool = require('../config/db');

const DepartmentModel = {
  // Create new department
  async createDepartment(department_name, status) {
    const qb = await pool.get_connection();
    try {
      const result = await qb.insert('departments', {
        department_name,
        status
      });
      qb.release();
      return result;
    } catch (err) {
      qb.release();
      throw err;
    }
  },

  // Get all departments
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

  // Get department by ID
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

  // Update department by ID
  async updateDepartment(id, department_name, status) {
    const qb = await pool.get_connection();
    try {
      const result = await qb
        .update('departments', { department_name, status }, { id });
      qb.release();
      return result;
    } catch (err) {
      qb.release();
      throw err;
    }
  },

  // Delete department by ID
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
