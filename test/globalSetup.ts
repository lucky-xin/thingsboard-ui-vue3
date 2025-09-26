import { mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

export default async function globalSetup() {
  try {
    const covTmp = join(process.cwd(), 'coverage', '.tmp');
    if (!existsSync(covTmp)) {
      mkdirSync(covTmp, { recursive: true });
    }
  } catch {}
}


