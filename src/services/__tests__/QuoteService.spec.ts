import axios from 'axios';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getQuote } from '../QuoteService';

vi.mock('axios');

describe('QuoteService', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('deve obter uma citação para a tag informada', async () => {
    const apiQuote = { content: 'A random quote' };
    vi.mocked(axios.get).mockResolvedValue({ data: apiQuote });

    const quote = await getQuote('technology');

    expect(quote).toEqual(apiQuote);
    expect(axios.get).toHaveBeenCalledWith('https://api.quotable.io/random?tags=technology');
  });

  it('deve retornar null para citação não encontrada', async () => {
    vi.mocked(axios.get).mockRejectedValue({ data: 'Quote not Found' });

    const quote = await getQuote('success');

    expect(quote).toBeNull();
    expect(axios.get).toHaveBeenCalledWith('https://api.quotable.io/random?tags=success');
  });
});
