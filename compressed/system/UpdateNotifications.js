var UpdateNotifications = {};
(function () {
    var a = UpdateNotifications;
    a.showFullGameIsAvailable = function () {
        var a = $("#fullGameAvailable");
        a.find(".okButton").clickExcl(function () {
            var a = DataStore.getValue("full-game-uri");
            if (PlatformShim.ISWIN8) {
                var b = new Windows.Foundation.Uri(a);
                Windows.System.Launcher.launchUriAsync(b).then(function (b) {
                    b ? ghg4.ghg5("navigate-to-full-game", {
                        url: a,
                        success: !0
                    }) : (ghg4.ghg5("navigate-to-full-game", {
                        url: a,
                        success: !1
                    }), Windows.UI.Popups.MessageDialog("It seems that something went wrong when trying to go to the Store page for the full app.\nPlease try again and if the issue persists please contact support@greenheartgames.com or search for Game Dev Tycoon manually on the Windows Store.",
                        "Store Error").showAsync())
                })
            } else PlatformShim.openUrlExternal(a)
        });
        ghg4.ghg5("showing full game available message");
        a.gdDialog({
            zIndex: 7500,
            popout: !0,
            close: !0
        })
    };
    a.checkAndShowNotifications = function () {
        if (!Steam) {
            var a = GameManager.getSaveGames();
            if (!a || !a.length) DataStore.setValue("shown-udate-notification-v1", !0);
            else if (!DataStore.getValue("shown-udate-notification-v1")) {
                var c = $("#appUpdateNotificationV1");
                c.find(".okButton").clickExclOnce(function () {
                    DataStore.setValue("shown-udate-notification-v1",
                        !0);
                    c.dialog("close")
                });
                c.gdDialog({
                    zIndex: 7500
                })
            }
        }
    }
})();