import assert from "node:assert";
import type { Artist } from "./artist";
import type { Song } from "./song";

/**
 * An album with a given name, by a given artist, released
 * in a given year, with some songs.
 */
export class Album {
  public readonly name: string;
  public readonly artist: Artist;
  public readonly year: number;
  private readonly songs: Song[] = [];

  /**
   * Constructs an album with a given name, by a given artist, released
   * in a given year, with empty number of songs.
   *
   * @param n name of the album
   * @param a artist of the album
   * @param y year the album was released
   */
  public constructor(n: string, a: Artist, y: number) {
    assert(y % 1 === 0, "album release year must be a whole number");
    assert(y >= 1900 && y <= 2026, "album release year must be a valid year from 1900 to now");
    this.name = n;
    this.artist = a;
    this.year = y;
  }

  /**
   * Tries to add a song to the album. A song cannot be added
   * if its artists does not contain the main artist of the album,
   * and if the song already exists on the album.
   *
   * @param song song to add
   * @returns true if song was successfully added, false otherwise
   */
  public addSong(song: Song): boolean {
    const hasThisAlbumArtist: boolean = song.getArtists().some((a: Artist) => a.equals(this.artist));
    if (!hasThisAlbumArtist) {
      return false;
    }
    for (const s of this.songs) {
      if (song.equals(s)) {
        return false;
      }
    }
    this.songs.push(song);
    return true;
  }

  /**
   * Get the album's tracklist.
   *
   * @returns the names of all song in this album, in order
   * of appearance.
   */
  public getTrackList(): string[] {
    return this.songs.map((s: Song) => s.name);
  }

  /**
   * Returns true if the two albums are equal.
   *
   * @returns true if this album is equal to `other`
   */
  public equals(other: Album): boolean {
    if (this.name !== other.name) {
      return false;
    }
    // ⚠️ GUESS: lines 72-74 were hidden in the screenshot; assumed to compare year.
    // ⚠️ 推测：原截图第 72-74 行被挡住，按常理补为比较 year。
    if (this.year !== other.year) {
      return false;
    }
    if (!this.artist.equals(other.artist)) {
      return false;
    }
    if (this.songs.length !== other.songs.length) {
      return false;
    }
    let idx: number = 0;
    for (const m of this.songs) {
      if (!other.songs[idx].equals(m)) {
        return false;
      }
      idx = idx + 1;
    }
    return true;
  }

  /**
   * Compares two album based on the year of release;
   * returns -1 if this album was released before other;
   * 0 if they were released at the same time; 1 if this
   * album was released after other.
   *
   * @param other artist to compare to
   * @returns ordering between
   */
  public compare(other: Album): number {
    if (this.year < other.year) {
      return -1;
    } else if (this.year > other.year) {
      return 1;
    } else {
      return 0;
    }
  }
}
