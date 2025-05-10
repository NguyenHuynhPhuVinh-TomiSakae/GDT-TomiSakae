// --- START OF FILE VisualsManager.js ---

// Định nghĩa màu sắc cho các loại điểm trong game
var DESIGN_POINTS_COLOR = "orange";            // Màu cho điểm thiết kế
var TECHNOLOGY_POINTS_COLOR = "#00BFFF";       // Màu cho điểm công nghệ
var RESEARCH_POINTS_COLOR = "#006AFF";         // Màu cho điểm nghiên cứu
var BUGS_COLOR = "#FF6A00";                    // Màu cho lỗi (bugs)

// Namespace chính cho quản lý hình ảnh và hiệu ứng
var VisualsManager = {};

(function () {
    // 'visualsModule' là alias cho VisualsManager trong scope của IIFE này
    var visualsModule = VisualsManager;
    // 'canvasModule' là alias cho CanvasManager
    var canvasModule = CanvasManager;

    // Hệ số chia để tính toán tọa độ trên màn hình, có thể thay đổi dựa trên độ phân giải
    visualsModule.Divisor = 1;
    // Độ lệch toàn cục theo trục X, hữu ích cho việc cuộn màn hình hoặc xử lý màn hình rộng
    visualsModule.globalOffsetX = 0;

    // Nếu game đang chạy ở độ phân giải thấp (ISLOWRES là cờ toàn cục)
    // thì cập nhật Divisor để điều chỉnh tỷ lệ hiển thị
    if (PlatformShim.ISLOWRES) {
        visualsModule.Divisor = 1.874084919472914;
    }

    // Hàm chuyển đổi tọa độ logic của game thành tọa độ màn hình
    // 'coordinate' là tọa độ logic, 'scale' là tỷ lệ (mặc định là 1)
    visualsModule.toScreenCoordinates = function (coordinate, scale) {
        var currentScale = isNaN(scale) ? 1 : scale; // Nếu scale không phải số thì mặc định là 1
        // Chia tọa độ logic cho Divisor, nhân với scale và làm tròn
        return Math.round(coordinate / visualsModule.Divisor * currentScale);
    };

    // Lưu lại hàm createjs.Tween.get gốc
    var originalCreatejsTweenGet = createjs.Tween.get;
    // Ghi đè hàm createjs.Tween.get để thêm gameId vào mỗi tween
    // Điều này giúp quản lý và dừng các tween cũ khi game được load lại
    createjs.Tween.get = function () {
        var tweenInstance = originalCreatejsTweenGet.apply(this, arguments);
        if (tweenInstance) {
            tweenInstance.gameId = GameManager.gameId; // Gán ID game hiện tại cho tween
        }
        return tweenInstance;
    };

    // Hàm dừng tất cả các tween không thuộc về gameId hiện tại
    visualsModule.stopOldTweens = function () {
        // Lọc ra các tween có gameId và gameId đó khác với ID game hiện tại
        var oldTweens = createjs.Tween._tweens.filter(function (tween) {
            return tween.gameId && tween.gameId != GameManager.gameId;
        }).slice(); // Tạo một bản sao của mảng để tránh lỗi khi thay đổi mảng gốc
        // Dừng (pause) tất cả các tween cũ
        for (var i = 0; i < oldTweens.length; i++) {
            oldTweens[i].setPaused(true);
        }
    };

    // Các đối tượng UI quan trọng được quản lý bởi VisualsManager
    visualsModule.gameStatusBar = undefined;    // Thanh trạng thái game (hiển thị điểm, tên game, ...)
    visualsModule.researchPoints = undefined; // Đối tượng hiển thị điểm nghiên cứu

    // Hàm reset toàn bộ trạng thái hình ảnh, thường gọi khi tải game hoặc bắt đầu level mới
    visualsModule.reset = function () {
        Sound.pauseAllLoopingFx(); // Dừng tất cả hiệu ứng âm thanh đang lặp
        this.stopOldTweens();      // Dừng các animation cũ

        // Load lại trạng thái hình ảnh cho các nhân viên phòng Hardware và R&D (nếu có)
        if (GameManager.company.hwCrew) {
            for (var i = 0; i < GameManager.company.hwCrew.length; i++) {
                GameManager.company.hwCrew[i].load();
            }
        }
        if (GameManager.company.rndCrew) {
            for (var i = 0; i < GameManager.company.rndCrew.length; i++) {
                GameManager.company.rndCrew[i].load();
            }
        }

        // Reset mảng hình ảnh máy tính
        visualsModule.computerImages = [undefined, undefined, undefined, undefined, undefined];
        // Load lại stage chính (background, các đối tượng tĩnh)
        visualsModule.loadStage(true);

        // Khởi tạo hoặc reset thanh trạng thái game
        if (!visualsModule.gameStatusBar) {
            visualsModule.gameStatusBar = new GameStatusBar();
            canvasModule.foregroundStage.addChild(visualsModule.gameStatusBar);
        }
        visualsModule.gameStatusBar.x = canvasModule.foregroundStage.canvas.width / 2 - visualsModule.gameStatusBar.width / 2;
        visualsModule.gameStatusBar.y = 15;
        visualsModule.gameStatusBar.reset();

        // Khởi tạo hoặc reset hiển thị điểm nghiên cứu
        if (!visualsModule.researchPoints) {
            visualsModule.researchPoints = new PointsDisplayVisual(RESEARCH_POINTS_COLOR, "white", "Research".localize());
            canvasModule.foregroundStage.addChild(visualsModule.researchPoints);
        }
        visualsModule.researchPoints.y = 15;
        visualsModule.researchPoints.size = 100;
        visualsModule.researchPoints.x = visualsModule.gameStatusBar.x + visualsModule.gameStatusBar.width + 70;

        // Reset và làm mới tất cả các nhân vật, phòng lab, điểm số, UI liên quan
        visualsModule.resetAllCharacters();
        visualsModule.refreshLabCrew();
        visualsModule.updatePoints();
        visualsModule.gameStatusBar.updateGameName();
        UI.clearSalesCards();
        UI.clearMaintenanceCards();

        // Hiển thị lại các card bán hàng và bảo trì cho các game/console đang hoạt động
        GameManager.company.licencedPlatforms.forEach(function (platform) {
            if (platform.isCustom === true && (platform.nextSalesCash > 0 || platform.currentSalesCash === 0)) {
                UI.addSalesCard(platform.id, platform.name, platform.currentSalesCash, platform.unitsSold, platform.currentUnitsSold, -1, platform.salesCashLog, platform.nextSalesCash, Sales.consoleUnitPrice);
                if (platform.currentSalesCash > 0) {
                    UI.updateMaintenanceCard(platform);
                }
            }
        });
        GameManager.company.gameLog.forEach(function (game) {
            if (game.currentSalesCash < game.totalSalesCash) {
                UI.addSalesCard(game.id, game.title, game.currentSalesCash, game.totalSalesCash, game.unitsSold, game.currentSalesRank,
                    game.salesCashLog, game.nextSalesCash, game.unitPrice, game.nextMaintenance, game.maintenanceLog);
            }
        });

        CanvasManager.update(true, true); // Cập nhật tất cả canvas
        visualsModule.updateReleaseReadyButton(); // Cập nhật nút "Hoàn thành game"
        UI.reset(); // Reset các thành phần UI khác
    };

    // Hàm reset tất cả hình ảnh nhân vật
    visualsModule.resetAllCharacters = function () {
        // Xóa tất cả children khỏi characterStage
        var characterStageChildren = canvasModule.characterStage.children.slice();
        for (var i = 0; i < characterStageChildren.length; i++) {
            canvasModule.characterStage.children.remove(characterStageChildren[i]);
        }
        visualsModule.characterOverlays = []; // Mảng chứa các đối tượng overlay của nhân vật
        visualsModule.reloadAllCharacters(); // Load lại hình ảnh nhân vật
        visualsModule.refreshTrainingOverlays(); // Làm mới overlay huấn luyện
        visualsModule.refreshHiringButtons(); // Làm mới nút thuê nhân viên
    };

    // Hàm xóa một nhân viên khỏi màn hình
    visualsModule.removeStaff = function (characterToRemove) {
        // Tìm và xóa overlay của nhân viên
        var characterOverlay = visualsModule.characterOverlays.first(function (overlay) {
            return overlay.character === characterToRemove;
        });
        visualsModule.characterOverlays.remove(characterOverlay);
        canvasModule.characterStage.removeChild(characterOverlay);
        // Xóa hình ảnh máy tính của nhân viên đó
        visualsModule.removeComputer(characterToRemove);
        // Làm mới các UI liên quan
        visualsModule.refreshTrainingOverlays();
        visualsModule.refreshHiringButtons();
        UI._resetBoostUI(); // Reset UI của boost
    };

    // Hình ảnh background và máy tính của các nhân viên
    visualsModule.backgroundImage = undefined;
    visualsModule.computerImages = [undefined, undefined, undefined, undefined, undefined];

    // Hàm xử lý khi công ty chuyển sang level mới
    visualsModule.nextLevel = function () {
        var currentCompanyLevel = GameManager.company.currentLevel;
        GameManager.pause(true); // Tạm dừng game

        // Xác định và xóa các tài nguyên không cần thiết của level cũ
        var resourcesToExclude = [1, 2, 3, 4].except([currentCompanyLevel]);
        var oldLevelResources = ResourceKeys.getLevelResources.apply(ResourceKeys, resourcesToExclude);
        GameDev.ResourceManager.removeResources(oldLevelResources);

        UI.fadeInTransitionOverlay(); // Hiển thị overlay chuyển cảnh
        var startTime = Date.now();

        var onResourcesLoaded = function () {
            visualsModule.loadStage(true); // Load lại stage với tài nguyên mới

            // Lưu trạng thái visual của nhân vật và xóa khỏi stage cũ
            for (var i = 0; i < visualsModule.characterOverlays.length; i++) {
                var overlay = visualsModule.characterOverlays[i];
                overlay.character.visualData = overlay.saveState();
                overlay.parent.removeChild(overlay);
            }
            visualsModule.characterOverlays = [];
            visualsModule.reloadAllCharacters(); // Load lại nhân vật
            visualsModule.refreshTrainingOverlays();
            visualsModule.refreshHiringButtons();

            // Nếu có nghiên cứu đang diễn ra, tiếp tục hiển thị animation
            if (GameManager.currentResearches.length > 0) {
                for (var i = 0; i < GameManager.company.staff.length; i++) {
                    if (GameManager.company.staff[i].state === CharacterState.Researching) {
                        VisualsManager.getCharacterOverlay(GameManager.company.staff[i]).startResearching();
                    }
                }
            }
            UI._resetBoostUI();
            CanvasManager.update();
            UI.fadeOutTransitionOverlay(); // Ẩn overlay chuyển cảnh
            GameManager.resume(true);      // Tiếp tục game
        };

        FlippingCounter.init(); // Khởi tạo lại bộ đếm lật số (nếu có)
        // Đảm bảo tài nguyên của level mới đã được tải
        GameDev.ResourceManager.ensureResources(ResourceKeys.getLevelResources(currentCompanyLevel), function () {
            var elapsedTime = Date.now() - startTime;
            // Đảm bảo có một khoảng trễ tối thiểu cho hiệu ứng chuyển cảnh
            if (elapsedTime < 2000) {
                setTimeout(function () {
                    onResourcesLoaded();
                }, 2000 - elapsedTime);
            } else {
                onResourcesLoaded();
            }
        });
    };

    // Hàm thêm hình ảnh máy tính cho một nhân viên tại slot cụ thể
    visualsModule.addComputer = function (characterData) {
        if (characterData.slot > 0) { // Slot 0 thường là người chơi chính, không có máy tính riêng lẻ theo cách này
            var characterSlot = characterData.slot;
            var computerImageResource = undefined;
            var computerImageIndexInStage = 1; // Mặc định vị trí chèn
            var currentLevel = GameManager.company.currentLevel;
            var xPos = 0, yPos = 0;
            var globalScale = CanvasManager.globalScale;

            // Xác định hình ảnh máy tính và vị trí dựa trên level và slot
            if (currentLevel === 2) {
                if (characterSlot === 1) { computerImageResource = GameDev.ResourceManager.resources[ResourceKeys.Level2C1]; xPos = 1005; yPos = 707; computerImageIndexInStage = 4; }
                else if (characterSlot === 2) { computerImageResource = GameDev.ResourceManager.resources[ResourceKeys.Level2C2]; xPos = 880; yPos = 698; }
                else if (characterSlot === 3) { computerImageResource = GameDev.ResourceManager.resources[ResourceKeys.Level2C3]; xPos = 1164; yPos = 576; }
                else if (characterSlot === 4) { computerImageResource = GameDev.ResourceManager.resources[ResourceKeys.Level2C4]; xPos = 1114; yPos = 511; }
            } else if (currentLevel === 3) {
                if (characterSlot === 1) { computerImageResource = GameDev.ResourceManager.resources[ResourceKeys.Level3C1]; xPos = 1005; yPos = 723; computerImageIndexInStage = 4; }
                else if (characterSlot === 2) { computerImageResource = GameDev.ResourceManager.resources[ResourceKeys.Level3C2]; xPos = 878; yPos = 703; }
                else if (characterSlot === 3) { computerImageResource = GameDev.ResourceManager.resources[ResourceKeys.Level3C3]; xPos = 1159; yPos = 593; }
                else if (characterSlot === 4) { computerImageResource = GameDev.ResourceManager.resources[ResourceKeys.Level3C4]; xPos = 1109; yPos = 511; }
            } else if (currentLevel === 4) {
                if (characterSlot === 1) { computerImageResource = GameDev.ResourceManager.resources[ResourceKeys.Level4C1]; xPos = 463; yPos = 978; computerImageIndexInStage = 4; }
                else if (characterSlot === 2) { computerImageResource = GameDev.ResourceManager.resources[ResourceKeys.Level4C2]; xPos = 428; yPos = 756; }
                else if (characterSlot === 3) { computerImageResource = GameDev.ResourceManager.resources[ResourceKeys.Level4C1]; xPos = 745; yPos = 812; }
                else if (characterSlot === 4) { computerImageResource = GameDev.ResourceManager.resources[ResourceKeys.Level4C2]; xPos = 711; yPos = 591; }
                else if (characterSlot === 5) { computerImageResource = GameDev.ResourceManager.resources[ResourceKeys.Level4C1]; xPos = 1014; yPos = 649; }
                else if (characterSlot === 6) { computerImageResource = GameDev.ResourceManager.resources[ResourceKeys.Level4C2]; xPos = 981; yPos = 426; }
            }

            xPos = visualsModule.toScreenCoordinates(xPos, globalScale);
            yPos = visualsModule.toScreenCoordinates(yPos, globalScale);

            if (computerImageResource) {
                var backgroundStage = CanvasManager.backgroundStage;
                var canvasWidth = backgroundStage.canvas.width;
                var canvasHeight = backgroundStage.canvas.height;
                var targetAspectRatio = 1366 / 768;
                var currentOffsetX = 0;

                // Điều chỉnh offset nếu tỷ lệ màn hình không chuẩn
                if (Math.abs(canvasWidth / canvasHeight - targetAspectRatio) > 0.1) {
                    var scaledWidth = targetAspectRatio * canvasHeight;
                    currentOffsetX = -(scaledWidth - canvasWidth) / 2;
                    canvasWidth = scaledWidth;
                }
                visualsModule.currentXOffset = currentOffsetX;

                // Tạo một canvas tạm để vẽ máy tính (có thể để tối ưu hoặc xử lý alpha)
                var tempCanvas = document.createElement("canvas");
                tempCanvas.width = canvasWidth;
                tempCanvas.height = canvasHeight;
                tempCanvas.getContext("2d").drawImage(
                    computerImageResource, 0, 0, computerImageResource.width, computerImageResource.height,
                    currentOffsetX + xPos, yPos,
                    Math.floor(computerImageResource.width * globalScale), Math.floor(computerImageResource.height * globalScale)
                );

                var computerBitmap = new createjs.Bitmap(tempCanvas);
                computerBitmap.width = canvasWidth;
                computerBitmap.height = canvasHeight;

                visualsModule.computerImages[characterSlot] = computerBitmap;
                // Chèn vào stage ở vị trí phù hợp để đảm bảo thứ tự vẽ đúng
                if (backgroundStage.children.length >= computerImageIndexInStage - 1) {
                    backgroundStage.addChildAt(computerBitmap, computerImageIndexInStage);
                } else {
                    backgroundStage.addChild(computerBitmap);
                }
                CanvasManager.invalidateBackground(); // Đánh dấu background cần vẽ lại
            }
        }
    };

    // Hàm xóa hình ảnh máy tính của một nhân viên
    visualsModule.removeComputer = function (characterData) {
        var backgroundStage = CanvasManager.backgroundStage;
        if (visualsModule.computerImages[characterData.slot]) {
            backgroundStage.removeChild(visualsModule.computerImages[characterData.slot]);
            visualsModule.computerImages[characterData.slot] = undefined;
            CanvasManager.invalidateBackground();
        }
    };

    // Hàm tạo một đối tượng Text cho biển hiệu trong phòng lab
    visualsModule.getLabSign = function (text, maxWidth, maxHeight, x, y) {
        var container = new createjs.Container();
        container.x = x;
        container.y = y;

        var fontName = UI.IS_SEGOE_UI_INSTALLED ? "Segoe UI" : "Open Sans";
        var fontSize = 32; // Kích thước font ban đầu
        var textObject;

        // Giảm kích thước font cho đến khi vừa với maxWidth và maxHeight
        do {
            var fontStyle = "bold {0}pt {1}".format(fontSize, fontName);
            textObject = new createjs.Text(text, fontStyle, "black");
            fontSize -= 1;
        } while ((textObject.getMeasuredWidth() > maxWidth || textObject.getMeasuredLineHeight() > maxHeight) && fontSize > 1);

        var scale = fontSize / 32; // Tính tỷ lệ scale dựa trên fontSize cuối cùng
        var textColor = createjs.Graphics.getHSL(0, 0, 24); // Màu chữ

        textObject = new createjs.Text(text, "bold 32pt {0}".format(fontName), textColor);
        textObject.textAlign = "center";
        textObject.textBaseline = "middle";

        container.scaleX = scale;
        container.scaleY = scale;
        container.addChild(textObject);
        return container;
    };

    // Hàm load/reload stage chính của game (background và các đối tượng tĩnh)
    visualsModule.loadStage = function (forceReload) {
        var company = GameManager.company;
        var backgroundStage = CanvasManager.backgroundStage;
        var backgroundOverlayStage = CanvasManager.backgroundOverlayStage;
        var globalScale = CanvasManager.globalScale;

        var canvasWidth = backgroundStage.canvas.width;
        var canvasHeight = backgroundStage.canvas.height;
        var targetAspectRatio = 1366 / 768; // Tỷ lệ màn hình mục tiêu
        var currentOffsetX = 0;

        // Điều chỉnh offset nếu tỷ lệ màn hình không chuẩn (ví dụ màn hình siêu rộng)
        if (Math.abs(canvasWidth / canvasHeight - targetAspectRatio) > 0.1) {
            var scaledWidth = targetAspectRatio * canvasHeight;
            currentOffsetX = -(scaledWidth - canvasWidth) / 2;
            canvasWidth = scaledWidth;
        }

        var currentLevel = company.currentLevel;
        var lockedRightImageResource, lockedLeftImageResource;
        var garageDoorY = visualsModule.toScreenCoordinates(39); // Tọa độ Y của cửa garage (level 4)
        var rndLabDoorY = visualsModule.toScreenCoordinates(47); // Tọa độ Y của cửa phòng R&D (level 4)

        // Xác định tài nguyên background và các thành phần khác dựa trên level
        var levelBackgroundResource = GameDev.ResourceManager.resources[ResourceKeys.Level1];
        var backgroundXOffset = visualsModule.toScreenCoordinates(563);
        var backgroundYOffset = visualsModule.toScreenCoordinates(217);

        if (currentLevel === 2) {
            levelBackgroundResource = GameDev.ResourceManager.resources[ResourceKeys.Level2];
            backgroundXOffset = visualsModule.toScreenCoordinates(83);
            backgroundYOffset = visualsModule.toScreenCoordinates(54);
        } else if (currentLevel === 3) {
            levelBackgroundResource = GameDev.ResourceManager.resources[ResourceKeys.Level3];
            backgroundXOffset = visualsModule.toScreenCoordinates(83);
            backgroundYOffset = visualsModule.toScreenCoordinates(54);
        } else if (currentLevel === 4) {
            levelBackgroundResource = GameDev.ResourceManager.resources[ResourceKeys.Level4];
            backgroundXOffset = visualsModule.toScreenCoordinates(367);
            backgroundYOffset = visualsModule.toScreenCoordinates(39);
            if (!GameManager.company.flags.rndLabUnlocked) {
                lockedRightImageResource = GameDev.ResourceManager.resources[ResourceKeys.Level4LockedRight];
            }
            if (!GameManager.company.flags.hwLabUnlocked) {
                lockedLeftImageResource = GameDev.ResourceManager.resources[ResourceKeys.Level4LockedLeft];
            }
        }

        // Chỉ vẽ lại background nếu cần (forceReload, thay đổi kích thước, hoặc offset)
        if (!visualsModule.backgroundImage || visualsModule.backgroundImage.width != canvasWidth || visualsModule.backgroundImage.height != canvasHeight || visualsModule.currentXOffset != currentOffsetX || forceReload) {
            backgroundStage.removeAllChildren();
            backgroundOverlayStage.removeAllChildren();
            companyNameVisual = undefined; // Reset biển tên công ty
            visualsModule.currentXOffset = currentOffsetX;

            var tempCanvas = document.createElement("canvas");
            tempCanvas.width = canvasWidth;
            tempCanvas.height = canvasHeight;
            var tempCtx = tempCanvas.getContext("2d");

            // Vẽ background chính
            if (currentLevel === 4) {
                // Level 4 có cách vẽ background phức tạp hơn do chia thành nhiều phần
                tempCtx.drawImage(levelBackgroundResource,
                    visualsModule.toScreenCoordinates(2193), 0, // sourceX, sourceY
                    visualsModule.toScreenCoordinates(2560), visualsModule.toScreenCoordinates(1384), // sourceWidth, sourceHeight
                    0, Math.floor(backgroundYOffset * globalScale), // destX, destY
                    Math.floor(visualsModule.toScreenCoordinates(2560) * globalScale), Math.floor(visualsModule.toScreenCoordinates(1384) * globalScale) // destWidth, destHeight
                );
            } else {
                tempCtx.drawImage(levelBackgroundResource, 0, 0, levelBackgroundResource.width, levelBackgroundResource.height,
                    Math.floor(backgroundXOffset * globalScale), Math.floor(backgroundYOffset * globalScale),
                    Math.floor(levelBackgroundResource.width * globalScale), Math.floor(levelBackgroundResource.height * globalScale)
                );
            }

            // Vẽ các phần bị khóa của văn phòng (nếu có ở level 4)
            if (lockedLeftImageResource) {
                tempCtx.clearRect(currentOffsetX, garageDoorY * globalScale, (lockedLeftImageResource.width - 5) * globalScale, lockedLeftImageResource.height * globalScale);
                tempCtx.drawImage(lockedLeftImageResource, 0, 0, lockedLeftImageResource.width, lockedLeftImageResource.height,
                    currentOffsetX, garageDoorY * globalScale,
                    (lockedLeftImageResource.width - 4) * globalScale, lockedLeftImageResource.height * globalScale
                );
            }
            if (lockedRightImageResource) {
                tempCtx.clearRect(Math.floor((visualsModule.toScreenCoordinates(2590) - lockedRightImageResource.width) * globalScale), Math.floor((rndLabDoorY - 1) * globalScale),
                    Math.floor(lockedRightImageResource.width * globalScale), Math.floor(lockedRightImageResource.height * globalScale));
                tempCtx.drawImage(lockedRightImageResource, 0, 0, lockedRightImageResource.width, lockedRightImageResource.height,
                    Math.floor((visualsModule.toScreenCoordinates(2588) - lockedRightImageResource.width) * globalScale), Math.floor(rndLabDoorY * globalScale),
                    Math.floor(lockedRightImageResource.width * globalScale), Math.floor(lockedRightImageResource.height * globalScale)
                );
            }

            var backgroundImageBitmap = new createjs.Bitmap(tempCanvas);
            backgroundImageBitmap.width = canvasWidth;
            backgroundImageBitmap.height = canvasHeight;
            visualsModule.backgroundImage = backgroundImageBitmap;
            backgroundStage.addChildAt(backgroundImageBitmap, 0);

            visualsModule.updateComputers(); // Cập nhật lại vị trí máy tính

            // Xóa và vẽ lại background cho các màn hình phụ (trái/phải cho level 4)
            CanvasManager.leftScreen.backgroundStage.removeAllChildren();
            CanvasManager.leftScreen.backgroundOverlayStage.removeAllChildren();
            CanvasManager.leftScreen.invalidateBackground();
            CanvasManager.rightScreen.backgroundStage.removeAllChildren();
            CanvasManager.rightScreen.backgroundOverlayStage.removeAllChildren();
            CanvasManager.rightScreen.invalidateBackground();

            visualsModule.levelOverlay = new LevelOverlay(company); // Tạo overlay cho level (ví dụ: điều hòa)

            // Xử lý riêng cho level 4 với các phòng lab
            if (currentLevel === 4) {
                var leftScreenCanvas = document.createElement("canvas");
                leftScreenCanvas.width = canvasWidth;
                leftScreenCanvas.height = canvasHeight;
                var leftScreenCtx = leftScreenCanvas.getContext("2d");
                var hardwareLabSign;

                if (!lockedLeftImageResource) { // Nếu phòng Hardware đã mở
                    leftScreenCtx.drawImage(levelBackgroundResource,
                        0, 0, // sourceX, sourceY
                        visualsModule.toScreenCoordinates(2560) - backgroundXOffset, visualsModule.toScreenCoordinates(1384), // sourceWidth, sourceHeight
                        backgroundXOffset * globalScale, backgroundYOffset * globalScale, // destX, destY
                        (visualsModule.toScreenCoordinates(2560) - backgroundXOffset) * globalScale, visualsModule.toScreenCoordinates(1384) * globalScale // destWidth, destHeight
                    );
                    hardwareLabSign = visualsModule.getLabSign("Hardware lab".localize(),
                        visualsModule.toScreenCoordinates(264, globalScale), visualsModule.toScreenCoordinates(54, globalScale),
                        visualsModule.toScreenCoordinates(1878, globalScale), visualsModule.toScreenCoordinates(145, globalScale));
                }
                var leftScreenBitmap = new createjs.Bitmap(leftScreenCanvas);
                leftScreenBitmap.width = canvasWidth;
                leftScreenBitmap.heigth = canvasHeight; // Lỗi chính tả: height
                CanvasManager.leftScreen.backgroundStage.addChildAt(leftScreenBitmap, 0);
                CanvasManager.leftScreen.backgroundOverlayStage.addChild(visualsModule.levelOverlay.leftOverlay);
                if (hardwareLabSign) {
                    CanvasManager.leftScreen.backgroundOverlayStage.addChild(hardwareLabSign);
                }

                var rightScreenCanvas = document.createElement("canvas");
                rightScreenCanvas.width = canvasWidth;
                rightScreenCanvas.height = canvasHeight;
                var rightScreenCtx = rightScreenCanvas.getContext("2d");
                var rndLabSign;

                if (!lockedRightImageResource) { // Nếu phòng R&D đã mở
                    rightScreenCtx.drawImage(lockedRightImageResource, // Lỗi: đáng lẽ là levelBackgroundResource
                        visualsModule.toScreenCoordinates(596), 0, // sourceX, sourceY
                        visualsModule.toScreenCoordinates(29), lockedRightImageResource.height, // sourceWidth, sourceHeight // Lỗi: kích thước sai
                        0, rndLabDoorY * globalScale, // destX, destY
                        visualsModule.toScreenCoordinates(29, globalScale), lockedRightImageResource.height * globalScale // destWidth, destHeight
                    );
                    rndLabSign = visualsModule.getLabSign("R&D lab".localize(),
                        visualsModule.toScreenCoordinates(264, globalScale), visualsModule.toScreenCoordinates(54, globalScale),
                        visualsModule.toScreenCoordinates(690, globalScale), visualsModule.toScreenCoordinates(138, globalScale));
                }
                var rightScreenBitmap = new createjs.Bitmap(rightScreenCanvas);
                rightScreenBitmap.width = canvasWidth;
                rightScreenBitmap.heigth = canvasHeight; // Lỗi chính tả: height
                CanvasManager.rightScreen.backgroundStage.addChildAt(rightScreenBitmap, 0);
                CanvasManager.rightScreen.backgroundOverlayStage.addChild(visualsModule.levelOverlay.rightOverlay);
                if (rndLabSign) {
                    CanvasManager.rightScreen.backgroundOverlayStage.addChild(rndLabSign);
                }
            }
            backgroundOverlayStage.addChild(visualsModule.levelOverlay.centerOverlay);
        }
        visualsModule.updateCompanyNameInOffice(); // Cập nhật tên công ty trên biển hiệu (nếu có)
        CanvasManager.invalidateBackground();
        visualsModule.scrollToZone(GameManager.company.flags.currentZone); // Cuộn đến zone hiện tại
        initializeWipeTouch(); // Khởi tạo sự kiện vuốt màn hình
    };

    // Hàm bật/tắt điều hòa (animation)
    visualsModule.installAirCon = function () {
        if (visualsModule.levelOverlay) {
            visualsModule.levelOverlay.startAirCon1();
            visualsModule.levelOverlay.startAirCon2();
        }
    };

    // Biến cờ để đảm bảo wipeTouch chỉ được khởi tạo một lần
    var wipeTouchInitialized = false;
    // Hàm khởi tạo sự kiện vuốt màn hình
    var initializeWipeTouch = function () {
        if (!wipeTouchInitialized) {
            wipeTouchInitialized = true;
            $("#gameContainerWrapper").wipetouch({
                tapToClick: false, // Không coi tap là click
                wipeLeft: function (event) { // Xử lý khi vuốt sang trái
                    VisualsManager.scrollToNextZone(1);
                },
                wipeRight: function (event) { // Xử lý khi vuốt sang phải
                    VisualsManager.scrollToNextZone(-1);
                },
                wipeMove: function (event) { // Xử lý khi đang vuốt
                    // Bỏ qua nếu đang thao tác với slider hoặc không có thay đổi theo trục X
                    if ((!document.activeElement || !$(document.activeElement).hasClass("ui-slider-handle")) && event.dX) {
                        visualsModule.lastMove = Date.now(); // Ghi lại thời điểm vuốt cuối cùng
                        var scrollContainerWidth = $("#canvasScrollContainer").width();
                        var backgroundCanvasWidth = CanvasManager.backgroundStage.canvas.width;
                        var company = GameManager.company;

                        // Chỉ cho phép cuộn nếu ở level 4 hoặc canvas rộng hơn container
                        if ((company && company.currentLevel == 4) || scrollContainerWidth < backgroundCanvasWidth) {
                            var maxScroll = scrollContainerWidth - backgroundCanvasWidth;
                            var currentLeft = $("#innerCanvasContainer").offset().left - visualsModule.globalOffsetX;
                            currentLeft += event.dX; // Cập nhật vị trí dựa trên khoảng cách vuốt

                            // Kích hoạt/hủy kích hoạt các zone dựa trên vị trí cuộn
                            CanvasManager.zone0Activ = currentLeft > -backgroundCanvasWidth;
                            CanvasManager.zone1Activ = currentLeft > -2 * backgroundCanvasWidth && currentLeft <= maxScroll;
                            CanvasManager.zone2Activ = currentLeft > -3 * backgroundCanvasWidth && currentLeft <= maxScroll - backgroundCanvasWidth;

                            $("#innerCanvasContainer").css("left", currentLeft + "px");
                        }
                    }
                }
            });
            // Đảm bảo link hoạt động trên thiết bị cảm ứng
            $("a").live("touchend", function (event) {
                location.href = $(this).attr("href");
            });
        }
    };

    // Hàm cuộn đến zone tiếp theo (trái hoặc phải)
    visualsModule.scrollToNextZone = function (direction) {
        if (GameManager.company) {
            var currentZone = GameManager.company.flags.currentZone;
            if (currentZone === undefined) {
                currentZone = 1; // Mặc định là zone giữa
            }
            var nextZone = (currentZone + direction).clamp(0, 2); // Giới hạn zone từ 0 đến 2

            // Điều kiện đặc biệt cho level 4 (có thể một số phòng chưa mở)
            if (GameManager.company.currentLevel != 4) {
                nextZone = 1; // Các level khác chỉ có zone giữa
            } else {
                if (!GameManager.company.flags.hwLabUnlocked) {
                    nextZone = nextZone.clamp(1, 2); // Nếu phòng Hardware chưa mở, không cho cuộn sang zone 0
                }
                if (!GameManager.company.flags.rndLabUnlocked) {
                    nextZone = nextZone.clamp(0, 1); // Nếu phòng R&D chưa mở, không cho cuộn sang zone 2
                }
            }
            visualsModule.scrollToZone(nextZone, true); // Cuộn đến zone mới với hiệu ứng
        }
    };

    // Hàm cuộn đến một zone cụ thể
    visualsModule.scrollToZone = function (zoneIndex, withAnimation) {
        var backgroundCanvasWidth = CanvasManager.backgroundStage.canvas.width;
        if (zoneIndex === undefined) {
            zoneIndex = 1; // Mặc định là zone giữa
        }

        // Tính toán vị trí X mục tiêu dựa trên zoneIndex
        var targetX = zoneIndex == 0 ? visualsModule.toScreenCoordinates(270) :
            zoneIndex == 1 ? visualsModule.toScreenCoordinates(2560) :
                visualsModule.toScreenCoordinates(4760);
        targetX = targetX * CanvasManager.globalScale;

        var scrollContainerWidth = $("#canvasScrollContainer").width();
        var offset = Math.abs(scrollContainerWidth - backgroundCanvasWidth) / 2;
        targetX = targetX + offset * zoneIndex; // Điều chỉnh targetX dựa trên offset

        // Nếu vị trí hiện tại khác vị trí mục tiêu thì thực hiện cuộn
        if ($("#innerCanvasContainer").offset().left != targetX) {
            var animationDuration = withAnimation ? visualsModule.toScreenCoordinates(600) : 0;
            visualsModule.isAnimatingScroll = true;
            $("#innerCanvasContainer").transition({ left: -targetX }, animationDuration);
            setTimeout(function () {
                visualsModule.isAnimatingScroll = false;
            }, animationDuration);
        }

        visualsModule._zoneChanged(zoneIndex, withAnimation); // Gọi hàm xử lý khi zone thay đổi
        GameManager.company.flags.currentZone = zoneIndex; // Lưu lại zone hiện tại
    };

    // Hàm cập nhật lại tất cả hình ảnh máy tính
    visualsModule.updateComputers = function () {
        GameManager.company.staff.slice().sort(function (staffA, staffB) {
            return staffA.slot - staffB.slot;
        }).forEach(function (staffMember) {
            visualsModule.addComputer(staffMember);
        });
    };

    // Biến lưu trữ đối tượng hiển thị tên công ty
    var companyNameVisual;
    // Hàm cập nhật tên công ty trên biển hiệu trong văn phòng
    visualsModule.updateCompanyNameInOffice = function () {
        var currentCompanyLevel = GameManager.company.currentLevel;
        if (currentCompanyLevel != 1) { // Level 1 không có biển hiệu
            if (!companyNameVisual) {
                companyNameVisual = new IsometricCompanyNameVisual();
                CanvasManager.backgroundStage.addChild(companyNameVisual);
            }
            companyNameVisual.updateVisual(currentCompanyLevel == 2); // updateVisual có thể thay đổi dựa trên level

            // Cập nhật vị trí và tỷ lệ của biển tên công ty dựa trên level
            if (currentCompanyLevel === 2 || currentCompanyLevel === 3) {
                companyNameVisual.x = visualsModule.toScreenCoordinates(690, CanvasManager.globalScale);
                companyNameVisual.y = visualsModule.toScreenCoordinates(1100, CanvasManager.globalScale);
            } else if (currentCompanyLevel === 4) {
                companyNameVisual.x = visualsModule.toScreenCoordinates(1410, CanvasManager.globalScale);
                companyNameVisual.y = visualsModule.toScreenCoordinates(300, CanvasManager.globalScale);
                companyNameVisual.scaleX *= 0.8;
                companyNameVisual.scaleY *= 0.8;
            }
            companyNameVisual.x += visualsModule.currentXOffset; // Áp dụng offset toàn cục
        }
    };

    // Các hàm cập nhật UI khi bắt đầu/kết thúc các hoạt động
    visualsModule.startCreateEngine = function () {
        visualsModule.gameStatusBar.startEngine();
        visualsModule.updatePoints();
    };

    visualsModule.startContract = function () {
        visualsModule.gameStatusBar.startContract();
        visualsModule.updatePoints();
    };

    visualsModule.updateEngineStatus = function () {
        var currentEngineDev = GameManager.currentEngineDev;
        visualsModule.gameStatusBar.updateProgress(currentEngineDev.progress, true, 100);
        visualsModule.gameStatusBar.updateStatusMessage(currentEngineDev.currentPart.name);
    };

    visualsModule.finishEngine = function () {
        visualsModule.gameStatusBar.finishEngine();
        GameManager.spawnedPoints = 0; // Reset số điểm đang bay
    };

    visualsModule.updatePoints = function () {
        visualsModule.gameStatusBar.updatePoints();
        visualsModule.researchPoints.updatePoints(GameManager.company.researchPoints);
    };

    // Hàm tạo hiệu ứng "pulse" cho hiển thị điểm
    visualsModule.pulsePointsDisplay = function (pointType, callback) {
        if (pointType === "r") { // Điểm nghiên cứu
            visualsModule.researchPoints.pulse(callback);
        } else { // Các loại điểm khác trên thanh trạng thái
            visualsModule.gameStatusBar.pulsePointsDisplay(pointType, callback);
        }
    };

    // Lấy vị trí toàn cục của nơi hiển thị một loại điểm cụ thể
    visualsModule.getGlobalLocationOfPointsDisplay = function (pointType) {
        if (pointType === "r") {
            return {
                x: visualsModule.researchPoints.x + visualsModule.researchPoints.size / 2,
                y: visualsModule.researchPoints.y + visualsModule.researchPoints.size / 2
            };
        }
        return visualsModule.gameStatusBar.getGlobalLocationOfPointsDisplay(pointType);
    };

    // Load lại hình ảnh tất cả nhân vật
    visualsModule.reloadAllCharacters = function () {
        if (GameManager.company && GameManager.company.staff) {
            var staffList = GameManager.company.staff;
            for (var i = 0; i < staffList.length; i++) {
                var character = staffList[i];
                visualsModule.getCharacterOverlay(character); // Lấy hoặc tạo overlay
                character.refreshPoints(); // Làm mới các điểm đang bay của nhân vật
            }
        }
    };

    visualsModule.characterOverlays = []; // Mảng chứa các đối tượng CharacterOverlay

    // Lấy hoặc tạo mới CharacterOverlay cho một nhân vật
    visualsModule.getCharacterOverlay = function (character, skipCreation) {
        var existingOverlay = visualsModule.characterOverlays.first(function (overlay) {
            return overlay.character === character;
        });
        if (existingOverlay || skipCreation) {
            return existingOverlay;
        }
        return visualsModule.createCharacterOverlay(character);
    };

    // Lấy vị trí hiện tại của một nhân vật trên màn hình
    visualsModule.getCurrentPosition = function (level, slot) {
        var position = {};
        // Logic xác định vị trí x, y dựa trên level và slot (vị trí ngồi của nhân viên)
        // (Giữ nguyên logic phức tạp này vì nó đặc thù cho việc sắp xếp nhân vật)
        if (level === 1) { position.x = 998 * CanvasManager.globalScale; position.y = 599 * CanvasManager.globalScale; }
        else if (level === 2 || level === 3) {
            if (slot === 0) { position.x = 1515 * CanvasManager.globalScale; position.y = 995 * CanvasManager.globalScale; }
            else if (slot === 1) { position.x = 1055 * CanvasManager.globalScale; position.y = 790 * CanvasManager.globalScale; }
            else if (slot === 2) { position.x = 803 * CanvasManager.globalScale; position.y = 589 * CanvasManager.globalScale; }
            else if (slot === 3) { position.x = 1283 * CanvasManager.globalScale; position.y = 658 * CanvasManager.globalScale; }
            else if (slot === 4) { position.x = 1036 * CanvasManager.globalScale; position.y = 451 * CanvasManager.globalScale; }
        } else if (level === 4) {
            if (slot === 0) { position.x = 1565 * CanvasManager.globalScale; position.y = 915 * CanvasManager.globalScale; }
            else if (slot === 1) { position.x = 516 * CanvasManager.globalScale; position.y = 1023 * CanvasManager.globalScale; }
            else if (slot === 2) { position.x = 436 * CanvasManager.globalScale; position.y = 711 * CanvasManager.globalScale; }
            else if (slot === 3) { position.x = 798 * CanvasManager.globalScale; position.y = 857 * CanvasManager.globalScale; }
            else if (slot === 4) { position.x = 719 * CanvasManager.globalScale; position.y = 547 * CanvasManager.globalScale; }
            else if (slot === 5) { position.x = 1067 * CanvasManager.globalScale; position.y = 694 * CanvasManager.globalScale; }
            else if (slot === 6) { position.x = 989 * CanvasManager.globalScale; position.y = 382 * CanvasManager.globalScale; }
        }
        // Chuyển đổi sang tọa độ màn hình và áp dụng offset
        position.x = visualsModule.toScreenCoordinates(position.x);
        position.y = visualsModule.toScreenCoordinates(position.y);
        position.x += visualsModule.currentXOffset;
        return position;
    };

    // Đặt vị trí cho CharacterOverlay và cập nhật hình ảnh (máy tính, bàn,...)
    visualsModule.positionCharacterOverlay = function (overlay, level, slot) {
        var position = visualsModule.getCurrentPosition(level, slot);
        overlay.x = position.x;
        overlay.y = position.y;
        visualsModule.updateImages(overlay, level, slot); // Cập nhật hình ảnh bàn, ghế, máy tính
    };

    // Hàm cập nhật các hình ảnh phụ (bàn, ghế, máy tính) cho một CharacterOverlay
    visualsModule.updateImages = function (overlay, level, slot) {
        var imageSize = 200; // Kích thước mặc định của hình ảnh phụ
        if (PlatformShim.ISLOWRES) {
            imageSize = 107; // Kích thước cho độ phân giải thấp
        }
        var globalScale = CanvasManager.globalScale;

        // Logic phức tạp để xác định và lấy hình ảnh bàn, ghế, keyboard, PC
        // dựa trên level, slot và hướng của nhân vật.
        // (Giữ nguyên logic này vì nó đặc thù cho cách game bố trí các đối tượng)
        if (slot === 2 || slot === 4 || slot === 6) { // Các slot nhất định có thể có cách hiển thị khác
            if (level === 2) {
                overlay.deskImage = visualsModule.getSubImage(overlay.x - 807 / visualsModule.Divisor * globalScale, overlay.y - 527 / visualsModule.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level2Desk);
                if (slot === 2) {
                    overlay.keyBoardImage = visualsModule.getSubImage(overlay.x - 889 / visualsModule.Divisor * globalScale, overlay.y - 716 / visualsModule.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level2C2Keyboard);
                    overlay.pcImage = visualsModule.getSubImage(overlay.x - 880 / visualsModule.Divisor * globalScale, overlay.y - 698 / visualsModule.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level2C2);
                } else { // slot === 4
                    overlay.keyBoardImage = visualsModule.getSubImage(overlay.x - 1117 / visualsModule.Divisor * globalScale, overlay.y - 582 / visualsModule.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level2C2Keyboard);
                    overlay.pcImage = visualsModule.getSubImage(overlay.x - 1114 / visualsModule.Divisor * globalScale, overlay.y - 511 / visualsModule.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level2C4);
                }
            } else if (level === 3) {
                overlay.deskImage = visualsModule.getSubImage(overlay.x - 807 / visualsModule.Divisor * globalScale, overlay.y - 527 / visualsModule.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level3Desk);
                if (slot === 2) {
                    overlay.keyBoardImage = visualsModule.getSubImage(overlay.x - 893 / visualsModule.Divisor * globalScale, overlay.y - 713 / visualsModule.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level3C2Keyboard);
                    overlay.pcImage = visualsModule.getSubImage(overlay.x - 878 / visualsModule.Divisor * globalScale, overlay.y - 703 / visualsModule.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level3C2);
                } else { // slot === 4
                    overlay.keyBoardImage = visualsModule.getSubImage(overlay.x - 1130 / visualsModule.Divisor * globalScale, overlay.y - 578 / visualsModule.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level3C2Keyboard);
                    overlay.pcImage = visualsModule.getSubImage(overlay.x - 1109 / visualsModule.Divisor * globalScale, overlay.y - 511 / visualsModule.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level3C4);
                }
            } else if (level === 4) {
                overlay.deskImage = visualsModule.getSubImage(overlay.x - 427 / visualsModule.Divisor * globalScale, overlay.y - 460 / visualsModule.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level4Desk);
                if (slot === 2) {
                    overlay.keyBoardImage = visualsModule.getSubImage(overlay.x - 541 / visualsModule.Divisor * globalScale, overlay.y - 840 / visualsModule.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level4C2Keyboard);
                    overlay.pcImage = visualsModule.getSubImage(overlay.x - 428 / visualsModule.Divisor * globalScale, overlay.y - 756 / visualsModule.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level4C2);
                } else if (slot === 4) {
                    overlay.keyBoardImage = visualsModule.getSubImage(overlay.x - 824 / visualsModule.Divisor * globalScale, overlay.y - 676 / visualsModule.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level4C2Keyboard);
                    overlay.pcImage = visualsModule.getSubImage(overlay.x - 711 / visualsModule.Divisor * globalScale, overlay.y - 591 / visualsModule.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level4C2);
                } else if (slot === 6) {
                    overlay.keyBoardImage = visualsModule.getSubImage(overlay.x - 1094 / visualsModule.Divisor * globalScale, overlay.y - 511 / visualsModule.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level4C2Keyboard);
                    overlay.pcImage = visualsModule.getSubImage(overlay.x - 981 / visualsModule.Divisor * globalScale, overlay.y - 426 / visualsModule.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level4C2);
                }
            }
        }
    };

    // Hàm lấy một phần của hình ảnh (sub-image) để dùng cho bàn, ghế, ...
    // (Tạo một canvas tạm, vẽ phần cần lấy của resource lên đó, rồi tạo Image object từ data URL)
    visualsModule.getSubImage = function (sourceX, sourceY, width, height, resourceKey) {
        var tempCanvas = document.createElement("canvas");
        tempCanvas.width = width;
        tempCanvas.height = height;
        tempCanvas.getContext("2d").drawImage(
            GameDev.ResourceManager.resources[resourceKey],
            -((sourceX - visualsModule.currentXOffset) / CanvasManager.globalScale), // Điều chỉnh sourceX, sourceY
            -sourceY / CanvasManager.globalScale
        );
        var imageElement = new Image();
        imageElement.src = tempCanvas.toDataURL("image/png");
        return imageElement;
    };

    // Hàm làm mới các nút thuê nhân viên trên màn hình
    visualsModule.refreshHiringButtons = function () {
        var canvasContainer = $("#canvasContainer");
        canvasContainer.find(".hireStaffButtonBase").remove(); // Xóa các nút cũ

        var currentLevel = GameManager.company.currentLevel;
        var staffList = GameManager.company.staff;

        // Chỉ hiển thị nút thuê nếu còn slot trống và level cho phép
        if (currentLevel > 1 &&
            !((currentLevel == 2 || currentLevel == 3) && staffList.length == 5) &&
            !((currentLevel > 3) && staffList.length == 7)) {

            // Tìm slot trống đầu tiên
            var availableSlots = [1, 2, 3, 4, 5, 6];
            var firstEmptySlot = availableSlots.first(function (slot) {
                return !staffList.some(function (staffMember) {
                    return staffMember.slot == slot;
                });
            });

            // Tạo và thêm nút thuê nhân viên mới
            if (firstEmptySlot !== undefined) {
                var hireButton = visualsModule.createHireButton(currentLevel, firstEmptySlot);
                canvasContainer.append(hireButton);
                UI.maxFont("bold", canvasContainer.find(".hireButtonLabel"), 12); // Điều chỉnh font chữ
            }
        }
    };

    // Biến lưu trữ nút "Hoàn thành game"
    var releaseButtonElement;
    // Hàm cập nhật trạng thái của nút "Hoàn thành game"
    visualsModule.updateReleaseReadyButton = function () {
        if (!releaseButtonElement) { // Nếu nút chưa được tạo
            releaseButtonElement = $('<div id="releaseButton" class="selectorButton greenButton windowStyleHideState" style="position:absolute; opacity=0;">' +
                "Finish".localize("button") + "</div>");
            releaseButtonElement.gdIsActive = false; // Trạng thái hoạt động của nút
            $("#canvasContainer").append(releaseButtonElement);
        }
        // Căn giữa nút
        var containerWidth = releaseButtonElement.parent().width();
        releaseButtonElement.css({
            left: containerWidth / 2 - releaseButtonElement.width() / 2 + "px"
        });

        // Kiểm tra xem có nên hiển thị nút không
        var shouldShowButton = GameManager.company && GameManager.company.currentGame &&
            !GameManager.company.currentGame.flags.devCompleted &&
            GameManager.company.currentGame.flags.releaseReady;

        if (shouldShowButton != releaseButtonElement.gdIsActive) { // Nếu trạng thái thay đổi
            releaseButtonElement.gdIsActive = shouldShowButton;
            var hideButton = function () {
                releaseButtonElement.transition({ opacity: 0 }, 200);
                releaseButtonElement.removeClass("windowStyleShowState").addClass("windowStyleHideState");
                releaseButtonElement.gdIsActive = false;
            };

            if (shouldShowButton) {
                releaseButtonElement.transition({ opacity: 1 }, 200);
                releaseButtonElement.removeClass("windowStyleHideState"); // Có thể là .addClass("windowStyleShowState")
                Sound.playSoundOnce("gameReady", 0.2);
                releaseButtonElement.clickExclOnce(function (event) {
                    Sound.click();
                    hideButton();
                    // Khi click, đánh dấu game đã hoàn thành giai đoạn phát triển
                    if (GameManager.currentFeature) {
                        GameManager.currentFeature.progress = 1;
                    }
                    if (GameManager.company.currentGame) {
                        GameManager.company.currentGame.flags.finished = true;
                    }
                    return false; // Ngăn chặn sự kiện click mặc định
                });
            } else {
                hideButton();
            }
        }
    };

    // Hàm tạo nút "Thuê nhân viên"
    visualsModule.createHireButton = function (level, slot) {
        var buttonElement = $(PlatformShim.toStaticHtml('<div class="hireStaffButtonBase hireStaffButton"><div class="hireButtonLabel">' + "Fill Position".localize() + '</div><div class="hireStaffProgress"></div></div>'));
        var xPos = 0, yPos = 0;

        // Xác định vị trí nút dựa trên level và slot
        // (Giữ nguyên logic phức tạp này)
        if (level === 2 || level === 3) {
            switch (slot) {
                case 1: xPos = 1060; yPos = 840; break;
                case 2: xPos = 880; yPos = 720; break;
                case 3: xPos = 1290; yPos = 720; break;
                case 4: xPos = 1130; yPos = 580; break;
            }
        }
        if (level === 4) {
            switch (slot) {
                case 1: xPos = 480; yPos = 1040; break;
                case 2: xPos = 480; yPos = 850; break;
                case 3: xPos = 750; yPos = 920; break;
                case 4: xPos = 780; yPos = 680; break;
                case 5: xPos = 1050; yPos = 730; break;
                case 6: xPos = 1000; yPos = 500; break;
            }
        }

        xPos = visualsModule.toScreenCoordinates(xPos, CanvasManager.globalScale);
        yPos = visualsModule.toScreenCoordinates(yPos, CanvasManager.globalScale);
        xPos += visualsModule.currentXOffset; // Áp dụng offset

        buttonElement.css({
            position: "absolute",
            top: yPos + "px",
            left: xPos + "px"
        });

        // Xử lý sự kiện click
        buttonElement.clickExcl(function () {
            Sound.click();
            if (GameManager.company.maxStaff == 1) { // Nếu chưa nâng cấp để thuê được
                GameManager.company.activeNotifications.insertAt(0, new Notification("Hint".localize(), "You have to complete the Staff Management training before you can hire someone. Simply {0} on your player character to access the training menu.".localize().format(Tutorial.getClickVerb())));
                GameManager.showPendingNotifications();
            } else if (!UI.isStaffSearchInProgress()) { // Nếu không đang tìm kiếm
                if (GameManager.company.staff.length > 1) {
                    Tutorial.hireMoreStaff();
                } else {
                    Tutorial.findStaff();
                }
                UI.showFindStaffWindow(slot); // Hiển thị cửa sổ tìm nhân viên
            }
            window.event.cancelBubble = true; // Ngăn sự kiện nổi bọt
        });
        return buttonElement;
    };

    // Hàm tạo CharacterOverlay cho một nhân vật
    visualsModule.createCharacterOverlay = function (characterData) {
        var characterStage = canvasModule.characterStage;
        var newOverlay = new CharacterOverlay(characterData);
        visualsModule.positionCharacterOverlay(newOverlay, GameManager.company.currentLevel, characterData.slot);
        visualsModule.characterOverlays.push(newOverlay);
        visualsModule.addCharacterOverlayToStage(characterStage, newOverlay); // Thêm vào stage ở vị trí đúng
        return newOverlay;
    };

    // Hàm thêm CharacterOverlay vào stage ở vị trí phù hợp để đảm bảo thứ tự vẽ đúng
    visualsModule.addCharacterOverlayToStage = function (stage, overlayToAdd) {
        var characterSlot = overlayToAdd.character.slot;
        if (characterSlot === 0) { // Người chơi chính luôn ở trên cùng (hoặc vị trí mặc định)
            stage.addChild(overlayToAdd);
        } else {
            // Logic sắp xếp phức tạp dựa trên slot để đảm bảo nhân vật không che khuất nhau không đúng cách
            // (Giữ nguyên logic này)
            for (var i = 0; i < stage.children.length; i++) {
                if (stage.children[i].character) { // Chỉ so sánh với các CharacterOverlay khác
                    if (characterSlot === 4 || characterSlot === 6 || characterSlot === 3 || characterSlot === 5) { // Các slot ở "phía sau"
                        stage.addChildAt(overlayToAdd, 0); // Thêm vào dưới cùng
                        break;
                    } else if ((characterSlot === 1 && stage.children[i].character.slot > 1) ||
                        (characterSlot === 2 && stage.children[i].character.slot > 4) || // Điều kiện này có vẻ lạ, cần xem xét lại
                        (characterSlot === 3 && stage.children[i].character.slot > 2)) {
                        stage.addChildAt(overlayToAdd, i);
                        break;
                    } else if (characterSlot > 4) { // Các slot còn lại (có thể là ở "phía trước")
                        stage.addChild(overlayToAdd); // Thêm vào trên cùng
                        break;
                    }
                }
            }
        }
    };

    // Hàm làm mới overlay huấn luyện của nhân viên
    visualsModule.refreshTrainingOverlays = function () {
        var canvasContainer = $("#canvasContainer");
        canvasContainer.find(".trainingOverlayTemplate").remove(); // Xóa các overlay cũ

        for (var i = 0; i < visualsModule.characterOverlays.length; i++) {
            var characterOverlay = visualsModule.characterOverlays[i];
            var trainingOverlayElement = $("#trainingOverlayTemplate").clone();
            trainingOverlayElement.removeAttr("id");

            var xOffset = GameFlags.IS_LOW_RES ? -30 : 0; // Điều chỉnh vị trí cho độ phân giải thấp
            trainingOverlayElement.css({
                position: "absolute",
                top: characterOverlay.y - VisualsManager.toScreenCoordinates(120, CanvasManager.globalScale) + "px",
                left: characterOverlay.x - VisualsManager.toScreenCoordinates(60, CanvasManager.globalScale) + xOffset + "px",
                transform: "scale({0},{0})".format(CanvasManager.globalScaleIgnoringLowResBackground) // Scale theo tỷ lệ toàn cục
            });
            characterOverlay.trainingOverlay = trainingOverlayElement; // Gán overlay cho nhân vật
            canvasContainer.append(trainingOverlayElement);
            trainingOverlayElement.hide(); // Ẩn ban đầu
            characterOverlay.resumeTraining(); // Tiếp tục trạng thái huấn luyện (nếu có)
        }
    };

    // Hàm xử lý cho màn hình siêu rộng, căn giữa vùng game chính
    visualsModule.handleUltraWideMonitors = function (screenWidth, screenHeight) {
        if (screenWidth / screenHeight > 16 / 9) { // Nếu tỷ lệ rộng hơn 16:9
            var excessWidth = screenWidth / (screenWidth / screenHeight) * (screenWidth / screenHeight - 16 / 9);
            $("#gameContainerWrapper").css({
                left: excessWidth / 2 + "px", // Dịch sang phải
                width: screenWidth - excessWidth + "px" // Giảm chiều rộng
            });
            visualsModule.globalOffsetX = excessWidth / 2; // Lưu lại offset
        } else { // Nếu tỷ lệ chuẩn hoặc hẹp hơn
            $("#gameContainerWrapper").css({
                left: "0px",
                width: "100%"
            });
            visualsModule.globalOffsetX = 0;
        }
    };
})(); // Kết thúc IIFE của VisualsManager

