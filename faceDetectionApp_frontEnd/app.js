const express = require('express');
const app = express();


app.use(express.static(path.join(__dirname, 'Serveur/build')));


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
