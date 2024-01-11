const sequelize = require('../config/connection');
const { User } = require('../models');
const fs = require('fs');
const path = require('path');

// Data export function
async function exportDataToJson() {
    try {
        const users = await User.findAll({ raw: true });
        const userDataPath = path.join(__dirname, 'seeds', 'userData.json');
        fs.writeFileSync(userDataPath, JSON.stringify(users, null, 2));
        console.log('User data exported to JSON file in seeds folder.');
    } catch (error) {
        console.error('Error exporting data:', error);
    }
}

module.exports = exportDataToJson;
