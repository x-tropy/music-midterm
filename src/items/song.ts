// You do not need to modify this file; that is why it is read-only.

import type { Artist } from "./artist";

// Represents Genres
export type Genre = "alt" | "hip-hop" | "rap" | "classical" | "rock" | "emo" | "pop" | "electronic";

/**
 * A song has a name, artists (multiple artists allowed), a duration,
 * and genres (multiple genres allowed).
 */
export class Song {
  public readonly name: string;
  private readonly artists: Artist[];
  public readonly duration: number;
  private readonly genres: Genre[];

  /**
   * Construct a song with a name, artists (multiple artists allowed),
   * a duration, and genres (multiple genres allowed).
   * @param n name of song
   * @param as artists
   * @param duration length of song
   * @param gs genres
   */
  public constructor(n: string, as: Artist[], duration: number, gs: Genre[]) {
    this.name = n;
    this.artists = [...as];
    this.duration = duration;
    this.genres = [...gs];
  }

  /**
   * Returns a shallow copy of the artists on this song.
   * Shallow copy ok because artists are immutable.
   *
   * @returns all the artists on this song
   */
  public getArtists(): Artist[] {
    const ret: Artist[] = [];
    for (const a of this.artists) {
      ret.push(a);
    }
    return ret;
  }

  /**
   * Returns the song's genres.
   *
   * @returns the song's genres
   */
  public getGenres(): Genre[] {
    const ret: Genre[] = [];
    for (const g of this.genres) {
      ret.push(g);
    }
    return ret;
  }

  /**
   * A song is equal to another song if it has
   * the same name, artists, and duration. Genre
   * is somewhat subjective.
   *
   * @param other song to compare to
   * @returns whether the songs are equal modulo geners
   */
  public equals(other: Song): boolean {
    if (other.name !== this.name || other.duration !== this.duration) {
      return false;
    }
    if (other.artists.length !== this.artists.length) {
      return false;
    }
    for (const a of this.getArtists()) {
      if (!other.getArtists().some((otherA: Artist) => a.equals(otherA))) {
        return false;
      }
    }
    return true;
  }
}
