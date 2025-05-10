var GameTrends = {};
(function () {
    var a = GameTrends;
    a.getCurrentTrendFactor = function (a) {
        var c = b(GameManager.company).currentTrend;
        if (!c) return 1;
        if ("genre" === c.type) {
            if (a.genre.id == c.genre) return 1.2
        } else if ("newTopics" === c.type) {
            var f = a.topic.id;
            if (0 === GameManager.company.gameLog.count(function (a) {
                return a.topic.id === f
            })) return 1.2
        } else if ("audience" === c.type) {
            if (a.targetAudience === c.audience) return 1.2
        } else if ("strangeCombos" === c.type) return a = GameGenre.getGenreWeighting(a.topic.genreWeightings, a.genre), 1 === a ? 0.85 : 0.9 ===
            a ? 1.1 : 0.8 === a ? 1.2 : 1.4;
        return 1
    };
    var b = function (a) {
        a.flags.trends || (a.flags.trends = {}, c(a));
        return a.flags.trends
    },
        c = function (a) {
            var b = a.flags.trends;
            b.expireBy = GameManager.gameTime + (24 + 12 * a.getRandom()) * GameManager.SECONDS_PER_WEEK * 1E3;
            if (1 != a.currentLevel) {
                var c = b.currentTrend;
                b.currentTrend = null;
                if (null === c && 0.5 <= a.getRandom()) {
                    var l = a.getRandom();
                    0.5 >= l ? (l = General.getAvailableGenres(a).pickRandom(), b.currentTrend = {
                        type: "genre",
                        genre: l.id,
                        label: "Popular genre: ".localize() + l.name
                    }) : 0.7 >= l ? b.currentTrend = {
                        type: "newTopics",
                        label: "Popular: New topics".localize()
                    } : 0.95 >= l ? a.canSetTargetAudience() && (l = ["young", "everyone", "mature"].pickRandom(), b.currentTrend = {
                        type: "audience",
                        audience: l,
                        label: "Strong audience: ".localize() + General.getAudienceLabel(l)
                    }) : 0.96 <= l && (b.currentTrend = {
                        type: "strangeCombos",
                        strength: 1,
                        label: "Trend: Strange combinations".localize()
                    })
                }
                f(a, c, b.currentTrend)
            }
        },
        f = function (a, b, c) {
            var l;
            if (b && !c) l = ["It seems that the market has normalized again with no particular strong trends at the moment.".localize()].pickRandom();
            else if (c) switch (c.type) {
                case "genre":
                    b = General.getAvailableGenres(a).first(function (a) {
                        return a.id === c.genre
                    });
                    l = ["It seems that {0} games are especially popular at the moment.".localize(), "There is a clear trend towards {0} games recently.".localize()].pickRandom().format(b.name);
                    break;
                case "newTopics":
                    l = "It seems that the market responds particularly well to games with new topics at the moment.".localize();
                    break;
                case "audience":
                    l = "";
                    break;
                case "strangeCombos":
                    l = "Analysts have observed a strange trend lately where players around the world seem to have developed a curious taste for unusual games.{n}As one player put it: 'Sometimes you just want to play something unique. A game based on an idea that's not the usual Military/Action game or Fantasy/RPG just to name two examples.\nI really hope companies bring some unique games to market soon. I would definitely prefer them right now.'{n}This new trend promises to bring an interesting challenge to game developers as topic/genre combinations which used to work well will suddenly be less favorable while more outlandish ideas might flourish.".localize()
            }
            l &&
                a.notifications.push(new Notification("Market Analysis".localize("heading"), l, {
                    type: NotificationType.IndustryNews
                }))
        };
    a.updateTrends = function (a) {
        b(a).expireBy <= GameManager.gameTime && c(a)
    }
})();