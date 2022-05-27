const {readFileSync} = require('fs');

let loadUser = () => JSON.parse(readFileSync('recommended.json'));


module.exports = {loadUser};
