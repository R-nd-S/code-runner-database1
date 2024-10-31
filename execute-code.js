async function loadPyodideAndRun() {
  window.pyodide = await loadPyodide();  // Load Pyodide library
}

async function runCode() {
  const code = document.getElementById("codeInput").value;
  
  // Redirect output to a string
  let output = '';
  pyodide.globals.set('print', (...args) => {
    output += args.join(' ') + '\n';  // Collect printed output
  });

  try {
    await pyodide.runPython(code);  // Run Python code
    document.getElementById("output").innerText = `Output:\n${output}`; // Show collected output
  } catch (error) {
    document.getElementById("output").innerText = `Error: ${error}`;
  }
}

// Load Pyodide when the page loads
window.addEventListener("load", loadPyodideAndRun);
