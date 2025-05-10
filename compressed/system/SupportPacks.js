var SupportPacks = {};
(function () {
    var a = SupportPacks,
        b;
    a.getPacks = function (a) {
        b ? a(b) : GameManager.ghg3().loadListingInformationAsync().done(function (f) {
            b = f;
            a(b)
        }, function (a) { })
    };
    a.hasBought = function (a) {
        return GameManager.ghg3().licenseInformation.productLicenses.lookup(a)
    };
    a.buy = function (b, f) {
        GameManager.ghg3().requestProductPurchaseAsync(b, !0).done(function (d) {
            d && (a.hasBought(b) ? (ghg4.ghg5("feature purchased", {
                id: b
            }), Achievements.activate(Achievements.supporter2), GameManager.checkAchievements(), f && f()) : (ghg4.ghg5("feature purchase unsuccessful"),
                Windows.UI.Popups.MessageDialog("It seems that something went wrong when purchasing this feature pack.\nPlease close the app and try again later.\n If the issue persists please contact\n\nsupport@greenheartgames.com", "purchase not validated").showAsync()))
        }, function (a) {
            Windows.UI.Popups.MessageDialog("It seems that something went wrong when trying to purchase this feature pack.\nPlease close the app and try again later.\n If the issue persists please contact\n\nsupport@greenheartgames.com", "Store Error").showAsync()
        })
    }
})();