const mongoose = require('mongoose');


const SystemConfigSchema = new mongoose.Schema({
    configKey: {
        type: String,
        required: true,
        unique: true
    },
    configValue: {
        type: String,
        required: true
    }
});


const SystemConfig = mongoose.model('SystemConfig', SystemConfigSchema);

module.exports = SystemConfig;