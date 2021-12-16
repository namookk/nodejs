const app = require('../Http/index');
const syncDb = require('./sync-db');

syncDb().then(() => { // db생성 먼저
    console.log('Sync database!');
    app.listen(3000, () => {
        console.log('Example app listening on port 3000!');
    })
})