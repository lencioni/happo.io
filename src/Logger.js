// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color

function red(str) {
  return `\x1b[31m${str}\x1b[0m`;
}

function green(str) {
  return `\x1b[32m${str}\x1b[0m`;
}

export function underline(str) {
  // https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
  return `\x1b[36m\x1b[4m${str}\x1b[0m`;
}

export default class Logger {
  constructor() {
    this.print = (str) => process.stdout.write(str);
    this.stderrPrint = (str) => process.stderr.write(str);
  }

  mute() {
    this.print = () => null;
    this.stderrPrint = () => null;
  }

  divider() {
    this.info('-----------------------------------------');
  }

  info(msg) {
    this.print(msg.replace(/https?:\/\/[^ ]+/g, underline));
    this.print('\n');
  }

  start(msg) {
    this.print(msg);
  }

  success(msg) {
    this.print(green(' ✓'));
    if (msg) {
      this.print(green(` ${msg}`));
    }
    this.print('\n');
  }

  fail(msg) {
    this.print(red(' ✗'));
    if (msg) {
      this.print(red(` ${msg}`));
    }
    this.print('\n');
  }

  error(e) {
    this.stderrPrint(red(e.stack));
    this.stderrPrint('\n');
  }
}
