import { parse } from "https://deno.land/std@0.177.0/flags/mod.ts";
import { readLines } from "https://deno.land/std@0.177.0/io/mod.ts";
import { IRememberFunction } from "./RememberFunction.ts";
import { RememberingQueueProcessor } from "./RememberingQueueProcessor.ts";

/**
 * コマンドライン引数から設定を取得し、キュープロセッサなどを生成する抽象クラス
 */
export abstract class FIFORememberingOperation {
  public readonly queueProcessor: RememberingQueueProcessor;

  /**
   * デフォルトの実行時間
   */
  public defaultTimeToProcess: number;

  public readonly queueProcessorInterval: number;

  abstract consoleMessage: string;

  /**
   * {@link IRememberFunction} を作成する
   * @param line
   */
  abstract taskFactory(line: string): IRememberFunction;

  constructor() {
    const args = parse(Deno.args);

    this.defaultTimeToProcess = typeof args.defaultTimeToProcess === "number"
      ? args.defaultTimeToProcess
      : 1000;

    this.queueProcessorInterval =
      typeof args.queueProcessorInterval === "number"
        ? args.queueProcessorInterval
        : 500;

    this.queueProcessor = new RememberingQueueProcessor(
      this.queueProcessorInterval,
    );
  }

  async #waitStdin() {
    for await (const line of readLines(Deno.stdin)) {
      if (line === "") continue;
      if (line === "exit") Deno.exit();

      const task = this.taskFactory(line);
      this.queueProcessor.enqueue(task);
    }
  }

  /**
   * プロセッサをスタートし入力を待つ
   */
  public start() {
    console.log(this.consoleMessage);
    this.queueProcessor.start();
    this.#waitStdin();
  }

  /**
   * プロセッサをスタートする
   */
  public startWithoutWaitStdin() {
    this.queueProcessor.start();
  }
}
