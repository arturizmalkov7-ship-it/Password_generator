const fs = require('fs');
const path = require('path');

function getHomePage() {
  const filePath = path.join(__dirname, '..', 'public', 'index.html');
  return fs.readFileSync(filePath, 'utf8');
}

module.exports = { getHomePage };
