import data from './ratings.json' assert { type: 'json' };
let { cards } = data;

const getCards = () => cards;
const delCard = (id) => {
  const index = cards.findIndex((el) => el.id === id);
  if (index === -1) return 404;
  cards.splice(index, 1);
  return 204;
};

export { getCards, delCard };
