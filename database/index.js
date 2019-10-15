const Sequelize = require('sequelize');
const fs = require('fs');
const { resolve } = require('path');

module.exports =  ( () => {
    let instance;

    function initConnection() {
        const client = new Sequelize('lun', 'root', 'root', {
            host: 'localhost',
            dialect: 'mysql'
        });

        const models = {};

        function getModels() {
            fs.readdir('./database/models', (err, file) => {
                file.forEach(file => {
                    const [modelName] = file.split('.');
                    models[modelName] = client.import(resolve(`./database/models/${modelName}`))
                })
            })
        }

        return {
            setmodels: () => getModels(),
            getModel: modelName => models [modelName]
        }
    }

    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection();
            }
            return instance
        }
    }
}) ();