const fs = require('fs');
const filePath = 'src/app/page.tsx';
let src = fs.readFileSync(filePath, 'utf8');

src = src.replace(
  'const canvasRef = useRef(null);',
  'const canvasRef = useRef<HTMLCanvasElement>(null);'
);

fs.writeFileSync(filePath, src);
console.log('Done');
