import API from './api';

export const fetchArticles   = ()              => API.get('/articles');
export const createArticle   = (article)       => API.post('/articles', article);
export const updateArticle   = (id, article)   => API.put(`/articles/${id}`, article);
export const deleteArticle   = (id)            => API.delete(`/articles/${id}`);
export const toggleArticle   = (id)            => API.patch(`/articles/${id}/toggle`);
