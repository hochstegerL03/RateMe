import chalk from 'chalk';

export default (req, res, next) => {
  console.error(`NOT FOUND ===> ${chalk.blue(req.originalUrl)}`);
  res.status(404).send(`${req.originalUrl} not found!`);
  next();
};
