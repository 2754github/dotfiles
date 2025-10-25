---
description: "up-issue <Issue番号>"
---

# up-issue

$1 をタスクリストに変換し、Issueにコメントする。

情報が不十分な場合、ユーザーに質問し、得られた情報をIssueにコメントする。

---

下記でIssueを確認できる。

```sh
gh issue view <Issue番号> -c
```

下記でIssueにコメントできる。

```sh
gh issue comment <Issue番号> -b '<コメント内容>'
```
