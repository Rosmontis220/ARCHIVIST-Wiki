---
tags:
  - XIKM
  - 解谜
---

# 视频【▓▒░WEST░▒▓】

2026-08-07 16:21 发布（[BV15Vub68EGm](https://www.bilibili.com/video/BV15Vub68EGm/)）。

简介第一行 `[VEIL·EMBER·FERRY·QUAY]`：整理旧硬盘时翻到一个一年多没打开的 Minecraft 存档，重新进入后发现基地西边过河后的地形不正常；相关文件（west_edge_backup.zip）放网盘；解出有效文件请原样发送至 1315211150@qq.com，邮件标题「我找到了西边」；末尾 `VHQ-4K/19 has not registered on this platform.`「The original video has been saved.」

视频主人公（调查维基编号「录像者甲」）由 [AD](../../../人物/ADsurfb0ard.md) 扮演：AD 是本 ARG 玩家之一，拿到台本后配合完成了演出。

## 解谜链

- 视频开头版本名中的一串字符 `V0FUQ0hfVEhFX1RISVJEX0NIRVNU` → Base64 → **WATCH_THE_THIRD_CHEST**（观看第三个箱子）
- 视频后段给出存档种子 **-4832091765281047**
- 末尾四帧：箱子里 SWORD / COOKED / RAW / BONE 的四元排列，每一位作二进制进位（00→COOKED、01→SWORD、10→RAW、11→BONE，生肉熟肉经验证互换），以斜杠分隔拼接成 8 位字节转 ASCII：
  - **WHEN SKY REMEMBERS YOU, DO NOT ANSWER.**
  - **IT WAITS FOR YOU TO LOOK BACK.**（当天空还记得你的时候，不要回答。它等着你回头看。）
- 压缩包 west_edge_backup.zip 密码：箱子第一列物品数量对应字母 18 5 7 9 15 14 → **REGION**

## 压缩包内

- `readme.txt`：图没有损坏。清单比图多五种颜色。缺席的部分只留下最前两人的分量。
- `manifest.xlsx`：取色器比对 pack.png，排除后剩五种颜色（RGB 首列 R = 65 76 80 72 65 = A L P A... 指向 ALPHA 通道）
- `pack.png` ALPHA 通道隐藏文字：

```
FOUR THINGS HE NAMED      他命名的四样东西
INITIALS                  首字母缩写
KEY REPEATS               按键重复（或密钥重复）
EMWW XIKM QQYAF ZWOQZKX   原样保留（密文）
sealed.7z
```

- 视频中提到的四样东西（苔藓块、铁、圆石、火把）首字母 = **MIST**；以 MIST 为密钥维吉尼亚解密 `EMWW XIKM QQYAF ZWOQZKX` → **SEED LAST EIGHT REVERSE**（种子取最后八个反转）

## 参考来源

- [腾讯文档《XIKM HLQA ONYIEN 解谜》](https://docs.qq.com/doc/DZURVVXJkS1NZWFNq)（视频简介、压缩包与 pack.png 解谜）
- [west_edge_backup.zip](https://archivist.rosmontis220.top/archive/download/west_edge_backup.zip)
- [视频【WEST】](https://www.bilibili.com/video/BV15Vub68EGm/)
