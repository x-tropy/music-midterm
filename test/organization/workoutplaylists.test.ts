// You do not need to modify this file; that is why it is read-only.

// The test suite will pass on a functionally correct solution.
// But the test suite does not capture design points (Task 3.0).

// Type errors will be dynamic errors in this file, to avoid breaking
// compilation on partial solutions.
// @ts-nocheck

import { beforeEach, describe, expect, test } from "vitest";
import { WorkoutPlaylists } from "../../src/organization/workoutplaylists";
import { Artist } from "../../src/items/artist";
import { Song } from "../../src/items/song";
import { Playlist } from "../../src/items/playlist";

let ps: WorkoutPlaylists;
const artist: Artist = new Artist("Test Band", 2001, ["a", "b", "c"]);
let pl: Playlist;
let sameAsPl: Playlist;
let diffOrder: Playlist;

beforeEach(() => {
  ps = new WorkoutPlaylists();
  pl = new Playlist("test");
  sameAsPl = new Playlist("test");
  diffOrder = new Playlist("bloop");
  const song1: Song = new Song("x", [artist], 180, ["alt"]);
  const song2: Song = new Song("t", [artist], 180, ["electronic"]);
  const song3: Song = new Song("z", [artist], 180, ["rock"]);
  pl.addAtIdx(song1, 0);
  pl.addAtIdx(song2, 0);
  pl.addAtIdx(song3, 0);
  sameAsPl.addAtIdx(song1, 0);
  sameAsPl.addAtIdx(song2, 0);
  sameAsPl.addAtIdx(song3, 0);
  diffOrder.addAtIdx(song1, 0);
  diffOrder.addAtIdx(song2, 1);
  // ⚠️ GUESS: lines 38+ were not captured. diffOrder must be 5-10 min in later tests,
  // so it likely has 3 songs (9 min).
  // ⚠️ 推测：第 38 行起没拍到；diffOrder 在后面测试里需在 5-10 分钟内，应为 3 首歌（9 分钟）。
  diffOrder.addAtIdx(song3, 2);
});

// ⚠️ GUESS: lines 38-52 (the describe("add") block) were not captured.
// ⚠️ 第 38-52 行（add 部分）没拍到，先用 todo 占位。
describe("add", () => {
  test.todo("add tests (original not captured / 原文缺失)");
});

describe("remove", () => {
  test("can't remove a playlist that wasn't added", () => {
    // ⚠️ GUESS: lines 55-56 not captured. / 推测：第 55-56 行没拍到。
    ps.add(pl);
    expect(ps.remove(diffOrder)).to.equal(false);
  });
  test("can remove a playlist that was added", () => {
    ps.add(pl);
    expect(ps.remove(sameAsPl)).to.equal(true);
  });
  test("can't remove a playlist twice", () => {
    ps.add(pl);
    ps.add(diffOrder);
    expect(ps.remove(sameAsPl)).to.equal(true);
    expect(ps.remove(sameAsPl)).to.equal(false);
  });
});

describe("getPlaylistsWithRuntime", () => {
  test("can return multiple playlists in bounds", () => {
    ps.add(pl);
    ps.add(diffOrder);
    expect(ps.getPlaylistsWithRuntime(5, 10)).to.have.length(2);
    expect(ps.getPlaylistsWithRuntime(5, 10).map((pl) => pl.name)).to.include.members(["test", "bloop"]);
  });

  test("returns nothing if nothing in bounds", () => {
    ps.add(pl);
    ps.add(diffOrder);
    expect(ps.getPlaylistsWithRuntime(10, 10)).to.have.length(0);
  });

  test("doesn't return lists over bounds", () => {
    const song1: Song = new Song("x", [artist], 180, ["alt"]);
    const longerList: Playlist = new Playlist("who are you");
    longerList.addAtIdx(song1, 0);
    longerList.addAtIdx(song1, 0);
    longerList.addAtIdx(song1, 0);
    longerList.addAtIdx(song1, 0);
    longerList.addAtIdx(song1, 0);
    ps.add(pl);
    ps.add(diffOrder);
    ps.add(longerList);
    expect(ps.getPlaylistsWithRuntime(5, 10)).to.have.length(2);
    expect(ps.getPlaylistsWithRuntime(5, 10).map((pl) => pl.name)).to.include.members(["test", "bloop"]);
  });

  test("doesn't return lists under bounds", () => {
    const song1: Song = new Song("x", [artist], 180, ["alt"]);
    const shorterList: Playlist = new Playlist("who are you");
    shorterList.addAtIdx(song1, 0);
    ps.add(pl);
    ps.add(shorterList);
    expect(ps.getPlaylistsWithRuntime(5, 10)).to.have.length(1);
    expect(ps.getPlaylistsWithRuntime(5, 10).map((pl) => pl.name)).to.include.members(["test"]);
  });
});
