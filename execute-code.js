const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

function runCode() {
  const code = document.getElementById("codeInput").value;
  // Replace `yourFunction` with the name of your JavaScript function
  const result = yourFunction(code); 
  document.getElementById("output").innerText = `Result: ${result}`;
}

// Sample function (replace with your own function logic)
function yourFunction(input) {
  return `You entered: ${input}`;
}

function executeCode(code, language) {
  return new Promise((resolve, reject) => {
    let filename;
    let command;

    // Create temporary files based on the language
    switch (language) {
      case 'python':
        filename = path.join(__dirname, 'temp.py');
        fs.writeFileSync(filename, code);
        command = `python ${filename}`;
        break;

      case 'javascript':
        filename = path.join(__dirname, 'temp.js');
        fs.writeFileSync(filename, code);
        command = `node ${filename}`;
        break;

      case 'cpp':
        filename = path.join(__dirname, 'temp.cpp');
        const executable = path.join(__dirname, 'temp.out');
        fs.writeFileSync(filename, code);
        command = `g++ ${filename} -o ${executable} && ${executable}`;
        break;

      default:
        reject(new Error('Language not supported'));
        return;
    }

    // Execute the command
    exec(command, (error, stdout, stderr) => {
      fs.unlinkSync(filename); // Delete the temp file after execution
      if (language === 'cpp') {
        fs.unlinkSync(path.join(__dirname, 'temp.out'));
      }

      if (error) {
        reject(stderr || 'Execution error');
      } else {
        resolve(stdout);
      }
    });
  });
}

module.exports = { executeCode };
