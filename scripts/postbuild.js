import fs from 'node:fs/promises';
import path from 'node:path';
import colors from 'picocolors';

const copyFile = async (srcFilePath, destFilePath) => {
  const fileName = path.basename(srcFilePath);
  try {
    const srcPath = path.resolve(process.cwd(), srcFilePath);
    const destPath = path.resolve(process.cwd(), 'dist/ngx-notifier', destFilePath);
    await fs.copyFile(srcPath, destPath);
    console.log(colors.green(`- File Copied: ${fileName}`));
  } catch (err) {
    console.log(colors.red(`Error while copying ${fileName}`), err);
  }
};

copyFile('README.md', 'README.md');
copyFile('CHANGELOG.md', 'CHANGELOG.md');
copyFile('LICENSE', 'LICENSE');
