const fs = require('fs');
const filePath = 'src/components/builder/BuilderShell.tsx';
let src = fs.readFileSync(filePath, 'utf8');

src = src.replace(
  'const [apiMode, setApiMode] = useState("code");',
  'const [apiMode, setApiMode] = useState<"code" | "text">("code");'
);

fs.writeFileSync(filePath, src);
console.log('Done');
