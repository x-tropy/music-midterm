// You do not need to modify this file; that is why it is read-only.

import assert from "node:assert";

/**
 * Represents an artist (single artist or band), keeping track
 * of the formed year (year band formed or artist started being
 * active), the public name of the artist, and the name of all
 * members.
 */
export class Artist {
  // name of the artist/band
  public readonly name: string;
  // year of formation of the artist/band
  public readonly formedYear: number;
  // real names of all members of artist/band
  private readonly members: string[];

  /**
   * Constructs an artist with a name, year of formation,
   * and members.
   *
   * @param n name of the artist (as on albums etc)
   * @param y year the artist became active/band was formed
   * @param ms name of all members of the artist/band
   */
  public constructor(n: string, y: number, ms: string[]) {
    assert(y % 1 === 0, "formed year must be a whole number");
    assert(y >= 1900 && y <= 2026, "formed year must be a valid year from 1900 to now");
    this.name = n;
    this.formedYear = y;
    this.members = ms;
  }

  /**
   * Returns the real names of all members
   * of this artist.
   *
   * @returns the names of all the members
   */
  public getMembers(): string[] {
    const ret: string[] = [];
    for (const m of this.members) {
      ret.push(m);
    }
    return ret;
  }

  /**
   * Check whether a given member is a part of this artist.
   *
   * @param member member to check for
   * @returns true if `member` is a part of this artist
   */
  public containsMember(member: string): boolean {
    return this.members.indexOf(member) !== -1;
  }

  /**
   * Returns true if the two artists are equal.
   *
   * @returns true if this artist is equal to `other`
   */
  public equals(other: Artist): boolean {
    if (this.name !== other.name) {
      return false;
    }
    if (this.formedYear !== other.formedYear) {
      return false;
    }
    if (this.getMembers().length !== other.getMembers().length) {
      return false;
    }
    for (const m of this.getMembers()) {
      if (!other.containsMember(m)) {
        return false;
      }
    }
    return true;
  }
}
