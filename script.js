const fs = require('fs');
const path = require('path');

function combineAllSchemas() {
  const schemaDir = './drizzle-schemas-v2';
  const files = fs.readdirSync(schemaDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');
  
  let combinedSchema = `import { pgTable, text, integer, boolean, timestamp, uuid, jsonb } from "drizzle-orm/pg-core";\n\n`;
  combinedSchema += `// Combined schema file with all ${files.length} tables\n\n`;
  
  files.forEach(file => {
    const filePath = path.join(schemaDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove import statement from each file
    content = content.replace(/import.*from.*;\n\n?/, '');
    
    // Add the schema content
    combinedSchema += `// === ${file.replace('.ts', '').toUpperCase()} ===\n`;
    combinedSchema += content + '\n\n';
  });
  
  // Write combined schema
  fs.writeFileSync('./schema.ts', combinedSchema);
  console.log(`✅ Created single schema.ts with ${files.length} tables`);
}

// Run it
combineAllSchemas();
