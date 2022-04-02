/*
* Martfury - Multipurpose Marketplace React Ecommerce Template
* Author: nouthemes
* Homepage: https://themeforest.net/user/nouthemes/portfolio
* Created at: 2019-11-15T08:00:00+07:00
* Updated at: 2021-02-03T08:18:23+07:00

* */
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');

const nextSettings = {
    env: {
        title: 'Due Dilly',
        titleDescription: 'Due Dilly | Marketplace',
    },
    serverRuntimeConfig: {
        // Will only be available on the server side
        rollbarServerToken: '9d1d02bc6dbe43fa8f1caae0bc78aa42',
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
        rollbarClientToken: '720effe95cb1484aa6572fa387af3a0f',
    },
    trailingSlash: true,
};

module.exports = withPlugins([withImages(), nextSettings]);
