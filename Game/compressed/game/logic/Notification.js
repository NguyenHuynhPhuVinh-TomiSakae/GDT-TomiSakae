"use strict";
var NotificationType = {
    Default: "Default",
    PlatformNews: "PlatformNews",
    IndustryNews: "IndustryNews",
    NewResearchAvailable: "NewResearchAvailable",
    CompanyMilestones: "CompanyMilestones",
    SalesReports: "SalesReports",
    GameReports: "GameReports",
    Events: "Events",
    AutoPopup: "AutoPopup",
    Others: "Others"
},
    NotificationTypeDisplayString = {
        PlatformNews: "Platform News".localize(),
        IndustryNews: "Industry News".localize(),
        NewResearchAvailable: "New Research Available".localize(),
        CompanyMilestones: "Company Milestones".localize(),
        SalesReports: "Sales Reports".localize(),
        GameReports: "Game Reports".localize(),
        Events: "Events".localize(),
        Others: "Others".localize()
    },
    Notification = function (a, b, c, f, d) {
        this.id = GameManager.getGUID();
        1 === arguments.length && arguments[0].constructor == {}.constructor ? ($.extend(this, arguments[0]), this.buttonText || (this.buttonText = "OK".localize()), void 0 === this.weeksUntilFired && (this.weeksUntilFired = 0)) : (this.header = a, this.text = b, this.tryApplyOptions(c) ? this.buttonText = "OK".localize() : this.buttonText = c ? c : "OK".localize(),
            this.tryApplyOptions(f) ? this.weeksUntilFired = 0 : this.weeksUntilFired = f ? f : 0, this.tryApplyOptions(d))
    };
(function () {
    Notification.load = function (a) {
        return new Notification(a)
    };
    var a = Notification.prototype;
    a.tryApplyOptions = function (a) {
        return a && a.constructor == {}.constructor ? ($.extend(this, a), !0) : !1
    };
    a.save = function () {
        var a = {};
        $.extend(a, this);
        return a
    };
    a.getInferredType = function () {
        return this.type && this.type != NotificationType.Default ? this.type : this.header.startsWith("{") ? NotificationType.AutoPopup : this.header == Media.platformNewsHeadline ? NotificationType.PlatformNews : this.header == Media.industryNewsHeadline ||
            this.header == "News".localize() || this.header == "Local News".localize() ? NotificationType.IndustryNews : this.options instanceof Array && 1 < this.options.length ? NotificationType.Events : NotificationType.Others
    };
    a.shouldShowInSidebar = function () {
        var a = this.getInferredType();
        return Notification.shouldShowInSideBar(a)
    };
    Notification.shouldShowInSideBar = function (a) {
        if (a == NotificationType.AutoPopup) return !1;
        var c = DataStore.getMessageSettings(),
            f = {};
        f[NotificationType.GameReports] = !0;
        f[NotificationType.SalesReports] = !0;
        f[NotificationType.Others] = !0;
        c = $.extend({}, f, c);
        return c.hasOwnProperty(a) ? c[a] : !1
    };
    Notification.setShouldShowInSideBar = function (a, c) {
        DataStore.getMessageSettings()[a] = c;
        DataStore.saveSettings()
    };
    a.getNotificationPreviewImage = function () {
        if (this.previewImage) return this.previewImage;
        if (this.image) return this.image;
        if (this.header == "News".localize() || this.header == "Local News".localize()) return "./images/notificationIcons/icon_notification_local_news_and_media.png";
        switch (this.getInferredType()) {
            case NotificationType.Events:
                return "./images/notificationIcons/icon_notification_gamers_enquiry.png";
            case NotificationType.NewResearchAvailable:
                return "./images/notificationIcons/icon_notification_research.png";
            case NotificationType.IndustryNews:
                return "./images/notificationIcons/icon_notification_industry_news.png";
            case NotificationType.PlatformNews:
                return "./images/notificationIcons/icon_notification_platform_release.png";
            case NotificationType.GameReports:
                return "./images/notificationIcons/icon_notification_game_report.png";
            case NotificationType.CompanyMilestones:
                return "./images/notificationIcons/icon_notification_award.png";
            default:
                return "./images/notificationIcons/icon_notification_info.png"
        }
    };
    a.split = function () {
        var a = [],
            c = this.text,
            c = c ? c.split("{n}") : "";
        if (1 >= c.length) return [this];
        if (1 < c.length)
            for (var f = 0; f < c.length; f++) {
                var d = {};
                $.extend(d, this);
                d.text = c[f];
                this.buttonText instanceof Array && (d.buttonText = this.buttonText[f]);
                this.image && this.image instanceof Array && (d.image = this.image.length > f ? this.image[f] : this.image.last());
                (d.sourceId || d.options) && f != c.length - 1 && (d.sourceId = null, d.options = null);
                d = new Notification(d);
                a.push(d)
            }
        return a
    };
    a.adjustCash = function (a, c) {
        this.actions || (this.actions = []);
        this.actions.push({
            type: "adjustCash",
            data: {
                amount: a,
                label: c
            }
        })
    };
    a.adjustHype = function (a) {
        this.actions || (this.actions = []);
        this.actions.push({
            type: "adjustHype",
            data: {
                amount: a
            }
        })
    };
    a.adjustFans = function (a) {
        this.actions || (this.actions = []);
        this.actions.push({
            type: "adjustFans",
            data: {
                amount: a
            }
        })
    };
    a.setFlag = function (a, c) {
        this.actions || (this.actions = []);
        this.actions.push({
            type: "setFlag",
            data: {
                key: a,
                value: c
            }
        })
    };
    a.activateAchievement =
        function (a) {
            this.actions || (this.actions = []);
            this.actions.push({
                type: "achivement",
                data: {
                    id: a.id
                }
            })
        };
    a.applyActions = function (a) {
        if (this.actions)
            for (var c = 0; c < this.actions.length; c++) {
                var f = this.actions[c];
                switch (f.type) {
                    case "adjustCash":
                        a.adjustCash(f.data.amount, f.data.label);
                        break;
                    case "adjustFans":
                        a.adjustFans(f.data.amount);
                        break;
                    case "setFlag":
                        a.flags[f.data.key] = f.data.value;
                        break;
                    case "adjustHype":
                        a.adjustHype(f.data.amount);
                        break;
                    case "achivement":
                        f = Achievements.getWidthId(f.data.id);
                        Achievements.activate(f);
                        break;
                    default:
                        if (GameFlags.ghg6) throw new "unknown type: " + f.type;
                }
            }
    }
})();