import assert from "node:assert";
import type { Genre } from "./song";

/**
 * A representation of a radiostation, with a name,
 * FM frequency, city, and list of genres.
 */
export class RadioStation {
  public readonly name: string;
  public readonly frequency: number;
  public readonly city: string;
  private readonly genres: Genre[];

  /**
   * Checks whether `frequency` is a valid FM frequency (between
   * 87.9 and 107.9, going up in intervals of 0.2)
   * @param frequency frequency to check
   * @throw if the input frequency is not a valid FM frequency
   */
  private checkFrequency(frequency: number): void {
    assert(frequency >= 87.9 && frequency <= 107.9, "frequency is out of bounds");
    assert((frequency * 10) % 2 === 1, "frequency must have a single odd digit after the zero");
  }

  /**
   * Constructs a radio station. Throws if the frequency is invalid.
   *
   * @param name radio station name
   * @param frequency FM frequency
   * @param city city where we can get this radio reception
   * @param genres genres this station plays
   */
  public constructor(name: string, frequency: number, city: string, genres: Genre[]) {
    this.checkFrequency(frequency);
    this.name = name;
    this.frequency = frequency;
    this.city = city;
    this.genres = genres;
  }

  /**
   * Genres this radio station plays.
   *
   * @returns the genres this radio station plays.
   */
  public getGenres(): Genre[] {
    return [...this.genres];
  }

  /**
   * Two radio stations are equal if they have the same
   * frequency and city. (names and genres might change
   * slightly)
   *
   * @param other station to compare to
   * @returns radio stations are in the same city and
   * have the same frequency
   */
  public equals(other: RadioStation): boolean {
    return this.name === other.name && this.frequency === other.frequency;
  }

  /**
   * Compares two RadioStations based on frequency;
   * returns -1 if this has smaller frequency than other;
   * 0 if they have the same frequency; 1 if this'
   * frequency is greater than the other's.
   *
   * @param other RadioStation to compare to
   * @returns ordering between RadioStations
   */
  public compare(other: RadioStation): number {
    if (this.frequency < other.frequency) {
      return -1;
    } else if (this.frequency > other.frequency) {
      return 1;
    } else {
      return 0;
    }
  }
}
