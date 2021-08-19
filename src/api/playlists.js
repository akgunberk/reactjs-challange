// GET https://api.spotify.com/v1/browse/featured-playlists
import API from "../utils/axios";

export const getPlaylists = async function () {
  const api = await API.getInstance();
  const playlists = await api.get("browse/featured-playlists");
  return playlists;
};
