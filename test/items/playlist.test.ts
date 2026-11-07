import { Playlist } from "../../src/items/playlist";
import { describe, expect, test } from "vitest";
import { Song } from "../../src/items/song";
import { Artist } from "../../src/items/artist";

const artist: Artist = new Artist("Test Band", 2001, ["a", "b", "c"]);

describe("getGenreFrequency", () => {
  test("returns 0 for a genre that doesn't exist", () => {
    const pl: Playlist = new Playlist("test");
    const song1: Song = new Song("x", [artist], 180, ["alt"]);
    const song2: Song = new Song("t", [artist], 180, ["electronic"]);
    const song3: Song = new Song("z", [artist], 180, ["rock"]);
    pl.addAtIdx(song1, 0);
    pl.addAtIdx(song2, 0);
    pl.addAtIdx(song3, 0);
    expect(pl.getGenreFrequency("rap")).to.equal(0);
  });
  test("counts multiple songs with a genre", () => {
    const pl: Playlist = new Playlist("test");
    const song1: Song = new Song("x", [artist], 180, ["alt"]);
    const song2: Song = new Song("t", [artist], 180, ["electronic"]);
    const song3: Song = new Song("z", [artist], 180, ["rock"]);
    const song4: Song = new Song("aa", [artist], 180, ["electronic"]);
    pl.addAtIdx(song1, 0);
    pl.addAtIdx(song2, 0);
    pl.addAtIdx(song3, 0);
    pl.addAtIdx(song4, 0);
    expect(pl.getGenreFrequency("alt")).to.equal(1);
    expect(pl.getGenreFrequency("electronic")).to.equal(2);
    expect(pl.getGenreFrequency("rock")).to.equal(1);
  });
  test("counts song with multiple genres", () => {
    const pl: Playlist = new Playlist("test");
    const song1: Song = new Song("x", [artist], 180, ["alt"]);
    const song2: Song = new Song("t", [artist], 180, ["alt", "rock"]);
    const song3: Song = new Song("z", [artist], 180, ["rock"]);
    pl.addAtIdx(song1, 0);
    pl.addAtIdx(song2, 0);
    pl.addAtIdx(song3, 0);
    expect(pl.getGenreFrequency("alt")).to.equal(2);
    expect(pl.getGenreFrequency("rock")).to.equal(2);
  });
});

describe("getUniqueGenres", () => {
  test("doesn't duplicate genres that occur twice, order alphabetically", () => {
    const pl: Playlist = new Playlist("test");
    const song1: Song = new Song("x", [artist], 180, ["alt"]);
    const song2: Song = new Song("t", [artist], 180, ["electronic"]);
    const song3: Song = new Song("z", [artist], 180, ["rock"]);
    const song4: Song = new Song("aa", [artist], 180, ["electronic"]);
    pl.addAtIdx(song1, 0);
    pl.addAtIdx(song2, 0);
    pl.addAtIdx(song3, 0);
    pl.addAtIdx(song4, 0);
    expect(pl.getUniqueGenres()).to.deep.equal(["alt", "electronic", "rock"]);
  });
  test("add multiple genres per song, order alphabetically", () => {
    const pl: Playlist = new Playlist("test");
    const song1: Song = new Song("x", [artist], 180, ["rock"]);
    const song2: Song = new Song("t", [artist], 180, ["electronic", "emo"]);
    const song3: Song = new Song("z", [artist], 180, ["classical"]);
    pl.addAtIdx(song1, 0);
    pl.addAtIdx(song2, 0);
    pl.addAtIdx(song3, 0);
    expect(pl.getUniqueGenres()).to.deep.equal(["classical", "electronic", "emo", "rock"]);
  });
});
