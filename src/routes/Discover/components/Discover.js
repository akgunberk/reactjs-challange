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
    try {
      const [newReleases, playlists, categories] = await Promise.all([
        getNewReleases(),
        getPlaylists(),
        getCategories(),
      ]);

      this.setState({
        newReleases: newReleases.albums.items,
        playlists: playlists.playlists.items,
        categories: categories.categories.items,
      });
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
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
