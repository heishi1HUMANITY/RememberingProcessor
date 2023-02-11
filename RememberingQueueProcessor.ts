import { IRememberFunction } from "./RememberFunction.ts";

/**
 * FIFOキューで実行順を保証しながら記憶を思い出しタスクを実行するプロセッサ
 */
export class RememberingQueueProcessor {
  readonly #queue: IRememberFunction[] = [];

  readonly #interval: number = 500;

  /**
   * @param interval キュー確認ループのインターバル. デフォルトは500ms
   */
  constructor(interval?: number) {
    if (interval) this.#interval = interval;
  }

  /**
   * エンキューする
   * @param remenber
   */
  public enqueue(remenber: IRememberFunction): void {
    this.#queue.push(remenber);
  }

  #startWaitLoop(): Promise<IRememberFunction> {
    return new Promise((resolve) => {
      const id = setInterval(() => {
        if (this.#queue.length === 0) return;
        const process = this.#queue.shift();
        if (typeof process !== "undefined") {
          clearInterval(id);
          resolve(process);
        }
      }, this.#interval);
    });
  }

  async *#dequeue(): AsyncGenerator<IRememberFunction> {
    while (true) {
      yield await this.#startWaitLoop();
    }
  }

  /**
   * キューを確認し、タスクが存在する場合はブロッキングして実行する
   */
  public async start(): Promise<void> {
    for await (const queue of this.#dequeue()) {
      await queue.remenber();
    }
  }
}
