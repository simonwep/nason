module.exports = {
    presets: [
        '@babel/preset-typescript',
        [
            '@babel/preset-env',
            {
                'targets': '> 10%, not dead'
            }
        ]
    ]
};
