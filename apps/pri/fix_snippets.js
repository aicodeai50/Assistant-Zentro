const fs = require('fs');
const filePath = 'src/components/builder/BuilderShell.tsx';
let src = fs.readFileSync(filePath, 'utf8');

// 1. Add generatedApiKey state next to apiMode
src = src.replace(
  'const [apiMode, setApiMode] = useState("code");',
  'const [apiMode, setApiMode] = useState("code");\n  const [generatedApiKey, setGeneratedApiKey] = useState("");'
);

// 2. Capture api_key from generate response inside handleGenerateDraft
src = src.replace(
  'setSlug(normalized.slug || "");',
  'setSlug(normalized.slug || "");\n      const rawKey = (data as any).api_key || (data as any).spec?.api_key || "";\n      if (rawKey) setGeneratedApiKey(rawKey);'
);

// 3. Pass props to ApiGeneratorPanel
src = src.replace(
  'onGenerate={handleGenerateDraft}',
  'onGenerate={handleGenerateDraft}\n              generatedSlug={slug || undefined}\n              generatedApiKey={generatedApiKey || undefined}'
);

fs.writeFileSync(filePath, src);
console.log('Done');
