export interface IRememberFunction {
  /**
   * rememberの実行に必要な時間
   */
  timeToProcess: number;

  /**
   * デキュー後に実行される
   */
  remenber: () => Promise<void>;
}

/**
 * 出力先がファイルのタスク
 */
export class RememberToFileFunction implements IRememberFunction {
  public outPath: string;
  public memory: string;
  public timeToProcess: number;

  /**
   * @param outPath 出力先ファイルパス
   * @param memory
   * @param timeToProcess
   */
  constructor(outPath: string, memory: string, timeToProcess: number) {
    this.outPath = outPath;
    this.memory = memory;
    if (!this.memory.endsWith("\n")) this.memory += "\n";
    this.timeToProcess = timeToProcess;
  }

  public remenber(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(async () => {
        await Deno.writeTextFile(this.outPath, this.memory, { append: true });
        resolve();
      }, this.timeToProcess);
    });
  }
}
