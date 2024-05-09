import express from 'express';
import bodyParser from 'body-parser';

import productRoutes from '@app/infrastructure/http/routes/productRoutes';

import { WELCOME_SIGNATURE } from '@app/constants/messages';

const app = express();
const PORT = process.env.PORT || 3000;

// Applying body-parser middleware to handle URL-encoded request bodies
app.use(bodyParser.urlencoded({ extended: true })); 

// Setting view engine to EJS and views directory to './src/views'
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Serving static files from the 'public' directory
app.use('/public', express.static('public')); 

// Registering routers
app.use('/', productRoutes);

// Starting the server and displaying welcome message with the port number
app.listen(PORT, () => WELCOME_SIGNATURE(PORT));
