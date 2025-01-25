import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const getRepoRoot = () => {
  const repoRoot = execSync('git rev-parse --show-toplevel').toString().trim();
  return repoRoot;
};

// Create the pre-commit hook script
const createPreCommitHook = () => {
  try {
    const repoRoot = getRepoRoot();
    const hookPath = path.join(repoRoot, '.git', 'hooks', 'pre-commit');

    // Content for the pre-commit hook
    const hookContent = `#!/bin/sh
FILES=\$(git diff --cached --name-only --diff-filter=ACMR | sed 's| |\\\\ |g')
[ -z "\$FILES" ] && exit 0

# Run prettier on all file
echo "\$FILES" | xargs ./node_modules/.bin/prettier --ignore-unknown --write

# Add back the prettified files to staging
echo "\$FILES" | xargs git add

exit 0`;

    // Check if hooks directory exists, if not, create it
    const hooksDir = path.dirname(hookPath);
    if (!fs.existsSync(hooksDir)) {
      fs.mkdirSync(hooksDir, { recursive: true });
    }

    // Write the hook content to the pre-commit file
    fs.writeFileSync(hookPath, hookContent, { mode: 0o755 });
    console.log('Pre-commit hook created successfully!');
  } catch (error) {
    console.error('Error creating pre-commit hook:', error.message);
  }
};

// Run the function to create the pre-commit hook
createPreCommitHook();
