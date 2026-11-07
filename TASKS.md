# CPSC 210 Practice Midterm: Music Organization — Tasks / 题目说明

> Reconstructed from screenshots of the PrairieLearn page. Wording is close to the original but not guaranteed verbatim.
> 根据 PrairieLearn 页面截图整理，措辞接近原题，但不保证逐字一致。

Point values do not necessarily indicate difficulty; tasks are roughly in difficulty order.
分值不代表难度；题目大致按难度从低到高排列。

## Files / 文件说明

| File | Rule |
|---|---|
| `src/items/album.ts` | tested in Task 2; may modify in Task 3 |
| `src/items/artist.ts` | **do not modify / 不要改** |
| `src/items/playlist.ts` | Task 1; may modify in Task 3 |
| `src/items/radiostation.ts` | may modify in Task 3 |
| `src/items/song.ts` | **do not modify / 不要改** |
| `src/organization/albumarchive.ts` | Task 3.0, 3.3 |
| `src/organization/favouritestations.ts` | Task 3.0, 3.1, 3.3 |
| `src/organization/orderedset.ts` | can use for Tasks 3.0–3.3 as needed |
| `src/organization/workoutplaylists.ts` | Task 3.0, 3.2, 3.3 |
| `test/items/album.test.ts` | Task 2 |
| `test/items/playlist.test.ts` | **do not modify**; checks Task 1 |
| `test/organization/albumarchive.test.ts` | **do not modify**; should pass no matter your Task 3.0 design |
| `test/organization/countties.test.ts` | Task 3.3 |
| `test/organization/favouritestations.test.ts` | **do not modify**; checks Task 3.1 |
| `test/organization/workoutplaylists.test.ts` | **do not modify**; checks Task 3.2 |

---

## Task 1: Playlist Genre Functions (20 pts)

A `Playlist` contains a list of `Song`. A `Song` has public fields `name: string`, `duration: number`, and public methods `getGenres(): Genre[]`, `getArtists(): Artist[]`.

**Task 1.1** — In `src/items/playlist.ts`, complete `getGenreFrequency(genre: Genre): number`:
returns the number of songs in this playlist that have the given genre.
返回播放列表里带有该 genre 的歌曲数量。

**Task 1.2** — In `src/items/playlist.ts`, complete `getUniqueGenres(): Genre[]`:
returns all genres that occur at least once in this playlist, with no duplicates, sorted alphabetically. Hint: `localeCompare` may be useful.
返回出现过的所有 genre，不重复，按字母顺序排列。提示：可以用 `localeCompare`。

Tests are provided in `test/items/playlist.test.ts` and all pass on a correct solution. You do not need to add tests.
测试已提供，正确实现即可全部通过，不需要自己加测试。

## Task 2: Test Album (30 pts)

Albums can have songs added to them, but those songs must have the album artist on them, and the same song cannot be added twice.
专辑可以加歌，但歌曲的 artists 里必须包含专辑的 artist，且同一首歌不能加两次。

**Task:** complete the 4 `test.todo` tests in `test/items/album.test.ts`. One sample test is provided.
把 4 个 `test.todo` 写成真正的测试（已有一个示例测试）。

- **If you use `to.throw()` / `toThrow()`, use it without an argument.**
  **用 `to.throw()` 时不要带参数。**

```ts
test.todo("cannot construct an album with negative year");
test.todo("check that can add two different songs to album");
test.todo("check that cannot add same song twice");
test.todo("cannot add a song which is not by the album artist");
```

> Note: the original task text says `test/organization/album.test.ts`, but in the workspace the file is actually `test/items/album.test.ts`.
> 注意：原题文字写的是 `test/organization/album.test.ts`，但 workspace 里文件实际在 `test/items/`。

## Task 3: Organizers (50 pts)

Three organizers / 三个 organizer：
- `AlbumArchive` — ordered by **year** / 按年份排序
- `FavouriteStations` — ordered by **FM frequency** / 按频率排序
- `WorkoutPlaylists` — ordered by **runtime** / 按总时长排序

They are all meant to add/remove items while keeping a list of those items ordered, and each has its own unique computation.
三者都要能 add/remove，并保持列表有序；各自还有一个独有的查询方法。

`AlbumArchive` is provided and already supports `add(item: Album)` and `remove(item: Album)` (full logic in `src/organization/albumarchive.ts`). Its tests should stay passing.
`AlbumArchive` 已经写好了 add/remove，它的测试必须一直通过。

**The organizer system provides 4 classes and 1 interface you may modify as you wish; do not add any other classes/interfaces.**
**只能修改已有的 4 个 class 和 1 个 interface（`Comparable`），不能新增别的 class/interface。**
(4 classes = `AlbumArchive`, `FavouriteStations`, `WorkoutPlaylists`, `OrderedSet<T>`.)

Each file must still export its class name (e.g. `AlbumArchive`, `OrderedSet<T>`) as a type.
每个文件必须继续 export 原来的类名。

### Task 3.0: Design (10 pts)
Up to 10 points for a design for Tasks 3.1–3.3 that **minimizes code duplication**, using `extends`, `implements`, and **generics** to declare methods in one place and have them supported by many classes. **Autograded.**
用 `extends`、`implements` 和泛型，把方法写在一处、让多个类共用，尽量减少重复代码。自动评分。

### Task 3.1: Organizing Radio Stations (15 pts)
`FavouriteStations` stores radio stations ordered by frequency and supports `getStationsInCity(loc: string): RadioStation[]`.
Ensure it supports `add(item: RadioStation)` and `remove(item: RadioStation)` with **the same logic as `AlbumArchive`**, with `Album` replaced by `RadioStation`. It must still support `getStationsInCity`.
Tests in `test/organization/favouritestations.test.ts` pass when behaviour is correct, but do not check design.

### Task 3.2: Organizing Workout Playlists (15 pts)
`WorkoutPlaylists` stores playlists ordered by runtime and supports `getPlaylistsWithRuntime`.
Ensure it supports `add(item: Playlist)` and `remove(item: Playlist)` with the same logic as `AlbumArchive`, with `Album` replaced by `Playlist`. It must still support `getPlaylistsWithRuntime`.
Tests in `test/organization/workoutplaylists.test.ts` pass when behaviour is correct, but do not check design.

> Hint / 提示：`getPlaylistsWithRuntime` returns early, so it relies on `members` being sorted by runtime. `add` must insert in order (like `AlbumArchive`), not just `push`.
> `getPlaylistsWithRuntime` 会提前 return，依赖列表已按 runtime 排序，所以 add 必须按顺序插入。

### Task 3.3: Count Ties (10 pts)
All organizers order items by some number, but several items can be "tied" with the same number. Support `countTies(): number`, returning the number of tied items.
所有 organizer 都按某个数字排序，可能有多个元素数字相同（"并列"）。实现 `countTies(): number`。

**Example / 例子：** an album archive with 6 albums released in 2002, 2007, 2007, 2010, 2012, 2012 → `countTies()` returns **4** (2007 & 2007, 2012 & 2012).
注意是返回 **4**（所有处于并列中的元素个数），不是 2（并列的组数）。

- **Task:** implement `countTies` so it is supported by `AlbumArchive`, `FavouriteStations`, and `WorkoutPlaylists`.
- **Task:** test that `countTies` works for all 3 organizers in `test/organization/countties.test.ts`.

## Grading note / 评分说明
On the real exam, the score is not shown. Make sure the autograder says "Grading Complete: All grading checks passed." That only means your code could run, not that you got 100%.
正式考试不显示分数。只需确认 autograder 显示 "All grading checks passed"，这只表示代码能运行，不代表满分。
