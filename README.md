# CPSC 210 Practice Midterm: Music Organization

Reconstructed from screenshots of the UBC CPSC 210 PrairieLearn practice midterm workspace, for self-practice.
根据 UBC CPSC 210 PrairieLearn 练习期中的截图重建，用于自我练习。

**Full task description → [TASKS.md](TASKS.md)**
**完整题目说明见 TASKS.md**

## How to run / 运行方法

Requires Node.js 18+. / 需要 Node.js 18 或更高版本。

```bash
npm install
npm test              # run all tests once / 运行全部测试
npx vitest run test/items/playlist.test.ts   # run one file / 只跑一个文件
npm run typecheck     # TypeScript type check / 类型检查
```

Before you start, most `todo` tests are skipped and the Task 1 tests fail. That's expected.
开始做题前，`todo` 测试会显示为 skipped，Task 1 的测试会失败，这是正常的。

No solutions are included. / 本项目不含答案。

## How faithful is this? / 还原程度

### Copied from screenshots (original) / 按截图原样抄录
- All files in `src/` / `src/` 下全部文件（`album.ts` 的 3 行除外，见下）
- `test/items/album.test.ts`, `test/items/playlist.test.ts`
- `test/organization/albumarchive.test.ts`, `countties.test.ts`, `favouritestations.test.ts`

### Guessed (marked `⚠️ GUESS` in code) / 推测补写（代码中标有 `⚠️ GUESS`）
1. `src/items/album.ts`, `equals`, lines 72–74 (hidden in screenshot): assumed to compare `year`.
   `equals` 第 72–74 行被挡住，推测为比较 `year`。
2. `test/organization/workoutplaylists.test.ts`:
   - end of `beforeEach` (3rd song of `diffOrder`) / `beforeEach` 最后一行
   - the whole `describe("add")` block — replaced by a `test.todo` / 整个 add 部分，用 `test.todo` 占位
   - body of the first `remove` test / remove 第一个测试的内容

### Not original / 非原版文件
- `package.json`, `tsconfig.json` are minimal configs written for this copy. The original workspace used pnpm + biome; that doesn't affect the exercise.
  这两个是自己写的最小配置；原版用 pnpm 和 biome，不影响练习。
- `biome.json`, `vitest.config.ts`, pnpm files are not included (not needed).

## Quirks in the original code (NOT copy mistakes) / 原题代码本身的"怪地方"（不是抄错）
1. `RadioStation.equals` compares `name` and `frequency`, although its comment says "same frequency and city".
   注释说比较 frequency 和 city，代码实际比较的是 name 和 frequency。
2. `Playlist.removeAtIdx` asserts `index <= this.songs.length` (should arguably be `<`). With `index === length`, `splice` silently does nothing.
   用的是 `<=`；index 等于 length 时不报错，只是什么也不删。
3. The task text says the album test file is in `test/organization/`, but it's actually in `test/items/`.
   题目文字说 album 测试在 `test/organization/`，实际在 `test/items/`。
4. `workoutplaylists.ts` imports `assert` from `"assert"` (not `"node:assert"`) and uses a value import `import { Playlist }`. Both work.
5. `FavouriteStations.getStationsInCity` has a copy-pasted doc comment ("names of albums released before the year y").
   注释是从 AlbumArchive 复制过来的，与方法不符。
