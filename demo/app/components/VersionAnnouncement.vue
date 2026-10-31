<template>
  <dialog
    ref="dialog"
    class="modal"
    closedby="none"
    aria-labelledby="v2-announcement-title"
    aria-describedby="v2-announcement-description"
    @cancel="preventDismiss"
  >
    <div class="modal-box">
      <span class="badge badge-primary badge-soft mb-4">New release</span>
      <h2
        id="v2-announcement-title"
        class="text-2xl font-bold"
      >
        Epic Spinners v2 is out!
      </h2>
      <p
        id="v2-announcement-description"
        class="text-base-content/70 mt-3"
      >
        You're browsing v1. Try the latest version of Epic Spinners, or keep
        exploring v1 here.
      </p>

      <div class="modal-action flex-wrap">
        <button
          type="button"
          class="btn btn-ghost"
          @click="stayOnV1"
        >
          Stay on v1
        </button>
        <a
          href="https://tw-epic-spinners.mthaip.com/"
          class="btn btn-primary"
          @click="markSeen"
        >
          Try v2 <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
const dialog = ref<HTMLDialogElement | null>(null);
const storageKey = 'hasSeenV2PopUp';

const preventDismiss = (event: Event) => {
  event.preventDefault();
};

const markSeen = () => {
  try {
    localStorage.setItem(storageKey, 'true');
  } catch {
    // Keep dismissal working when browser storage is unavailable.
  }
};

const stayOnV1 = () => {
  markSeen();
  dialog.value?.close();
};

onMounted(() => {
  let hasSeen = false;

  try {
    const storedValue = localStorage.getItem(storageKey);
    hasSeen = storedValue !== null && storedValue !== 'false';
  } catch {
    // Treat unavailable storage as a first visit.
  }

  if (!hasSeen) {
    dialog.value?.showModal();
  }
});
</script>
