const fs = require('fs');
const path = require('path');

function walk(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      walk(filepath, filelist);
    } else if (file.endsWith('.html')) {
      filelist.push(path.relative(process.cwd(), filepath));
    }
  });
  return filelist;
}

const files = walk(process.cwd())
  .filter(f => !f.endsWith('index.html')); // Exclude index.html itself

fs.writeFileSync('files.json', JSON.stringify(files, null, 2));
console.log('files.json generated with', files.length, 'HTML files.');