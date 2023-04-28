import { getQuote } from '@/services/QuoteService';
import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import QuoteSearcher from '../QuoteSearcher.vue';

vi.mock('@/services/QuoteService');

describe('QuoteSearcher', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('deve emitir evento quote-found com dados da citação encontrada', async () => {
    const quoteFound = {
      _id: '1',
      author: 'Autor 1',
      content: 'Conteúdo 1',
      tags: ['tag-1'],
      authorSlug: 'autor-1',
      length: 1,
      dateAdded: '2023-04-28',
      dateModified: '2023-04-28'
    };
    vi.mocked(getQuote).mockResolvedValue(quoteFound);

    const wrapper = mount(QuoteSearcher);

    await wrapper.find('input').setValue('technology');
    await wrapper.find('button').trigger('click');

    expect(getQuote).toHaveBeenCalledWith('technology');
    const quoteFoundEvents = wrapper.emitted('quote-found');
    expect(quoteFoundEvents?.length).toBe(1);
    const [quoteData] = quoteFoundEvents?.at(0) || [];
    expect(quoteData).toEqual(quoteFound);
  });

  it('não deve emitir evento quote-found quando não encontrar citação', async () => {
    vi.mocked(getQuote).mockResolvedValue(null);

    const wrapper = mount(QuoteSearcher);

    await wrapper.find('input').setValue('zzz');
    await wrapper.find('button').trigger('click');

    expect(getQuote).toHaveBeenCalledWith('zzz');
    expect(wrapper.emitted('quote-found')).toBeUndefined();
  });
});
