const fs = require('fs');
const filePath = 'src/components/builder/BuilderShell.tsx';
let src = fs.readFileSync(filePath, 'utf8');

// Check if apiMode state is missing and add it
if (src.indexOf('apiMode') === -1) {
  src = src.replace(
    'const [isRunning, setIsRunning] = useState(false);',
    'const [isRunning, setIsRunning] = useState(false);\n  const [apiMode, setApiMode] = useState("code");'
  );
  console.log('Added apiMode state');
} else {
  console.log('apiMode found - checking if useState is missing...');
  // It exists in JSX but not as state - add it
  if (src.indexOf('useState("code")') === -1) {
    src = src.replace(
      'const [isRunning, setIsRunning] = useState(false);',
      'const [isRunning, setIsRunning] = useState(false);\n  const [apiMode, setApiMode] = useState("code");'
    );
    console.log('Added missing useState for apiMode');
  }
}

fs.writeFileSync(filePath, src);
console.log('Done - restart npm run dev');
