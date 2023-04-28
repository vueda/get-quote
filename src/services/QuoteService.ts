import axios from 'axios';

export type Quote = {
  _id: string;
  author: string;
  content: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
};

export const getQuote = async (tag: string): Promise<Quote | null> => {
  try {
    const res = await axios.get(`https://api.quotable.io/random?tags=${tag}`);
    return res.data;
  } catch {
    return null;
  }
};
