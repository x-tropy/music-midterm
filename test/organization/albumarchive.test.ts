// You do not need to modify this file; that is why it is read-only.

// The test suite will pass on a functionally correct solution.
// But the test suite does not capture design points (Task 3.0).

// Type errors will be dynamic errors in this file, to avoid breaking
// compilation on partial solutions.
// @ts-nocheck

import { beforeEach, describe, expect, test } from "vitest";
import { AlbumArchive } from "../../src/organization/albumarchive";
import { Artist } from "../../src/items/artist";
import { Album } from "../../src/items/album";

const artist: Artist = new Artist("Test Band", 2001, ["a", "b", "c"]);

let archive: AlbumArchive;

beforeEach(() => {
  archive = new AlbumArchive();
});

describe("add", () => {
  test("can't add the same album twice", () => {
    const album1: Album = new Album("test", artist, 2026);
    const album2: Album = new Album("test", artist, 2026);
    expect(archive.add(album1)).to.equal(true);
    expect(archive.add(album2)).to.equal(false);
  });
  test("can add two albums with the same year", () => {
    const album1: Album = new Album("Early", artist, 2026);
    const album2: Album = new Album("Late", artist, 2026);
    expect(archive.add(album1)).to.equal(true);
    expect(archive.add(album2)).to.equal(true);
  });
});

describe("remove", () => {
  test("can't remove an album that wasn't added", () => {
    const album1: Album = new Album("Early", artist, 2026);
    const album2: Album = new Album("Late", artist, 2026);
    archive.add(album1);
    expect(archive.remove(album2)).to.equal(false);
  });
  test("can remove an album that was added", () => {
    const album1: Album = new Album("Early", artist, 2026);
    const album2: Album = new Album("Early", artist, 2026);
    archive.add(album1);
    expect(archive.remove(album2)).to.equal(true);
  });
  test("can't remove an album twice", () => {
    const album1: Album = new Album("Early", artist, 2026);
    const album2: Album = new Album("Early", artist, 2026);
    archive.add(album1);
    expect(archive.remove(album2)).to.equal(true);
    expect(archive.remove(album2)).to.equal(false);
  });
  test("removing album in a year doesn't remove all albums in that year", () => {
    const album1: Album = new Album("Early", artist, 2026);
    const album2: Album = new Album("Late", artist, 2026);
    archive.add(album1);
    archive.add(album2);
    expect(archive.remove(album2)).to.equal(true);
    expect(archive.remove(album1)).to.equal(true);
  });
});

describe("getAlbumsBeforeYear", () => {
  test("don't include albums in the borderline year", () => {
    const album1: Album = new Album("EP1", artist, 2020);
    const album2: Album = new Album("EP2", artist, 2021);
    const album3: Album = new Album("EP3", artist, 2022);
    const album4: Album = new Album("EP4", artist, 2024);
    archive.add(album1);
    archive.add(album2);
    archive.add(album3);
    archive.add(album4);
    expect(archive.getAlbumsBeforeYear(2022)).to.include.members(["EP1", "EP2"]);
  });

  test("empty if no albums exist before the given year", () => {
    const album1: Album = new Album("EP1", artist, 2020);
    const album2: Album = new Album("EP2", artist, 2021);
    const album3: Album = new Album("EP3", artist, 2022);
    const album4: Album = new Album("EP4", artist, 2024);
    archive.add(album1);
    archive.add(album2);
    archive.add(album3);
    archive.add(album4);
    expect(archive.getAlbumsBeforeYear(1990)).to.have.length(0);
  });

  test("can return multiple albums in same year", () => {
    const album1: Album = new Album("EP1", artist, 2022);
    const album2: Album = new Album("EP2", artist, 2022);
    const album3: Album = new Album("EP3", artist, 2022);
    const album4: Album = new Album("EP4", artist, 2024);
    archive.add(album1);
    archive.add(album2);
    archive.add(album3);
    archive.add(album4);
    expect(archive.getAlbumsBeforeYear(2023)).to.include.members(["EP1", "EP2", "EP3"]);
  });

  test("can return all albums", () => {
    const album1: Album = new Album("EP1", artist, 2020);
    const album2: Album = new Album("EP2", artist, 2021);
    const album3: Album = new Album("EP3", artist, 2022);
    const album4: Album = new Album("EP4", artist, 2024);
    archive.add(album1);
    archive.add(album2);
    archive.add(album3);
    archive.add(album4);
    expect(archive.getAlbumsBeforeYear(2026)).to.include.members(["EP1", "EP2", "EP3", "EP4"]);
  });
});
