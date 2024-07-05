import axios from 'axios';
import cheerio from 'cheerio';

const fetchOpenGraphData = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const openGraphData = {
      title: $('meta[property="og:title"]').attr('content'),
      description: $('meta[property="og:description"]').attr('content'),
      image: $('meta[property="og:image"]').attr('content'),
    };

    return openGraphData;
  } catch (error) {
    console.error('Error fetching Open Graph data:', error);
    return null;
  }
};

export default fetchOpenGraphData;
