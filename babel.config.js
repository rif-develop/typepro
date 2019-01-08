module.exports = (api) =>{
    const babelEnv = api.env();
    const babelVer = api.version;
    console.log(` -- 바벨(${babelVer})모드 : ${babelEnv} --`);
    const presets = ['@babel/preset-env','@babel/preset-react'];
    const plugins = [
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-transform-async-to-generator'
    ];

    return {
        presets,
        plugins
    };
};