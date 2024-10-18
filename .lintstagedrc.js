const { ESLint } = require('eslint')
// 根据.eslintignore文件，过滤掉被忽路的文件
const removeIgnoredFiles = async (files) => {
  const eslint = new ESLint()
  const ignoredFiles = await Promise.all(
    files.map((file) => eslint.isPathIgnored(file))
  )
  const filteredFiles = files.filter((_, i) => !ignoredFiles[i])
  return filteredFiles.join(' ')
}

module.exports = {
  '**/*.{js,ts,vue}': async (files) => {
    console.log(files)
    const filesToLint = await removeIgnoredFiles(files)
    return [`eslint ${filesToLint} --max-warnings=0 --fix`]
  },
}
