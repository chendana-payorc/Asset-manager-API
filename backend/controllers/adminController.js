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
 
  getAllAdmins: async (req, res) => {
    try {
      const admins = await AdminModel.getAllAdmins();
      res.json({ success: true, data: admins });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
 
}


// ADMIN CRUD OPERATIONS

// Get all admins
adminController.getAllAdmins = async (req, res) => {
  try {
    const data = await AdminModel.getAllAdmins();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get admin by ID
adminController.getAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await AdminModel.getAdminById(id);
    if (!data) return res.status(404).json({ success: false, message: 'Admin not found' });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update admin
adminController.updateAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email } = req.body;
    const data = { name, email };
    await AdminModel.updateAdmin(id, data);
    res.json({ success: true, message: 'Admin updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete admin
adminController.deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    await AdminModel.deleteAdmin(id);
    res.json({ success: true, message: 'Admin deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


module.exports=adminController;