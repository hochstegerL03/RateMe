import { defineStore } from 'pinia';
import axios from 'axios';

export const useCardStore = defineStore('cards', {
  state: () => ({ cards: [] }),
  actions: {
    async getCards() {
      const { data } = await axios.get('http://127.0.0.1:3000/cards');
      this.cards = data;
    },
  },
});
