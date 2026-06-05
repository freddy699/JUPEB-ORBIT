const fs = require('fs');

function sanitizeJson(input) {
    let output = '';
    let inString = false;
    let escaped = false;

    for (let i = 0; i < input.length; i++) {
        const char = input[i];

        if (inString) {
            if (escaped) {
                // Check if the current character is a valid JSON escape.
                if (char === '"' || char === '\\' || char === '/' || char === 'b' || char === 'f' || char === 'n' || char === 'r' || char === 't' || char === 'u') {
                    output += '\\' + char;
                } else {
                    // Invalid escape sequence, escape the backslash itself
                    output += '\\\\' + char;
                }
                escaped = false;
            } else if (char === '\\') {
                escaped = true;
            } else if (char === '"') {
                output += '"';
                inString = false;
            } else {
                output += char;
            }
        } else {
            output += char;
            if (char === '"') {
                inString = true;
            }
        }
    }
    
    // Handle trailing backslash if any
    if (escaped) {
        output += '\\\\';
    }

    return output;
}

const content = fs.readFileSync('questions.json', 'utf8');
const sanitized = sanitizeJson(content);
fs.writeFileSync('questions.json', sanitized, 'utf8');

try {
    JSON.parse(sanitized);
    console.log('Successfully fixed and verified JSON.');
} catch (e) {
    console.error('Fix failed:', e.message);
    const match = e.message.match(/position (\d+)/);
    if (match) {
        const pos = parseInt(match[1]);
        console.log('Error around:', JSON.stringify(sanitized.substring(pos - 30, pos + 30)));
    }
}
