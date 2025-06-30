const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Gmail Transporter Configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Your agency Gmail address
      pass: process.env.GMAIL_APP_PASSWORD // Gmail App Password (not regular password)
    }
  });
};

// Model Application Route
app.post('/api/model-application', async (req, res) => {
  try {
    const applicationData = req.body;
    
    // Create email content
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #fff, #f8bbd9); padding: 20px; border-radius: 15px;">
        <h1 style="color: #e91e63; text-align: center; margin-bottom: 30px;">🌟 NEW MODEL APPLICATION - HDMODELS AGENCY 🌟</h1>
        
        <div style="background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #e91e63; border-bottom: 2px solid #e91e63; padding-bottom: 10px;">PERSONAL INFORMATION</h2>
          <p><strong>Name:</strong> ${applicationData.name}</p>
          <p><strong>Email:</strong> ${applicationData.email}</p>
          <p><strong>WhatsApp:</strong> +${applicationData.whatsapp}</p>
          <p><strong>Instagram:</strong> ${applicationData.instagram}</p>
          <p><strong>Age:</strong> ${applicationData.age} years</p>
          <p><strong>Location:</strong> ${applicationData.location}</p>
        </div>
        
        <div style="background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #e91e63; border-bottom: 2px solid #e91e63; padding-bottom: 10px;">PHYSICAL MEASUREMENTS</h2>
          <p><strong>Height:</strong> ${applicationData.height}cm</p>
          <p><strong>Dress Size:</strong> ${applicationData.dressSize}</p>
          <p><strong>Bust:</strong> ${applicationData.bust}" | <strong>Waist:</strong> ${applicationData.waist}" | <strong>Hips:</strong> ${applicationData.hips}"</p>
          <p><strong>Shoe Size:</strong> ${applicationData.shoeSize}</p>
          <p><strong>Hair Color:</strong> ${applicationData.hairColor}</p>
          <p><strong>Eye Color:</strong> ${applicationData.eyeColor}</p>
        </div>
        
        <div style="background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #e91e63; border-bottom: 2px solid #e91e63; padding-bottom: 10px;">SHOOT PREFERENCES</h2>
         
        
        <div style="background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #e91e63; border-bottom: 2px solid #e91e63; padding-bottom: 10px;">EXPERIENCE & PORTFOLIO</h2>
          <p><strong>Experience Level:</strong> ${applicationData.experience}</p>
          <p><strong>Portfolio:</strong> ${applicationData.portfolio}</p>
          <p><strong>Previous Work:</strong> ${applicationData.previousWork}</p>
        </div>
        
        <div style="background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
          <h2 style="color: #e91e63; border-bottom: 2px solid #e91e63; padding-bottom: 10px;">AVAILABILITY & MOTIVATION</h2>
          <p><strong>Availability:</strong> ${applicationData.availability}</p>
          <p><strong>Motivation:</strong> ${applicationData.motivation}</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding: 15px; background: rgba(233, 30, 99, 0.1); border-radius: 10px;">
          <p style="color: #e91e63; margin: 0;"><strong>Application submitted on:</strong> ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;

    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.AGENCY_EMAIL || process.env.GMAIL_USER, // Your agency email
      subject: `🌟 New Model Application: ${applicationData.name}`,
      html: emailHTML,
      text: `New Model Application from ${applicationData.name}\n\nEmail: ${applicationData.email}\nWhatsApp: +${applicationData.whatsapp}\nInstagram: ${applicationData.instagram}\n\nSubmitted on: ${new Date().toLocaleString()}`
    };
    
    await transporter.sendMail(mailOptions);
    
    res.json({ 
      success: true, 
      message: 'Application sent successfully to agency email' 
    });
    
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit application. Please try again.' 
    });
  }
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'Email service is running', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Email service running on port ${PORT}`);
});