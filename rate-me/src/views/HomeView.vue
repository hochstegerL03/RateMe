<script setup>
import { ref } from 'vue';
const search = ref('');
const stars = ref(5);
const cards = ref([
  {
    id: 1,
    title: 'Good Food',
    description: 'Very good',
    image: 'https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_960_720.jpg',
    category: 'Food',
    rating: 5,
    subtitle: 'Look what I found',
    details: 'Very yummy, I must say. Would go there again :)',
    date: '10.10.2022',
  },
  {
    id: 2,
    title: 'Meh Food',
    description: 'Not very good',
    image: 'https://cdn.pixabay.com/photo/2020/07/29/08/33/coffee-5447420_960_720.jpg',
    category: 'Food',
    rating: 1,
    subtitle: 'They taste weird',
    details: 'Idk why but they dont taste like yummy coffee',
    date: '1.11.2022',
  },
  {
    id: 3,
    title: 'Best Sport',
    description: 'Just best',
    image: 'https://cdn.pixabay.com/photo/2020/07/08/08/04/sunset-5383040_960_720.jpg',
    category: 'Sport',
    rating: 5,
    subtitle: 'Basketball',
    details: 'Who doesnt love it?',
    date: '9.11.2022',
  },
  {
    id: 4,
    title: 'Weird Sport',
    description: 'Very weird',
    image: 'https://cdn.pixabay.com/photo/2017/11/19/14/49/american-football-2962949_960_720.jpg',
    category: 'Sport',
    rating: 3,
    subtitle: 'I dont know what this is',
    details: 'Help me',
    date: '10.12.2022',
  },
  {
    id: 5,
    title: 'Good Food #2',
    description: 'Very Good',
    image: 'https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_960_720.jpg',
    category: 'Food',
    rating: 5,
    subtitle: 'Look what I found again!',
    details: 'Very yummy, I must say. Would go there again :)',
    date: '20.12.2022',
  },
]);
</script>

<template>
  <div>
    <div class="flex justify-center">
      <div>
        <div class="text-h3 q-mt-lg text-center">Rate Me!</div>
        <div>
          <figcaption class="text-center text-weight-light text-italic q-mt-xs q-mb-lg">
            Snap, Rate and go! Make your life a rating game
          </figcaption>
        </div>
      </div>
    </div>
    <div class="flex justify-center items-center stats-overview">
      <div class="stats q-pa-xl flex items-center">
        <div class="text-h4 text-weight-bold">Stats</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stats {
  border-radius: 100%;
  background-color: $primary;
  color: white;
  aspect-ratio: 1 / 1;
}

.stats-overview {
  height: 50vh;
}
</style>
