const pool = require('../config/db');

const AdminModel = {
  async createAdmin(name, email, hashedPassword) {
    const qb = await pool.get_connection(); 

    try {
      const result = await qb
        .insert('users', {
          name,
          email,
          password: hashedPassword,
        });

      qb.release(); 
      return result;
    } catch (err) {
      qb.release();
      throw err;
    }
  },

  async findAdminByEmail(email) {
    const qb = await pool.get_connection();

    try {
      const result = await qb
        .select('*')
        .where({email})
        .get('users');

      qb.release();
      return result && result.length > 0 ? result[0] : null;
    } catch (err) {
      qb.release();
      throw err;
    }
  },

// adding getAllAdmins function to get all admins from the database     

  async getAllAdmins() {
    const qb = await pool.get_connection();
    try {
      const result = await qb.select('*').get('users');
      qb.release();
      return result;
    } catch (err) {
      qb.release();
      throw err;
    }
  }

  ,

  // Get single admin by ID
  async getAdminById(id) {
    const qb = await pool.get_connection();
    try {
      const result = await qb.select('*').where({ id }).get('users');
      qb.release();
      return result && result.length > 0 ? result[0] : null;
    } catch (err) {
      qb.release();
      throw err;
    }
  },

  // Update admin details
  async updateAdmin(id, data) {
    const qb = await pool.get_connection();
    try {
      const result = await qb.update('users', data, { id });
      qb.release();
      return result;
    } catch (err) {
      qb.release();
      throw err;
    }
  },

  // Delete admin by ID
  async deleteAdmin(id) {
    const qb = await pool.get_connection();
    try {
      const result = await qb.delete('users', { id });
      qb.release();
      return result;
    } catch (err) {
      qb.release();
      throw err;
    }
  }

};
  


module.exports = AdminModel;
