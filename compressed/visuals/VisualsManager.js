// Các hằng số màu sắc cho các loại điểm trong game
var DESIGN_POINTS_COLOR = "orange";
var TECHNOLOGY_POINTS_COLOR = "#00BFFF";
var RESEARCH_POINTS_COLOR = "#006AFF";
var BUGS_COLOR = "#FF6A00";

// Namespace chính cho việc quản lý hiển thị và đồ họa
var VisualsManager = {};

(function () {
    // 'visualsManager' là một alias cho VisualsManager để sử dụng trong scope này
    var visualsManager = VisualsManager;
    // 'canvasManagerInstance' là một alias cho CanvasManager
    var canvasManagerInstance = CanvasManager;

    // Hệ số chia để điều chỉnh tọa độ, có thể liên quan đến tỷ lệ hiển thị hoặc độ phân giải
    visualsManager.Divisor = 1;
    // Độ lệch toàn cục theo trục X, có thể dùng để căn giữa hoặc xử lý màn hình rộng
    visualsManager.globalOffsetX = 0;

    // Nếu đang ở chế độ độ phân giải thấp, cập nhật Divisor
    PlatformShim.ISLOWRES && (visualsManager.Divisor = 1.874084919472914);

    // Chuyển đổi tọa độ logic sang tọa độ màn hình, có tính đến globalScale
    visualsManager.toScreenCoordinates = function (coordinateValue, globalScale) {
        var currentGlobalScale = isNaN(globalScale) ? 1 : globalScale;
        return Math.round(coordinateValue / visualsManager.Divisor * currentGlobalScale);
    };

    // Lưu lại hàm gốc của createjs.Tween.get
    var originalCreatejsTweenGet = createjs.Tween.get;
    // Ghi đè hàm createjs.Tween.get để tự động gán gameId cho mỗi tween
    createjs.Tween.get = function () {
        var tweenInstance = originalCreatejsTweenGet.apply(this, arguments);
        // Gán ID game hiện tại cho tween để quản lý vòng đời của tween theo game
        tweenInstance && (tweenInstance.gameId = GameManager.gameId);
        return tweenInstance;
    };

    // Dừng tất cả các tween cũ không thuộc về game hiện tại
    visualsManager.stopOldTweens = function () {
        // Lọc ra các tween có gameId và gameId đó khác với gameId hiện tại
        var oldTweens = createjs.Tween._tweens.filter(function (tween) {
            return tween.gameId && tween.gameId != GameManager.gameId;
        }).slice(); // slice() để tạo bản sao, tránh thay đổi mảng gốc khi duyệt
        // Dừng (pause) các tween cũ
        for (var i = 0; i < oldTweens.length; i++) {
            oldTweens[i].setPaused(!0); // !0 tương đương true
        }
    };

    // Các đối tượng UI chính
    visualsManager.gameStatusBar = void 0; // Thanh trạng thái game (điểm, tên game,...)
    visualsManager.researchPoints = void 0; // Đối tượng hiển thị điểm nghiên cứu

    // Hàm reset toàn bộ VisualsManager, thường gọi khi tải game hoặc bắt đầu level mới
    visualsManager.reset = function () {
        Sound.pauseAllLoopingFx(); // Dừng tất cả hiệu ứng âm thanh đang lặp
        this.stopOldTweens(); // Dừng các tween cũ

        // Tải lại trạng thái cho các nhân viên trong phòng Hardware (nếu có)
        if (GameManager.company.hwCrew) {
            for (var i = 0; i < GameManager.company.hwCrew.length; i++) {
                GameManager.company.hwCrew[i].load();
            }
        }
        // Tải lại trạng thái cho các nhân viên trong phòng R&D (nếu có)
        if (GameManager.company.rndCrew) {
            for (var i = 0; i < GameManager.company.rndCrew.length; i++) {
                GameManager.company.rndCrew[i].load();
            }
        }

        // Reset mảng chứa hình ảnh máy tính của nhân viên
        visualsManager.computerImages = [void 0, void 0, void 0, void 0, void 0];
        // Tải lại stage đồ họa (true nghĩa là có thể là lần tải lại)
        visualsManager.loadStage(!0);

        // Khởi tạo hoặc reset thanh trạng thái game
        if (!visualsManager.gameStatusBar) {
            visualsManager.gameStatusBar = new GameStatusBar();
            canvasManagerInstance.foregroundStage.addChild(visualsManager.gameStatusBar);
        }
        visualsManager.gameStatusBar.x = canvasManagerInstance.foregroundStage.canvas.width / 2 - visualsManager.gameStatusBar.width / 2;
        visualsManager.gameStatusBar.y = 15;
        visualsManager.gameStatusBar.reset();

        // Khởi tạo hoặc reset hiển thị điểm nghiên cứu
        if (!visualsManager.researchPoints) {
            visualsManager.researchPoints = new PointsDisplayVisual(RESEARCH_POINTS_COLOR, "white", "Research".localize());
            canvasManagerInstance.foregroundStage.addChild(visualsManager.researchPoints);
        }
        visualsManager.researchPoints.y = 15;
        visualsManager.researchPoints.size = 100;
        visualsManager.researchPoints.x = visualsManager.gameStatusBar.x + visualsManager.gameStatusBar.width + 70;

        // Reset tất cả hiển thị nhân vật
        visualsManager.resetAllCharacters();
        // Làm mới hiển thị của các nhân viên trong phòng lab
        visualsManager.refreshLabCrew();
        // Cập nhật hiển thị điểm
        visualsManager.updatePoints();
        // Cập nhật tên game trên thanh trạng thái
        visualsManager.gameStatusBar.updateGameName();

        // Xóa các card hiển thị doanh số và bảo trì cũ
        UI.clearSalesCards();
        UI.clearMaintenanceCards();

        // Hiển thị lại card doanh số cho các console tự tạo đang bán hoặc chưa bán được
        GameManager.company.licencedPlatforms.forEach(function (platform) {
            if (platform.isCustom === true && (platform.nextSalesCash > 0 || platform.currentSalesCash === 0)) {
                UI.addSalesCard(platform.id, platform.name, platform.currentSalesCash, platform.unitsSold, platform.currentUnitsSold, -1, platform.salesCashLog, platform.nextSalesCash, Sales.consoleUnitPrice);
                // Nếu đã có doanh thu thì cập nhật card bảo trì
                if (platform.currentSalesCash > 0) {
                    UI.updateMaintenanceCard(platform);
                }
            }
        });

        // Hiển thị lại card doanh số cho các game đang được bán
        GameManager.company.gameLog.forEach(function (game) {
            if (game.currentSalesCash < game.totalSalesCash) {
                UI.addSalesCard(game.id, game.title, game.currentSalesCash, game.totalSalesCash, game.unitsSold, game.currentSalesRank,
                    game.salesCashLog, game.nextSalesCash, game.unitPrice, game.nextMaintenance, game.maintenanceLog);
            }
        });

        // Cập nhật toàn bộ canvas (true, true có thể nghĩa là bắt buộc vẽ lại và cập nhật tất cả)
        CanvasManager.update(!0, !0);
        // Cập nhật nút "Release Ready" (nếu game đã hoàn thành bug fixing)
        visualsManager.updateReleaseReadyButton();
        // Reset các thành phần UI khác
        UI.reset();
    };

    // Reset tất cả hiển thị của nhân vật trên characterStage
    visualsManager.resetAllCharacters = function () {
        // Lấy danh sách các đối tượng con hiện tại của characterStage và xóa chúng
        var childrenOnStage = canvasManagerInstance.characterStage.children.slice();
        for (var i = 0; i < childrenOnStage.length; i++) {
            canvasManagerInstance.characterStage.children.remove(childrenOnStage[i]);
        }
        // Reset mảng chứa các overlay của nhân vật
        visualsManager.characterOverlays = [];
        // Tải lại tất cả hiển thị nhân vật
        visualsManager.reloadAllCharacters();
        // Làm mới các overlay liên quan đến training
        visualsManager.refreshTrainingOverlays();
        // Làm mới các nút thuê nhân viên
        visualsManager.refreshHiringButtons();
    };

    // Xóa hiển thị của một nhân viên cụ thể khỏi game
    visualsManager.removeStaff = function (characterToRemove) {
        // Tìm overlay của nhân viên cần xóa
        var characterOverlay = visualsManager.characterOverlays.first(function (overlay) {
            return overlay.character === characterToRemove;
        });
        // Xóa overlay khỏi mảng quản lý và khỏi stage
        visualsManager.characterOverlays.remove(characterOverlay);
        canvasManagerInstance.characterStage.removeChild(characterOverlay);
        // Xóa hình ảnh máy tính của nhân viên đó
        visualsManager.removeComputer(characterToRemove);
        // Làm mới các UI liên quan
        visualsManager.refreshTrainingOverlays();
        visualsManager.refreshHiringButtons();
        UI._resetBoostUI(); // Reset UI của boost (nếu có)
    };

    // Hình nền hiện tại của stage
    visualsManager.backgroundImage = void 0;
    // Mảng chứa hình ảnh máy tính cho từng slot nhân viên
    visualsManager.computerImages = [void 0, void 0, void 0, void 0, void 0];

    // Hàm xử lý khi công ty lên level mới (thay đổi văn phòng)
    visualsManager.nextLevel = function () {
        var currentLevel = GameManager.company.currentLevel;
        GameManager.pause(!0); // Tạm dừng game

        // Xác định và xóa các tài nguyên không cần thiết của level cũ
        var resourcesToUnload = ResourceKeys.getLevelResources.apply(ResourceKeys, [1, 2, 3, 4].except([currentLevel]));
        GameDev.ResourceManager.removeResources(resourcesToUnload);

        UI.fadeInTransitionOverlay(); // Hiển thị overlay chuyển cảnh

        var startTime = Date.now();
        // Hàm thực hiện sau khi tài nguyên level mới đã tải xong
        var onResourcesReady = function () {
            visualsManager.loadStage(!0); // Tải lại stage với hình ảnh của level mới

            // Lưu trạng thái visual của các nhân vật cũ và xóa chúng khỏi stage
            for (var i = 0; i < visualsManager.characterOverlays.length; i++) {
                var overlay = visualsManager.characterOverlays[i];
                overlay.character.visualData = overlay.saveState(); // Lưu trạng thái animation,...
                overlay.parent.removeChild(overlay);
            }
            visualsManager.characterOverlays = []; // Reset mảng overlay

            // Tải lại hiển thị nhân vật cho level mới
            visualsManager.reloadAllCharacters();
            visualsManager.refreshTrainingOverlays();
            visualsManager.refreshHiringButtons();

            // Nếu có nhân viên đang nghiên cứu, bắt đầu lại animation nghiên cứu
            if (GameManager.currentResearches.length > 0) {
                for (var i = 0; i < GameManager.company.staff.length; i++) {
                    if (GameManager.company.staff[i].state === CharacterState.Researching) {
                        VisualsManager.getCharacterOverlay(GameManager.company.staff[i]).startResearching();
                    }
                }
            }
            UI._resetBoostUI(); // Reset UI boost
            CanvasManager.update(); // Cập nhật canvas
            UI.fadeOutTransitionOverlay(); // Ẩn overlay chuyển cảnh
            GameManager.resume(!0); // Tiếp tục game
        };

        FlippingCounter.init(); // Khởi tạo lại bộ đếm lật số (nếu có)
        // Đảm bảo tài nguyên của level mới đã được tải
        GameDev.ResourceManager.ensureResources(ResourceKeys.getLevelResources(currentLevel), function () {
            // Đảm bảo có một khoảng thời gian tối thiểu cho transition
            var elapsedTime = Date.now() - startTime;
            if (elapsedTime < 2000) {
                setTimeout(function () {
                    onResourcesReady();
                }, 2000 - elapsedTime);
            } else {
                onResourcesReady();
            }
        });
    };

    // Thêm hình ảnh máy tính cho một nhân viên tại slot cụ thể
    visualsManager.addComputer = function (character) {
        if (character.slot > 0) { // Slot 0 thường là của người chơi chính, không có máy tính riêng
            var staffSlot = character.slot;
            var computerResourceKey = void 0;
            var computerStageIndex = 1; // Vị trí layer để vẽ máy tính
            var currentLevel = GameManager.company.currentLevel;
            var coordX = 0, coordY = 0;
            var globalScale = CanvasManager.globalScale;

            // Xác định hình ảnh máy tính và tọa độ dựa trên level và slot
            // Đoạn này có rất nhiều hardcode tọa độ, điển hình cho game 2D isometric
            if (currentLevel === 2) {
                if (staffSlot === 1) { computerResourceKey = ResourceKeys.Level2C1; coordX = 1005; coordY = 707; computerStageIndex = 4; }
                else if (staffSlot === 2) { computerResourceKey = ResourceKeys.Level2C2; coordX = 880; coordY = 698; }
                else if (staffSlot === 3) { computerResourceKey = ResourceKeys.Level2C3; coordX = 1164; coordY = 576; }
                else if (staffSlot === 4) { computerResourceKey = ResourceKeys.Level2C4; coordX = 1114; coordY = 511; }
            } else if (currentLevel === 3) {
                if (staffSlot === 1) { computerResourceKey = ResourceKeys.Level3C1; coordX = 1005; coordY = 723; computerStageIndex = 4; }
                else if (staffSlot === 2) { computerResourceKey = ResourceKeys.Level3C2; coordX = 878; coordY = 703; }
                else if (staffSlot === 3) { computerResourceKey = ResourceKeys.Level3C3; coordX = 1159; coordY = 593; }
                else if (staffSlot === 4) { computerResourceKey = ResourceKeys.Level3C4; coordX = 1109; coordY = 511; }
            } else if (currentLevel === 4) {
                if (staffSlot === 1) { computerResourceKey = ResourceKeys.Level4C1; coordX = 463; coordY = 978; computerStageIndex = 4; }
                else if (staffSlot === 2) { computerResourceKey = ResourceKeys.Level4C2; coordX = 428; coordY = 756; }
                else if (staffSlot === 3) { computerResourceKey = ResourceKeys.Level4C1; coordX = 745; coordY = 812; }
                else if (staffSlot === 4) { computerResourceKey = ResourceKeys.Level4C2; coordX = 711; coordY = 591; }
                else if (staffSlot === 5) { computerResourceKey = ResourceKeys.Level4C1; coordX = 1014; coordY = 649; }
                else if (staffSlot === 6) { computerResourceKey = ResourceKeys.Level4C2; coordX = 981; coordY = 426; }
            }

            coordX = visualsManager.toScreenCoordinates(coordX, globalScale);
            coordY = visualsManager.toScreenCoordinates(coordY, globalScale);

            if (computerResourceKey) {
                var backgroundStage = CanvasManager.backgroundStage;
                var stageWidth = backgroundStage.canvas.width;
                var stageHeight = backgroundStage.canvas.height;
                var aspectRatio = 1366 / 768; // Tỷ lệ màn hình chuẩn
                var xOffset = 0;

                // Xử lý nếu tỷ lệ màn hình hiện tại khác chuẩn (cho màn hình siêu rộng)
                if (Math.abs(stageWidth / stageHeight - aspectRatio) > 0.1) {
                    var newStageWidth = aspectRatio * stageHeight;
                    xOffset = -(newStageWidth - stageWidth) / 2;
                    stageWidth = newStageWidth;
                }
                visualsManager.currentXOffset = xOffset; // Lưu lại độ lệch X hiện tại

                // Tạo một canvas tạm để vẽ máy tính (có thể là để cache hoặc xử lý alpha)
                var tempCanvas = document.createElement("canvas");
                tempCanvas.width = stageWidth;
                tempCanvas.height = stageHeight;
                var computerImageResource = GameDev.ResourceManager.resources[computerResourceKey];
                tempCanvas.getContext("2d").drawImage(computerImageResource, 0, 0, computerImageResource.width, computerImageResource.height, xOffset + coordX, coordY, Math.floor(computerImageResource.width * globalScale), Math.floor(computerImageResource.height * globalScale));

                var computerBitmap = new createjs.Bitmap(tempCanvas);
                computerBitmap.width = stageWidth;
                computerBitmap.height = stageHeight;
                visualsManager.computerImages[staffSlot] = computerBitmap;

                // Thêm bitmap máy tính vào stage tại đúng layer
                if (backgroundStage.children.length >= computerStageIndex - 1) {
                    backgroundStage.addChildAt(computerBitmap, computerStageIndex);
                } else {
                    backgroundStage.addChild(computerBitmap);
                }
                CanvasManager.invalidateBackground(); // Đánh dấu cần vẽ lại background
            }
        }
    };

    // Xóa hình ảnh máy tính của một nhân viên
    visualsManager.removeComputer = function (character) {
        var backgroundStage = CanvasManager.backgroundStage;
        if (visualsManager.computerImages[character.slot]) {
            backgroundStage.removeChild(visualsManager.computerImages[character.slot]);
            visualsManager.computerImages[character.slot] = void 0;
            CanvasManager.invalidateBackground();
        }
    };

    // Tạo text cho biển hiệu phòng lab
    visualsManager.getLabSign = function (text, maxWidth, maxHeight, xPos, yPos) {
        var container = new createjs.Container();
        container.x = xPos;
        container.y = yPos;

        var fontName = UI.IS_SEGOE_UI_INSTALLED ? "Segoe UI" : "Open Sans";
        var fontSize = 32; // Kích thước font ban đầu

        // Giảm kích thước font cho đến khi vừa với kích thước cho phép
        do {
            var fontStyle = "bold {0}pt {1}".format(fontSize, fontName);
            var textMetrics = new createjs.Text(text, fontStyle, "black");
            fontSize -= 1;
        } while ((textMetrics.getMeasuredWidth() > maxWidth || textMetrics.getMeasuredLineHeight() > maxHeight) && fontSize > 1);

        var scaleFactor = fontSize / 32; // Tỷ lệ scale dựa trên font gốc 32pt
        var textColor = createjs.Graphics.getHSL(0, 0, 24); // Màu chữ tối

        var textObject = new createjs.Text(text, "bold 32pt {0}".format(fontName), textColor);
        textObject.textAlign = "center";
        textObject.textBaseline = "middle";

        container.scaleX = scaleFactor;
        container.scaleY = scaleFactor;
        container.addChild(textObject);
        return container;
    };

    // Tải/Vẽ lại toàn bộ stage đồ họa (background, overlay,...)
    visualsManager.loadStage = function (forceRedraw) {
        var company = GameManager.company;
        var backgroundStage = CanvasManager.backgroundStage;
        var backgroundOverlayStage = CanvasManager.backgroundOverlayStage;
        var globalScale = CanvasManager.globalScale;

        var stageWidth = backgroundStage.canvas.width;
        var stageHeight = backgroundStage.canvas.height;
        var targetAspectRatio = 1366 / 768; // Tỷ lệ màn hình cơ sở
        var currentXOffset = 0; // Độ lệch X cho màn hình rộng

        // Điều chỉnh kích thước và độ lệch nếu là màn hình siêu rộng
        if (Math.abs(stageWidth / stageHeight - targetAspectRatio) > 0.1) {
            var newVisibleWidth = targetAspectRatio * stageHeight;
            currentXOffset = -(newVisibleWidth - stageWidth) / 2;
            stageWidth = newVisibleWidth;
        }

        var currentLevel = company.currentLevel;
        var level4LockedRightResource, level4LockedLeftResource;
        var levelSpecificX = visualsManager.toScreenCoordinates(2921); // Có thể là một tọa độ cơ sở
        var level4LockedRightY = visualsManager.toScreenCoordinates(39);
        var levelSpecificY;
        visualsManager.toScreenCoordinates(4156); // Không gán giá trị, có thể là tính toán trước
        var level4LockedLeftY = visualsManager.toScreenCoordinates(47);

        var baseImageResource = GameDev.ResourceManager.resources[ResourceKeys.Level1];
        var officeImageX = visualsManager.toScreenCoordinates(563);
        var officeImageY = visualsManager.toScreenCoordinates(217);

        // Chọn tài nguyên và tọa độ dựa trên level hiện tại
        if (currentLevel === 2) {
            baseImageResource = GameDev.ResourceManager.resources[ResourceKeys.Level2];
            officeImageX = visualsManager.toScreenCoordinates(83);
            officeImageY = visualsManager.toScreenCoordinates(54);
        } else if (currentLevel === 3) {
            baseImageResource = GameDev.ResourceManager.resources[ResourceKeys.Level3];
            officeImageX = visualsManager.toScreenCoordinates(83);
            officeImageY = visualsManager.toScreenCoordinates(54);
        } else if (currentLevel === 4) {
            baseImageResource = GameDev.ResourceManager.resources[ResourceKeys.Level4];
            officeImageX = visualsManager.toScreenCoordinates(367);
            officeImageY = visualsManager.toScreenCoordinates(39);
            if (!GameManager.company.flags.rndLabUnlocked) {
                level4LockedRightResource = GameDev.ResourceManager.resources[ResourceKeys.Level4LockedRight];
            }
            if (!GameManager.company.flags.hwLabUnlocked) {
                level4LockedLeftResource = GameDev.ResourceManager.resources[ResourceKeys.Level4LockedLeft];
            }
            visualsManager.toScreenCoordinates(2560); // Tính toán trước?
        }

        // Chỉ vẽ lại nếu hình nền chưa có, kích thước thay đổi, hoặc bị bắt buộc
        if (!visualsManager.backgroundImage || visualsManager.backgroundImage.width != stageWidth || visualsManager.backgroundImage.height != stageHeight || visualsManager.currentXOffset != currentXOffset || forceRedraw) {
            backgroundStage.removeAllChildren();
            backgroundOverlayStage.removeAllChildren();
            companyNameVisual = void 0; // Biến `k` ở ngoài scope này, có thể là lỗi hoặc một biến toàn cục khác
            visualsManager.currentXOffset = currentXOffset;

            // Tạo canvas tạm để vẽ hình nền chính
            var tempCanvas = document.createElement("canvas");
            tempCanvas.width = stageWidth;
            tempCanvas.height = stageHeight;
            var tempCtx = tempCanvas.getContext("2d");

            if (currentLevel === 4) {
                // Vẽ phần chính của level 4 (có thể là phần trung tâm)
                tempCtx.drawImage(baseImageResource,
                    visualsManager.toScreenCoordinates(2193), 0, visualsManager.toScreenCoordinates(2560), visualsManager.toScreenCoordinates(1384), // src rect
                    0, Math.floor(officeImageY * globalScale), Math.floor(visualsManager.toScreenCoordinates(2560) * globalScale), Math.floor(visualsManager.toScreenCoordinates(1384) * globalScale) // dest rect
                );
            } else {
                tempCtx.drawImage(baseImageResource,
                    0, 0, baseImageResource.width, baseImageResource.height, // src rect
                    Math.floor(officeImageX * globalScale), Math.floor(officeImageY * globalScale), Math.floor(baseImageResource.width * globalScale), Math.floor(baseImageResource.height * globalScale) // dest rect
                );
            }

            // Vẽ các phần bị khóa của level 4 (nếu có)
            if (level4LockedLeftResource) {
                tempCtx.clearRect(currentXOffset, level4LockedRightY * globalScale, (level4LockedLeftResource.width - 5) * globalScale, level4LockedLeftResource.height * globalScale);
                tempCtx.drawImage(level4LockedLeftResource,
                    0, 0, level4LockedLeftResource.width, level4LockedLeftResource.height,
                    currentXOffset, level4LockedRightY * globalScale, (level4LockedLeftResource.width - 4) * globalScale, level4LockedLeftResource.height * globalScale
                );
            }
            if (level4LockedRightResource) {
                tempCtx.clearRect(Math.floor((visualsManager.toScreenCoordinates(2590) - level4LockedRightResource.width) * globalScale), Math.floor((level4LockedLeftY - 1) * globalScale), Math.floor(level4LockedRightResource.width * globalScale), Math.floor(level4LockedRightResource.height * globalScale));
                tempCtx.drawImage(level4LockedRightResource,
                    0, 0, level4LockedRightResource.width, level4LockedRightResource.height,
                    Math.floor((visualsManager.toScreenCoordinates(2588) - level4LockedRightResource.width) * globalScale), Math.floor(level4LockedLeftY * globalScale), Math.floor(level4LockedRightResource.width * globalScale), Math.floor(level4LockedRightResource.height * globalScale)
                );
            }

            var backgroundBitmap = new createjs.Bitmap(tempCanvas);
            backgroundBitmap.width = stageWidth;
            backgroundBitmap.height = stageHeight;
            visualsManager.backgroundImage = backgroundBitmap;
            backgroundStage.addChildAt(backgroundBitmap, 0);

            visualsManager.updateComputers(); // Vẽ lại máy tính của nhân viên

            // Xóa và chuẩn bị các stage cho màn hình phụ (trái/phải)
            CanvasManager.leftScreen.backgroundStage.removeAllChildren();
            CanvasManager.leftScreen.backgroundOverlayStage.removeAllChildren();
            CanvasManager.leftScreen.invalidateBackground();
            CanvasManager.rightScreen.backgroundStage.removeAllChildren();
            CanvasManager.rightScreen.backgroundOverlayStage.removeAllChildren();
            CanvasManager.rightScreen.invalidateBackground();

            visualsManager.levelOverlay = new LevelOverlay(company); // Tạo overlay cho level (máy lạnh, máy in,...)

            // Nếu là level 4, vẽ các phần riêng cho màn hình trái/phải (phòng lab)
            if (currentLevel === 4) {
                var leftScreenCanvas = document.createElement("canvas");
                leftScreenCanvas.width = stageWidth;
                leftScreenCanvas.height = stageHeight;
                var leftScreenCtx = leftScreenCanvas.getContext("2d");
                var hardwareLabSign;
                if (!level4LockedLeftResource) { // Nếu phòng Hardware lab không bị khóa
                    leftScreenCtx.drawImage(baseImageResource,
                        0, 0, 2560 / visualsManager.Divisor - officeImageX, 1384 / visualsManager.Divisor, // src rect
                        officeImageX * globalScale, officeImageY * globalScale, (2560 / visualsManager.Divisor - officeImageX) * globalScale, 1384 / visualsManager.Divisor * globalScale // dest rect
                    );
                    hardwareLabSign = visualsManager.getLabSign("Hardware lab".localize(), visualsManager.toScreenCoordinates(264, globalScale), visualsManager.toScreenCoordinates(54, globalScale), visualsManager.toScreenCoordinates(1878, globalScale), visualsManager.toScreenCoordinates(145, globalScale));
                }
                var leftScreenBitmap = new createjs.Bitmap(leftScreenCanvas);
                leftScreenBitmap.width = stageWidth;
                leftScreenBitmap.heigth = stageHeight; // Sai chính tả: height
                CanvasManager.leftScreen.backgroundStage.addChildAt(leftScreenBitmap, 0);
                CanvasManager.leftScreen.backgroundOverlayStage.addChild(visualsManager.levelOverlay.leftOverlay);
                if (hardwareLabSign) CanvasManager.leftScreen.backgroundOverlayStage.addChild(hardwareLabSign);

                var rightScreenCanvas = document.createElement("canvas");
                rightScreenCanvas.width = stageWidth;
                rightScreenCanvas.height = stageHeight;
                var rightScreenCtx = rightScreenCanvas.getContext("2d");
                var researchAndDevelopmentLabSign;
                if (level4LockedRightResource) { // Nếu phòng R&D bị khóa (vẽ phần khóa)
                    rightScreenCtx.drawImage(level4LockedRightResource,
                        visualsManager.toScreenCoordinates(596), 0, visualsManager.toScreenCoordinates(29), level4LockedRightResource.height, // srcX, srcY, srcW, srcH
                        0, level4LockedLeftY * globalScale, visualsManager.toScreenCoordinates(29, globalScale), level4LockedRightResource.height * globalScale // destX, destY, destW, destH
                    );
                } else { // Nếu phòng R&D không bị khóa
                    rightScreenCtx.drawImage(baseImageResource,
                        visualsManager.toScreenCoordinates(2560, 2) - officeImageX, 0, baseImageResource.width - (visualsManager.toScreenCoordinates(2560, 2) - officeImageX), baseImageResource.height, // src rect
                        0, officeImageY * globalScale, (baseImageResource.width - (2560 / visualsManager.Divisor * 2 - officeImageX)) * globalScale, baseImageResource.height * globalScale // dest rect
                    );
                    researchAndDevelopmentLabSign = visualsManager.getLabSign("R&D lab".localize(), visualsManager.toScreenCoordinates(264, globalScale), visualsManager.toScreenCoordinates(54, globalScale), visualsManager.toScreenCoordinates(690, globalScale), visualsManager.toScreenCoordinates(138, globalScale));
                }
                var rightScreenBitmap = new createjs.Bitmap(rightScreenCanvas);
                rightScreenBitmap.width = stageWidth;
                rightScreenBitmap.heigth = stageHeight; // Sai chính tả
                CanvasManager.rightScreen.backgroundStage.addChildAt(rightScreenBitmap, 0);
                CanvasManager.rightScreen.backgroundOverlayStage.addChild(visualsManager.levelOverlay.rightOverlay);
                if (researchAndDevelopmentLabSign) CanvasManager.rightScreen.backgroundOverlayStage.addChild(researchAndDevelopmentLabSign);
            }
            backgroundOverlayStage.addChild(visualsManager.levelOverlay.centerOverlay);
        }
        visualsManager.updateCompanyNameInOffice(); // Vẽ tên công ty lên văn phòng
        CanvasManager.invalidateBackground(); // Đánh dấu cần vẽ lại
        visualsManager.scrollToZone(GameManager.company.flags.currentZone); // Cuộn đến zone hiện tại
        initializeTouchControls(); // Khởi tạo điều khiển cảm ứng (nếu chưa)
    };

    // Bật máy lạnh
    visualsManager.installAirCon = function () {
        visualsManager.levelOverlay.startAirCon1();
        visualsManager.levelOverlay.startAirCon2();
    };

    var touchControlsInitialized = !1;
    // Khởi tạo điều khiển cảm ứng (vuốt để chuyển zone)
    var initializeTouchControls = function () {
        if (!touchControlsInitialized) {
            touchControlsInitialized = !0;
            $("#gameContainerWrapper").wipetouch({
                tapToClick: !1, // Không coi tap là click
                wipeLeft: function (event) {
                    VisualsManager.scrollToNextZone(1); // Vuốt trái -> sang zone phải
                },
                wipeRight: function (event) {
                    VisualsManager.scrollToNextZone(-1); // Vuốt phải -> sang zone trái
                },
                wipeMove: function (eventData) {
                    // Xử lý khi đang vuốt (kéo màn hình)
                    // Kiểm tra xem có đang kéo slider không, nếu có thì không xử lý
                    if ((!document.activeElement || !$(document.activeElement).hasClass("ui-slider-handle")) && eventData.dX) {
                        visualsManager.lastMove = Date.now(); // Ghi lại thời gian vuốt cuối
                        var containerWidth = $("#canvasScrollContainer").width();
                        var stageWidth = CanvasManager.backgroundStage.canvas.width;
                        var company = GameManager.company;

                        // Chỉ cho phép kéo nếu level là 4 hoặc stage rộng hơn container
                        if ((company && company.currentLevel == 4) || containerWidth < stageWidth) {
                            var maxScrollOffset = containerWidth - stageWidth;
                            var currentLeft = $("#innerCanvasContainer").offset().left - visualsManager.globalOffsetX;
                            currentLeft += eventData.dX; // Cập nhật vị trí dựa trên độ dịch chuyển của thao tác vuốt

                            // Kích hoạt/Hủy kích hoạt các zone dựa trên vị trí hiện tại
                            CanvasManager.zone0Activ = currentLeft > -stageWidth;
                            CanvasManager.zone1Activ = currentLeft > -2 * stageWidth && currentLeft <= maxScrollOffset;
                            CanvasManager.zone2Activ = currentLeft > -3 * stageWidth && currentLeft <= maxScrollOffset - stageWidth;

                            $("#innerCanvasContainer").css("left", currentLeft + "px"); // Áp dụng vị trí mới
                        }
                    }
                }
            });
            // Xử lý sự kiện touchend cho các link (có thể là để đảm bảo link hoạt động trên mobile)
            $("a").live("touchend", function (event) {
                location.href = $(this).attr("href");
            });
        }
    };

    // Cuộn đến zone tiếp theo (dựa trên `direction`: 1 là sang phải, -1 là sang trái)
    visualsManager.scrollToNextZone = function (direction) {
        if (GameManager.company) {
            var currentZone = GameManager.company.flags.currentZone;
            if (currentZone === void 0) {
                currentZone = 1; // Mặc định là zone 1 (trung tâm)
            }
            var nextZone = (currentZone + direction).clamp(0, 2); // Giới hạn zone trong khoảng 0-2

            // Nếu không phải level 4, luôn là zone 1
            if (GameManager.company.currentLevel != 4) {
                nextZone = 1;
            } else {
                // Giới hạn zone dựa trên việc đã mở khóa phòng lab chưa
                if (!GameManager.company.flags.hwLabUnlocked) { // Chưa mở Hardware lab (zone 0)
                    nextZone = nextZone.clamp(1, 2);
                }
                if (!GameManager.company.flags.rndLabUnlocked) { // Chưa mở R&D lab (zone 2)
                    nextZone = nextZone.clamp(0, 1);
                }
            }
            visualsManager.scrollToZone(nextZone, !0); // Cuộn đến zone mới với animation
        }
    };

    // Cuộn đến một zone cụ thể
    visualsManager.scrollToZone = function (targetZone, animateScroll) {
        var stageWidth = CanvasManager.backgroundStage.canvas.width;
        if (targetZone === void 0) {
            targetZone = 1; // Mặc định là zone 1
        }

        // Tính toán vị trí X mục tiêu dựa trên zone
        var targetX = (targetZone === 0) ? visualsManager.toScreenCoordinates(270) :
            (targetZone === 1) ? visualsManager.toScreenCoordinates(2560) :
                visualsManager.toScreenCoordinates(4760);
        targetX = targetX * CanvasManager.globalScale;

        var containerWidth = $("#canvasScrollContainer").width();
        // Độ lệch để căn giữa zone trong container (nếu stage rộng hơn container)
        var centerOffset = Math.abs(containerWidth - stageWidth) / 2;
        targetX = targetX + centerOffset * targetZone; // Áp dụng độ lệch

        // Nếu vị trí hiện tại khác vị trí mục tiêu, thực hiện cuộn
        if ($("#innerCanvasContainer").offset().left != targetX) {
            var animationDuration = animateScroll ? visualsManager.toScreenCoordinates(600) : 0;
            visualsManager.isAnimatingScroll = true; // Đánh dấu đang cuộn
            $("#innerCanvasContainer").transition({ left: -targetX }, animationDuration);
            setTimeout(function () {
                visualsManager.isAnimatingScroll = false;
            }, animationDuration);
        }

        visualsManager._zoneChanged(targetZone, animateScroll); // Gọi hàm xử lý khi zone thay đổi
        GameManager.company.flags.currentZone = targetZone; // Lưu zone hiện tại
    };

    // Cập nhật (vẽ lại) tất cả các máy tính của nhân viên
    visualsManager.updateComputers = function () {
        GameManager.company.staff.slice().sort(function (charA, charB) {
            return charA.slot - charB.slot; // Sắp xếp theo slot để đảm bảo thứ tự vẽ
        }).forEach(function (character) {
            visualsManager.addComputer(character);
        });
    };

    var companyNameVisual; // Biến lưu trữ đối tượng hiển thị tên công ty
    // Cập nhật hiển thị tên công ty trên văn phòng
    visualsManager.updateCompanyNameInOffice = function () {
        var currentLevel = GameManager.company.currentLevel;
        if (currentLevel != 1) { // Chỉ hiển thị tên công ty từ level 2 trở đi
            if (!companyNameVisual) { // Nếu chưa có, tạo mới
                companyNameVisual = new IsometricCompanyNameVisual();
                CanvasManager.backgroundStage.addChild(companyNameVisual);
            }
            companyNameVisual.updateVisual(currentLevel == 2); // Cập nhật visual (có thể khác nhau giữa level 2 và các level khác)

            // Thiết lập vị trí và scale cho tên công ty dựa trên level
            if (currentLevel === 2 || currentLevel === 3) {
                companyNameVisual.x = visualsManager.toScreenCoordinates(690, CanvasManager.globalScale);
                companyNameVisual.y = visualsManager.toScreenCoordinates(1100, CanvasManager.globalScale);
            } else if (currentLevel === 4) {
                companyNameVisual.x = visualsManager.toScreenCoordinates(1410, CanvasManager.globalScale);
                companyNameVisual.y = visualsManager.toScreenCoordinates(300, CanvasManager.globalScale);
                companyNameVisual.scaleX *= 0.8; // Level 4 có thể có tên nhỏ hơn
                companyNameVisual.scaleY *= 0.8;
            }
            companyNameVisual.x += visualsManager.currentXOffset; // Áp dụng độ lệch X
        }
    };

    // Bắt đầu hiển thị cho việc tạo engine
    visualsManager.startCreateEngine = function () {
        visualsManager.gameStatusBar.startEngine();
        visualsManager.updatePoints();
    };

    // Bắt đầu hiển thị cho việc làm hợp đồng
    visualsManager.startContract = function () {
        visualsManager.gameStatusBar.startContract();
        visualsManager.updatePoints();
    };

    // Cập nhật trạng thái khi đang tạo engine
    visualsManager.updateEngineStatus = function () {
        var currentEngineDev = GameManager.currentEngineDev;
        visualsManager.gameStatusBar.updateProgress(currentEngineDev.progress, !0, 100); // true: animate, 100: duration
        visualsManager.gameStatusBar.updateStatusMessage(currentEngineDev.currentPart.name);
    };

    // Kết thúc hiển thị tạo engine
    visualsManager.finishEngine = function () {
        visualsManager.gameStatusBar.finishEngine();
        GameManager.spawnedPoints = 0; // Reset số điểm đang spawn
    };

    // Cập nhật hiển thị tất cả các loại điểm
    visualsManager.updatePoints = function () {
        visualsManager.gameStatusBar.updatePoints();
        visualsManager.researchPoints.updatePoints(GameManager.company.researchPoints);
    };

    // Tạo hiệu ứng "pulse" cho một loại điểm cụ thể
    visualsManager.pulsePointsDisplay = function (pointType, callback) {
        if (pointType === "r") { // Research points
            visualsManager.researchPoints.pulse(callback);
        } else {
            visualsManager.gameStatusBar.pulsePointsDisplay(pointType, callback);
        }
    };

    // Lấy vị trí toàn cục (global coordinates) của một loại điểm hiển thị
    visualsManager.getGlobalLocationOfPointsDisplay = function (pointType) {
        if (pointType === "r") {
            return {
                x: visualsManager.researchPoints.x + visualsManager.researchPoints.size / 2,
                y: visualsManager.researchPoints.y + visualsManager.researchPoints.size / 2
            };
        } else {
            return visualsManager.gameStatusBar.getGlobalLocationOfPointsDisplay(pointType);
        }
    };

    // Tải lại hiển thị của tất cả các nhân vật
    visualsManager.reloadAllCharacters = function () {
        if (GameManager.company && GameManager.company.staff) {
            var staffList = GameManager.company.staff;
            for (var i = 0; i < staffList.length; i++) {
                var character = staffList[i];
                visualsManager.getCharacterOverlay(character); // Lấy hoặc tạo overlay
                character.refreshPoints(); // Làm mới hiển thị điểm của nhân vật (nếu có)
            }
        }
    };

    // Mảng chứa các đối tượng CharacterOverlay (quản lý hiển thị của từng nhân vật)
    visualsManager.characterOverlays = [];

    // Lấy (hoặc tạo mới nếu chưa có) CharacterOverlay cho một nhân vật
    visualsManager.getCharacterOverlay = function (character, dontCreate) {
        var existingOverlay = visualsManager.characterOverlays.first(function (overlay) {
            return overlay.character === character;
        });
        // Nếu overlay đã tồn tại hoặc không yêu cầu tạo mới, trả về nó
        if (existingOverlay || dontCreate) {
            return existingOverlay;
        } else {
            // Ngược lại, tạo overlay mới
            return visualsManager.createCharacterOverlay(character);
        }
    };

    // Lấy vị trí hiện tại (x, y) cho một nhân vật dựa trên level và slot
    visualsManager.getCurrentPosition = function (level, slot) {
        var position = {};
        // Hardcode vị trí cho từng level và slot
        // Đây là phần rất đặc thù cho việc sắp xếp nhân vật trong các văn phòng khác nhau
        if (level === 1) {
            position.x = 998 * CanvasManager.globalScale;
            position.y = 599 * CanvasManager.globalScale;
        } else if (level === 2 || level === 3) {
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
        position.x = visualsManager.toScreenCoordinates(position.x);
        position.y = visualsManager.toScreenCoordinates(position.y);
        position.x += visualsManager.currentXOffset;
        return position;
    };

    // Thiết lập vị trí cho một CharacterOverlay và cập nhật hình ảnh liên quan (bàn, ghế, PC)
    visualsManager.positionCharacterOverlay = function (characterOverlay, level, slot) {
        var position = visualsManager.getCurrentPosition(level, slot);
        characterOverlay.x = position.x;
        characterOverlay.y = position.y;
        visualsManager.updateImages(characterOverlay, level, slot); // Cập nhật hình ảnh bàn, ghế,...
    };

    // Cập nhật các hình ảnh phụ (bàn, ghế, keyboard, PC) cho một CharacterOverlay
    visualsManager.updateImages = function (characterOverlay, level, slot) {
        var imageSize = 200; // Kích thước cơ sở của ảnh
        if (PlatformShim.ISLOWRES) {
            imageSize = 107; // Kích thước cho độ phân giải thấp
        }
        var globalScale = CanvasManager.globalScale;

        // Chỉ cập nhật nếu slot là 2, 4, hoặc 6 (các slot có thể có PC riêng)
        if (slot === 2 || slot === 4 || slot === 6) {
            if (level === 2) {
                characterOverlay.deskImage = visualsManager.getSubImage(characterOverlay.x - 807 / visualsManager.Divisor * globalScale, characterOverlay.y - 527 / visualsManager.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level2Desk);
                if (slot === 2) {
                    characterOverlay.keyBoardImage = visualsManager.getSubImage(characterOverlay.x - 889 / visualsManager.Divisor * globalScale, characterOverlay.y - 716 / visualsManager.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level2C2Keyboard);
                    characterOverlay.pcImage = visualsManager.getSubImage(characterOverlay.x - 880 / visualsManager.Divisor * globalScale, characterOverlay.y - 698 / visualsManager.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level2C2);
                } else { // slot 4
                    characterOverlay.keyBoardImage = visualsManager.getSubImage(characterOverlay.x - 1117 / visualsManager.Divisor * globalScale, characterOverlay.y - 582 / visualsManager.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level2C2Keyboard);
                    characterOverlay.pcImage = visualsManager.getSubImage(characterOverlay.x - 1114 / visualsManager.Divisor * globalScale, characterOverlay.y - 511 / visualsManager.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level2C4);
                }
            } else if (level === 3) {
                characterOverlay.deskImage = visualsManager.getSubImage(characterOverlay.x - 807 / visualsManager.Divisor * globalScale, characterOverlay.y - 527 / visualsManager.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level3Desk);
                if (slot === 2) {
                    characterOverlay.keyBoardImage = visualsManager.getSubImage(characterOverlay.x - 893 / visualsManager.Divisor * globalScale, characterOverlay.y - 713 / visualsManager.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level3C2Keyboard);
                    characterOverlay.pcImage = visualsManager.getSubImage(characterOverlay.x - 878 / visualsManager.Divisor * globalScale, characterOverlay.y - 703 / visualsManager.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level3C2);
                } else { // slot 4
                    characterOverlay.keyBoardImage = visualsManager.getSubImage(characterOverlay.x - 1130 / visualsManager.Divisor * globalScale, characterOverlay.y - 578 / visualsManager.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level3C2Keyboard);
                    characterOverlay.pcImage = visualsManager.getSubImage(characterOverlay.x - 1109 / visualsManager.Divisor * globalScale, characterOverlay.y - 511 / visualsManager.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level3C4);
                }
            } else if (level === 4) {
                characterOverlay.deskImage = visualsManager.getSubImage(characterOverlay.x - 427 / visualsManager.Divisor * globalScale, characterOverlay.y - 460 / visualsManager.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level4Desk);
                if (slot === 2) {
                    characterOverlay.keyBoardImage = visualsManager.getSubImage(characterOverlay.x - 541 / visualsManager.Divisor * globalScale, characterOverlay.y - 840 / visualsManager.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level4C2Keyboard);
                    characterOverlay.pcImage = visualsManager.getSubImage(characterOverlay.x - 428 / visualsManager.Divisor * globalScale, characterOverlay.y - 756 / visualsManager.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level4C2);
                } else if (slot === 4) {
                    characterOverlay.keyBoardImage = visualsManager.getSubImage(characterOverlay.x - 824 / visualsManager.Divisor * globalScale, characterOverlay.y - 676 / visualsManager.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level4C2Keyboard);
                    characterOverlay.pcImage = visualsManager.getSubImage(characterOverlay.x - 711 / visualsManager.Divisor * globalScale, characterOverlay.y - 591 / visualsManager.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level4C2);
                } else if (slot === 6) {
                    characterOverlay.keyBoardImage = visualsManager.getSubImage(characterOverlay.x - 1094 / visualsManager.Divisor * globalScale, characterOverlay.y - 511 / visualsManager.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level4C2Keyboard);
                    characterOverlay.pcImage = visualsManager.getSubImage(characterOverlay.x - 981 / visualsManager.Divisor * globalScale, characterOverlay.y - 426 / visualsManager.Divisor * globalScale, imageSize, imageSize, ResourceKeys.Level4C2);
                }
            }
        }
    };

    // Tạo một sub-image từ một resource lớn hơn (dùng để cắt ảnh từ sprite sheet hoặc ảnh nền lớn)
    visualsManager.getSubImage = function (srcX, srcY, width, height, resourceKey) {
        var tempCanvas = document.createElement("canvas");
        tempCanvas.width = width;
        tempCanvas.height = height;
        var imageResource = GameDev.ResourceManager.resources[resourceKey];
        // Vẽ phần cần thiết của resource lớn vào canvas tạm
        tempCanvas.getContext("2d").drawImage(imageResource,
            -((srcX - visualsManager.currentXOffset) / CanvasManager.globalScale), // Điều chỉnh tọa độ nguồn
            -srcY / CanvasManager.globalScale);

        var subImage = new Image();
        subImage.src = tempCanvas.toDataURL("image/png"); // Chuyển canvas tạm thành Image object
        return subImage;
    };

    // Làm mới các nút "Hire Staff" trên màn hình
    visualsManager.refreshHiringButtons = function () {
        var canvasContainer = $("#canvasContainer");
        canvasContainer.find(".hireStaffButtonBase").remove(); // Xóa các nút cũ

        var currentLevel = GameManager.company.currentLevel;
        var staffList = GameManager.company.staff;

        // Chỉ hiển thị nút nếu level > 1 và chưa đủ số nhân viên tối đa cho level đó
        if (currentLevel > 1 &&
            !((currentLevel === 2 || currentLevel === 3) && staffList.length === 5) &&
            !((currentLevel > 3) && staffList.length === 7)) {

            // Tìm slot trống đầu tiên
            var emptySlot = [1, 2, 3, 4, 5, 6].first(function (slotIndex) {
                return !staffList.some(function (character) {
                    return character.slot == slotIndex;
                });
            });

            // Tạo và thêm nút vào vị trí của slot trống
            var hireButton = visualsManager.createHireButton(currentLevel, emptySlot);
            canvasContainer.append(hireButton);
            UI.maxFont("bold", canvasContainer.find(".hireButtonLabel"), 12); // Điều chỉnh font chữ
        }
    };

    var releaseButtonElement; // Lưu trữ nút "Release"
    // Cập nhật trạng thái hiển thị của nút "Release" (hoàn thành game)
    visualsManager.updateReleaseReadyButton = function () {
        if (!releaseButtonElement) { // Nếu nút chưa được tạo
            releaseButtonElement = $('<div id="releaseButton" class="selectorButton greenButton windowStyleHideState" style="position:absolute; opacity=0;">' + "Finish".localize("button") + "</div>");
            releaseButtonElement.gdIsActive = false; // Trạng thái hoạt động của nút
            $("#canvasContainer").append(releaseButtonElement);
        }

        var containerWidth = releaseButtonElement.parent().width();
        // Căn giữa nút
        releaseButtonElement.css({
            left: containerWidth / 2 - releaseButtonElement.width() / 2 + "px"
        });

        // Kiểm tra xem có nên hiển thị nút không
        var shouldBeActive = GameManager.company && GameManager.company.currentGame &&
            !GameManager.company.currentGame.flags.devCompleted &&
            GameManager.company.currentGame.flags.releaseReady;

        if (shouldBeActive != releaseButtonElement.gdIsActive) { // Nếu trạng thái thay đổi
            releaseButtonElement.gdIsActive = shouldBeActive;
            var hideButton = function () {
                releaseButtonElement.transition({ opacity: 0 }, 200);
                releaseButtonElement.removeClass("windowStyleShowState").addClass("windowStyleHideState");
                releaseButtonElement.gdIsActive = false;
            };

            if (shouldBeActive) {
                releaseButtonElement.transition({ opacity: 1 }, 200);
                releaseButtonElement.removeClass("windowStyleHideState");
                Sound.playSoundOnce("gameReady", 0.2); // Phát âm thanh "game sẵn sàng"
                releaseButtonElement.clickExclOnce(function (event) { // Chỉ xử lý click một lần
                    Sound.click();
                    hideButton();
                    // Đánh dấu game đã hoàn thành
                    if (GameManager.currentFeature) {
                        GameManager.currentFeature.progress = 1;
                    }
                    if (GameManager.company.currentGame) {
                        GameManager.company.currentGame.flags.finished = true;
                    }
                    return false; // Ngăn chặn sự kiện click lan tỏa
                });
            } else {
                hideButton();
            }
        }
    };

    // Tạo nút "Hire Staff"
    visualsManager.createHireButton = function (level, slot) {
        var buttonHtml = PlatformShim.toStaticHtml('<div class="hireStaffButtonBase hireStaffButton"><div class="hireButtonLabel">' + "Fill Position".localize() + '</div><div class="hireStaffProgress"></div></div>');
        var hireButton = $(buttonHtml);
        var xPos = 0, yPos = 0;

        // Hardcode vị trí nút dựa trên level và slot
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

        xPos = visualsManager.toScreenCoordinates(xPos, CanvasManager.globalScale);
        yPos = visualsManager.toScreenCoordinates(yPos, CanvasManager.globalScale);
        xPos += visualsManager.currentXOffset; // Áp dụng độ lệch X

        hireButton.css({
            position: "absolute",
            top: yPos + "px",
            left: xPos + "px"
        });

        // Xử lý sự kiện click nút
        hireButton.clickExcl(function () {
            Sound.click();
            if (GameManager.company.maxStaff == 1) { // Nếu chưa thể thuê thêm (chưa train Staff Management)
                GameManager.company.activeNotifications.insertAt(0, new Notification("Hint".localize(), "You have to complete the Staff Management training before you can hire someone. Simply {0} on your player character to access the training menu.".localize().format(Tutorial.getClickVerb())));
                GameManager.showPendingNotifications();
            } else if (!UI.isStaffSearchInProgress()) { // Nếu không đang tìm nhân viên
                if (GameManager.company.staff.length > 1) {
                    Tutorial.hireMoreStaff();
                } else {
                    Tutorial.findStaff();
                }
                UI.showFindStaffWindow(slot); // Hiển thị cửa sổ tìm nhân viên cho slot này
            }
            window.event.cancelBubble = true; // Ngăn sự kiện click lan tỏa
        });
        return hireButton;
    };

    // Tạo một CharacterOverlay mới cho một nhân vật
    visualsManager.createCharacterOverlay = function (character) {
        var characterStage = canvasManagerInstance.characterStage;
        var newOverlay = new CharacterOverlay(character);
        // Thiết lập vị trí và thêm vào mảng quản lý
        visualsManager.positionCharacterOverlay(newOverlay, GameManager.company.currentLevel, character.slot);
        visualsManager.characterOverlays.push(newOverlay);
        // Thêm vào stage tại đúng vị trí layer
        visualsManager.addCharacterOverlayToStage(characterStage, newOverlay);
        return newOverlay;
    };

    // Thêm CharacterOverlay vào stage tại vị trí phù hợp (để đảm bảo thứ tự vẽ đúng)
    visualsManager.addCharacterOverlayToStage = function (stage, overlayToAdd) {
        var slot = overlayToAdd.character.slot;
        if (slot === 0) { // Nhân vật chính luôn ở trên cùng (hoặc layer đặc biệt)
            stage.addChild(overlayToAdd);
        } else {
            // Logic sắp xếp phức tạp dựa trên slot để đảm bảo nhân vật ở xa hơn được vẽ trước
            for (var i = 0; i < stage.children.length; i++) {
                if (stage.children[i].character) { // Chỉ so sánh với các CharacterOverlay khác
                    // Các slot ở "phía sau" (ví dụ: 4, 6, 3, 5 trong một số layout) được vẽ trước
                    if (slot === 4 || slot === 6 || slot === 3 || slot === 5) {
                        stage.addChildAt(overlayToAdd, 0); // Thêm vào đầu danh sách (vẽ sau cùng/trên cùng)
                        break;
                    } else if ((slot === 1 && stage.children[i].character.slot > 1) ||
                        (slot === 2 && stage.children[i].character.slot > 4) || // Logic này có vẻ hơi lạ, cần xem xét layout cụ thể
                        (slot === 3 && stage.children[i].character.slot > 2)) {
                        stage.addChildAt(overlayToAdd, i);
                        break;
                    } else if (slot > 4) { // Các slot lớn hơn thường ở phía trước
                        stage.addChild(overlayToAdd); // Thêm vào cuối (vẽ trước/dưới cùng)
                        break;
                    }
                }
            }
        }
    };

    // Làm mới các overlay hiển thị thông tin training của nhân viên
    visualsManager.refreshTrainingOverlays = function () {
        var canvasContainer = $("#canvasContainer");
        canvasContainer.find(".trainingOverlayTemplate").remove(); // Xóa các overlay cũ

        for (var i = 0; i < visualsManager.characterOverlays.length; i++) {
            var characterOverlay = visualsManager.characterOverlays[i];
            var trainingOverlayElement = $("#trainingOverlayTemplate").clone();
            trainingOverlayElement.removeAttr("id");

            var lowResOffset = GameFlags.IS_LOW_RES ? -30 : 0; // Độ lệch cho độ phân giải thấp
            // Thiết lập vị trí và scale cho overlay training
            trainingOverlayElement.css({
                position: "absolute",
                top: characterOverlay.y - VisualsManager.toScreenCoordinates(120, CanvasManager.globalScale) + "px",
                left: characterOverlay.x - VisualsManager.toScreenCoordinates(60, CanvasManager.globalScale) + lowResOffset + "px",
                transform: "scale({0},{0})".format(CanvasManager.globalScaleIgnoringLowResBackground)
            });
            characterOverlay.trainingOverlay = trainingOverlayElement;
            canvasContainer.append(trainingOverlayElement);
            trainingOverlayElement.hide(); // Mặc định ẩn
            characterOverlay.resumeTraining(); // Tiếp tục trạng thái training (nếu có)
        }
    };

    // Xử lý cho màn hình siêu rộng (ultra-wide monitors)
    visualsManager.handleUltraWideMonitors = function (containerWidth, containerHeight) {
        if (containerWidth / containerHeight > 16 / 9) { // Nếu tỷ lệ rộng hơn 16:9
            // Tính toán phần thừa ra và căn giữa nội dung game
            var excessWidth = containerWidth / (containerWidth / containerHeight) * (containerWidth / containerHeight - 16 / 9);
            $("#gameContainerWrapper").css({
                left: excessWidth / 2 + "px",
                width: containerWidth - excessWidth + "px"
            });
            visualsManager.globalOffsetX = excessWidth / 2; // Lưu lại độ lệch toàn cục
        } else { // Nếu tỷ lệ chuẩn hoặc hẹp hơn
            $("#gameContainerWrapper").css({
                left: "0px",
                width: "100%"
            });
            visualsManager.globalOffsetX = 0;
        }
    };
})(); // Kết thúc IIFE của VisualsManager

// IIFE cho phần quản lý hiển thị của các phòng lab (Hardware và R&D)
(function () {
    var visualsManager = VisualsManager; // Alias
    var labWorkersList = []; // Danh sách các đối tượng hiển thị nhân viên trong lab

    // Làm mới hiển thị của các nhân viên trong lab
    visualsManager.refreshLabCrew = function () {
        if (labWorkersList) { // Nếu đã có danh sách cũ
            labWorkersList.forEach(function (workerVisual) {
                workerVisual.parent.removeChild(workerVisual); // Xóa khỏi stage
            });
            labWorkersList = []; // Reset danh sách
        }
        initializeHardwareLabVisuals(); // Khởi tạo hiển thị cho Hardware lab
        initializeResearchAndDevelopmentLabVisuals(); // Khởi tạo hiển thị cho R&D lab
        // Cập nhật hiển thị của các zone dựa trên zone hiện tại của công ty (sau khi level 4 được mở khóa)
        if (GameManager.company.currentLevel == 4) {
            visualsManager._zoneChanged(GameManager.company.flags.currentZone, false);
        }
    };

    // Tạo một card trạng thái dự án (dùng cho cả Hardware và R&D lab)
    var createProjectStatusCard = function (initialBudgetValue) {
        var cardElement = $("#projectStatusCardTemplate").clone();
        cardElement[0].id = void 0; // Xóa ID để tránh trùng lặp

        // Khởi tạo slider cho budget
        cardElement.find(".projectBudgetSlider").slider({
            orientation: "horizontal",
            range: "min",
            min: 0,
            max: 100,
            value: initialBudgetValue,
            animate: "fast",
            slide: function (event, ui) {
                var sliderElement = $(ui.handle).closest(".projectBudgetSlider");
                if (!sliderElement.hasClass("projectBudgetSlider")) throw "couldn't find target slider";

                cardElement._gd_sliderValue = ui.value; // Lưu giá trị slider (có thể để so sánh sau này)
                sliderElement.slider("value", ui.value); // Cập nhật giá trị của slider

                var newBudgetValue = ui.value;
                // Cập nhật budget tương ứng trong GameManager dựa trên loại card (R&D hay Hardware)
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

    var hardwareLabCard, researchAndDevelopmentLabCard; // Biến lưu trữ các card trạng thái

    // Khởi tạo hiển thị cho Hardware Lab (zone 0)
    var initializeHardwareLabVisuals = function () {
        var company = GameManager.company;
        if (!hardwareLabCard) { // Nếu card chưa được tạo
            var initialBudget = company.flags.hwBudget;
            if (initialBudget === void 0) initialBudget = 0;

            hardwareLabCard = createProjectStatusCard(initialBudget * 100);
            hardwareLabCard.addClass("projectCardLeft hwCard"); // CSS class cho vị trí và loại
            hardwareLabCard.find(".projectCardLabel").text("Hardware lab".localize());
            // Click vào card sẽ cuộn đến zone tương ứng
            hardwareLabCard.clickExcl(function () {
                visualsManager.scrollToZone(0, true);
            });
            hardwareLabCard.insertBefore("#consoleMaintenanceContainer"); // Thêm vào DOM
            hardwareLabCard._gd_projectVisible = true; // Đánh dấu card đang hiển thị dự án (ban đầu)
        }

        // Ẩn/Hiện card dựa trên level và việc đã mở khóa lab chưa
        if (company.currentLevel < 4 || !company.flags.hwLabUnlocked) {
            hardwareLabCard.hide();
        } else {
            hardwareLabCard.show();
            updateProjectCardDisplay(hardwareLabCard, GameManager.currentHwProject); // Cập nhật thông tin dự án

            if (!company.hwCrew) company.hwCrew = []; // Khởi tạo danh sách nhân viên lab nếu chưa có
            var hardwareLabStaffList = company.hwCrew;
            var maxHardwareBudget = GameManager.getMaxHwBudget();
            var hardwareLabStage = CanvasManager.leftScreen.characterStage; // Stage để vẽ nhân viên Hardware lab
            var staffToDrawLater = []; // Nhân viên vẽ sau (để đảm bảo thứ tự layer)

            // Tạo hoặc cập nhật hiển thị cho từng nhân viên trong Hardware lab (tối đa 13 vị trí)
            for (var i = 0; i <= 12; i++) {
                if (hardwareLabStaffList.length < i + 1) { // Nếu chưa có nhân viên ở vị trí này, tạo mới
                    hardwareLabStaffList.push(new ProjectWorkerVisual());
                    hardwareLabStaffList[i].zone = 0; // Zone 0 là Hardware lab
                    hardwareLabStaffList[i].setPosition(i); // Thiết lập vị trí dựa trên index
                    hardwareLabStaffList[i].loadAnimations(); // Tải animation
                }
                var workerVisual = hardwareLabStaffList[i];
                workerVisual.getCurrentProject = function () { return GameManager.currentHwProject; }; // Gán hàm lấy dự án hiện tại

                // Gán hàm tính toán yếu tố "affordance" (khả năng chi trả/hiệu suất dựa trên budget)
                (function (worker, budgetPerWorker) {
                    worker.getAffordanceFactor = function () {
                        return calculateAffordanceFactor(maxHardwareBudget * company.flags.hwBudget, budgetPerWorker);
                    };
                })(workerVisual, maxHardwareBudget / 12 * (i + 1));

                // Một số vị trí nhân viên được vẽ sau để đảm bảo thứ tự layer
                if (i === 3 || i === 7) {
                    staffToDrawLater.push(workerVisual);
                } else {
                    hardwareLabStage.addChild(workerVisual);
                    labWorkersList.push(workerVisual);
                }
            }
            // Thêm các nhân viên cần vẽ sau vào stage
            for (var i = 0, len = staffToDrawLater.length; i < len; i++) {
                hardwareLabStage.addChild(staffToDrawLater[i]);
                labWorkersList.push(staffToDrawLater[i]);
            }
            visualsManager.putConsoleToPedestal(); // Đặt console lên bệ (nếu có)
        }
    };

    // Đặt console đang phát triển hoặc console mới nhất của công ty lên bệ trưng bày
    visualsManager.putConsoleToPedestal = function () {
        var company = GameManager.company;
        // Chỉ thực hiện nếu là level 4 và Hardware lab đã mở khóa
        if (company.currentLevel === 4 && company.flags.hwLabUnlocked) {
            // Xóa console cũ khỏi bệ (nếu có)
            if (visualsManager.consoleContainer && CanvasManager.leftScreen.backgroundOverlayStage.contains(visualsManager.consoleContainer)) {
                CanvasManager.leftScreen.backgroundOverlayStage.removeChild(visualsManager.consoleContainer);
            }

            var consoleToDisplay = void 0;
            var licensedPlatforms = void 0;

            // Ưu tiên hiển thị console đang phát triển
            if (GameManager.currentHwProject && GameManager.currentHwProject.id === "custom console") {
                consoleToDisplay = { iconUri: GameManager.currentHwProject.iconUri };
            } else {
                // Tiếp theo, hiển thị console tự tạo mới nhất
                licensedPlatforms = company.licencedPlatforms.filter(function (platform) { return platform.isCustom; });
                if (licensedPlatforms.length) {
                    consoleToDisplay = licensedPlatforms.last();
                } else {
                    // Nếu không có console tự tạo, hiển thị platform của game đang phát triển (nếu không phải PC/mobile)
                    var currentGame = company.currentGame;
                    if (currentGame && currentGame.platforms.length > 0 &&
                        currentGame.platforms[0].id != "PC" && currentGame.platforms[0].id != "G64" &&
                        currentGame.platforms[0].id != "Gameling" && currentGame.platforms[0].id != "Vena Gear" &&
                        currentGame.platforms[0].id != "PPS" && currentGame.platforms[0].id != "GS" &&
                        currentGame.platforms[0].id != "grPhone") {
                        consoleToDisplay = company.currentGame.platforms[0];
                    } else {
                        // Cuối cùng, tìm game đã phát hành gần nhất có platform phù hợp
                        for (var i = company.gameLog.length - 1; i > 0; i--) { // Sửa: i >= 0
                            var gamePlatforms = company.gameLog[i].platforms;
                            if (gamePlatforms[0].id != "PC" && gamePlatforms[0].id != "G64" &&
                                gamePlatforms[0].id != "Gameling" && gamePlatforms[0].id != "Vena Gear" &&
                                gamePlatforms[0].id != "PPS" && gamePlatforms[0].id != "GS" &&
                                gamePlatforms[0].id != "grPhone") {
                                consoleToDisplay = gamePlatforms[0];
                                break;
                            }
                        }
                    }
                }
            }

            // Nếu tìm thấy console để hiển thị, vẽ nó lên bệ
            if (consoleToDisplay) {
                var platformImageSrc = Platforms.getPlatformImage(consoleToDisplay, company.currentWeek);
                var consoleBitmap = new createjs.Bitmap(platformImageSrc);
                var container = new createjs.Container();
                var globalScale = CanvasManager.globalScale;
                // Thiết lập scale và vị trí cho console trên bệ
                container.scaleX = 0.45 * globalScale;
                container.scaleY = 0.45 * globalScale;
                container.x = 2230 * globalScale;
                container.y = 1104 * globalScale;
                container.addChild(consoleBitmap);
                visualsManager.consoleContainer = container;
                CanvasManager.leftScreen.backgroundOverlayStage.addChild(visualsManager.consoleContainer);
            }
        }
    };

    // Tính toán yếu tố "affordance" (liên quan đến hiệu suất dựa trên budget)
    var calculateAffordanceFactor = function (totalBudget, budgetThreshold) {
        if (totalBudget === 0) return -4; // Không có budget -> hiệu suất rất thấp
        var ratio = totalBudget / budgetThreshold;
        if (ratio < 1) {
            ratio = -1 + ratio; // Giá trị âm nếu budget thấp hơn ngưỡng
        }
        return ratio;
    };

    // Khởi tạo hiển thị cho R&D Lab (zone 2)
    var initializeResearchAndDevelopmentLabVisuals = function () {
        var company = GameManager.company;
        if (!researchAndDevelopmentLabCard) { // Nếu card chưa được tạo
            var initialBudget = company.flags.rndBudget;
            if (initialBudget === void 0) initialBudget = 0;

            researchAndDevelopmentLabCard = createProjectStatusCard(initialBudget * 100);
            researchAndDevelopmentLabCard.addClass("projectCardRight rndCard");
            researchAndDevelopmentLabCard.find(".projectCardLabel").text("R&D lab".localize());
            researchAndDevelopmentLabCard.clickExcl(function () { visualsManager.scrollToZone(2, true); });
            $("#gameUIContainer").append(researchAndDevelopmentLabCard); // Thêm vào DOM (khác với Hardware lab)
            researchAndDevelopmentLabCard._gd_projectVisible = true;
        }

        // Ẩn/Hiện card
        if (company.currentLevel < 4 || !company.flags.rndLabUnlocked) {
            researchAndDevelopmentLabCard.hide();
        } else {
            researchAndDevelopmentLabCard.show();
            updateProjectCardDisplay(researchAndDevelopmentLabCard, GameManager.currentRnDProject);

            if (!company.rndCrew) company.rndCrew = [];
            var researchAndDevelopmentStaffList = company.rndCrew;
            var maxResearchAndDevelopmentBudget = GameManager.getMaxRndBudget();
            var researchAndDevelopmentStage = CanvasManager.rightScreen.characterStage;
            var staffToDrawLater = [];

            for (var i = 0; i <= 12; i++) {
                if (researchAndDevelopmentStaffList.length < i + 1) {
                    researchAndDevelopmentStaffList.push(new ProjectWorkerVisual());
                    researchAndDevelopmentStaffList[i].zone = 2; // Zone 2 là R&D lab
                    researchAndDevelopmentStaffList[i].setPosition(i);
                    researchAndDevelopmentStaffList[i].loadAnimations();
                }
                var workerVisual = researchAndDevelopmentStaffList[i];
                workerVisual.getCurrentProject = function () { return GameManager.currentRnDProject; };

                (function (worker, budgetPerWorker) {
                    worker.getAffordanceFactor = function () {
                        return calculateAffordanceFactor(maxResearchAndDevelopmentBudget * company.flags.rndBudget, budgetPerWorker);
                    };
                })(workerVisual, maxResearchAndDevelopmentBudget / 12 * (i + 1));

                if (i === 5 || i === 7) { // Các vị trí đặc biệt vẽ sau
                    staffToDrawLater.push(workerVisual);
                } else {
                    researchAndDevelopmentStage.addChild(workerVisual);
                    labWorkersList.push(workerVisual);
                }
            }
            for (var i = 0, len = staffToDrawLater.length; i < len; i++) {
                researchAndDevelopmentStage.addChild(staffToDrawLater[i]);
                labWorkersList.push(staffToDrawLater[i]);
            }
        }
    };

    // Hàm được gọi khi zone hiển thị thay đổi
    visualsManager._zoneChanged = function (targetZone, animateScroll) {
        var animationSpeed = animateScroll ? "normal" : 0;

        // Kích hoạt/Hủy kích hoạt các canvas phụ dựa trên zone hiện tại
        CanvasManager.zone0Activ = (targetZone === 0);
        CanvasManager.zone1Activ = (targetZone === 1);
        CanvasManager.zone2Activ = (targetZone === 2);

        // Hiển thị/Ẩn slider budget cho R&D lab
        if (targetZone != 2 && researchAndDevelopmentLabCard) {
            researchAndDevelopmentLabCard.find(".projectBudgetSlider").slideUp(animationSpeed);
            researchAndDevelopmentLabCard.find(".projectCardLabel").slideDown(animationSpeed);
        }
        if (targetZone == 2 && researchAndDevelopmentLabCard) {
            researchAndDevelopmentLabCard.find(".projectBudgetSlider").slideDown(animationSpeed);
            researchAndDevelopmentLabCard.find(".projectCardLabel").slideUp(animationSpeed);
        }

        // Hiển thị/Ẩn slider budget cho Hardware lab
        if (targetZone != 0 && hardwareLabCard) {
            hardwareLabCard.find(".projectBudgetSlider").slideUp(animationSpeed);
            hardwareLabCard.find(".projectCardLabel").slideDown(animationSpeed);
        }
        if (targetZone == 0 && hardwareLabCard) {
            hardwareLabCard.find(".projectBudgetSlider").slideDown(animationSpeed);
            hardwareLabCard.find(".projectCardLabel").slideUp(animationSpeed);
        }

        adjustCardLayoutForSmallScreen(); // Điều chỉnh layout card cho màn hình nhỏ
        // Hiển thị thông báo tutorial khi vào các lab lần đầu
        if (targetZone == 2) Media.enterRndLab(GameManager.company);
        else if (targetZone == 0) Media.enterHwLab(GameManager.company);
    };

    // Điều chỉnh layout của các card trạng thái dự án nếu màn hình nhỏ
    var adjustCardLayoutForSmallScreen = function () {
        var isSmallScreen = CanvasManager.isSmallScreen;
        if (researchAndDevelopmentLabCard) {
            var projectActive = isSmallScreen && GameManager.currentRnDProject;
            if (projectActive && !researchAndDevelopmentLabCard.hasClass("small")) {
                researchAndDevelopmentLabCard.addClass("small");
            } else if (!projectActive && researchAndDevelopmentLabCard.hasClass("small")) {
                researchAndDevelopmentLabCard.removeClass("small");
            }
        }
        if (hardwareLabCard) {
            var projectActive = isSmallScreen && GameManager.currentHwProject;
            if (projectActive && !hardwareLabCard.hasClass("small")) {
                hardwareLabCard.addClass("small");
            } else if (!projectActive && hardwareLabCard.hasClass("small")) {
                hardwareLabCard.removeClass("small");
            }
        }
    };

    // Cập nhật hiển thị của một card trạng thái dự án
    var updateProjectCardDisplay = function (cardElement, currentProject) { // Thêm currentProject vào đây
        if (cardElement) {
            var company = GameManager.company;
            if (company) {
                var currentBudgetValue = company.flags.hwBudget * 100; // Mặc định là Hardware
                var monthlyCost = GameManager.getLabCostPerMonth(0); // Zone 0 cho Hardware

                if (cardElement.hasClass("rndCard")) { // Nếu là card R&D
                    currentProject = GameManager.currentRnDProject; // Lấy dự án R&D hiện tại
                    monthlyCost = GameManager.getLabCostPerMonth(2); // Zone 2 cho R&D
                    currentBudgetValue = company.flags.rndBudget * 100;
                }
                // currentProject đã được truyền vào hoặc lấy từ trên

                // Hiển thị/Ẩn phần thông tin dự án
                if (!currentProject && cardElement._gd_projectVisible) {
                    cardElement.find(".projectStatusContainer").slideUp();
                    cardElement._gd_projectVisible = false;
                } else if (currentProject) {
                    if (!cardElement._gd_projectVisible) {
                        cardElement.find(".projectStatusContainer").slideDown();
                        cardElement._gd_projectVisible = true;
                    }
                    // Cập nhật icon, tên, progress, điểm còn lại nếu có thay đổi
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

                // Cập nhật chi phí hàng tháng và giá trị slider nếu có thay đổi
                if (cardElement._gd_budget !== monthlyCost) {
                    cardElement.find(".projectBudgetValue").text("{0} per month".localize().format(UI.getShortNumberString(monthlyCost)));
                    cardElement._gd_budget = monthlyCost;
                }
                if (Math.round(cardElement._gd_sliderValue) != Math.round(currentBudgetValue)) {
                    cardElement.find(".projectBudgetSlider").slider({ value: currentBudgetValue });
                    cardElement._gd_sliderValue = currentBudgetValue;
                }
                adjustCardLayoutForSmallScreen(); // Điều chỉnh layout
            }
        }
    };

    // Hàm được gọi để cập nhật card trạng thái (ví dụ, khi có thay đổi từ GameManager)
    visualsManager.updateProjectStatusCards = function () {
        if (GameManager.company.flags.hwLabUnlocked) {
            updateProjectCardDisplay(hardwareLabCard); // Không cần truyền currentProject nữa
        }
        if (GameManager.company.flags.rndLabUnlocked) {
            updateProjectCardDisplay(researchAndDevelopmentLabCard); // Không cần truyền currentProject nữa
        }
    };
})();