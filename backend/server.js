const express = require('express');
const app = express();
const nhlRoutes = require('./routes/nhlRoutes.js');

// Use the NHL routes
app.use('/nhl', nhlRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
