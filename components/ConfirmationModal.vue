<template>
  <div v-if="confirmModal" class="confirmation-modal">
    <div class="modal-text">
      <p class="text-xl my-4">Are you Sure for Delete?</p>
      <div class="modal-action">
        <button
          class="text-white bg-green-500 py-2 px-6 mx-2 my-4 rounded"
          @click="openConfirmModal()"
        >
          Cancel
        </button>
        <span>
          <button
            class="delete bg-red-600 text-white py-2 px-6 mx-2 my-4 rounded"
            data-title="Delete"
          >
            Delete
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('confirm', ['confirmModal']),
  },
  methods: {
    ...mapActions('confirm', ['openConfirmModal']),
  },
}
</script>

<style lang="scss" scoped>
.confirmation-modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 25px;
  z-index: 9999999;
}

.modal-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transition: 0.5s;
  width: 100%;
  min-width: 200px;
  max-width: 400px;
  min-height: 250px;
  background: white;
  transform: translate(-50%, -50%);
  padding: 1em;
  text-align: center;
  border: 2px solid lightgray;
  border-radius: 8px;
  @apply shadow-md;
}
</style>
