// Check if the page contains raw JSONL content
(function() {
  const body = document.body;
  const pre = document.querySelector('pre');
  
  // Get the raw text content
  const rawContent = pre ? pre.textContent : body.textContent;
  
  if (!rawContent || !rawContent.trim()) {
    return;
  }

  // Split into lines and filter empty ones
  const lines = rawContent.split('\n').filter(line => line.trim());
  
  // Check if at least one line looks like JSON
  const hasJsonLines = lines.some(line => {
    const trimmed = line.trim();
    return (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
           (trimmed.startsWith('[') && trimmed.endsWith(']'));
  });

  if (!hasJsonLines) {
    return;
  }

  // Clear the body and create our container
  document.body.innerHTML = '';
  const container = document.createElement('div');
  container.className = 'jsonl-container';

  lines.forEach((line, index) => {
    const lineDiv = document.createElement('div');
    lineDiv.className = 'jsonl-line';

    const lineNumber = document.createElement('span');
    lineNumber.className = 'jsonl-line-number';
    lineNumber.textContent = (index + 1).toString();
    lineDiv.appendChild(lineNumber);

    const content = document.createElement('span');
    
    try {
      const parsed = JSON.parse(line);
      const formatted = JSON.stringify(parsed, null, 2);
      content.innerHTML = syntaxHighlight(formatted);
    } catch (e) {
      lineDiv.classList.add('jsonl-error');
      content.textContent = line;
      const errorMsg = document.createElement('div');
      errorMsg.className = 'jsonl-error-message';
      errorMsg.textContent = `Parse error: ${e.message}`;
      lineDiv.appendChild(content);
      lineDiv.appendChild(errorMsg);
      container.appendChild(lineDiv);
      return;
    }

    lineDiv.appendChild(content);
    container.appendChild(lineDiv);
  });

  document.body.appendChild(container);

  function syntaxHighlight(json) {
    // Escape HTML
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    // Apply syntax highlighting
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      function(match) {
        let cls = 'json-number';
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'json-key';
          } else {
            cls = 'json-string';
          }
        } else if (/true|false/.test(match)) {
          cls = 'json-boolean';
        } else if (/null/.test(match)) {
          cls = 'json-null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
      }
    );
  }
})();
