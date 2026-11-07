// This file MUST still export `AlbumArchive` as a type name!
//
// You can change the class declaration (e.g. with extends, implements).
//
// The tests in `test/organization/albumarchive.ts` should continue
// passing no matter your design for Task 3.0.

import type { Album } from "../items/album";

/**
 * An album archive, ordered by year. Can add and remove albums,
 * and get all the album names before a particular year.
 */
export class AlbumArchive {
  private readonly members: Album[] = [];

  // TODO Task 3.3: support countTies as described.

  /**
   * Adds an item to the set if it does not already exist.
   *
   * @param item item to add
   * @returns true if the item was added successfully; false
   * if item already existed
   */
  public add(item: Album): boolean {
    if (this.members.some((t: Album) => t.equals(item))) {
      return false;
    }
    let indexToAddAt: number = 0;
    for (const mem of this.members) {
      if (mem.compare(item) >= 0) {
        this.members.splice(indexToAddAt, 0, item);
        return true;
      }
      indexToAddAt = indexToAddAt + 1;
    }
    this.members.push(item);
    return true;
  }

  /**
   * Removes an album from the archive
   *
   * @param item album to add
   * @returns true if the album was removed successfully; false
   * if the album did not exist.
   */
  public remove(item: Album): boolean {
    const indexToRm: number = this.members.findIndex((a: Album) => a.equals(item));
    if (indexToRm === -1) {
      return false;
    } else {
      this.members.splice(indexToRm, 1);
      return true;
    }
  }

  /**
   * Returns all names of albums in this archive strictly
   * before the given year.
   *
   * @param y year
   * @returns names of albums released before the year `y`
   */
  getAlbumsBeforeYear(y: number): string[] {
    const retAlbums: string[] = [];
    for (const album of this.members) {
      if (album.year < y) {
        retAlbums.push(album.name);
      } else {
        // since the albums are ordered, we can
        // return early here.
        return retAlbums;
      }
    }
    return retAlbums;
  }
}
