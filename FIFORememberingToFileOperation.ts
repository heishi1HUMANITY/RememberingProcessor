import { RememberToFileFunction } from "./RememberFunction.ts";
import { parse } from "https://deno.land/std@0.177.0/flags/mod.ts";
import { FIFORememberingOperation } from "./FIFORememberingOperation.ts";

/**
 * コマンドライン引数をもとにキューとタスクを生成する
 *
 *     --outPath: 出力先ファイルパス, なければカレントディレクトリに作成する
 *     --defaultTimeToProcess: デフォルトの実行時間, なければ1000ms
 *     --queueProcessorInterval: キュー確認ループのインターバル, なければ500ms
 */
export class FIFORememberingToFileOperation extends FIFORememberingOperation {
  public outPath: string;

  public consoleMessage: string;

  constructor() {
    super();

    const args = parse(Deno.args);

    this.outPath = typeof args.outPath === "string"
      ? args.outPath
      : Deno.makeTempFileSync({ dir: Deno.cwd(), prefix: "remember_" });
    Deno.writeFile(this.outPath, new Uint8Array());

    this.consoleMessage =
      `waiting for memory input (outPath = ${this.outPath})\nformat: memory --time=1000(default 1000)\nenter "exit" to stop process`;
  }

  public taskFactory(line: string): RememberToFileFunction {
    const param = parse(line.split(" "));
    const time = param.time ?? this.defaultTimeToProcess;
    const memory = param._.join();
    return new RememberToFileFunction(
      this.outPath,
      memory,
      time,
    );
  }
}
