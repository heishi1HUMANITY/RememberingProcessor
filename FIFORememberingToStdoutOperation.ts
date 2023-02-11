import { parse } from "https://deno.land/std@0.177.0/flags/mod.ts";
import { FIFORememberingOperation } from "./FIFORememberingOperation.ts";
import { RememberToStdout } from "./RememberFunction.ts";

/**
 * コマンドライン引数をもとにキューとタスクを生成する
 *
 *     --defaultTimeToProcess: デフォルトの実行時間, なければ1000ms
 *     --queueProcessorInterval: キュー確認ループのインターバル, なければ500ms
 */
export class FIFORememberingToStdoutOperation extends FIFORememberingOperation {
  public consoleMessage: string;

  constructor() {
    super();

    this.consoleMessage =
      'waiting for memory input\nformat: memory --time=1000(default 1000)\nenter "exit" to stop process';
  }

  public taskFactory(line: string): RememberToStdout {
    const param = parse(line.split(" "));
    const time = param.time ?? this.defaultTimeToProcess;
    const memory = param._.join();
    return new RememberToStdout(memory, time);
  }
}
