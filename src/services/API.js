import axios from 'axios';

export const searchPicture = async (search, page) => {
  const instance = axios.create({
    baseURL: 'https://pixabay.com/api/',
    params: {
      key: '40561490-987845abf3df265fd0eb86848',
      image_type: 'photo',
      safesearch: true,
      orientation: 'horizontal',
      q: search,
      page,
      per_page: 12,
    },
  });
  const { data } = await instance.get();
  return data;
};
