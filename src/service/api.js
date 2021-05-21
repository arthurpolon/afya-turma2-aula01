import axios from 'axios';

export const api = axios.create({
  baseURL: "https://api.chucknorris.io/jokes/",
});

export const postForm = axios.create({
  baseURL: "https://webhook.site/06f93382-0c01-4ba6-8a94-3bfb058e5939",
});

