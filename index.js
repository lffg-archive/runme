const { spawn } = require('child_process');
const path = require('path');

const ls = spawn('yarn', ['start'], {
  cwd: path.join(__dirname, '..', 'simple-server-one'),

  /**
   * We need to spread process.env to prevent an error.
   * @todo Maybe this is a possible _hack_?
   */
  env: { ...process.env, PORT: 12345 }
});

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
