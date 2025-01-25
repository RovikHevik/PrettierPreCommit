import { execSync } from 'child_process';
import { writeFileSync, unlinkSync } from 'fs';

try {
  // Get the list of staged files
  const output = execSync('git diff --name-only --diff-filter=d', {
    encoding: 'utf-8',
  });
  const files = output
    .split('\n')
    .filter((file) => /\.(vue|ts|js)$/.test(file));
  console.log(output);
  if (files.length === 0) {
    console.log('No staged files to format.');
    process.exit(0);
  }

  // Write the list of files to a temporary file for Prettier
  const tempFile = '.prettier-files';
  writeFileSync(tempFile, files.join('\n'));

  // Run Prettier on the staged files
  execSync(`npx prettier --write $(cat ${tempFile})`, {
    stdio: 'inherit',
    shell: true,
  });

  // Re-stage the formatted files
  execSync(`git add ${files.join(' ')}`, { stdio: 'inherit' });

  // Clean up the temporary file
  unlinkSync(tempFile);

  console.log('Prettier formatting complete.');
} catch (error) {
  console.error('Error formatting files:', error.message);
  process.exit(1);
}
