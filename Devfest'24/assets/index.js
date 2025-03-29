const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

// Initialize Firebase Admin SDK
admin.initializeApp();

// Set up Nodemailer with Gmail SMTP (or another service like SendGrid, Mailgun)
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can also use other SMTP services like Mailgun
    auth: {
        user: 'jayanthansenthilkumar18@gmail.com', // Your Gmail address or SMTP service email
        pass: 'Swetha@0205',   // Your email password or app-specific password for Gmail
    },
});

// Firebase Cloud Function to handle registration
exports.registerUser = functions.https.onRequest(async (req, res) => {
    try {
        // Extract form data from request
        const { name, registerNo, year, department, email, phoneNumber } = req.body;

        // Generate a unique RSVP ID
        const rsvpId = `RSVP-${Math.floor(Math.random() * 1000000)}`;

        // Save user data to Firestore
        const userRef = admin.firestore().collection('registrations').doc();
        await userRef.set({
            name,
            registerNo,
            year,
            department,
            email,
            phoneNumber,
            rsvpId,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });

        // Send confirmation email
        const mailOptions = {
            from: 'jayanthansenthilkumar18@gmail.com',
            to: email, // The email the user provided
            subject: 'DevFest Registration Confirmation',
            text: `Hi ${name},\n\nThank you for registering for DevFest'24!\nYour RSVP ID is ${rsvpId}. We look forward to seeing you at the event.\n\nBest Regards,\nDevFest Team`,
        };

        // Send the email using NodeMailer
        await transporter.sendMail(mailOptions);

        // Return success response to the user
        res.status(200).send(`Registration successful! Your RSVP ID is ${rsvpId}. A confirmation email has been sent to ${email}.`);
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send('Error registering user');
    }
});
