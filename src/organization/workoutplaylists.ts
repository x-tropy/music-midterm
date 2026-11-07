// This file MUST still export `WorkoutPlaylists` as a type name!
//
// You can change the class declaration (e.g. with extends, implements).
//
// The tests in `test/organization/workoutplaylists.ts` will pass when WorkoutPlaylists
// works as expected for Task 3.2.

import assert from "assert";
import { Playlist } from "../items/playlist";

/**
 * A set of workout playlists, organized by runtime.
 */
export class WorkoutPlaylists {
  private members: Playlist[] = [];

  // TODO: Task 3.2: support add and remove, with the same logic
  // and signature as in AlbumArchive, except with Album replaced
  // by Playlist.

  // TODO Task 3.3: support countTies as described.

  /**
   * Gets playlists with runtime in between `low` and `hi`,
   * so users can get playlists that work for their planned
   * workout. Returns the same playlist objects as exist
   * in workoutplaylists.
   *
   * @param low minimum time for playlist, in minutes
   * @pram hi maximum time for playlist, in minutes
   * @returns playlists with runtime in between low and hi
   */
  getPlaylistsWithRuntime(low: number, hi: number): Playlist[] {
    assert(hi >= low, "high bound for playlist length must be greater than or equal to low bound");
    const retList: Playlist[] = [];
    // you can just do this with an array operation, I just thought
    // it would be more interesting to write an implementation that
    // uses the element order.
    for (const p of this.members) {
      if (p.getRunTime() / 60 > hi) {
        return retList;
      } else if (p.getRunTime() / 60 >= low) {
        retList.push(p);
      }
    }
    return retList;
  }
}
