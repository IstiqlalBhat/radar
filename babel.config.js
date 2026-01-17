module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./src'],
                    extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
                    alias: {
                        '@app': './src/app',
                        '@modules': './src/modules',
                        '@core': './src/core',
                        '@shared': './src/shared',
                        '@assets': './src/assets',
                        '@': './src',
                    },
                },
            ],
            'react-native-reanimated/plugin',
        ],
    };
};
