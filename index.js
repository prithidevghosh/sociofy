const express = require('express')
const port = process.env.PORT || 3000
const app = express();

app.listen(port, (e) => {
    if (e) { console.error("error occured in firing up server"); return; }

    console.log(`server started at port ${port}`);

})