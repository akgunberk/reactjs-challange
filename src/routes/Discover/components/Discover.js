import React, { Component } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import Error from "../../../common/components/Error";
import { getCategories, getNewReleases, getPlaylists } from "../../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "../styles/_discover.scss";

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
      error: false,
      loading: true,
    };
  }

  async componentDidMount() {
    const data = await Promise.allSettled([
      getNewReleases(),
      getPlaylists(),
      getCategories(),
    ]);

    const [newReleases, playlists, categories] = data.map(
      (response) => response?.value
    );

    this.setState({
      newReleases: newReleases ? newReleases.albums.items : [],
      playlists: playlists ? playlists.playlists.items : [],
      categories: categories ? categories.categories.items : [],
      loading: false,
      error: !(newReleases || playlists || categories),
    });
  }

  render() {
    const { newReleases, playlists, categories, error, loading } = this.state;

    if (loading)
      return (
        <FontAwesomeIcon
          className="loading-indicator"
          spin
          icon={faSpinner}
          size="10x"
          color="#564FD8"
        />
      );

    if (error) return <Error />;

    return (
      <div className="discover">
        <DiscoverBlock
          text="RELEASED THIS WEEK"
          id="released"
          data={newReleases}
        />
        <DiscoverBlock
          text="FEATURED PLAYLISTS"
          id="featured"
          data={playlists}
        />
        <DiscoverBlock
          text="BROWSE"
          id="browse"
          data={categories}
          imagesKey="icons"
        />
      </div>
    );
  }
}
