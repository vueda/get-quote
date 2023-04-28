import type { Quote } from '@/services/QuoteService';
import { DOMWrapper, mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import QuoteList from '../QuoteList.vue';

function getQuotes(quantity = 4) {
  const quotes: Quote[] = [];
  for (let idx = 1; idx <= quantity; idx++) {
    quotes.push({
      _id: `${idx}`,
      author: `Autor ${idx}`,
      content: `Conteúdo ${idx}`,
      tags: [`tag-${idx}`],
      authorSlug: `autor-${idx}`,
      length: 1,
      dateAdded: '2023-04-28',
      dateModified: '2023-04-28'
    });
  }
  return quotes;
}

function verifyListItemContent(item: DOMWrapper<HTMLLIElement> | undefined, idx: number) {
  expect(item?.find('p').text()).toBe(`Conteúdo ${idx}`);
  expect(item?.find('small').text()).toBe(`Autor ${idx}`);
  expect(item?.find('span').text()).toBe(`${idx}`);
}

describe('QuoteList', () => {
  it('quando não tem citações exibe mensagem informativa', () => {
    const props = { quotes: [] };
    const wrapper = mount(QuoteList, { props });

    const alert = wrapper.find('[role=alert]');
    expect(alert.text()).toContain('No quotes to show');
  });

  it('quando tem citações exibe as últimas 3', () => {
    const props = {
      quotes: getQuotes()
    };
    const wrapper = mount(QuoteList, { props });

    const items = wrapper.findAll('li');
    expect(items.length).toBe(3);
    verifyListItemContent(items.at(0), 4);
    verifyListItemContent(items.at(1), 3);
    verifyListItemContent(items.at(2), 2);
  });
});
