import assert from "node:assert";
import type { Genre, Song } from "./song";

/**
 * An ordered list of songs. The same song can appear multiple
 * times in a playlist.
 */
export class Playlist {
  public readonly name: string;
  private readonly songs: Song[] = [];

  /**
   * Construct a playlist with a given name
   * @param name name of the playlist
   */
  public constructor(name: string) {
    this.name = name;
  }

  /**
   * Add a song to the playlist at the given index.
   *
   * @param song song to add
   * @param index index to add at
   * @throws if index is invalid (not a whole number or out of range)
   */
  public addAtIdx(song: Song, index: number): void {
    assert(index >= 0 && index <= this.songs.length && index % 1 === 0, "not a valid index");
    this.songs.splice(index, 0, song);
  }

  /**
   * Remove a song from the playlist at the given index.
   *
   * @param index index to add at
   * @throws if index is invalid (not a whole number or out of range)
   */
  public removeAtIdx(index: number): void {
    assert(index >= 0 && index <= this.songs.length && index % 1 === 0, "not a valid index");
    this.songs.splice(index, 1);
  }

  /**
   * Length of the playlist in songs.
   *
   * @returns number of songs in this playlist
   */
  public getNumberofSongs(): number {
    return this.songs.length;
  }

  /**
   * Returns the run time of this playlist, i.e. the total
   * time it takes to play all the songs.
   *
   * @returns the runtime of of this playlist
   */
  public getRunTime(): number {
    return this.songs.reduce((acc: number, s: Song) => s.duration + acc, 0);
  }

  /**
   * Returns the number of songs with the given genre in
   * this playlist
   *
   * @param genre genre to count
   * @returns number of songs with the genre `genre`
   */
  public getGenreFrequency(genre: Genre): number {
    // TODO: Task 1.1.
    return -1;
  }

  /**
   * Returns all the genres that occur in this playlist,
   * sorted in alphabetical order. Each genre will occur
   * at most once in the output list.
   *
   * @returns all genres that occur at least once
   * in this playlist, with no duplicates, sorted in
   * alphabetical order.
   */
  public getUniqueGenres(): Genre[] {
    // TODO: Task 1.2. You may find the string method localeCompare useful.
    return [];
  }

  /**
   * Two playlists are equal if they have the same
   * name and the same song in the same order.
   *
   * @param other playlist to compare to
   * @returns true if the playlists are equal
   */
  public equals(other: Playlist): boolean {
    if (other.name !== this.name) {
      return false;
    }
    if (other.songs.length !== this.songs.length) {
      return false;
    }
    for (let i = 0; i < this.songs.length; i++) {
      if (!this.songs[i].equals(other.songs[i])) {
        return false;
      }
    }
    return true;
  }

  /**
   * Compares two playlists based on runtime;
   * returns -1 if this playlist is shorter than other;
   * 0 if they have the same runtime; 1 if this
   * playlist is longer than the other.
   *
   * @param other playlist to compare to
   * @returns ordering between playlists
   */
  public compare(other: Playlist): number {
    if (this.getRunTime() < other.getRunTime()) {
      return -1;
    } else if (this.getRunTime() > other.getRunTime()) {
      return 1;
    } else {
      return 0;
    }
  }
}
