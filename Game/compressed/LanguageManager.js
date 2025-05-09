var LanguageMgr = {};
(function () {
    var a = LanguageMgr;
    a.map = {
        brazilian: "ptbr",
        bulgarian: "en",
        czech: "cs",
        danish: "en",
        dutch: "nl",
        english: "en",
        finnish: "en",
        french: "fr",
        german: "de",
        greek: "el",
        hungarian: "hu",
        italian: "it",
        japanese: "en",
        koreana: "en",
        norwegian: "en",
        polish: "pl",
        portuguese: "en",
        romanian: "en",
        russian: "ru",
        schinese: "zhcn",
        spanish: "es",
        swedish: "sv",
        tchinese: "zhcn",
        thai: "en",
        turkish: "tr",
        ukrainian: "uk",
        vietnamese: "vi"
    };
    a.gameLanguage = GameManager.getPreferredLanguage();
    a.steamGameLanguage = "english";
    a.storedSteamGameLanguage = DataStore.getValue("steamlanguage");
    a.init = function () {
        GameFlags.IS_STEAM && (Steam.isAvailable() && (a.steamGameLanguage = Steam.getCurrentGameLanguage(), a.steamGameLanguage != a.storedSteamGameLanguage && (a.storedSteamGameLanguage = a.steamGameLanguage, DataStore.setValue("steamlanguage", a.storedSteamGameLanguage), a.gameLanguage != a.map[a.storedSteamGameLanguage] && (a.gameLanguage = a.map[a.storedSteamGameLanguage]))), GameManager.setPreferredLanguage(a.gameLanguage));
        Localization.setLanguage(GameManager.getPreferredLanguage())
    }
})();
LanguageMgr.init();