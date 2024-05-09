import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';
import { EMAIL_SUBJECTS } from '@app/constants/messages';
import { Order } from '@prisma/client';

interface TransportOptions {
    host: string;
    port: number;
    auth: {
        user: string;
        pass: string;
    };
}

class EmailService {
    private transporter: Transporter;

    constructor() {
        // Create a Nodemailer transporter with Ethereal email service configuration
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST as string,
            port: parseInt(process.env.SMTP_PORT as string),
            auth: {
                user: process.env.SMTP_USER as string,
                pass: process.env.SMTP_PASS as string,
            }
        } as TransportOptions);
    }

    // Method to send order notification email
    sendOrderNotification(orderDetails: Order): Promise<boolean> {
        return new Promise((resolve, reject) => {
            // Configure email options
            const mailOptions: SendMailOptions = {
                from: process.env.ADMIN_EMAIL as string,
                to: process.env.ADMIN_EMAIL as string,
                subject: EMAIL_SUBJECTS.NEW_ORDER_NOTIF,
                text: `${orderDetails.clientName}`
            };

            // Send email using the transporter
            this.transporter.sendMail(mailOptions, (error: Error | null) => {
                if (error) {
                    reject(error); // If there's an error, reject the promise
                } else {
                    resolve(true); // If email sent successfully, resolve the promise
                }
            });
        });
    }
}

export default EmailService;