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
  <div class="">
    <!--Stats-->
    <div class="bubble bg-primary flex justify-around items-center">
      <div>
        <div class="stat-block q-pa-lg flex items-center">
          <div class="text-h4 text-weight-bold">15</div>
        </div>
        <div class="text-center text-white q-mt-sm">Likes</div>
      </div>
      <div>
        <div class="stat-block q-pa-lg flex items-center">
          <div class="text-h4 text-weight-bold">40</div>
        </div>
        <div class="text-center text-white q-mt-sm">Photos</div>
      </div>
      <div>
        <div class="stat-block q-pa-lg flex items-center">
          <div class="text-h4 text-weight-bold">10</div>
        </div>
        <div class="text-center text-white q-mt-sm">Deleted</div>
      </div>
    </div>
    <!--Stats End-->
    <!--Body-->
    <div class="q-mt-xl flex justify-center">
      <!--Search Input-->
      <q-input
        class="w-80"
        standout="bg-primary text-white"
        rounded
        id="search"
        v-model="search"
        label="Search"
        counter
        maxlength="30"
      >
        <template v-slot:append>
          <q-icon v-if="search !== ''" name="close" @click="search = ''" class="cursor-pointer" />
          <q-icon name="search" />
        </template>
      </q-input>
      <!--Search Input End-->
      <!--Cards-->
      <div class="w-80 q-mt-lg">
        <div>
          <q-card class="rate-card q-my-xl" v-for="card in cards" :key="card.id">
            <q-img :src="card.image">
              <div class="bg-transparent highlighted-text">
                <div class="q-pa-sm">
                  <div class="text-h4 text-weight-bold">{{ card.title }}</div>
                  <div>{{ card.description }}</div>
                </div>
              </div>
            </q-img>

            <q-card-section>
              <q-btn
                fab
                color="primary"
                icon="place"
                class="absolute"
                style="top: 0; right: 12px; transform: translateY(-50%)"
              />

              <div class="row no-wrap items-center">
                <div class="col text-h6">{{ card.category }}</div>
              </div>

              <q-rating v-model="card.rating" :max="5" size="200%" color="info" />
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="text-subtitle1">{{ card.subtitle }}</div>
              <div class="text-caption text-grey">
                {{ card.details }}
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section class="bg-accent q-py-xs text-white">
              <div class="text-italic q-pa-sm text-right">{{ card.date }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <!--Cards End-->
      <div class="w-80 flex justify-center q-mb-lg">
        <i class="fa-solid fa-plus fa-5x icon-plus"></i>
      </div>
    </div>
    <!--Body-->
  </div>
</template>

<style lang="scss" scoped>
.bubble {
  border-bottom-left-radius: 40%;
  border-bottom-right-radius: 40%;
  height: 30vh;
}
.stat-block {
  background-color: white;
  border-radius: 20%;
  aspect-ratio: 1 / 1;
}

.w-80 {
  width: 80%;
}

.card-text {
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
}

.highlighted-text {
  text-shadow: 1px 1px 5px black;
}

.rate-card {
  transition: transform 0.4s;
}

.rate-card:hover {
  transform: scale(1.05);
}

.icon-plus {
  color: $accent;
}
</style>
