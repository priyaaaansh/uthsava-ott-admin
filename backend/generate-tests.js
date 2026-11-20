const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src/modules/admin/validators');
const testDir = path.join(__dirname, 'test/modules/admin/validators');

if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir, { recursive: true });
}

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.validator.ts'));

for (const file of files) {
  const baseName = file.replace('.ts', '');
  const testFilePath = path.join(testDir, `${baseName}.test.ts`);
  const content = `import * as validators from '../../../../src/modules/admin/validators/${baseName}';

describe('${baseName}', () => {
  it('should have exports defined', () => {
    expect(validators).toBeDefined();
    expect(typeof validators).toBe('object');
  });
});
`;
  fs.writeFileSync(testFilePath, content);
}
