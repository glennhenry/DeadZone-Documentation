---
title: PlayerIO
slug: common/playerio/playerio
description: PlayerIO
---

:::note
The main PlayerIO backend services (often referred as PlayerIO client library). Source: https://playerio.com/documentation/services/.
:::

`PlayerIO` class (from `playerio.PlayerIO` package) mostly do networking via [`GameFS`](/common/playerio/gamefs) or authenticate the player. Authenticate request is first received from [`PlayerIOConnector`](/common/tlsapp/playerioconnector).

authenticate method details
