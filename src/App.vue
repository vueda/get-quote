<script setup lang="ts">
import { ref } from 'vue';
import QuoteList from '@/components/QuoteList.vue';
import QuoteSearcher from '@/components/QuoteSearcher.vue';
import type { Quote } from '@/services/QuoteService';

const quotes = ref<Quote[]>([]);
const addQuote = (quote: Quote) => {
  quotes.value.push(quote);
};
</script>

<template>
  <quote-searcher @quote-found="addQuote" />
  <quote-list :quotes="quotes" />
</template>
