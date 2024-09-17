import {app} from './app.js';
import {mongodb}  from './data/database.js';

// Connect to MongoDB database using Mongoose
mongodb();
console.log(process.env.MONGO_URL);

// Start the Express server
app.listen(3000, () => {
    console.log(`Server is running on  port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});