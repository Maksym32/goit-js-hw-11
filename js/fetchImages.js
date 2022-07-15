import axios from "axios";
axios.defaults.baseURL = 'https://pixabay.com/api/';

let page = 1;

export async function fetchImages(searchText) {

  const optionParams = new URLSearchParams(
    {
      key: '28406971-da9ac527785fed0c52df2227a',
      q: searchText,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 40,
    },
  )    
        
  
  const { data } = await axios.get(`?${optionParams}`);
  page += 1;
  return data;
}

  export function resetPage() {
    page = 1;
}