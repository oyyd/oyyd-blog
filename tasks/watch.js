import childProcess from 'child_process';
import gulp from 'gulp';
import watchPost from './watch-post';

const { exec } = childProcess;
const watchBundleCmd = 'webpack --watch --progress --colors';
const watchLibCmd = 'babel src --out-dir lib -w';
const cwd = process.cwd();

function startTask(command) {
  const child = exec(command, { cwd }, (error /* , stdout, stderr*/) => {
    if (error) {
      console.log(err); // eslint-disable-line
    }
  });

  child.stdout.on('data', (data) => {
    console.log(data); // eslint-disable-line
  });
}

gulp.task('watch', () => {
  startTask(watchBundleCmd);
  startTask(watchLibCmd);
  watchPost();
});
