module.exports = {
  plugins: {
    // 'autoprefixer': {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    'postcss-pxtorem': {
      // 750/10 = 75

      // vant建议设置37.5
      // 如果是vant样式，37.5
      // 其他的 75
      // rootValue 支持两种类型
      // 数字，函数
      // 函数可以动态处理返回值
      // rootValue: 75,
      // postcss-pxtorem 处理每个css都会调用这个函数，通过参数传递给改函数
      rootValue({file}){

        return file.indexOf('vant') !== -1 ? 37.5:75 
      },

      propList: ['*']
    }
  }
}