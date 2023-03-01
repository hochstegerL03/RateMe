import chalk from 'chalk';

export default (err, req, res, next) => {
  console.error(`ERROR ===> ${chalk.red(err.message)}`);
  res.status(500).send('Something broke!');
  next();
};
