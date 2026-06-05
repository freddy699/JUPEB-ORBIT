const fs = require('fs');
const content = fs.readFileSync('questions.json', 'utf8');
const regex = /\\(?![\\\"\/bfnrtu])/g;
let match;
while ((match = regex.exec(content)) !== null) {
    console.log(`Pos: ${match.index}, Snippet: ${content.substring(match.index, match.index + 10)}`);
}

console.log('--- Checking for literal newlines in strings ---');
let inString = false;
for (let i = 0; i < content.length; i++) {
    if (content[i] === '"' && content[i-1] !== '\\') {
        inString = !inString;
    }
    if (inString && (content[i] === '\n' || content[i] === '\r')) {
        console.log(`Literal newline in string at Pos: ${i}`);
        // skip consecutive newlines to avoid spam
        while (i < content.length && (content[i] === '\n' || content[i] === '\r')) i++;
        i--;
    }
}
