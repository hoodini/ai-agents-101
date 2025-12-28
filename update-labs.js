const fs = require('fs');
const path = require('path');

const labsDir = path.join(__dirname, 'agents-training-app', 'src', 'labs');
const labs = ['Lab3.tsx', 'Lab4.tsx', 'Lab5.tsx', 'Lab6.tsx', 'Lab7.tsx', 'Lab8.tsx', 'Lab9.tsx', 'Lab10.tsx'];

labs.forEach((labFile) => {
  const labPath = path.join(labsDir, labFile);
  let content = fs.readFileSync(labPath, 'utf-8');

  // Count number of TerminalCodeCell instances
  const matches = content.match(/<TerminalCodeCell/g);
  if (!matches) {
    console.log(`${labFile}: No TerminalCodeCell found, skipping...`);
    return;
  }

  const cellCount = matches.length;
  console.log(`${labFile}: Found ${cellCount} TerminalCodeCell instances`);

  // Add each ref one by one
  for (let i = 1; i <= cellCount; i++) {
    const regex = new RegExp(`<TerminalCodeCell\\s+title="step-${i}`, 'g');
    const replacement = `<TerminalCodeCell\n          ref={step${i}Ref}\n          title="step-${i}`;
    content = content.replace(regex, replacement);
  }

  // Also handle "complete-" titles
  content = content.replace(/<TerminalCodeCell\s+title="complete-/g, (match, offset) => {
    // Find which step number this should be
    const beforeMatch = content.substring(0, offset);
    const stepMatches = beforeMatch.match(/ref={step\d+Ref}/g) || [];
    const nextStepNum = stepMatches.length + 1;
    return `<TerminalCodeCell\n          ref={step${nextStepNum}Ref}\n          title="complete-`;
  });

  fs.writeFileSync(labPath, content, 'utf-8');
  console.log(`${labFile}: Updated successfully`);
});

console.log('All labs updated!');
