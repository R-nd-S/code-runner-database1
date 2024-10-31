async function loadPyodideAndRun() {
  window.pyodide = await loadPyodide();  // Load Pyodide library
}

async function runCode() {
  const code = document.getElementById("codeInput").value;
  try {
    const result = await pyodide.runPython(code);  // Run Python code
    document.getElementById("output").innerText = `Result: ${result}`;
  } catch (error) {
    document.getElementById("output").innerText = `Error: ${error}`;
  }
}

// Load Pyodide when the page loads
window.addEventListener("load", loadPyodideAndRun);
