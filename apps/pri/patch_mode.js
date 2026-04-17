const fs = require('fs');
const filePath = 'src/components/builder/BuilderShell.tsx';
let src = fs.readFileSync(filePath, 'utf8');

src = src.replace(
  'const [generatedApiKey, setGeneratedApiKey] = useState("");',
  'const [generatedApiKey, setGeneratedApiKey] = useState("");\n  const [apiMode, setApiMode] = useState("code");'
);

src = src.replace(
  '<ResultPanel result={result} />',
  '<ResultPanel result={result} mode={apiMode} />'
);

fs.writeFileSync(filePath, src);
console.log('Done');
