// git 提交信息校验
// from  https://github.com/vuejs/vue/blob/dev/scripts/verify-commit-msg.js

import chalk from "chalk";
import fs from "fs";
const msgPath = process.env.GIT_PARAMS;
const msg = fs.readFileSync(msgPath, "utf-8").trim();

console.log("执行 commit-msg 钩子");

const commitRE =
  /^(v\d+\.\d+\.\d+(-(alpha|beta|rc.\d+))?)|((revert: )?(feat|fix|docs|style|refactor|perf|test|workflow|ci|chore|types)(\(.+\))?!?: .{1,50})/;

if (!commitRE.test(msg)) {
  console.log();
  console.error(
    `  ${chalk.bgRed.white(" ERROR ")} ${chalk.red(`invalid commit message format.`)}\n\n` +
      chalk.red(
        `  Proper commit message format is required for automated changelog generation. Examples:\n\n`
      ) +
      `    ${chalk.green(`feat(compiler): add 'comments' option`)}\n` +
      `    ${chalk.green(`fix(v-model): handle events on blur (close #28)`)}\n\n` +
      chalk.red(`  See .github/COMMIT_CONVENTION.md for more details.\n`) +
      chalk.red(
        `  You can also use ${chalk.cyan(
          `npm run commit`
        )} to interactively generate a commit message.\n`
      )
  );
  process.exit(1);
}