// --- START OF ProjectWorkerVisual related code ---
// (IIFE này bao gồm logic cho các nhân viên trong phòng lab)
(function () {
    var visualsModule = VisualsManager; // Alias
    var projectWorkerVisuals = []; // Mảng chứa các đối tượng ProjectWorkerVisual

    // Hàm làm mới các nhân viên trong phòng lab (Hardware và R&D)
    visualsModule.refreshLabCrew = function () {
        // Xóa các đối tượng cũ
        if (projectWorkerVisuals) {
            projectWorkerVisuals.forEach(function (workerVisual) {
                if (workerVisual.parent) { // Kiểm tra xem có parent không trước khi remove
                    workerVisual.parent.removeChild(workerVisual);
                }
            });
            projectWorkerVisuals = [];
        }
        // Tạo lại nhân viên cho phòng Hardware và R&D
        createHardwareLabCrew();
        createRnDLabCrew();
        // Cập nhật hiển thị dựa trên zone hiện tại (chỉ cho level 4)
        if (GameManager.company.currentLevel == 4) {
            visualsModule._zoneChanged(GameManager.company.flags.currentZone, false);
        }
    };

    // Hàm tạo template cho thẻ trạng thái dự án (được sử dụng bởi cả 2 phòng lab)
    var createProjectStatusCardTemplate = function (initialSliderValue) {
        var cardElement = $("#projectStatusCardTemplate").clone();
        cardElement[0].id = undefined; // Xóa id để tránh trùng lặp
        // Khởi tạo slider cho budget
        cardElement.find(".projectBudgetSlider").slider({
            orientation: "horizontal",
            range: "min",
            min: 0,
            max: 100,
            value: initialSliderValue,
            animate: "fast",
            slide: function (event, ui) {
                var slider = $(ui.handle).closest(".projectBudgetSlider");
                if (!slider.hasClass("projectBudgetSlider")) throw "couldn't find target slider";
                cardElement._gd_sliderValue = ui.value; // Lưu giá trị slider
                slider.slider("value", ui.value);
                var newBudgetValue = ui.value;
                // Cập nhật budget tương ứng của công ty
                if (cardElement.hasClass("rndCard")) {
                    GameManager.company.flags.rndBudget = newBudgetValue / 100;
                } else {
                    GameManager.company.flags.hwBudget = newBudgetValue / 100;
                }
                updateProjectCardDisplay(cardElement); // Cập nhật hiển thị của card
            }
        });
        return cardElement;
    };

    var hardwareLabCard, createHardwareLabCrew = function () {
        var company = GameManager.company;
        if (!hardwareLabCard) { // Nếu thẻ chưa được tạo
            var initialHwBudget = company.flags.hwBudget;
            if (initialHwBudget === undefined) initialHwBudget = 0;

            hardwareLabCard = createProjectStatusCardTemplate(initialHwBudget * 100);
            hardwareLabCard.addClass("projectCardLeft").addClass("hwCard");
            hardwareLabCard.find(".projectCardLabel").text("Hardware lab".localize());
            // Sự kiện click để cuộn đến phòng Hardware
            hardwareLabCard.clickExcl(function () {
                visualsModule.scrollToZone(0, true);
            });
            hardwareLabCard.insertBefore("#consoleMaintenanceContainer");
            hardwareLabCard._gd_projectVisible = true; // Cờ theo dõi trạng thái hiển thị
        }

        if (company.currentLevel < 4 || !company.flags.hwLabUnlocked) { // Ẩn nếu không đủ điều kiện
            hardwareLabCard.hide();
        } else {
            hardwareLabCard.show();
            updateProjectCardDisplay(hardwareLabCard, GameManager.currentHwProject); // Cập nhật thông tin dự án
            if (!company.hwCrew) company.hwCrew = []; // Khởi tạo mảng nhân viên nếu chưa có

            var hardwareCrew = company.hwCrew;
            var maxHwBudget = GameManager.getMaxHwBudget();
            var hardwareLabCharacterStage = CanvasManager.leftScreen.characterStage;
            var backRowWorkers = [], frontRowWorkers = []; // Để sắp xếp thứ tự vẽ

            for (var i = 0; i <= 12; i++) { // Tạo tối đa 13 nhân viên
                if (hardwareCrew.length < i + 1) { // Nếu chưa có nhân viên ở slot này
                    hardwareCrew.push(new ProjectWorkerVisual());
                    hardwareCrew[i].zone = 0; // Zone 0 là phòng Hardware
                    hardwareCrew[i].setPosition(i); // Đặt vị trí dựa trên index
                    hardwareCrew[i].loadAnimations(); // Load animation
                }
                var workerVisual = hardwareCrew[i];
                // Gán hàm để lấy dự án hiện tại
                workerVisual.getCurrentProject = function () { return GameManager.currentHwProject; };
                // Gán hàm tính toán yếu tố ảnh hưởng (dựa trên budget và vị trí)
                (function (visual, budgetPerWorkerSlot) {
                    visual.getAffordanceFactor = function () {
                        return calculateAffordanceFactor(maxHwBudget * company.flags.hwBudget, budgetPerWorkerSlot);
                    };
                })(workerVisual, maxHwBudget / 12 * (i + 1));

                // Sắp xếp vào hàng trước/sau để vẽ đúng thứ tự
                if (i == 3 || i == 7) {
                    backRowWorkers.push(workerVisual);
                } else {
                    hardwareLabCharacterStage.addChild(workerVisual);
                    projectWorkerVisuals.push(workerVisual);
                }
            }
            // Thêm nhân viên hàng sau vào sau cùng
            for (var i = 0, len = backRowWorkers.length; i < len; i++) {
                hardwareLabCharacterStage.addChild(backRowWorkers[i]);
                projectWorkerVisuals.push(backRowWorkers[i]);
            }
            visualsModule.putConsoleToPedestal(); // Đặt console lên bệ (nếu có)
        }
    };

    // Hàm đặt console lên bệ trong phòng Hardware
    visualsModule.putConsoleToPedestal = function () {
        var company = GameManager.company;
        if (company.currentLevel === 4 && company.flags.hwLabUnlocked) {
            // Xóa console cũ (nếu có)
            if (visualsModule.consoleContainer && CanvasManager.leftScreen.backgroundOverlayStage.contains(visualsModule.consoleContainer)) {
                CanvasManager.leftScreen.backgroundOverlayStage.removeChild(visualsModule.consoleContainer);
            }

            var consoleToShow = undefined;
            var consoleDataList = undefined;

            // Ưu tiên hiển thị console đang được phát triển
            if (GameManager.currentHwProject && GameManager.currentHwProject.id === "custom console") {
                consoleToShow = { iconUri: GameManager.currentHwProject.iconUri };
            } else {
                // Nếu không, tìm console tùy chỉnh mới nhất đã phát hành
                consoleDataList = company.licencedPlatforms.filter(function (platform) { return platform.isCustom; });
                if (consoleDataList.length) {
                    consoleToShow = consoleDataList.last();
                } else {
                    // Nếu không, tìm console đang phát triển hoặc game mới nhất có platform không phải PC/G64/...
                    consoleDataList = company.currentGame;
                    if (consoleDataList && consoleDataList.platforms.length > 0 &&
                        consoleDataList.platforms[0].id != "PC" && consoleDataList.platforms[0].id != "G64" && /* các điều kiện khác */ true) {
                        consoleToShow = company.currentGame.platforms[0];
                    } else {
                        // Cuối cùng, tìm trong lịch sử game
                        for (var i = company.gameLog.length - 1; i > 0; i--) {
                            var gamePlatforms = company.gameLog[i].platforms;
                            if (gamePlatforms[0].id != "PC" && gamePlatforms[0].id != "G64" && /* các điều kiện khác */ true) {
                                consoleToShow = gamePlatforms[0];
                                break;
                            }
                        }
                    }
                }
            }

            if (consoleToShow) {
                var platformImageSrc = Platforms.getPlatformImage(consoleToShow, company.currentWeek);
                var consoleBitmap = new createjs.Bitmap(platformImageSrc);
                var container = new createjs.Container();
                var globalScale = CanvasManager.globalScale;
                // Đặt vị trí và tỷ lệ cho console trên bệ
                container.scaleX = 0.45 * globalScale;
                container.scaleY = 0.45 * globalScale;
                container.x = 2230 * globalScale;
                container.y = 1104 * globalScale;
                container.addChild(consoleBitmap);
                visualsModule.consoleContainer = container;
                CanvasManager.leftScreen.backgroundOverlayStage.addChild(visualsModule.consoleContainer);
            }
        }
    };

    // Hàm tính toán yếu tố ảnh hưởng đến hiệu suất của nhân viên phòng lab
    var calculateAffordanceFactor = function (currentBudget, budgetRequiredForThisSlot) {
        if (currentBudget === 0) return -4; // Không có budget -> hiệu suất rất thấp
        var ratio = currentBudget / budgetRequiredForThisSlot;
        if (ratio < 1) {
            ratio = -1 + ratio; // Nếu budget thấp hơn yêu cầu, hiệu suất giảm
        }
        return ratio;
    };

    var rndLabCard, createRnDLabCrew = function () {
        var company = GameManager.company;
        if (!rndLabCard) { // Nếu thẻ chưa được tạo
            var initialRndBudget = company.flags.rndBudget;
            if (initialRndBudget === undefined) initialRndBudget = 0;

            rndLabCard = createProjectStatusCardTemplate(initialRndBudget * 100);
            rndLabCard.addClass("projectCardRight").addClass("rndCard");
            rndLabCard.find(".projectCardLabel").text("R&D lab".localize());
            // Sự kiện click để cuộn đến phòng R&D
            rndLabCard.clickExcl(function () {
                visualsModule.scrollToZone(2, true);
            });
            $("#gameUIContainer").append(rndLabCard);
            rndLabCard._gd_projectVisible = true;
        }

        if (GameManager.company.currentLevel < 4 || !company.flags.rndLabUnlocked) { // Ẩn nếu không đủ điều kiện
            rndLabCard.hide();
        } else {
            rndLabCard.show();
            updateProjectCardDisplay(rndLabCard, GameManager.currentRnDProject); // Cập nhật thông tin dự án
            if (!company.rndCrew) company.rndCrew = []; // Khởi tạo mảng nhân viên nếu chưa có

            var rndCrew = company.rndCrew;
            var maxRndBudget = GameManager.getMaxRndBudget();
            var rndLabCharacterStage = CanvasManager.rightScreen.characterStage;
            var backRowWorkers = [], frontRowWorkers = [];

            for (var i = 0; i <= 12; i++) {
                if (rndCrew.length < i + 1) {
                    rndCrew.push(new ProjectWorkerVisual());
                    rndCrew[i].zone = 2; // Zone 2 là phòng R&D
                    rndCrew[i].setPosition(i);
                    rndCrew[i].loadAnimations();
                }
                var workerVisual = rndCrew[i];
                workerVisual.getCurrentProject = function () { return GameManager.currentRnDProject; };
                (function (visual, budgetPerWorkerSlot) {
                    visual.getAffordanceFactor = function () {
                        return calculateAffordanceFactor(maxRndBudget * company.flags.rndBudget, budgetPerWorkerSlot);
                    };
                })(workerVisual, maxRndBudget / 12 * (i + 1));

                if (i === 5 || i === 7) {
                    backRowWorkers.push(workerVisual);
                } else {
                    rndLabCharacterStage.addChild(workerVisual);
                    projectWorkerVisuals.push(workerVisual);
                }
            }
            for (var i = 0, len = backRowWorkers.length; i < len; i++) {
                rndLabCharacterStage.addChild(backRowWorkers[i]);
                projectWorkerVisuals.push(backRowWorkers[i]);
            }
        }
    };

    // Hàm được gọi khi zone (khu vực hiển thị) thay đổi
    visualsModule._zoneChanged = function (newZone, withAnimation) {
        var animationSpeed = withAnimation ? "normal" : 0;
        // Kích hoạt/hủy kích hoạt canvas của các zone
        CanvasManager.zone0Activ = (newZone === 0);
        CanvasManager.zone1Activ = (newZone === 1);
        CanvasManager.zone2Activ = (newZone === 2);

        // Hiển thị/ẩn slider budget dựa trên zone hiện tại
        if (newZone != 2 && rndLabCard) {
            rndLabCard.find(".projectBudgetSlider").slideUp(animationSpeed);
            rndLabCard.find(".projectCardLabel").slideDown(animationSpeed);
        }
        if (newZone == 2 && rndLabCard) {
            rndLabCard.find(".projectBudgetSlider").slideDown(animationSpeed);
            rndLabCard.find(".projectCardLabel").slideUp(animationSpeed);
        }
        if (newZone != 0 && hardwareLabCard) {
            hardwareLabCard.find(".projectBudgetSlider").slideUp(animationSpeed);
            hardwareLabCard.find(".projectCardLabel").slideDown(animationSpeed);
        }
        if (newZone == 0 && hardwareLabCard) {
            hardwareLabCard.find(".projectBudgetSlider").slideDown(animationSpeed);
            hardwareLabCard.find(".projectCardLabel").slideUp(animationSpeed);
        }

        updateLabCardLayoutForSmallScreen(); // Điều chỉnh layout cho màn hình nhỏ
        // Hiển thị thông báo hướng dẫn khi vào phòng lab lần đầu
        if (newZone == 2) Media.enterRndLab(GameManager.company);
        else if (newZone == 0) Media.enterHwLab(GameManager.company);
    };

    // Hàm điều chỉnh layout thẻ trạng thái dự án cho màn hình nhỏ
    var updateLabCardLayoutForSmallScreen = function () {
        var isSmallScreen = CanvasManager.isSmallScreen;
        if (rndLabCard) {
            var shouldBeSmall = isSmallScreen && GameManager.currentRnDProject;
            if (shouldBeSmall && !rndLabCard.hasClass("small")) {
                rndLabCard.addClass("small");
            } else if (!shouldBeSmall && rndLabCard.hasClass("small")) {
                rndLabCard.removeClass("small");
            }
        }
        if (hardwareLabCard) {
            var shouldBeSmall = isSmallScreen && GameManager.currentHwProject;
            if (shouldBeSmall && !hardwareLabCard.hasClass("small")) {
                hardwareLabCard.addClass("small");
            } else if (!shouldBeSmall && hardwareLabCard.hasClass("small")) {
                hardwareLabCard.removeClass("small");
            }
        }
    };

    // Hàm cập nhật hiển thị của một thẻ trạng thái dự án
    var updateProjectCardDisplay = function (cardElement) {
        if (cardElement) {
            var company = GameManager.company;
            if (company) {
                var currentHwBudgetPercent = company.flags.hwBudget * 100;
                var hardwareLabMonthlyCost = GameManager.getLabCostPerMonth(0);
                var currentProject = GameManager.currentHwProject;

                // Lấy thông tin đúng nếu là thẻ của phòng R&D
                if (cardElement.hasClass("rndCard")) {
                    currentProject = GameManager.currentRnDProject;
                    hardwareLabMonthlyCost = GameManager.getLabCostPerMonth(2);
                    currentHwBudgetPercent = company.flags.rndBudget * 100;
                }

                // Hiển thị/ẩn phần thông tin dự án
                if (!currentProject && cardElement._gd_projectVisible) {
                    cardElement.find(".projectStatusContainer").slideUp();
                    cardElement._gd_projectVisible = false;
                } else if (currentProject) {
                    if (!cardElement._gd_projectVisible) {
                        cardElement.find(".projectStatusContainer").slideDown();
                        cardElement._gd_projectVisible = true;
                    }
                    // Cập nhật icon, tiêu đề, tiến độ, điểm còn lại của dự án
                    if (cardElement._gd_iconUrl != currentProject.iconUri) {
                        cardElement.find(".projectIcon").attr("src", currentProject.iconUri);
                        cardElement._gd_iconUrl = currentProject.iconUri;
                    }
                    if (cardElement._gd_title != currentProject.name) {
                        var titleElement = cardElement.find(".projectTitle");
                        UI.maxFont("bold", titleElement, 20, currentProject.name);
                        cardElement._gd_title = currentProject.name;
                    }
                    if (cardElement._gd_progress != currentProject.progress) {
                        cardElement.find(".projectProgress").stop().transit({ width: currentProject.progress * 100 + "%" });
                        cardElement._gd_progress = currentProject.progress;
                    }
                    if (cardElement._gd_pointsRemaining != currentProject.remainingPoints) {
                        cardElement.find(".projectPointsRemaining").text(currentProject.startPoints - currentProject.remainingPoints);
                        cardElement._gd_pointsRemaining = currentProject.remainingPoints;
                    }
                }

                // Cập nhật chi phí hàng tháng và giá trị slider
                if (cardElement._gd_budget !== hardwareLabMonthlyCost) {
                    cardElement.find(".projectBudgetValue").text("{0} per month".localize().format(UI.getShortNumberString(hardwareLabMonthlyCost)));
                    cardElement._gd_budget = hardwareLabMonthlyCost;
                }
                if (Math.round(cardElement._gd_sliderValue) != Math.round(currentHwBudgetPercent)) {
                    cardElement.find(".projectBudgetSlider").slider({ value: currentHwBudgetPercent });
                    cardElement._gd_sliderValue = currentHwBudgetPercent;
                }
                updateLabCardLayoutForSmallScreen(); // Điều chỉnh layout
            }
        }
    };

    // Hàm cập nhật tất cả các thẻ trạng thái dự án
    visualsModule.updateProjectStatusCards = function () {
        if (GameManager.company.flags.hwLabUnlocked) {
            updateProjectCardDisplay(hardwareLabCard);
        }
        if (GameManager.company.flags.rndLabUnlocked) {
            updateProjectCardDisplay(rndLabCard);
        }
    };
})(); // Kết thúc IIFE của ProjectWorkerVisual