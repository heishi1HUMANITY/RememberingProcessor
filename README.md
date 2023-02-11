## ある日の会社のslackにて

> なるほど\
> https://marshmallow-qa.com/messages/d4151652-dd81-40d9-bd3c-293186bfcae9
>
> 嫌なことをおもだしそうになったら、即座に「右上を見る」をやり、「最後に食べた食事を思い出す」というのをセットでやると、気が削がれて思い出さなくなります。記憶を反芻しないと、脳は「重要な情報じゃないんだな」と思って記憶が薄れていきます(たぶん)。この技術を身につけると、嫌なことを全然思い出さなくなります。

## それがどうした

実践してみたけど、99割

1. 嫌なことを思い出す
2. 右上のこと見て最後に食べた食事を思い出す
3. 嫌な気分で最後に食べた食事を思い出してしまった…

になる

## つまり

自分の脳内で記憶を思い出す行為は、FIFOキューで順番保証しながら一つ一つ確実に実行されているのではないか？\
実装しよう！？

## こうなった

[sample.ts](./sample.ts)

```typescript
const operation = new FIFORememberToStdoutOperation();
const 苦い思い出を思い出すタスク = operation.taskFactory("苦い思い出");
const 最後の食事を思い出すタスク = operation.taskFactory("ハンバーグ");
operation.queueProcessor.enqueue(苦い思い出を思い出すタスク);
operation.queueProcessor.enqueue(最後の食事を思い出すタスク);
operation.startWithoutWaitStdin();
```

## 嫌なこと思い出したときの対策募集中
