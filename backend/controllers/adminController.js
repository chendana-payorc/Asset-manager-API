const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AdminModel = require('../models/adminModel');

let adminController={
register : async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const result = await AdminModel.createAdmin(name, email, hashedPassword);
    res.json({ success: true, message: 'Admin registered', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
},

login: async (req, res) => {
    try {
      
      const { email, password } = req.body;
      const user = await AdminModel.findAdminByEmail(email);
     
      if (!user) {
        return res.status(200).json({ error: 'Invalid credentials' });
      }
  
      const isMatch = bcrypt.compareSync(password, user.password);
      
      if (!isMatch) {
        return res.status(200).json({ error: 'Invalid credentials' });
      }
  
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || "secret123",
        { expiresIn: '1d' }
      );
  
      return res.json({ token });
  
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
 
 
}

module.exports=adminController;