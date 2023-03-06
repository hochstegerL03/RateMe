<script setup>
import QuasarHeader from '../components/QuasarHeader.vue';
import { ref, onMounted } from 'vue';
import { Notify } from 'quasar';
import axios from 'axios';

const cloudName = 'dqxcfzewl';
const uploadData = ref();
const uploadContent = ref();
const feedbackUrl = ref();
const blobData = ref();

const prepareData = () => {
  uploadData.value = new FormData();
  uploadData.value.append('upload_preset', 'rate-me');
  uploadData.value.append('file', uploadContent.value);
};

const imageUploader = async () => {
  console.log(blobData.value);
  const reader = new FileReader();
  reader.readAsDataURL(blobData.value);
  reader.addEventListener('load', () => {
    uploadContent.value = reader.result;
    prepareData();
    let requestObj = {
      url: 'https://api.cloudinary.com/v1_1/rate-me/upload',
      method: 'POST',
      data: uploadData.value,
    };
    axios(requestObj).then((res) => {
      let { data } = res;
      feedbackUrl.value = data.secure_url;
    });
  });
};

const deployCard = () => {
  newCard.value.image = feedbackUrl.value;
  console.log(newCard.value);
};

let cameraStream;
const categories = ref(['Food', 'Sport', 'Others']);
const newCard = ref({
  id: '',
  title: '',
  description: '',
  image: '',
  category: '',
  rating: 0,
  subtitle: '',
  details: '',
  date: '',
  location: [],
});

onMounted(() => {
  getStream();
});

function getCoordinates() {
  navigator.geolocation.getCurrentPosition(async (location) => {
    newCard.value.location = await [location.coords.latitude, location.coords.longitude];
  });
}

function getUserMedia(options, successCallback, failureCallback) {
  let api =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;
  if (api) {
    return api.bind(navigator)(options, successCallback, failureCallback);
  }
}

function getStream() {
  if (
    !navigator.getUserMedia &&
    !navigator.webkitGetUserMedia &&
    !navigator.mozGetUserMedia &&
    !navigator.msGetUserMedia
  ) {
    Notify.create({
      message: 'Camera not supported',
      color: 'negative',
      position: 'top',
      actions: [
        {
          label: 'Dismiss',
          color: 'white',
          handler: () => {
            /* ... */
          },
        },
      ],
    });
    return;
  }

  let constraints = {
    video: {
      facingMode: 'environment',
    },
  };

  getUserMedia(
    constraints,
    function (stream) {
      let mediaControl = document.getElementById('cameraStream');
      if ('srcObject' in mediaControl) {
        mediaControl.srcObject = stream;
      } else if (navigator.mozGetUserMedia) {
        mediaControl.mozSrcObject = stream;
      } else {
        mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
      }
      cameraStream = stream;
    },
    function (err) {
      Notify.create({
        message: 'Camera not found',
        color: 'negative',
        position: 'top',
        actions: [
          {
            label: 'Dismiss',
            color: 'white',
            handler: () => {
              /* ... */
            },
          },
        ],
      });
    },
  );
}

function takePhoto() {
  if (!('ImageCapture' in window)) {
    Notify.create({
      message: 'Permissions denied',
      color: 'negative',
      position: 'top',
      actions: [
        {
          label: 'Dismiss',
          color: 'white',
          handler: () => {
            /* ... */
          },
        },
      ],
    });
    return;
  }

  if (!cameraStream) {
    Notify.create({
      message: 'Camera not found',
      color: 'negative',
      position: 'top',
      actions: [
        {
          label: 'Dismiss',
          color: 'white',
          handler: () => {
            /* ... */
          },
        },
      ],
    });
    return;
  }

  let imageCapturer = new ImageCapture(cameraStream.getVideoTracks()[0]);
  imageCapturer
    .takePhoto()
    .then((blob) => {
      blobData.value = blob;
      imageUploader();
      newCard.value.image = URL.createObjectURL(blob);
      getCoordinates();
    })
    .catch((err) => alert('Error: ' + err));
}
</script>

<template>
  <div>
    <QuasarHeader></QuasarHeader>
    <div class="cameraContainer">
      <video id="cameraStream" autoplay class="camera"></video>
      <div class="preview cover">
        <div class="flex justify-end cover">
          <div class="previewImg q-mt-md q-mr-md">
            <q-img v-if="!newCard.image == ''" :src="newCard.image" class="elevated" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center q-mt-md">
      <div @click="takePhoto" class="snap q-pa-sm q-mb-md flex items-center">
        <div class="text-weight-bold">
          <span>Take Photo!</span>
        </div>
      </div>
    </div>
    <div class="flex justify-center q-mt-md">
      <div style="width: 80%">
        <q-input v-model="newCard.title" label="Title" />
        <q-input v-model="newCard.description" label="Description" />
        <q-input v-model="newCard.subtitle" label="Subtitle" />
        <q-input v-model="newCard.details" label="Details" />
        <q-select v-model="newCard.category" :options="categories" label="Category" />
        {{ newCard.location }}
        <div class="flex justify-center">
          <q-rating v-model="newCard.rating" :max="5" size="200%" color="info" class="q-mb-md" />
        </div>
        <div class="flex justify-center">
          <q-btn flat color="primary" label="Save" @click="deployCard" class="q-mb-lg" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.snap {
  border-radius: 100%;
  background-color: $primary;
  color: white;
  aspect-ratio: 1 / 1;
}

.cameraContainer {
  position: relative;
  height: 45vh;
  background-color: $secondary;
}

.camera {
  width: 100%;
  height: 45vh;
  position: absolute;
  z-index: 1 !important;
}

.preview {
  position: absolute;
  z-index: 99 !important;
}

.cover {
  width: 100%;
  height: 100%;
}

.previewImg {
  width: 160px;
  height: 90px;
}

.elevated {
  box-shadow: 2px 2px 10px black;
}
</style>
