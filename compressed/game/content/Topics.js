"use strict";
var Topics = {};
Topics.topics = [{
    id: "Sports",
    name: "Sports".localize("game topic"),
    genreWeightings: [1, 0.6, 0.6, 1, 0.7, 1],
    audienceWeightings: [1, 1, 0.8],
    missionOverrides: [
        [0.9, 1, 0, 0.7, 0.8, 1, 0.6, 0, 0],
        [0, 0.9, 0, 0, 0.9, 0, 0, 0, 0],
        [0, 1, 0.9, 0, 0, 0, 0.7, 1, 0.9],
        [0, 0, 0, 0.8, 0, 0, 0.7, 0, 0],
        [0.8, 1, 0.9, 0, 0, 0, 0.8, 1, 0.9],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
}, {
    id: "Military",
    name: "Military".localize("game topic"),
    genreWeightings: [1, 0.6, 0.8, 1, 1, 0.6],
    audienceWeightings: [0.7, 0.9, 1]
}, {
    id: "Medieval",
    name: "Medieval".localize("game topic"),
    genreWeightings: [1, 1, 1, 0.8,
        1, 0.7
    ],
    audienceWeightings: [1, 1, 0.9]
}, {
    id: "Space",
    name: "Space".localize("game topic"),
    genreWeightings: [1, 0.8, 0.6, 1, 1, 0.7],
    audienceWeightings: [0.8, 1, 1]
}, {
    id: "Racing",
    name: "Racing".localize("game topic"),
    genreWeightings: [0.9, 0.6, 0.8, 1, 0.7, 1],
    audienceWeightings: [1, 1, 0.9],
    missionOverrides: [
        [0, 0, 0, 0, 0, 0, 0.7, 0.9, 1],
        [0, 0.9, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0.7, 0.9, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
}, {
    id: "Fantasy",
    name: "Fantasy".localize("game topic"),
    genreWeightings: [1, 1, 1, 0.8, 1, 0.6],
    audienceWeightings: [1, 1, 1]
}, {
    id: "Pirate",
    name: "Pirate".localize("game topic"),
    genreWeightings: [0.8, 1, 0.9, 0.9, 0.7, 0.8],
    audienceWeightings: [1, 1, 0.8]
}, {
    id: "Sci-Fi",
    name: "Sci-Fi".localize("game topic"),
    genreWeightings: [1, 1, 1, 1, 1, 0.8],
    audienceWeightings: [0.8, 1, 1]
}, {
    id: "Airplane",
    name: "Airplane".localize("game topic"),
    genreWeightings: [1, 0.6, 0.8, 1, 1, 1],
    audienceWeightings: [1, 1, 0.9]
}, {
    id: "Dungeon",
    name: "Dungeon".localize("game topic"),
    genreWeightings: [1, 0.8, 1, 1, 1, 0.6],
    audienceWeightings: [0.8, 1, 1]
}, {
    id: "Mystery",
    name: "Mystery".localize("game topic"),
    genreWeightings: [0.6, 1, 1, 0.8, 0.6, 0.8],
    audienceWeightings: [0.8, 0.9, 1],
    missionOverrides: [
        [0.9, 0.8, 1, 0.9, 1, 0.8, 1, 0.8, 0.9],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0.8, 1, 0.9, 0.8, 1, 0.9, 1, 0.8, 0.9],
        [0.8, 1, 0.9, 0.8, 1, 0.9, 1, 0.8, 0.9],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
}, {
    id: "Martial Arts",
    name: "Martial Arts".localize("game topic"),
    genreWeightings: [1, 0.8, 1, 1, 0.7, 1],
    audienceWeightings: [0.7, 0.9, 1]
}, {
    id: "History",
    name: "History".localize("game topic"),
    genreWeightings: [0.8, 0.8, 0.8, 1, 1, 0.9],
    audienceWeightings: [0.8, 1, 0.9]
}, {
    id: "Horror",
    name: "Horror".localize("game topic"),
    genreWeightings: [1, 1, 0.8, 0.6, 0.7, 0.8],
    audienceWeightings: [0.6, 0.9, 1],
    missionOverrides: [
        [0, 0, 0, 0.7, 1, 0.9, 0.9, 0.8, 1],
        [0, 0, 0, 0, 0, 0, 0.7, 0.9, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
}, {
    id: "Business",
    name: "Business".localize("game topic"),
    genreWeightings: [0.6, 0.8, 0.8, 1, 1, 0.6],
    audienceWeightings: [0.9, 1, 0.7]
}, {
    id: "Transport",
    name: "Transport".localize("game topic"),
    genreWeightings: [0.6,
        0.6, 0.6, 1, 1, 0.6
    ],
    audienceWeightings: [0.9, 1, 0.7]
}, {
    id: "Comedy",
    name: "Comedy".localize("game topic"),
    genreWeightings: [0.6, 1, 0.8, 0.6, 0.6, 1],
    audienceWeightings: [0.8, 0.9, 1]
}, {
    id: "Ninja",
    name: "Ninja".localize("game topic"),
    genreWeightings: [1, 0.8, 0.8, 0.6, 0.8, 0.9],
    audienceWeightings: [1, 0.9, 0.9]
}, {
    id: "Romance",
    name: "Romance".localize("game topic"),
    genreWeightings: [0.6, 1, 0.8, 0.9, 0.6, 0.9],
    audienceWeightings: [0.8, 1, 1]
}, {
    id: "Movies",
    name: "Movies".localize("game topic"),
    genreWeightings: [0.8, 0.8, 0.6, 1, 0.6, 1],
    audienceWeightings: [0.9,
        1, 0.9
    ]
}, {
    id: "Spy",
    name: "Spy".localize("game topic"),
    genreWeightings: [1, 1, 1, 0.8, 0.7, 0.8],
    audienceWeightings: [0.8, 0.9, 1]
}, {
    id: "Detective",
    name: "Detective".localize("game topic"),
    genreWeightings: [0.6, 1, 1, 0.8, 0.6, 0.9],
    audienceWeightings: [0.9, 1, 0.8],
    missionOverrides: [
        [0.9, 0.8, 1, 0.9, 1, 0.8, 1, 0.8, 0.9],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0.8, 1, 0.9, 0.8, 1, 0.9, 1, 0.8, 0.9],
        [0.8, 1, 0.9, 0.8, 1, 0.9, 1, 0.8, 0.9],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
}, {
    id: "Cyberpunk",
    name: "Cyberpunk".localize("game topic"),
    genreWeightings: [1, 0.8, 1,
        0.8, 0.7, 0.6
    ],
    audienceWeightings: [0.7, 0.9, 1],
    missionOverrides: [
        [1, 0.8, 0.9, 0.8, 1, 0.9, 1, 0.9, 0.8],
        [0, 0, 0, 0, 0, 0, 1, 0.9, 0.8],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0]
    ]
}, {
    id: "UFO",
    name: "UFO".localize("game topic"),
    genreWeightings: [1, 0.8, 0.6, 0.8, 1, 0.8],
    audienceWeightings: [0.8, 1, 0.9]
}, {
    id: "Hospital",
    name: "Hospital".localize("game topic"),
    genreWeightings: [0.6, 0.6, 0.8, 1, 0.8, 0.7],
    audienceWeightings: [0.7, 1, 0.8]
}, {
    id: "Evolution",
    name: "Evolution".localize("game topic"),
    genreWeightings: [0.7,
        0.6, 0.6, 1, 1, 0.6
    ],
    audienceWeightings: [0.8, 1, 0.7]
}, {
    id: "Time Travel",
    name: "Time Travel".localize("game topic"),
    genreWeightings: [0.9, 1, 1, 0.7, 0.6, 0.7],
    audienceWeightings: [0.9, 1, 0.8]
}, {
    id: "Life",
    name: "Life".localize("game topic"),
    genreWeightings: [0.6, 1, 0.9, 1, 0.6, 0.8],
    audienceWeightings: [1, 1, 0.8]
}, {
    id: "Virtual Pet",
    name: "Virtual Pet".localize("game topic"),
    genreWeightings: [0.6, 0.8, 0.9, 1, 0.9, 1],
    audienceWeightings: [1, 0.8, 0.7]
}, {
    id: "Vocabulary",
    name: "Vocabulary".localize("game topic"),
    genreWeightings: [0.6,
        0.6, 0.6, 1, 1, 1
    ],
    audienceWeightings: [0.9, 1, 0.6]
}, {
    id: "Hunting",
    name: "Hunting".localize("game topic"),
    genreWeightings: [1, 0.9, 0.9, 1, 0.7, 0.9],
    audienceWeightings: [0.9, 1, 0.9]
}, {
    id: "Law",
    name: "Law".localize("game topic"),
    genreWeightings: [0.6, 1, 0.9, 0.9, 0.9, 0.6],
    audienceWeightings: [0.8, 1, 0.7],
    missionOverrides: [
        [0, 0, 0, 1, 0.8, 0.9, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0.8, 0.9, 1, 1, 0.8, 0.9, 1, 0.9, 0.8],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0.9, 0, 0, 0, 0]
    ]
}, {
    id: "Game Dev",
    name: "Game Dev".localize("game topic"),
    genreWeightings: [0.6,
        0.7, 0.6, 1, 0.6, 0.8
    ],
    audienceWeightings: [0.9, 1, 0.7]
}, {
    id: "City",
    name: "City".localize("game topic"),
    genreWeightings: [0.7, 0.6, 0.7, 1, 1, 0.7],
    audienceWeightings: [0.9, 1, 0.8]
}, {
    id: "School",
    name: "School".localize("game topic"),
    genreWeightings: [0.8, 1, 1, 1, 1, 0.8],
    audienceWeightings: [1, 0.9, 0.7]
}, {
    id: "Fashion",
    name: "Fashion".localize("game topic"),
    genreWeightings: [0.6, 0.8, 1, 1, 0.6, 1],
    audienceWeightings: [1, 0.8, 0.6]
}, {
    id: "Zombies",
    name: "Zombies".localize("game topic"),
    genreWeightings: [1, 0.7, 0.9, 0.7, 0.9, 1],
    audienceWeightings: [0.9,
        0.8, 1
    ]
}, {
    id: "Hacking",
    name: "Hacking".localize("game topic"),
    genreWeightings: [0.7, 0.8, 0.7, 1, 1, 0.6],
    audienceWeightings: [0.7, 0.9, 1]
}, {
    id: "Government",
    name: "Government".localize("game topic"),
    genreWeightings: [0.6, 0.6, 0.6, 1, 1, 0.7],
    audienceWeightings: [0.6, 1, 0.8]
}, {
    id: "Prison",
    name: "Prison".localize("game topic"),
    genreWeightings: [1, 1, 0.8, 1, 0.8, 0.6],
    audienceWeightings: [0.7, 0.9, 1]
}, {
    id: "Surgery",
    name: "Surgery".localize("game topic"),
    genreWeightings: [0.8, 0.7, 0.6, 1, 0.7, 0.6],
    audienceWeightings: [0.8, 1, 0.9]
}, {
    id: "Music",
    name: "Music".localize("game topic"),
    genreWeightings: [1, 0.9, 0.6, 1, 0.6, 1],
    audienceWeightings: [1, 0.9, 0.8],
    missionOverrides: [
        [0, 0, 0, 0, 0, 0, 0.8, 0.9, 1],
        [0, 0, 0, 0, 0, 0, 0.9, 0.8, 1],
        [0, 0, 0, 0, 0, 0, 0.9, 0.8, 1],
        [0, 0, 0, 0, 0, 0, 0.8, 0.9, 1],
        [0, 0, 0, 0, 0, 0, 0.9, 0.8, 1],
        [0, 0, 0, 0, 0, 0, 0.7, 0.9, 1]
    ]
}, {
    id: "Rythm",
    name: "Rhythm".localize("game topic"),
    genreWeightings: [1, 0.7, 0.7, 1, 0.6, 1],
    audienceWeightings: [1, 0.9, 0.8],
    missionOverrides: [
        [0, 0, 0, 0, 0, 0, 0.8, 0.9, 1],
        [0, 0, 0, 0, 0, 0, 0.9, 0.8, 1],
        [0, 0, 0, 0, 0, 0, 0.9, 0.8, 1],
        [0, 0, 0, 0, 0, 0, 0.8, 0.9, 1],
        [0, 0,
            0, 0, 0, 0, 0.9, 0.8, 1
        ],
        [0, 0, 0, 0, 0, 0, 0.7, 0.9, 1]
    ],
    iconUrl: "./images/topic icons/icon_topic_rhythm.png"
}, {
    id: "Superheroes",
    name: "Superheroes".localize("game topic"),
    genreWeightings: [1, 0.6, 0.9, 0.6, 0.6, 0.7],
    audienceWeightings: [1, 1, 1]
}, {
    id: "Post Apocalyptic",
    name: "Post Apocalyptic".localize("game topic"),
    genreWeightings: [1, 0.8, 1, 0.6, 0.9, 0.6],
    audienceWeightings: [0.6, 0.9, 1]
}, {
    id: "Alternate History",
    name: "Alternate History".localize("game topic"),
    genreWeightings: [1, 0.8, 1, 0.8, 0.9, 0.6],
    audienceWeightings: [0.6, 1,
        1
    ]
}, {
    id: "Vampire",
    name: "Vampire".localize("game topic"),
    genreWeightings: [1, 0.8, 1, 0.6, 0.6, 0.7],
    audienceWeightings: [0.7, 1, 1]
}, {
    id: "Werewolf",
    name: "Werewolf".localize("game topic"),
    genreWeightings: [1, 0.8, 1, 0.6, 0.6, 0.7],
    audienceWeightings: [0.7, 0.9, 1]
}, {
    id: "Aliens",
    name: "Aliens".localize("game topic"),
    genreWeightings: [1, 0.8, 1, 0.6, 0.9, 0.7],
    audienceWeightings: [0.9, 1, 1]
}, {
    id: "Wild West",
    name: "Wild West".localize("game topic"),
    genreWeightings: [0.9, 0.7, 1, 0.6, 0.6, 0.7],
    audienceWeightings: [1, 0.9, 1]
}, {
    id: "Dance",
    name: "Dance".localize("game topic"),
    genreWeightings: [0.9, 0.6, 0.6, 1, 0.6, 1],
    audienceWeightings: [1, 0.9, 0.8]
}, {
    id: "Cooking",
    name: "Cooking".localize("game topic"),
    genreWeightings: [0.9, 0.7, 0.8, 1, 0.7, 1],
    audienceWeightings: [0.8, 1, 0.6]
}, {
    id: "Farming",
    name: "Farming".localize("game topic"),
    genreWeightings: [0.6, 0.7, 1, 1, 0.8, 0.9],
    audienceWeightings: [0.9, 1, 0.8]
}, {
    id: "Crime",
    name: "Crime".localize("game topic"),
    genreWeightings: [1, 0.7, 0.8, 0.9, 0.7, 0.6],
    audienceWeightings: [0.6, 0.8, 1]
}, {
    id: "Disasters",
    name: "Disasters".localize("game topic"),
    genreWeightings: [0.9, 0.8, 0.7, 1, 1, 0.7],
    audienceWeightings: [0.7, 0.9, 1]
}, {
    id: "Assassin",
    name: "Assassin".localize("game topic"),
    genreWeightings: [1, 0.7, 1, 0.8, 0.6, 0.6],
    audienceWeightings: [0.6, 0.8, 1]
}, {
    id: "Thief",
    name: "Thief".localize("game topic"),
    genreWeightings: [0.9, 0.8, 1, 0.8, 0.9, 0.7],
    audienceWeightings: [0.7, 1, 1]
}, {
    id: "Colonization",
    name: "Colonization".localize("game topic"),
    genreWeightings: [0.7, 0.6, 0.6, 1, 1, 0.7],
    audienceWeightings: [0.7, 1, 0.8]
}, {
    id: "Construction",
    name: "Construction".localize("game topic"),
    genreWeightings: [0.7, 0.6, 0.6, 1, 0.9, 0.8],
    audienceWeightings: [0.8, 1, 0.9]
}, {
    id: "Mythology",
    name: "Mythology".localize("game topic"),
    genreWeightings: [1, 0.8, 0.9, 0.9, 0.8, 0.7],
    audienceWeightings: [0.7, 1, 1]
}, {
    id: "Abstract",
    name: "Abstract".localize("game topic"),
    genreWeightings: [0.9, 1, 0.6, 0.6, 0.8, 0.6],
    audienceWeightings: [0.8, 0.9, 1]
}, {
    id: "Mad Science",
    name: "Mad Science".localize("game topic"),
    genreWeightings: [0.9, 1, 0.7, 0.9, 0.6, 0.6],
    audienceWeightings: [0.8, 0.9, 1]
}, {
    id: "Extreme Sports",
    name: "Extreme Sports".localize("game topic"),
    genreWeightings: [1, 0.6, 0.6, 1, 0.7, 0.9],
    audienceWeightings: [1, 0.7, 1]
}, {
    id: "Dystopian",
    name: "Dystopian".localize("game topic"),
    genreWeightings: [0.8, 0.9, 0.8, 1, 0.9, 0.6],
    audienceWeightings: [0.6, 0.8, 1]
}, {
    id: "Expedition",
    name: "Expedition".localize("game topic"),
    genreWeightings: [0.7, 0.9, 0.6, 0.9, 1, 0.6],
    audienceWeightings: [0.8, 1, 0.9]
}, {
    id: "Technology",
    name: "Technology".localize("game topic"),
    genreWeightings: [0.6, 0.7, 0.6, 1, 0.9, 0.6],
    audienceWeightings: [0.8, 1, 0.9]
}];
if (GameFlags.ghg6 && Topics.topics.some(function (a) {
    return 6 != a.genreWeightings.length || a.genreWeightings.some(function (a) {
        return 0.6 > a || 1 < a
    })
})) throw "invalid topic data";