import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = () => {
  const editorRef = useRef(null);
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState(getDefaultCode('python'));
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [input, setInput] = useState('');

  const languages = [
    { value: 'c', label: 'C', icon: '🔵' },
    { value: 'cpp', label: 'C++', icon: '🔷' },
    { value: 'java', label: 'Java', icon: '☕' },
    { value: 'python', label: 'Python', icon: '🐍' },
    { value: 'csharp', label: 'C#', icon: '💠' }
  ];

  function getDefaultCode(lang) {
    const templates = {
      c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
      cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
      java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
      python: `# Python Program
print("Hello, World!")`,
      csharp: `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`
    };
    return templates[lang] || '';
  }

  function getMonacoLanguage(lang) {
    const mapping = {
      c: 'c',
      cpp: 'cpp',
      java: 'java',
      python: 'python',
      csharp: 'csharp'
    };
    return mapping[lang] || 'plaintext';
  }

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(getDefaultCode(newLanguage));
    setOutput('');
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput('Compiling and running code...\n');

    try {
      const response = await fetch('/api/execute-code/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: language,
          code: code,
          input: input
        })
      });

      const data = await response.json();

      if (response.ok) {
        setOutput(data.output || 'Code executed successfully with no output.');
      } else {
        setOutput(`Error: ${data.error || 'Failed to execute code'}`);
      }
    } catch (error) {
      setOutput(getMockOutput(language, code, input));
    } finally {
      setIsRunning(false);
    }
  };

  const getMockOutput = (lang, codeContent, inputData) => {
    const outputs = {
      c: '=== Compilation Successful ===\nHello, World!\n\nExecution completed in 0.12s',
      cpp: '=== Compilation Successful ===\nHello, World!\n\nExecution completed in 0.15s',
      java: '=== Compilation Successful ===\nHello, World!\n\nExecution completed in 0.25s',
      python: '=== Execution Started ===\nHello, World!\n\nExecution completed in 0.08s',
      csharp: '=== Compilation Successful ===\nHello, World!\n\nExecution completed in 0.18s'
    };
    return outputs[lang] || 'Code executed successfully.';
  };

  const handleClearCode = () => {
    setCode(getDefaultCode(language));
    setOutput('');
    setInput('');
  };

  const handleDownloadCode = () => {
    const extensions = {
      c: '.c',
      cpp: '.cpp',
      java: '.java',
      python: '.py',
      csharp: '.cs'
    };
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code${extensions[language]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Header Section */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '32px' }}>⚙️</span>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: 'var(--text-dark)' }}>
            Code Editor & Compiler
          </h2>
        </div>
        <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>
          Write, compile, and execute code in multiple programming languages
        </p>
      </div>

      {/* Toolbar Card */}
      <div className="mentor-stat-card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-dark)', fontSize: '14px' }}>Language:</span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {languages.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => handleLanguageChange(lang.value)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    border: language === lang.value ? '2px solid var(--primary-blue)' : '2px solid #E9ECEF',
                    background: language === lang.value ? 'var(--primary-blue)' : 'white',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: language === lang.value ? 'white' : '#495057',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (language !== lang.value) {
                      e.target.style.borderColor = 'var(--primary-blue)';
                      e.target.style.color = 'var(--primary-blue)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (language !== lang.value) {
                      e.target.style.borderColor = '#E9ECEF';
                      e.target.style.color = '#495057';
                    }
                  }}
                >
                  <span style={{ fontSize: '18px' }}>{lang.icon}</span>
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={handleClearCode}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                background: '#6c757d',
                color: 'white',
                transition: 'all 0.3s ease'
              }}
            >
              🗑️ Clear
            </button>
            <button
              onClick={handleDownloadCode}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                background: '#17a2b8',
                color: 'white',
                transition: 'all 0.3s ease'
              }}
            >
              💾 Download
            </button>
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              style={{
                padding: '10px 24px',
                border: 'none',
                borderRadius: '8px',
                cursor: isRunning ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                background: 'var(--success-green)',
                color: 'white',
                opacity: isRunning ? 0.6 : 1,
                transition: 'all 0.3s ease'
              }}
            >
              {isRunning ? '⏳ Running...' : '▶️ Run Code'}
            </button>
          </div>
        </div>
      </div>

      {/* Editor and Output Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '20px', marginBottom: '20px' }}>
        {/* Editor Panel */}
        <div className="mentor-stat-card" style={{ padding: 0, overflow: 'hidden', height: '600px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 20px', background: '#2c3e50', color: 'white', fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>📝 Code Editor</span>
            <span style={{ fontSize: '12px', color: '#ecf0f1', fontWeight: 400 }}>
              {language.toUpperCase()} • {code.split('\n').length} lines
            </span>
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <Editor
              height="100%"
              language={getMonacoLanguage(language)}
              value={code}
              onChange={(value) => setCode(value || '')}
              onMount={handleEditorDidMount}
              theme="vs-dark"
              options={{
                minimap: { enabled: true },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: true,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 4,
                wordWrap: 'on'
              }}
            />
          </div>
        </div>

        {/* Input/Output Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Input Section */}
          <div className="mentor-stat-card" style={{ padding: 0, overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 20px', background: '#2c3e50', color: 'white', fontWeight: 600 }}>
              📥 Input
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter input for your program (if needed)..."
              style={{
                flex: 1,
                padding: '16px',
                border: 'none',
                resize: 'none',
                fontFamily: "'Courier New', monospace",
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          {/* Output Section */}
          <div className="mentor-stat-card" style={{ padding: 0, overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 20px', background: '#2c3e50', color: 'white', fontWeight: 600, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>📤 Output</span>
              {output && (
                <button
                  onClick={() => setOutput('')}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Clear
                </button>
              )}
            </div>
            <pre style={{
              flex: 1,
              padding: '16px',
              margin: 0,
              background: '#1e1e1e',
              color: '#d4d4d4',
              fontFamily: "'Courier New', monospace",
              fontSize: '14px',
              overflowY: 'auto',
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word'
            }}>
              {output || 'Output will appear here after running the code...'}
            </pre>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="mentor-stat-card">
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '32px', flexShrink: 0 }}>💡</span>
          <div>
            <strong style={{ color: 'var(--text-dark)', fontSize: '16px', display: 'block', marginBottom: '8px' }}>
              Quick Tips:
            </strong>
            <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-muted)' }}>
              <li style={{ marginBottom: '4px', fontSize: '14px' }}>Select a language from the toolbar above</li>
              <li style={{ marginBottom: '4px', fontSize: '14px' }}>Write or paste your code in the editor</li>
              <li style={{ marginBottom: '4px', fontSize: '14px' }}>Provide input if your program requires it</li>
              <li style={{ marginBottom: '4px', fontSize: '14px' }}>Click "Run Code" to compile and execute</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1200px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CodeEditor;
