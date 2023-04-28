<script setup lang="ts">
import { computed } from 'vue';
import type { Quote } from '../services/QuoteService';

type QuoteListProps = {
  quotes: Quote[];
};

const props = defineProps<QuoteListProps>();

const lastThreeQuotes = computed(() => {
  return Array.from(props.quotes).reverse().slice(0, 3);
});
</script>

<template>
  <h2 class="mt-3">Last 3 quotes</h2>
  <ul data-cy="quotesList" v-if="quotes.length > 0" class="list-group">
    <li v-for="quote in lastThreeQuotes" :key="quote._id" class="list-group-item quote-item">
      <div>
        <p>{{ quote.content }}</p>
        <small class="text-body-secondary">
          {{ quote.author }}
        </small>
      </div>
      <span class="badge bg-primary rounded-pill">{{ quotes.indexOf(quote) + 1 }}</span>
    </li>
  </ul>
  <div v-else data-cy="noQuotesMessage" class="alert alert-info" role="alert">
    No quotes to show
  </div>
</template>

<style>
.quote-item {
  width: 370px;
}
</style>
