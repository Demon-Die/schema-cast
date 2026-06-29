import * as child_process from 'node:child_process';
import * as os from 'node:os';
import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import * as http from 'node:http';

const CONFIG_DIR = path.join(os.homedir(), '.schema-cast');
const TOKEN_FILE = path.join(CONFIG_DIR, 'token');
const AUTH_URL = 'https://schema.omnikon.dev/auth/cli';

export async function loginCommand() {
  console.log('Logging in to schema-cast cloud...');
  
  await fs.mkdir(CONFIG_DIR, { recursive: true });

  return new Promise<void>((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      const url = new URL(req.url || '/', `http://localhost:${server.address()?.['port']}`);
      const token = url.searchParams.get('token');

      if (token) {
        await fs.writeFile(TOKEN_FILE, token, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<html><body><h1>Login successful!</h1><p>You can close this window and return to the CLI.</p></body></html>');
        console.log('Successfully logged in! Token saved.');
        server.close();
        resolve();
      } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('No token provided.');
      }
    });

    server.listen(0, () => {
      const port = (server.address() as any).port;
      const loginUrl = `${AUTH_URL}?redirect=http://localhost:${port}`;
      console.log(`Opening browser to: ${loginUrl}`);
      
      const startCmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
      child_process.exec(`${startCmd} "${loginUrl}"`);
    });
  });
}
