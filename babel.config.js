module.exports = (api) =>{
    const babelEnv = api.env();
    const babelVer = api.version;
    console.log(` -- 바벨(${babelVer})모드 : ${babelEnv} --`);
    const presets = ['@babel/preset-env','@babel/preset-react'];
    // const plugins = [...];

    return {
        presets,
        // plugins
    };
};