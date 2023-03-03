<script setup>
import QuasarHeader from '../components/QuasarHeader.vue';
import { ref, onMounted } from 'vue';
import { Notify } from 'quasar';

let cameraStream;
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
    video: true,
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
  console.log(imageCapturer);
  imageCapturer
    .takePhoto()
    .then((blob) => {
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
      <div @click="takePhoto" class="snap q-pa-sm flex items-center">
        <div class="text-weight-bold">
          <span>Take Photo!</span>
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
