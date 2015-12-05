import childProcess from 'child_process';
import gulp from 'gulp';
import watchPost from './watch-post';

const {exec} = childProcess;
const watchLibCmd = 'babel src -w --out-dir lib';
const watchBundleCmd = 'webpack --watch --progress --colors';

function startTask(command) {
  const child = exec(command, (error, stdout, stderr) => {
    if (err) {
      console.log(err);
    }
  });

  child.stdout.on('data', (data) => {
    console.log(data);
  });
}

gulp.task('watch', (callback) => {
  startTask(watchLibCmd);
  startTask(watchBundleCmd);
  watchPost();
});
