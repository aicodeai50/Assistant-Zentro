const fs = require('fs');
const filePath = 'src/components/builder/BuilderShell.tsx';
let src = fs.readFileSync(filePath, 'utf8');

// Fix normalizeGeneratedPayload to read top-level fields first
const oldNormalize = `  const source: GeneratedSource =
    (data.spec as GeneratedSource | undefined) ||
    (data.draft as GeneratedSource | undefined) ||
    (data as GeneratedSource);`;

const newNormalize = `  const source: GeneratedSource =
    (data as GeneratedSource);`;

if (src.indexOf(oldNormalize) !== -1) {
  src = src.replace(oldNormalize, newNormalize);
  console.log('Fixed normalizeGeneratedPayload');
} else {
  console.log('Pattern not found - trying alternate...');
  src = src.replace(
    'data.spec as GeneratedSource | undefined',
    'data as GeneratedSource | undefined'
  );
  console.log('Applied alternate fix');
}

// Also capture api_key after normalization
if (src.indexOf('setGeneratedApiKey') === -1) {
  src = src.replace(
    'setSlug(normalized.slug || "");',
    'setSlug(normalized.slug || "");\n      if ((data as any).api_key) setGeneratedApiKey((data as any).api_key);'
  );
  console.log('Added api_key capture');
}

fs.writeFileSync(filePath, src);
console.log('Done - run npm run dev');
