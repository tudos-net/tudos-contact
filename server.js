const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/contact', async (req, res) => {
    const { email, number,telegram, wallet, amount} = req.body;

    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.KEY
        }
    });

    // Setup email data
    let mailOptions = {
        from: process.env.EMAIL,    // sender address
        to: "contact.infinityblockchain@gmail.com",       // list of receivers
        subject: 'New Contact Form Submission',
        text: `Email: ${email}\nPhone Number: ${number}\nTelegram: ${telegram}\nWallet Address: ${wallet}\nAmount Invested In USDT: $ ${amount}`
    };

    // Send mail
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
