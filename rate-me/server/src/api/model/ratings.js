import fs from 'fs/promises';
import path from 'path';

const file = path.join(process.cwd(), './ratings.json');

let { cards } = JSON.parse(await fs.readFile(file));

const getCards = () => cards;
const delCard = (id) => {
  const index = cards.findIndex((el) => el.id === id);
  if (index === -1) return 404;
  cards.splice(index, 1);
  return 204;
};

export { getCards, delCard };
