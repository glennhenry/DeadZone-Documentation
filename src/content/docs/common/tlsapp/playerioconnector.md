---
title: PlayerIOConnector
slug: common/tlsapp/playerioconnector
description: PlayerIOConnector
---

`PlayerIOConnector` is a service that authenticate the players. It can connect to Facebook, Armor games, Kongregate, or even through PlayerIO itself.

After the [preloader](/main#preloader) loads completely (`preloader/thelaststand.preloader.core.Main@line 162`), the game starts communicating with `PlayerIOConnector`. The communication decides which authentication service to use.

Currently, our private server choose to authenticate through PlayerIO.

## Authenticate by PlayerIO

PlayerIO authentication is meant for players that plays a game from [PlayerIO publishing network](/playerio/publishingnetwork) sites, such as [playsian](https://www.playsian.com).

1. First and foremost, developer need to publish their game at the network, so that their game can be featured. They may also need to add necessary authentication logic.
2. The network site should have an iframe panel to embed the game. This panel is also called the publishing network canvas, which act as the container to run the game. _The html page must also include `publishingnetwork.js`_.

   > This script lets the game frame communicate with the hosting page for features such as showing payment dialogs and resizing the frame when the content size changes. From: https://playerio.com/documentation/publishingnetwork/canvas.

   Without including the script, we will encounter an alert sent by `preloader/playerio.PublishingNetworkDialog@line 63`.

This is what TLSDZ use to connect via PlayerIO.

```actionscript-3
// preloader/thelaststand.app.network.PlayerIOConnector@line 209
PlayerIO.authenticate(stage,GAME_ID,"publishingnetwork",{"userToken":userToken},null,function(param1:Client):void {
    onPlayerIOPubNetworkConnected(param1,userToken);
},this.onConnectError);
```

- Authentication is handled through the PlayerIO client, eliminating the need to validate the `userToken`, as this is managed by the PlayerIO client library.
- The third parameter is `connectionId`, used to identify where are players logging in from. "publishingnetwork" is the ID for PlayerIO auth.
- The fourth parameter is the authentication arguments. Developer choose whether to provide the `userToken` manually or let the PlayerIO client pick it from the canvas automatically (by setting the fourth argument to `{"publishingnetworklogin", "auto"}`).

:::tip
`userToken` is a Base64URLEncoded JSON object containing information about the user and a signature to validate its authenticity.
:::

:::note
A successful authentication is signified by an API request to `/api/601`.
:::
