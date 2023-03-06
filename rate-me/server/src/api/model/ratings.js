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

const postCard = (newCard) => {
  const newId = Math.max(cards.map((el) => el.id)) + 1;
  console.log(newId);
  console.log(newCard);
  cards.push(newCard);
  fs.writeFile('./ratings.json', JSON.stringify(cards));
};

export { getCards, delCard };
