import fs from 'fs/promises';
import path from 'path';

const file = path.join(process.cwd(), './ratings.json');

let { cards } = JSON.parse(await fs.readFile(file));

const getCards = () => cards;
const delCard = (id) => {
  console.log('Fuck');
  const index = cards.findIndex((el) => el.id === id);
  if (index === -1) return 404;
  cards.splice(index, 1);
  const cardList = { cards: cards };
  fs.writeFile('./ratings.json', JSON.stringify(cardList));
  return 204;
};

const postCard = (newCard) => {
  const newId = Math.max(...cards.map((el) => el.id)) + 1;
  newCard.id = newId;
  newCard.date = new Date().toJSON().slice(0, 10);
  cards.push(newCard);
  const cardList = { cards: cards };
  fs.writeFile('./ratings.json', JSON.stringify(cardList));
  return 204;
};

export { getCards, delCard, postCard };
