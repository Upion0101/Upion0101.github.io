import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BOB_NAMES_TREE, NameCategoryData } from 'src/assets/data/bob-names.data';

type TileState = 'empty' | 'absent' | 'present' | 'correct';
type KeyState = 'absent' | 'present' | 'correct';

@Component({
  selector: 'app-bobdle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bobdle.component.html',
  styleUrls: ['./bobdle.component.scss'],
})
export class BobdleComponent implements OnInit {
  // Settings
  maxRows = 6;

  // Target-derived
  cols = 5;

  // Game
  target = '';
  targetUpper = '';
  private targetCounts = new Map<string, number>();

  // State
  row = 0;
  col = 0;
  isWin = false;
  isLose = false;
  message = '';

  // Board
  guesses: string[] = [];
  tiles: TileState[][] = [];

  // Keyboard
  keyStates = new Map<string, KeyState>();
  kbRows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

  // Candidate words
  private words: string[] = [];

  ngOnInit(): void {
    this.words = this.buildWordListFromTree(BOB_NAMES_TREE);
    this.newGame();
  }

  newGame(): void {
    // fallback if list empty
    const pick = this.words.length
      ? this.words[Math.floor(Math.random() * this.words.length)]
      : 'BOB';

    this.target = pick;
    this.targetUpper = pick.toUpperCase();
    this.cols = this.targetUpper.length;

    this.targetCounts = this.buildCounts(this.targetUpper);

    this.guesses = Array.from({ length: this.maxRows }, () => '');
    this.tiles = Array.from({ length: this.maxRows }, () =>
      Array.from({ length: this.cols }, () => 'empty' as TileState)
    );

    this.keyStates.clear();
    this.row = 0;
    this.col = 0;
    this.isWin = false;
    this.isLose = false;
    this.message = '';
  }

  // ---------- Input ----------
  onKeyClick(k: string): void {
    if (k === 'ENTER') return this.submit();
    if (k === '⌫') return this.backspace();
    this.typeLetter(k);
  }

  typeLetter(letter: string): void {
    if (this.isWin || this.isLose) return;
    if (this.row >= this.maxRows) return;
    if (this.col >= this.cols) return;

    const L = letter.toUpperCase();
    if (!/^[A-Z]$/.test(L)) return;

    const current = (this.guesses[this.row] ?? '').toUpperCase().padEnd(this.cols, ' ');
    const next = current.substring(0, this.col) + L + current.substring(this.col + 1);
    this.guesses[this.row] = next.trimEnd();
    this.col = Math.min(this.cols, this.col + 1);
    this.message = '';
  }

  backspace(): void {
    if (this.isWin || this.isLose) return;
    if (this.col <= 0) return;

    const current = (this.guesses[this.row] ?? '').toUpperCase().padEnd(this.cols, ' ');
    const idx = this.col - 1;
    const next = current.substring(0, idx) + ' ' + current.substring(idx + 1);
    this.guesses[this.row] = next.trimEnd();
    this.col = Math.max(0, this.col - 1);
    this.message = '';
  }

  submit(): void {
    if (this.isWin || this.isLose) return;

    const guess = (this.guesses[this.row] ?? '').toUpperCase().replace(/[^A-Z]/g, '');
    if (guess.length !== this.cols) {
      this.message = `Need ${this.cols} letters.`;
      return;
    }

    const evalRow = this.evaluateGuess(guess, this.targetUpper);
    this.tiles[this.row] = evalRow;

    for (let i = 0; i < this.cols; i++) {
      this.promoteKeyState(guess[i], evalRow[i]);
    }

    if (guess === this.targetUpper) {
      this.isWin = true;
      this.message = `You got it: ${this.targetUpper} 🎉`;
      return;
    }

    if (this.row === this.maxRows - 1) {
      this.isLose = true;
      this.message = `Answer was: ${this.targetUpper}`;
      return;
    }

    this.row += 1;
    this.col = 0;
  }

  @HostListener('window:keydown', ['$event'])
  onPhysicalKey(e: KeyboardEvent): void {
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      this.submit();
      return;
    }
    if (e.key === 'Backspace') {
      e.preventDefault();
      this.backspace();
      return;
    }
    if (/^[a-zA-Z]$/.test(e.key)) {
      e.preventDefault();
      this.typeLetter(e.key.toUpperCase());
    }
  }

  // ---------- Wordle scoring (duplicate letters correct) ----------
  private evaluateGuess(guess: string, target: string): TileState[] {
    const res: TileState[] = Array.from({ length: this.cols }, () => 'absent');

    // Make a working copy of counts
    const counts = new Map(this.targetCounts);

    // Pass 1: correct
    for (let i = 0; i < this.cols; i++) {
      if (guess[i] === target[i]) {
        res[i] = 'correct';
        counts.set(guess[i], (counts.get(guess[i]) ?? 0) - 1);
      }
    }

    // Pass 2: present/absent
    for (let i = 0; i < this.cols; i++) {
      if (res[i] === 'correct') continue;
      const ch = guess[i];
      const remaining = counts.get(ch) ?? 0;
      if (remaining > 0) {
        res[i] = 'present';
        counts.set(ch, remaining - 1);
      } else {
        res[i] = 'absent';
      }
    }

    return res;
  }

  private buildCounts(word: string): Map<string, number> {
    const m = new Map<string, number>();
    for (const ch of word) m.set(ch, (m.get(ch) ?? 0) + 1);
    return m;
  }

  private promoteKeyState(ch: string, tile: TileState): void {
    if (!/^[A-Z]$/.test(ch)) return;

    const current = this.keyStates.get(ch);

    const rank = (s?: KeyState | TileState): number => {
      if (s === 'correct') return 3;
      if (s === 'present') return 2;
      if (s === 'absent') return 1;
      return 0;
    };

    const next: KeyState = tile === 'correct' ? 'correct' : tile === 'present' ? 'present' : 'absent';
    if (rank(next) > rank(current)) this.keyStates.set(ch, next);
  }

  // ---------- Template helpers ----------
  getCellChar(r: number, c: number): string {
    const g = (this.guesses[r] ?? '').toUpperCase().padEnd(this.cols, ' ');
    return (g[c] ?? ' ').trim();
  }

  cellClass(r: number, c: number): string {
    return this.tiles[r][c] ?? 'empty';
  }

  keyClass(ch: string): string {
    return this.keyStates.get(ch) ?? '';
  }

  revealAnswer(): void {
    this.message = `Answer: ${this.targetUpper}`;
  }

  // ---------- Build list from NameCategory tree ----------
  private buildWordListFromTree(root: NameCategoryData): string[] {
    const out: string[] = [];

    const walk = (node: NameCategoryData, parentCategoryName?: string) => {
      const categoryName = node.name;

      const excludedCategory =
        categoryName.trim().toLowerCase() === 'phrases' ||
        parentCategoryName?.trim().toLowerCase() === 'phrases';

      for (const child of node.children) {
        if (typeof child === 'string') {
          if (excludedCategory) continue;

          // Exclude phrases / multi-part with commas (your “Baby, my sweet ...” entries)
          if (child.includes(',')) continue;

          // Clean: letters only
          const cleaned = child.trim().replace(/[^a-zA-Z]/g, '');
          if (cleaned.length < 3) continue;

          // Uppercase stored, for simplicity
          out.push(cleaned.toUpperCase());
        } else {
          walk(child, categoryName);
        }
      }
    };

    walk(root);

    // de-dupe
    return Array.from(new Set(out));
  }
}
