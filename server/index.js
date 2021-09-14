const express = require('express');
const cors = require('express');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const reports = require('./routes/api/reports');
app.use('/api/reports', reports);

const port = process.env.PORT || 3030;

app.listen(port, () => console.log(`Server started on port ${port}`));
