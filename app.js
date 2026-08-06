// Set DNS servers
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
require('dotenv').config();

const username = encodeURIComponent(process.env.MONGO_USER);
const password = encodeURIComponent(process.env.MONGO_PASS);
const clusterUrl = process.env.MONGO_CLUSTER_URL;
const dbName = process.env.MONGO_DB_NAME;

//express app
const app = express();

// Connect to MongoDB 
const dbURL = `mongodb+srv://${username}:${password}@${clusterUrl}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(dbURL)
.then((result) => app.listen(10000, () => console.log('Server is listening on port 10000'))) //start the server only after successful connection to the database
.catch((err) => console.log(err.message));


//register view engine
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); //middleware to parse incoming request bodies with urlencoded payloads
app.use(morgan('dev'));

//mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({ 
//         title: 'New Blog 2',
//         snippet: 'About my new blog',
//         body: 'More about my new blog'
//     });

//     blog.save()
//     .then((result) => {
//         res.send(result);
//     })
//     .catch((err) => {
//         console.log(err.message);
//     });
// });


// app.get('/single-blog', (req, res) => {
//     Blog.findById('64b1c8e5f1a4c9d2b0e7c8a')
//     .then((result) => { 
//         res.send(result);
//     })
//     .catch((err) => {
//         console.log(err.message);
//     });
// });

app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    // res.send('<p>About page</p>');
    res.render('about', {title: 'About page'});    
});

//blog routes
app.use('/blogs', blogRoutes);

//404 page
app.use((req, res) => {
    res.status(404).render('404', {title: 'Page Not Found'});
});
