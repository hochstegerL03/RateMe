<script setup>
import { ref, onMounted } from 'vue';
import QuasarHeader from '../components/QuasarHeader.vue';
import { useCardStore } from '../store/cardStore.js';

const cardStore = useCardStore();
const activeCard = ref();
const detailImage = ref(false);
const cardEditor = ref();
const changeTitel = ref(false);
const search = ref('');
const categories = ref(['Food', 'Sport', 'Others']);
const cards = ref([]);

onMounted(async () => {
  await cardStore.getCards();
  cards.value = cardStore.cards;
});

function openDialog(card) {
  activeCard.value = card;
  cardEditor.value = true;
}

function openMap(x, y) {
  console.log('TEst');
  window.open(`https://www.google.at/maps/@${x},${y},21z`);
}

function saveChanges(tag, el, id) {
  el = document.getElementById(el).textContent;
  cards.value[cards.value.findIndex((el) => el.id == id)][tag] = el;
}
</script>

<template>
  <div>
    <QuasarHeader></QuasarHeader>
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
              <q-img :src="card.image" @click="openDialog(card)">
                <div class="bg-transparent highlighted-text">
                  <div class="q-pa-sm">
                    <div class="text-h4 text-weight-bold">{{ card.title }}</div>
                    <div>{{ card.description }}</div>
                  </div>
                </div>
              </q-img>

              <q-card-section>
                <q-btn
                  @click="openMap(...card.location)"
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
        <div class="w-80 flex justify-center">
          <i @click="$router.push('/card')" class="fa-solid fa-plus fa-5x icon-plus q-mb-xl"></i>
        </div>
      </div>
      <!--Body-->

      <!--Dialog-->
      <q-dialog v-if="activeCard" v-model="cardEditor" position="bottom">
        <q-card class="cardEditor">
          <q-card-section>
            <div class="row items-center justify-center q-mt-lg">
              <div id="acTitle" contenteditable="true" class="text-h5 text-weight-bold">
                {{ activeCard.title }}
              </div>
              <i
                class="q-ml-lg fa-solid fa-pen fa-xl"
                @click="saveChanges('title', 'acTitle', activeCard.id)"
              ></i>
              <q-popup-edit v-model="activeCard.title" v-slot="scope" auto-save>
                <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set" />
              </q-popup-edit>
            </div>
          </q-card-section>
          <q-card-section class="flex justify-center">
            <div class="w-80">
              <q-img @click="detailImage = true" class="borderedImage" :src="activeCard.image">
                <div class="bg-transparent flex justify-end w-100">
                  <div class="hovericon flex justify-center items-center">
                    <i class="q-ma-md fa-solid fa-pen fa-lg" @click=""></i>
                  </div>
                </div>
              </q-img>
            </div>
          </q-card-section>
          <q-card-section class="flex justify-center">
            <div class="w-80">
              <div class="row justify-center">
                <div class="w-80">
                  <span class="text-body1 text-weight-bold">Description: </span>
                  <span id="acDescription">{{ activeCard.description }} </span>
                </div>
                <i
                  class="q-ml-md fa-solid fa-pen fa-lg"
                  @click="saveChanges('description', 'acDescription', activeCard.id)"
                ></i>
                <q-popup-edit
                  v-model="activeCard.description"
                  v-slot="scope"
                  auto-save
                  :cover="false"
                  self="top start"
                >
                  <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set" />
                </q-popup-edit>
              </div>
            </div>
            <div class="w-80 q-mt-md">
              <div class="row justify-center">
                <div class="w-80">
                  <span class="text-body1 text-weight-bold">Subtitle: </span>
                  <span id="acSubtitle" contenteditable="true">{{ activeCard.subtitle }} </span>
                </div>
                <i
                  class="q-ml-md fa-solid fa-pen fa-lg"
                  @click="saveChanges('subtitle', 'acSubtitle', activeCard.id)"
                ></i>
                <q-popup-edit
                  v-model="activeCard.subtitle"
                  v-slot="scope"
                  auto-save
                  :cover="false"
                  self="top start"
                >
                  <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set" />
                </q-popup-edit>
              </div>
            </div>
            <div class="w-80 q-mt-md">
              <div class="row justify-center">
                <div class="w-80">
                  <span class="text-body1 text-weight-bold">Details: </span>
                  <span id="acDetails" contenteditable="true">{{ activeCard.details }} </span>
                </div>
                <i
                  class="q-ml-md fa-solid fa-pen fa-lg"
                  @click="saveChanges('details', 'acDetails', activeCard.id)"
                ></i>
                <q-popup-edit
                  v-model="activeCard.details"
                  v-slot="scope"
                  auto-save
                  :cover="false"
                  self="top start"
                >
                  <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set" />
                </q-popup-edit>
              </div>
            </div>
            <div class="w-80 q-mt-md">
              <div class="row justify-center">
                <q-select
                  class="w-80 q-mt-md text-center"
                  v-model="activeCard.category"
                  :options="categories"
                />
              </div>
            </div>
          </q-card-section>
          <q-card-section class="flex justify-center">
            <q-rating v-model="activeCard.rating" :max="5" size="300%" color="info" />
          </q-card-section>
        </q-card>
      </q-dialog>
      <!--Dialog End-->
      <!--Image Dialog-->
      <q-dialog v-model="detailImage">
        <q-img class="borderedImage" :src="activeCard.image"> </q-img>
      </q-dialog>
      <!--Image Dialog End-->
    </div>
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

.w-100 {
  width: 100%;
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

.cardEditor {
  width: 100% !important;
  height: 80vh !important;
  border-radius: 50px 50px 0px 0px;
}

.borderedImage {
  border-radius: 1rem !important;
  width: 100%;
}

.hovericon {
  background-color: white !important;
  color: black;
  border-radius: 100%;
  width: 30px;
  height: 30px;
}
</style>
