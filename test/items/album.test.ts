import { describe, expect, test } from "vitest";
import { Album } from "../../src/items/album";
import { Artist } from "../../src/items/artist";
import { Song } from "../../src/items/song";

const artist: Artist = new Artist("Test Band", 2001, ["a", "b", "c"]);

describe("Album", () => {
  test("cannot add the same song constructed differently", () => {
    const album: Album = new Album("test", artist, 2026);
    const song1: Song = new Song("x", [artist], 180, ["alt"]);
    const song2: Song = new Song("x", [artist], 180, ["alt"]);
    expect(album.addSong(song1)).to.equal(true);
    expect(album.addSong(song2)).to.equal(false);
  });
  test.todo("cannot construct an album with negative year");
  test.todo("check that can add two different songs to album");
  test.todo("check that cannot add same song twice");
  test.todo("cannot add a song which is not by the album artist");
});
