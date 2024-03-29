import { defineStore } from 'pinia';
import axios from 'axios';

export const useCardStore = defineStore('cards', {
  state: () => ({ cards: [] }),
  persist: true,
  actions: {
    async getCards() {
      const { data } = await axios.get('/cards');
      this.cards = data;
    },
  },
});
