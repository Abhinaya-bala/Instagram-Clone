const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Pusher = require('pusher')

const dbModel = require('./dbModel.js')

// app config
const app = express();
const port = process.env.PORT || 8080;

const pusher = new Pusher({
    appId: "1101625",
    key: "ba6e5693cce4cacb9234",
    secret: "b6fb277a90f84101ed8a",
    cluster: "ap2",
    useTLS: true
});

//middleware
app.use(express.json());
app.use(cors());

//DB config
const connection_url = 'mongodb+srv://Instagram:instagram@cluster0.jfx4s.mongodb.net/<instaDB>?retryWrites=true&w=majority'
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.once('open', () => {
    console.log('DB Connected')
    const changeStream = mongoose.connection.collection('posts').watch()

    changeStream.on('change', (change) => {
        console.log('Change Triggered.Change...')
        console.log(change)
        console.log('End of Change')

        if (change.operationType === 'inser') {
            console.log('Triggering Pusher ***IMG UPLOAD***')
            const postDetails = change.fullDocument;
            pusher.trigger('posts', 'inserted', {
                user: postDetails.user,
                caption: postDetails.caption,
                image: postDetails.image
            })
        }

        else {
            console.log('Unknowtrigger from Pusher')
        }

    })

});
//api routes
app.get('/', (req, res) => res.status(200).send('hello world'));

app.post('/upload', (req, res) => {
    const body = req.body;
    dbModel.create(body, (err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(201).send(data);
        }
    })
});

app.get('/sync', (req, res) => {
    dbModel.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.status(200).send(data);
        }
    })
})

//listen
app.listen(port, () => console.log(`listening on localhost:${port}`));
