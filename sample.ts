import { FIFORememberingToStdoutOperation } from "./FIFORememberingToStdoutOperation.ts";

const operation = new FIFORememberingToStdoutOperation();
const 苦い思い出を思い出すタスク = operation.taskFactory("苦い思い出");
const 最後の食事を思い出すタスク = operation.taskFactory("ハンバーグ");
operation.queueProcessor.enqueue(苦い思い出を思い出すタスク);
operation.queueProcessor.enqueue(最後の食事を思い出すタスク);
operation.start();
