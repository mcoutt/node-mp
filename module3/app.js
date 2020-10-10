const express = require('express')
const config = require('./config/config')

async function startApp() {
    const app = express()
    await require('./data-access/index').default({app})

    app.listen(config.port, err => {
        if (err) {
            console.log(err);
            process.exit(1);
            return;
        }
        console.log(`
      ################################################
      ---- Server listening on port: ${config.port} -- 
      ################################################
    `);
    });

}

startApp()
