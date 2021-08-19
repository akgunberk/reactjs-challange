// GET https://api.spotify.com/v1/browse/new-releases
import API from "../utils/axios";

export const getNewReleases = async function () {
  const api = await API.getInstance();
  const releases = await api.get("browse/new-releases");
  return releases;
};
