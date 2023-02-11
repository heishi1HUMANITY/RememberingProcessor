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
