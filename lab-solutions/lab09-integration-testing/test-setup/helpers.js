import { copyFileSync } from 'fs';

export function initDB() {
  copyFileSync('./test-setup/temp.db', 'blogging.db');
}
