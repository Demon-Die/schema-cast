import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as os from 'node:os';
import fetch from 'node-fetch';

const CONFIG_DIR = path.join(os.homedir(), '.schema-cast');
const TOKEN_FILE = path.join(CONFIG_DIR, 'token');
const API_URL = 'https://api.schema.omnikon.dev';

export async function syncCommand(inputDir: string) {
  console.log(`Syncing schemas from ${inputDir} to cloud...`);
  
  let token: string;
  try {
    token = await fs.readFile(TOKEN_FILE, 'utf-8');
  } catch (err) {
    console.error('Error: Not logged in. Run "schema-cast login" first.');
    process.exit(1);
  }

  const files = await fs.readdir(inputDir);
  for (const file of files) {
    if (file.endsWith('.json') || file.endsWith('.yaml')) {
      const filePath = path.join(inputDir, file);
      const content = await fs.readFile(filePath, 'utf-8');
      
      console.log(`Uploading ${file}...`);
      
      const response = await fetch(`${API_URL}/schemas`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: file,
          definition: content
        })
      });

      if (!response.ok) {
        console.error(`Failed to upload ${file}: ${response.statusText}`);
        const body = await response.text();
        console.error(body);
      } else {
        console.log(`Successfully synced ${file}`);
      }
    }
  }
}
