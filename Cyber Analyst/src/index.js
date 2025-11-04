const express = require('express');
const cors = require('cors');
const config = require('./config');
const { sync } = require('./models');
const authRoutes = require('./routes/auth');
const itemsRoutes = require('./routes/items');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/auth', authRoutes);
app.use('/items', itemsRoutes);


app.get('/', (req, res) => res.json({ ok: true, name: 'nopal-sight-backend' }));


const port = config.port;


(async () => {
await sync(); // creates tables if they don't exist
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
})();