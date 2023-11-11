import { authAxios } from '@/services/axios/axios';
import { CategoryDto } from '@/types/category/category-types';

async function getCategories(page: number = 0, size: number = 10) {
  const getAllEndpoint = 'api/tasks-category/all';
  return await authAxios.get<CategoryDto[]>(getAllEndpoint, { params: { page: page, size: size } }).then((response) => {
    return response.data;
  });
}

async function getSharedCategories(page: number = 0, size: number = 10) {
  const getAllSharedEndpoint = 'api/tasks-category/shared/all';
  return await authAxios
    .get<CategoryDto[]>(getAllSharedEndpoint, { params: { page: page, size: size } })
    .then((response) => {
      return response.data;
    });
}

async function addCategory(category: CategoryDto) {
  const addEndpoint = 'api/tasks-category/new-category';
  return await authAxios.post<CategoryDto>(addEndpoint, category).then((response) => {
    return response.data;
  });
}

async function getCategory(id: number) {
  const getEndpoint = `api/tasks-category/${id}`;
  return await authAxios.get<CategoryDto>(getEndpoint).then((response) => {
    return response.data;
  });
}

export { getCategory, getCategories, getSharedCategories, addCategory };
