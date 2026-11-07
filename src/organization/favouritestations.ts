// This file MUST still export `FavouriteStations` as a type name!
//
// You can change the class declaration (e.g. with extends, implements).
//
// The tests in `test/organization/favouritestations.ts` will pass when FavouriteStations
// works as expected for Task 3.1.

import type { RadioStation } from "../items/radiostation";

/**
 * A set of favourite radio stations, organized by frequency
 */
export class FavouriteStations {
  private readonly members: RadioStation[] = [];

  // TODO: Task 3.1: support add and remove, with the same logic
  // and signature as in AlbumArchive, except with Album replaced
  // by RadioStation.

  // TODO Task 3.3: support countTies as described.

  /**
   * Returns all stations in the archive in a given location.
   *
   * @param loc location
   * @returns names of albums released before the year `y`
   */
  getStationsInCity(loc: string): RadioStation[] {
    return this.members.filter((rs: RadioStation) => rs.city === loc);
  }
}
