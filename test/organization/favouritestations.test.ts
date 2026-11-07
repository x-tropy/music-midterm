// You do not need to modify this file; that is why it is read-only.

// The test suite will pass on a functionally correct solution.
// But the test suite does not capture design points (Task 3.0).

// Type errors will be dynamic errors in this file, to avoid breaking
// compilation on partial solutions.
// @ts-nocheck

import { beforeEach, describe, expect, test } from "vitest";
import { FavouriteStations } from "../../src/organization/favouritestations";
import { RadioStation } from "../../src/items/radiostation";

let stations: FavouriteStations;

beforeEach(() => {
  stations = new FavouriteStations();
});

describe("add", () => {
  test("can't add the same station twice", () => {
    const s1: RadioStation = new RadioStation("Radio Canada Premiere", 97.7, "Vancouver", ["alt"]);
    const s2: RadioStation = new RadioStation("Radio Canada Premiere", 97.7, "Vancouver", ["alt"]);
    expect(stations.add(s1)).to.equal(true);
    expect(stations.add(s2)).to.equal(false);
  });
  test("can add two stations with the same frequency", () => {
    const s1: RadioStation = new RadioStation("Radio Canada Premiere", 97.9, "Vancouver", ["alt"]);
    const s2: RadioStation = new RadioStation("all beatz", 97.9, "Seattle", ["alt"]);
    expect(stations.add(s1)).to.equal(true);
    expect(stations.add(s2)).to.equal(true);
  });
});

describe("remove", () => {
  test("can't remove a station that wasn't added", () => {
    // this is not a music station in real life, but sometimes they play music
    const s1: RadioStation = new RadioStation("Radio Canada Premiere", 97.7, "Vancouver", ["alt"]);
    const s2: RadioStation = new RadioStation("all beatz", 97.7, "Seattle", ["alt"]);
    stations.add(s1);
    expect(stations.remove(s2)).to.equal(false);
  });
  test("can remove a station that was added", () => {
    const s1: RadioStation = new RadioStation("Radio Canada Premiere", 97.7, "Vancouver", ["alt"]);
    const s2: RadioStation = new RadioStation("Radio Canada Premiere", 97.7, "Vancouver", ["alt"]);
    stations.add(s1);
    expect(stations.remove(s2)).to.equal(true);
  });
  test("can't remove a station twice", () => {
    const s1: RadioStation = new RadioStation("Radio Canada Premiere", 97.7, "Vancouver", ["alt"]);
    const s2: RadioStation = new RadioStation("Radio Canada Premiere", 97.7, "Vancouver", ["alt"]);
    stations.add(s1);
    expect(stations.remove(s2)).to.equal(true);
    expect(stations.remove(s1)).to.equal(false);
  });
  test("removing station of freq doesn't remove all stations of that freq", () => {
    const s1: RadioStation = new RadioStation("fsafds", 97.9, "Vancouver", ["alt"]);
    const s2: RadioStation = new RadioStation("all beatz", 97.9, "Seattle", ["alt"]);
    stations.add(s2);
    stations.add(s1);
    expect(stations.remove(s1)).to.equal(true);
    expect(stations.remove(s2)).to.equal(true);
  });
});

describe("getStationsInCity", () => {
  test("can return multiple items in a city", () => {
    const s1: RadioStation = new RadioStation("Radio Canada Premiere", 97.7, "Vancouver", ["alt"]);
    const s2: RadioStation = new RadioStation("all beatz", 97.9, "Seattle", ["alt"]);
    const s3: RadioStation = new RadioStation("QMFM???", 103.5, "Vancouver", ["pop"]);
    stations.add(s2);
    stations.add(s1);
    stations.add(s3);
    expect(stations.getStationsInCity("Vancouver")).to.have.length(2);
    expect(stations.getStationsInCity("Vancouver").map((s) => s.name)).to.include.members([
      "Radio Canada Premiere",
      "QMFM???",
    ]);
  });

  test("doesn't return anything for a city not in favourite stations", () => {
    const s1: RadioStation = new RadioStation("Radio Canada Premiere", 97.7, "Vancouver", ["alt"]);
    const s2: RadioStation = new RadioStation("all beatz", 97.9, "Seattle", ["alt"]);
    const s3: RadioStation = new RadioStation("QMFM???", 103.5, "Vancouver", ["pop"]);
    stations.add(s2);
    stations.add(s1);
    stations.add(s3);
    expect(stations.getStationsInCity("Montreal")).to.have.length(0);
  });
});
