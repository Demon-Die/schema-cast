import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as os from 'node:os';
import fetch from 'node-fetch';

const CONFIG_DIR = path.join(os.homedir(), '.schema-cast');
const TOKEN_FILE = path.join(CONFIG_DIR, 'token');
const API_URL = 'https://api.schema.omnikon.dev';

export async function checkRateLimit() {
  let token: string;
  try {
    token = await fs.readFile(TOKEN_FILE, 'utf-8');
  } catch (err) {
    // Free tier without token (or anonymous)
    console.warn('Warning: You are not logged in. Anonymous generation has strict limits.');
    return; // allow fallback logic or strictly enforce
  }

  try {
    const response = await fetch(`${API_URL}/users/me/limits`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error('Error: Rate limit exceeded. Please upgrade your plan.');
        process.exit(1);
      } else {
        console.warn('Warning: Could not verify rate limits with the cloud.');
      }
    }
  } catch (error) {
    console.warn('Warning: Could not connect to cloud to verify limits.');
  }
}
