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


};

module.exports = AdminModel;
