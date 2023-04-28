<script setup lang="ts">
import { getQuote } from '@/services/QuoteService';
import { ref } from 'vue';

const emit = defineEmits(['quote-found']);

const tag = ref('');
const searchQuote = async () => {
  const quote = await getQuote(tag.value);
  if (quote) emit('quote-found', quote);
};
</script>

<template>
  <div class="row mt-2">
    <div class="col-auto">
      <input
        data-cy="quoteTagInput"
        v-model="tag"
        class="form-control"
        placeholder="I want a quote for..."
      />
    </div>
    <div class="col-auto">
      <button data-cy="searchQuoteButton" @click="searchQuote" class="btn btn-primary">
        Search
      </button>
    </div>
  </div>
</template>
