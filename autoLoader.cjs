const fs = require('fs');
const path = require('path');

const INPUT = '.';  // This points to the root of the Node.js application
const OUTPUT = 'files.js';
const exportLine = 'export const files = ';

const exclusions = [
    'package-lock.json',
    'node_modules',
    '.git',
    '.gitignore',
    'autoLoader.cjs',
    '__lwr_cache__',
    'LICENSE',
    'files.js'
];

// Function to check if the path should be excluded
const shouldExclude = (fullPath) => {
    for (const exclusion of exclusions) {
        if (fullPath.includes(exclusion)) {
            return true;
        }
    }
    return false;
};

// Function to recursively get the content of directories and files
const traverseDirectory = (dirPath) => {
    const content = {};

    const items = fs.readdirSync(dirPath);

    items.forEach(item => {
        const fullPath = path.join(dirPath, item);

        // Exclude hidden files and other exclusions
        if (item.startsWith('.') || shouldExclude(fullPath)) {
            return;
        }

        if (fs.statSync(fullPath).isDirectory()) {
            // Remove double quotes on folder names
            content[item] = {
                directory: traverseDirectory(fullPath)
            };
        } else {
            const buffer = fs.readFileSync(fullPath);
            // Remove double quotes on keys and wrap contents in backticks
            content[item] = {
                file: {
                    contents: `\n${buffer.toString()}\n`
                }
            };
        }
    });

    return content;
}

const outputContent = traverseDirectory(INPUT);
fs.writeFileSync(OUTPUT, `${exportLine}${JSON.stringify(outputContent, null, 2)}`);
