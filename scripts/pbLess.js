
const path = require('path')
const compiler = require('vue-template-compiler')
const fs = require('fs')
const resolve = dir => path.join(__dirname, dir)
let arr = ''
function cb (filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  //   const content = fs.readFileSync('../packages/loading/index.vue', 'utf-8')
  const ret = compiler.parseComponent(content)
  // console.log(ret.styles.content)
  // 循环styles
  ret.styles &&
    ret.styles.forEach((style) => {
      ssb(style.content)
    })
}

function isDirectory (filePath) {
  const stat = fs.statSync(filePath)
  return stat.isDirectory()
}
function save () {
  const ipt = '@import "~ant-design-vue/lib/style/themes/index.less";\n'
  fs.writeFileSync(resolve('../lib/design-vue-ui.less'), ipt + arr)
}

function fileCb (filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  // const ret = compiler.parseComponent(content)
  // console.log(content)
  ssb(content)
}

function ssb (data) {
  data = data ? data.replace('/deep/', '') : ''
  const last = data.lastIndexOf('";')
  const last2 = data.lastIndexOf('");')
  if (last !== -1) arr += data.substring(last + 2)
  else if (last2 !== -1) arr += data.substring(last2 + 3)
  else arr += data
}

// 遍历目录
function traverseDirectory (dirPath) {
  const files = fs.readdirSync(dirPath)
  files.forEach((file) => {
    const filePath = path.resolve(dirPath, file)
    if (isVue(file)) {
      cb && cb(filePath)
    } else if (isLessOrCss(file)) {
      fileCb(filePath)
    } else if (isDirectory(filePath)) {
      traverseDirectory(filePath, cb)
    } else {
    }
  })
}

function isVue (filePath) {
  return filePath && filePath.toLowerCase().endsWith('.vue')
}

function isLessOrCss (filePath) {
  return filePath && (filePath.toLowerCase().endsWith('.less') || filePath.toLowerCase().endsWith('.css'))
}

traverseDirectory(resolve('../packages'))
save()
