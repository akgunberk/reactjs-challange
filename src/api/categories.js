// GET https://api.spotify.com/v1/browse/categories
import API from "../utils/axios";

export const getCategories = async function () {
  const api = await API.getInstance();
  const categories = await api.get("browse/categories");
  return categories;
};
