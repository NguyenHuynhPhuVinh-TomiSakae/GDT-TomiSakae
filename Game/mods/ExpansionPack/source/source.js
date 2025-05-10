var ExpPack = {};
(function () {
	/* compatibility check */
	// Hàm kiểm tra tương thích mod
	var compatibilityCheck = function (data) {
		for (var i = 0; i < ModSupport.availableMods.length; i++) {
			var mod = ModSupport.availableMods[i];
			// Kiểm tra nếu mod "VENOMOUS" (được xác định bằng URL) đang hoạt động
			if (mod.url == "https://github.com/Turntablelover/Game-Dev-Tycoon-Mod" && mod.active) {
				var div = $("body");
				// Hiển thị thông báo lỗi tương thích
				div.append('<div id="ErrorContainer" class="windowBorder smallWindow" style="overflow:auto;display:none;"> <div id="cheatmodtop" class="windowTitle smallerWindowTitle">Vấn đề Tương thích</div>');
				div = $("#ErrorContainer");
				div.append('<div id="error" style="margin-left:50px;width: 400px;" >Expansion Pack Mod <span style="color:red;">KHÔNG</span> tương thích với VENOMOUS mod.</br></br> Để tiếp tục sử dụng Expansion Pack Mod, vui lòng tắt VENOMOUS mod trong menu mod và khởi động lại Game Dev Tycoon của bạn</div>');
				div.append('<div id="mainmenubutton" class="selectorButton whiteButton" onclick="UI.toggleMainMenu()" style="display:inline-block;position: relative;margin-left:50px;width: 350px;" >Menu Chính</div>');
				div.gdDialog({ popout: !0, close: 0 }) // Hiển thị dialog không thể đóng
			}
		}
	};

	// Khởi tạo kiểm tra tương thích
	ExpPack.initCompatibilityChecks = function () {
		if (GDT.compatibilityCheckActive == 'undefined' || GDT.compatibilityCheckActive == null) {
			// Gắn hàm kiểm tra vào sự kiện tải và lưu game
			GDT.on(GDT.eventKeys.saves.loading, compatibilityCheck);
			GDT.on(GDT.eventKeys.saves.saving, compatibilityCheck);
			GDT.compatibilityCheckActive = true;
		}
	};
	/*  */

	/* Topics */
	// Thêm các chủ đề game mới
	ExpPack.addTopic = function () {
		GDT.addTopics([
			{
				id: "Alternate World", // Giữ ID tiếng Anh cho logic game
				name: "Thế Giới Song Song".localize("game topic"), // Dịch tên hiển thị
				genreWeightings: [0.7, 1, 0.9, 1, 0.8, 0.8],
				audienceWeightings: [0.7, 0.9, 1]
			}, {
				id: "Archery",
				name: "Bắn Cung".localize("game topic"),
				genreWeightings: [1, 0.6, 0.9, 1, 1, 0.7],
				audienceWeightings: [0.8, 0.8, 1]
			}, {
				id: "Assassin",
				name: "Sát Thủ".localize("game topic"),
				genreWeightings: [1, 0.9, 0.8, 1, 1, 0.6],
				audienceWeightings: [0.6, 0.7, 1]
			}, {
				id: "Astronaut",
				name: "Phi Hành Gia".localize("game topic"),
				genreWeightings: [0.8, 1, 0.6, 1, 1, 0.8],
				audienceWeightings: [0.8, 1, 0.8]
			}, {
				id: "Athletics",
				name: "Điền Kinh".localize("game topic"),
				genreWeightings: [0.8, 0.6, 1, 0.8, 1, 0.9],
				audienceWeightings: [0.8, 1, 0.8]
			}, /* B */ {
				id: "Baking",
				name: "Làm Bánh".localize("game topic"),
				genreWeightings: [0.6, 0.6, 0.6, 1, 0.9, 1],
				audienceWeightings: [1, 0.9, 0.7]
			}, {
				id: "Biathlon",
				name: "Hai Môn Phối Hợp".localize("game topic"), // (Trượt tuyết và bắn súng)
				genreWeightings: [0.8, 1, 0.6, 1, 0.9, 1],
				audienceWeightings: [0.8, 1, 0.9]
			}, {
				id: "Beat-em-up",
				name: "Đối Kháng Đường Phố".localize("game topic"),
				genreWeightings: [1, 0.6, 0.9, 0.6, 0.8, 0.9],
				audienceWeightings: [0.6, 0.8, 1]
			}, {
				id: "Board Game",
				name: "Cờ Bàn".localize("game topic"),
				genreWeightings: [0.8, 0.6, 0.7, 0.6, 0.9, 1],
				audienceWeightings: [1, 1, 0.8]
			}, {
				id: "Bobsleigh",
				name: "Trượt Xe Lòng Máng".localize("game topic"),
				genreWeightings: [1, 0.6, 0.9, 0.8, 0.9, 0.7],
				audienceWeightings: [0.6, 0.8, 1]
			}, /* C */ {
				id: "Canoeing",
				name: "Chèo Thuyền Ca Nô".localize("game topic"),
				genreWeightings: [0.8, 0.9, 1, 0.7, 1, 0.8],
				audienceWeightings: [0.8, 1, 0.9]
			}, {
				id: "Card Game",
				name: "Bài Bạc".localize("game topic"),
				genreWeightings: [0.6, 0.6, 1, 0.8, 0.9, 1],
				audienceWeightings: [1, 1, 0.9]
			}, {
				id: "Cavemen",
				name: "Người Tiền Sử".localize("game topic"),
				genreWeightings: [0.9, 1, 1, 0.6, 0.6, 0.9],
				audienceWeightings: [1, 1, 0.9]
			}, {
				id: "Chess",
				name: "Cờ Vua".localize("game topic"),
				genreWeightings: [0.6, 0.6, 0.6, 1, 1, 1],
				audienceWeightings: [0.6, 1, 0.9]
			}, {
				id: "Construction",
				name: "Xây Dựng".localize("game topic"),
				genreWeightings: [0.6, 0.6, 0.7, 1, 0.9, 1],
				audienceWeightings: [1, 0.8, 0.7]
			}, {
				id: "Crime",
				name: "Tội Phạm".localize("game topic"),
				genreWeightings: [1, 0.8, 0.7, 1, 0.7, 0.9],
				audienceWeightings: [0.6, 0.8, 1]
			}, {
				id: "Cycling",
				name: "Đua Xe Đạp".localize("game topic"),
				genreWeightings: [0.9, 1, 0.8, 0.8, 1, 0.9],
				audienceWeightings: [0.8, 1, 0.9]
			},  /* D */ {
				id: "Dark Fantasy",
				name: "Fantasy Hắc Ám".localize("game topic"),
				genreWeightings: [1, 0.8, 1, 0.6, 1, 0.6],
				audienceWeightings: [0.6, 0.6, 1]
			}, {
				id: "Demons",
				name: "Quỷ Dữ".localize("game topic"),
				genreWeightings: [1, 0.8, 1, 0.6, 0.6, 0.6],
				audienceWeightings: [0.6, 0.7, 1]
			}, {
				id: "Dinosaurs",
				name: "Khủng Long".localize("game topic"),
				genreWeightings: [1, 0.9, 0.6, 0.9, 0.7, 0.6],
				audienceWeightings: [1, 0.9, 0.7]
			}, {
				id: "Doctor",
				name: "Bác Sĩ".localize("game topic"),
				genreWeightings: [0.6, 0.6, 0.9, 1, 1, 0.7],
				audienceWeightings: [0.6, 0.8, 1]
			}, {
				id: "Doomsday",
				name: "Ngày Tận Thế".localize("game topic"),
				genreWeightings: [1, 1, 0.8, 0.6, 0.7, 0.6],
				audienceWeightings: [0.6, 0.7, 1]
			}, /* E */ {
				id: "E-Sports",
				name: "Thể Thao Điện Tử".localize("game topic"),
				genreWeightings: [1, 0.6, 1, 1, 1, 0.6],
				audienceWeightings: [1, 1, 1]
			}, {
				id: "Educational",
				name: "Giáo Dục".localize("game topic"),
				genreWeightings: [0.6, 0.6, 0.6, 1, 0.8, 1],
				audienceWeightings: [1, 0.8, 0.6]
			}, /* F */ {
				id: "Fairy Tale",
				name: "Truyện Cổ Tích".localize("game topic"),
				genreWeightings: [0.8, 1, 0.8, 0.8, 0.6, 1],
				audienceWeightings: [1, 0.8, 0.6]
			}, {
				id: "Fishing",
				name: "Câu Cá".localize("game topic"),
				genreWeightings: [0.6, 0.7, 0.9, 1, 1, 0.8],
				audienceWeightings: [0.7, 1, 0.9]
			}, {
				id: "Football",
				name: "Bóng Đá".localize("game topic"),
				genreWeightings: [1, 0.7, 1, 0.8, 1, 0.9],
				audienceWeightings: [0.9, 1, 0.9]
			}, {
				id: "Formula 1",
				name: "Đua Xe Công Thức 1".localize("game topic"),
				genreWeightings: [1, 0.8, 0.8, 0.8, 1, 1],
				audienceWeightings: [0.7, 1, 1]
			}, /* G */ {
				id: "Game Pack",
				name: "Gói Game".localize("game topic"),
				genreWeightings: [0.8, 0.8, 0.8, 0.8, 0.8, 1],
				audienceWeightings: [0.8, 1, 0.7]
			}, {
				id: "Ghosts",
				name: "Ma Quỷ".localize("game topic"),
				genreWeightings: [0.8, 1, 0.9, 0.6, 0.6, 0.8],
				audienceWeightings: [1, 0.8, 0.9]
			}, {
				id: "Goblin",
				name: "Yêu Tinh".localize("game topic"), // (Goblin)
				genreWeightings: [0.9, 1, 1, 0.8, 0.6, 1],
				audienceWeightings: [0.9, 1, 0.9]
			}, {
				id: "Gods",
				name: "Thần Thánh".localize("game topic"),
				genreWeightings: [1, 1, 1, 0.7, 0.8, 0.6],
				audienceWeightings: [0.7, 1, 0.9]
			}, /* H */ {
				id: "Hide and Seek",
				name: "Trốn Tìm".localize("game topic"),
				genreWeightings: [0.6, 1, 0.7, 0.8, 0.7, 1],
				audienceWeightings: [1, 0.9, 0.6]
			}, {
				id: "Hockey",
				name: "Khúc Côn Cầu".localize("game topic"),
				genreWeightings: [0.8, 0.6, 0.7, 1, 1, 0.7],
				audienceWeightings: [0.9, 1, 0.9]
			}, {
				id: "Horse Racing",
				name: "Đua Ngựa".localize("game topic"),
				genreWeightings: [1, 0.7, 0.9, 0.8, 1, 0.7],
				audienceWeightings: [0.7, 0.8, 1]
			}, /* I */ {
				id: "Ice Hockey",
				name: "Khúc Côn Cầu Trên Băng".localize("game topic"),
				genreWeightings: [1, 0.6, 0.9, 0.8, 1, 0.7],
				audienceWeightings: [0.8, 0.9, 1]
			}, /* J */ {
				id: "Judo",
				name: "Võ Judo".localize("game topic"),
				genreWeightings: [1, 0.6, 0.8, 1, 1, 0.7],
				audienceWeightings: [0.7, 1, 1]
			}, /* K */ {
				id: "Karate",
				name: "Võ Karate".localize("game topic"),
				genreWeightings: [1, 0.7, 1, 0.7, 1, 0.7],
				audienceWeightings: [0.7, 0.9, 1]
			}, /* M */ {
				id: "Maze",
				name: "Mê Cung".localize("game topic"),
				genreWeightings: [0.8, 0.8, 0.9, 1, 0.9, 1],
				audienceWeightings: [0.8, 1, 0.9]
			}, {
				id: "Mining",
				name: "Khai Mỏ".localize("game topic"),
				genreWeightings: [0.8, 1, 0.9, 0.8, 0.7, 1],
				audienceWeightings: [1, 0.9, 0.7]
			}, {
				id: "Motorcross",
				name: "Đua Xe Địa Hình".localize("game topic"),
				genreWeightings: [1, 1, 0.8, 0.6, 0.9, 0.7],
				audienceWeightings: [0.8, 0.9, 1]
			}, {
				id: "Modern",
				name: "Hiện Đại".localize("game topic"),
				genreWeightings: [1, 0.8, 0.6, 0.6, 0.8, 0.6],
				audienceWeightings: [0.7, 0.9, 1]
			}, {
				id: "Mummies",
				name: "Xác Ướp".localize("game topic"),
				genreWeightings: [1, 1, 0.7, 0.7, 0.7, 1],
				audienceWeightings: [0.7, 1, 0.8]
			}, /* P */ {
				id: "Parkour",
				name: "Parkour".localize("game topic"), // Giữ nguyên tên riêng
				genreWeightings: [1, 1, 0.7, 1, 0.9, 0.6],
				audienceWeightings: [0.7, 0.9, 1]
			}, {
				id: "Point & Click",
				name: "Trỏ Và Nhấn".localize("game topic"),
				genreWeightings: [0.7, 1, 0.7, 1, 0.9, 1],
				audienceWeightings: [0.9, 1, 0.7]
			}, {
				id: "Police",
				name: "Cảnh Sát".localize("game topic"),
				genreWeightings: [1, 0.9, 0.7, 0.9, 0.7, 0.6],
				audienceWeightings: [0.9, 1, 0.7]
			}, {
				id: "Politics",
				name: "Chính Trị".localize("game topic"),
				genreWeightings: [0.6, 0.6, 0.8, 1, 1, 0.7],
				audienceWeightings: [0.6, 0.8, 1],
				missionOverrides: [
					[0, 0, 0, 1, 0.8, 0.9, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0.8, 0.9, 1, 1, 0.8, 0.9, 1, 0.9, 0.8],
					[0, 0, 0, 0, 0, 0, 0, 0, 0],
					[0, 0, 0, 1, 0.9, 0, 0, 0, 0]
				]
			}, {
				id: "Puzzle",
				name: "Giải Đố".localize("game topic"),
				genreWeightings: [0.8, 1, 0.6, 0.7, 1, 1],
				audienceWeightings: [1, 1, 0.9]
			}, /* R */ {
				id: "Rage",
				name: "Thịnh Nộ".localize("game topic"), // (Game gây ức chế)
				genreWeightings: [1, 0.6, 0.6, 0.6, 0.9, 1],
				audienceWeightings: [0.6, 0.9, 1]
			}, {
				id: "Robot",
				name: "Người Máy".localize("game topic"),
				genreWeightings: [1, 0.8, 0.8, 0.7, 1, 0.9],
				audienceWeightings: [1, 0.9, 0.8]
			}, {
				id: "Rugby",
				name: "Bóng Bầu Dục".localize("game topic"),
				genreWeightings: [1, 0.7, 1, 0.7, 1, 0.7],
				audienceWeightings: [0.7, 0.9, 1]
			}, /* S */ {
				id: "Sailing",
				name: "Đi Thuyền Buồm".localize("game topic"),
				genreWeightings: [0.8, 1, 0.9, 0.9, 1, 0.8],
				audienceWeightings: [0.7, 1, 0.8]
			}, {
				id: "Samurais",
				name: "Võ Sĩ Samurai".localize("game topic"),
				genreWeightings: [1, 0.7, 0.9, 0.7, 0.9, 0.6],
				audienceWeightings: [0.7, 0.9, 1]
			}, {
				id: "Science",
				name: "Khoa Học".localize("game topic"),
				genreWeightings: [0.6, 0.6, 0.7, 1, 1, 0.8],
				audienceWeightings: [0.8, 1, 0.9]
			}, {
				id: "Steampunk",
				name: "Steampunk".localize("game topic"), // Giữ nguyên tên riêng
				genreWeightings: [1, 0.9, 1, 1, 0.7, 0.9],
				audienceWeightings: [0.7, 1, 0.9]
			}, {
				id: "Skiing",
				name: "Trượt Tuyết".localize("game topic"),
				genreWeightings: [1, 0.9, 0.9, 1, 0.8, 0.7],
				audienceWeightings: [0.8, 1, 0.8]
			}, {
				id: "Super Villain",
				name: "Siêu Ác Nhân".localize("game topic"),
				genreWeightings: [1, 0.7, 0.9, 0.7, 1, 0.8],
				audienceWeightings: [1, 0.8, 0.7]
			}, {
				id: "Surfing",
				name: "Lướt Sóng".localize("game topic"),
				genreWeightings: [1, 0.9, 0.9, 0.8, 1, 0.8],
				audienceWeightings: [0.8, 1, 0.7]
			}, {
				id: "Survival",
				name: "Sinh Tồn".localize("game topic"),
				genreWeightings: [0.9, 1, 1, 0.8, 1, 0.6],
				audienceWeightings: [0.8, 1, 0.9]
			}, {
				id: "Swimming",
				name: "Bơi Lội".localize("game topic"),
				genreWeightings: [0.8, 0.9, 1, 0.7, 1, 1],
				audienceWeightings: [0.8, 1, 0.9]
			}, /* T */ {
				id: "Table Tennis",
				name: "Bóng Bàn".localize("game topic"),
				genreWeightings: [0.8, 0.9, 0.8, 1, 1, 0.8],
				audienceWeightings: [0.8, 1, 0.9]
			}, {
				id: "Tennis",
				name: "Quần Vợt".localize("game topic"),
				genreWeightings: [1, 0.9, 0.8, 0.8, 1, 0.9],
				audienceWeightings: [0.8, 1, 0.9]
			}, {
				id: "Tower Defense",
				name: "Thủ Thành".localize("game topic"),
				genreWeightings: [1, 0.7, 0.6, 0.9, 1, 0.7],
				audienceWeightings: [0.6, 1, 0.8]

			}, /* V */ {
				id: "Vikings",
				name: "Người Viking".localize("game topic"),
				genreWeightings: [1, 0.8, 1, 0.7, 0.8, 0.6],
				audienceWeightings: [0.7, 0.9, 1]
			}, /* W */ {
				id: "War",
				name: "Chiến Tranh".localize("game topic"),
				genreWeightings: [1, 0.8, 0.9, 0.8, 0.6, 0.6],
				audienceWeightings: [0.6, 0.9, 1]
			}, {
				id: "Warlocks",
				name: "Pháp Sư Hắc Ám".localize("game topic"), // (Warlock)
				genreWeightings: [1, 0.8, 0.8, 1, 0.7, 0.6],
				audienceWeightings: [0.8, 0.9, 1]
			}, {
				id: "Witches",
				name: "Phù Thủy".localize("game topic"),
				genreWeightings: [0.7, 1, 0.9, 0.6, 0.9, 1],
				audienceWeightings: [1, 0.9, 0.7]
			}, {
				id: "Wizzards", // Sai chính tả, nên là Wizards
				name: "Pháp Sư".localize("game topic"), // (Wizard)
				genreWeightings: [1, 1, 0.9, 0.7, 0.8, 0.9],
				audienceWeightings: [0.7, 1, 0.9]
			}, {
				id: "Wrestling",
				name: "Đấu Vật".localize("game topic"),
				genreWeightings: [1, 0.6, 0.9, 0.8, 1, 0.7],
				audienceWeightings: [0.6, 0.9, 1]
			}]);
	};
	/*  */

	/* Platforms */

	/* Grapple */
	// Thêm nền tảng Grapintosh
	ExpPack.addPlatformGrapintosh = function () {
		var icon = './mods/ExpansionPack/source/img/Grapple.png';
		GDT.addPlatform(
			{
				id: 'Grapintosh', // Giữ ID tiếng Anh
				name: 'Grapintosh', // Tên hiển thị (có thể dịch nếu muốn, nhưng tên riêng thường giữ nguyên)
				company: 'Grapple', // Tên công ty (giữ nguyên)
				startAmount: 0.351,
				unitsSold: 0.534,
				marketKeyPoints: [{ date: "2/3/2", amount: 0.215 }, { date: "5/7/4", amount: 0.478 }, { date: "11/9/3", amount: 0.738 }],
				licencePrize: 20000,
				published: '1/7/4',
				platformRetireDate: '4/6/2',
				developmentCosts: 25000,
				genreWeightings: [1, 0.8, 0.9, 1, 1, 0.7],
				audienceWeightings: [0.8, 0.9, 1],
				techLevel: 1,
				iconUri: icon,
				events: [
					{
						id: '12111996-0000-0000-0000-DZJENGISKHAN',
						date: '1/5/1',
						getNotification: function (company) {
							return new Notification({
								header: "Tin Tức Ngành".localize(), // Dịch tiêu đề
								text: "Hôm nay, Grapple, một nhà sản xuất phần cứng mới, đã công bố một máy tính hoàn toàn mới có tên là Grapintosh. Grapintosh đi kèm với một hệ điều hành tiên tiến mới gọi là Grap OS. Mặc dù nền tảng mới này hơi đắt tiền, nhưng bạn sẽ nhận được giá trị tương xứng với số tiền bỏ ra. Grapple cho biết Grapintosh sẽ có mặt trên thị trường {0}".localize().format(General.getETADescription('1/5/1', '1/7/4')),
								image: icon
							});
						}
					}
				]
			});
	};

	// Thêm nền tảng grMac
	ExpPack.addPlatformGrMac = function () {
		var icon = './mods/ExpansionPack/source/img/grMac.png';
		GDT.addPlatform(
			{
				id: '12111996-0000-0000-0001-DZJENGISKHAN', // Giữ ID
				name: 'grMac', // Tên hiển thị
				company: 'Grapple',
				startAmount: 2.6,
				unitsSold: 5.434,
				licencePrize: 40000,
				published: '16/8/1',
				platformRetireDate: '260/12/4', // Ngày rất xa trong tương lai -> không bao giờ ngừng hỗ trợ
				developmentCosts: 25000,
				genreWeightings: [1, 0.9, 1, 1, 1, 0.8],
				audienceWeightings: [0.8, 0.9, 1],
				techLevel: 6,
				iconUri: icon,
				events: [
					{
						id: '12111996-1111-0000-0001-DZJENGISKHAN',
						date: '16/5/4',
						getNotification: function (company) {
							return new Notification({
								header: "Tin Tức Ngành".localize(),
								text: "Grapple, nhà phát triển của Grapintosh rất thành công, đã công bố một nền tảng mới có tên là grMac. Grapple đã tích hợp tất cả phần cứng vào màn hình và đặt tên cho nó là máy tính 'All-In-One'.{n} Thực tế là phần cứng rất nhỏ gọn, không ảnh hưởng đến bất kỳ sức mạnh nào mà chúng ta biết từ Grapple. grMac sẽ được phát hành {0}".localize().format(General.getETADescription('16/5/4', '16/8/1')),
								image: icon
							});
						}
					}
				]
			});
	};
	/*  */

	/* Itara */
	// Thêm nền tảng Itara Backflash
	ExpPack.addPlatformItaraBackflash = function () {
		var icon = './mods/ExpansionPack/source/img/Itara.png';
		GDT.addPlatform(
			{
				id: '31102000-2-1-4-1-LINELIAR', // Giữ ID
				name: 'Itara Backflash', // Tên hiển thị
				company: 'Itara',
				startAmount: 1.3,
				unitsSold: 4.2,
				licencePrize: 150000,
				published: '12/11/3',
				platformRetireDate: '16/1/2',
				developmentCosts: 125000,
				genreWeightings: [0.8, 1, 0.6, 0.7, 1, 0.6],
				audienceWeightings: [0.8, 1, 0.7],
				techLevel: 2,
				iconUri: icon,
				events: [
					{
						id: '31102000-2-1-4-1-1-LINELIAR',
						date: '12/7/3',
						getNotification: function (company) {
							return new Notification({
								header: "Tin Tức Ngành".localize(),
								text: "Hôm nay Itara, một công ty nổi tiếng với các máy chơi game của họ trong thị trường máy chơi game thời kỳ đầu, đã thông báo rằng họ sẽ phát hành một máy chơi game mới có tên là Itara Backflash.{n} Máy chơi game này sẽ cạnh tranh với các máy chơi game như TES. Itara đã thông báo rằng họ dự đoán máy chơi game này sẽ rất thành công.{n} Itara Backflash sẽ được phát hành vào {0}.".localize().format(General.getETADescription('12/7/3', '12/11/3')),
								image: icon
							});
						}
					}
				]
			});
	};

	// Thêm nền tảng Itara 5200
	ExpPack.addPlatformItara5200 = function () {
		var icon = './mods/ExpansionPack/source/img/itara5200.png';
		GDT.addPlatform(
			{
				id: '12111996-0000-0100-0001-DZJENGISKHAN', // Giữ ID
				name: 'Itara 5200', // Tên hiển thị
				company: 'Itara',
				startAmount: 0.4,
				unitsSold: 0.462,
				licencePrize: 45000,
				published: '2/11/2',
				platformRetireDate: '6/4/2',
				developmentCosts: 25000,
				genreWeightings: [0.8, 1, 1, 0.9, 0.7, 1],
				audienceWeightings: [0.8, 1, 0.7],
				techLevel: 1,
				iconUri: icon,
				events: [
					{
						id: '31102000-2-1-4-1-2-LINELIAR',
						date: '2/9/1',
						getNotification: function (company) {
							return new Notification({
								header: "Tin Tức Ngành".localize(),
								text: "Hôm nay Itara đã công bố nền tảng đầu tiên của họ. Họ gọi nó là: Itara 5200.{n} Máy chơi game này sử dụng cần analog và phải cạnh tranh với TES nổi tiếng của Ninvento.\nItara 5200 sẽ được phát hành vào {0}.".localize().format(General.getETADescription('2/9/1', '2/11/2')),
								image: icon
							});
						}
					}
				]
			});
	};
	/*  */

	/* Ninvento */
	// Thêm nền tảng 3GS
	ExpPack.addPlatform3GS = function () {
		var icon = './mods/ExpansionPack/source/img/3GS.png';
		GDT.addPlatform(
			{
				id: '12111996-0000-0001-0000-DZJENGISKHAN', // Giữ ID
				name: '3GS', // Tên hiển thị
				company: 'Ninvento',
				startAmount: 1.5,
				unitsSold: 3.582,
				licencePrize: 100000,
				published: '21/9/3',
				platformRetireDate: '24/5/1',
				developmentCosts: 80000,
				genreWeightings: [0.7, 1, 0.8, 1, 0.6, 1],
				audienceWeightings: [0.9, 1, 0.6],
				techLevel: 4,
				iconUri: icon,
				events: [
					{
						id: '12111996-1111-0001-0000-DZJENGISKHAN',
						date: '21/5/1',
						getNotification: function (company) {
							return new Notification({
								header: "Tin Tức Ngành".localize(),
								text: "Hôm nay Ninvento, nổi tiếng với máy chơi game GS, đã thông báo rằng họ sẽ phát hành một máy chơi game cầm tay mới có tên là 3GS. Máy chơi game cầm tay này sẽ có đồ họa 3D và do đó sẽ là máy đầu tiên trên thị trường cầm tay.{n} Ninvento cho biết 3GS sẽ được phát hành {0}.".localize().format(General.getETADescription('21/5/1', '21/9/3')),
								image: icon
							});
						}
					}
				]
			});
	};

	// Thêm nền tảng 2GS
	ExpPack.addPlatform2GS = function () {
		var icon = './mods/ExpansionPack/source/img/2GS.png';
		GDT.addPlatform(
			{
				id: '12111996-0000-0001-0001-DZJENGISKHAN', // Giữ ID
				name: '2GS', // Tên hiển thị
				company: 'Ninvento',
				startAmount: 2.125,
				unitsSold: 3.634,
				licencePrize: 250000,
				published: '23/4/2',
				platformRetireDate: '29/2/1',
				developmentCosts: 150000,
				genreWeightings: [0.7, 0.8, 0.9, 1, 0.6, 1],
				audienceWeightings: [1, 0.8, 0.6],
				techLevel: 5,
				iconUri: icon,
				events: [
					{
						id: '12111996-1111-0001-0001-DZJENGISKHAN',
						date: '21/1/4', // Lưu ý: Ngày này trước ngày phát hành dự kiến, có thể là thông báo sớm
						getNotification: function (company) {
							return new Notification({
								header: "Tin Tức Ngành".localize(),
								text: "Hôm nay là ngày Ninvento công bố sẽ tạo ra một máy chơi game cầm tay khác tiếp nối 3GS, đó là 2GS. Tuy nhiên, 2GS có cơ chế tương tự như 3GS, nhưng nó có đồ họa tốt hơn và do đó gameplay cũng tốt hơn. 2GS được cho là sẽ phát hành {0}.".localize().format(General.getETADescription('21/1/4', '21/4/2')), // Ngày phát hành là '21/4/2', không phải '23/4/2' như định nghĩa ở trên?
								image: icon
							});
						}
					}
				]
			});
	};

	// Thêm nền tảng Gameling Color
	ExpPack.addPlatformGamelingColor = function () {
		// Điều chỉnh ngày ngừng hỗ trợ của Gameling gốc
		var gameling = Platforms.allPlatforms.first(function (p) { return p.id == 'Gameling'; });
		if (gameling) {
			gameling.platformRetireDate = '10/4/2';
		}

		var icon = './mods/ExpansionPack/source/img/gamelingColor.png';
		GDT.addPlatform(
			{
				id: '12111996-0000-0001-0010-DZJENGISKHAN', // Giữ ID
				name: 'Gameling Color', // Tên hiển thị
				company: 'Ninvento',
				startAmount: 0.7,
				unitsSold: 0.854,
				licencePrize: 15000,
				published: '9/11/2',
				platformRetireDate: '15/2/1',
				developmentCosts: 80000,
				genreWeightings: [0.7, 0.9, 1, 0.9, 0.6, 1],
				audienceWeightings: [1, 0.8, 0.6],
				techLevel: 3,
				iconUri: icon,
				events: [
					{
						id: '12111996-1111-0001-0010-DZJENGISKHAN',
						date: '9/8/4',
						getNotification: function (company) {
							return new Notification({
								header: "Tin Tức Ngành".localize(),
								text: "Ninvento vừa công bố nền tảng tiếp theo của họ! Gameling Color, như tên gọi của nó, là một máy chơi game cầm tay khác và có màn hình 160x144 với hơn 30k màu sắc.{n} Chúng tôi không chắc liệu nó có vượt qua thành công của Gameling gốc hay không nhưng chúng tôi không thể chờ đợi!! Ninvento cho biết Gameling Color sẽ được phát hành {0}".localize().format(General.getETADescription('9/8/4', '9/11/2')),
								image: icon
							});
						}
					}
				]
			});
	};
	/*  */

	/* Vonny */
	// Thêm nền tảng Viva Playsystem
	ExpPack.addPlatformViva = function () {
		var icon = './mods/ExpansionPack/source/img/vivaPlaysystem.png';
		GDT.addPlatform(
			{
				id: '12111996-0000-0010-0000-DZJENGISKHAN', // Giữ ID
				name: 'Viva Playsystem', // Tên hiển thị
				company: 'Vonny',
				startAmount: 4.635,
				unitsSold: 5.430,
				licencePrize: 750000,
				published: '22/6/2',
				platformRetireDate: '29/2/1',
				developmentCosts: 300000,
				genreWeightings: [0.7, 0.8, 0.9, 1, 0.6, 1],
				audienceWeightings: [1, 0.8, 0.6],
				techLevel: 6,
				iconUri: icon,
				events: [
					{
						id: '12111996-1111-0010-0001-DZJENGISKHAN',
						date: '22/3/4',
						getNotification: function (company) {
							return new Notification({
								header: "Tin Tức Ngành".localize(),
								text: "Vonny, nhà phát triển nền tảng PPS, đã lan truyền tin đồn rằng họ đang phát triển một nền tảng mới có tên là 'Viva Playsystem' hay viết tắt là 'VPS'.{n} Họ chưa công bố nhiều thông tin về VPS nhưng họ khẳng định rằng máy chơi game cầm tay mới này sẽ được phát hành {0}".localize().format(General.getETADescription('22/3/4', '22/6/2')),
								image: icon
							});
						}
					}
				]
			});
	};

	// Thêm nền tảng Playsystem 2 Slim
	ExpPack.addPlatformPS2S = function () {
		var icon = './mods/ExpansionPack/source/img/playSystem2Slim.png';
		GDT.addPlatform(
			{
				id: '12111996-0000-0010-0001-DZJENGISKHAN', // Giữ ID
				name: 'Playsystem 2 Slim', // Tên hiển thị
				company: 'Vonny',
				startAmount: 1.4,
				unitsSold: 2.7,
				licencePrize: 350000,
				published: '12/2/2',
				platformRetireDate: '19/1/3',
				developmentCosts: 70000,
				genreWeightings: [1, 0.8, 1, 0.9, 0.7, 0.9],
				audienceWeightings: [0.9, 1, 0.8],
				techLevel: 5,
				iconUri: icon,
				events: [
					{
						id: '12111996-1111-0010-0010-DZJENGISKHAN',
						date: '11/11/2',
						getNotification: function (company) {
							return new Notification({
								header: "Tin Tức Ngành".localize(),
								text: "Vonny vừa công bố thông tin về một phiên bản cải tiến của Playsystem 2 thành công của họ. Vonny gọi nền tảng mới này là 'Playsystem 2 Slim'.{n} Có lẽ không phải là cái tên độc đáo nhất, nhưng họ khẳng định rằng PS2 Slim có phần cứng tốt hơn PS2 gốc.\nVonny không rõ ràng về ngày phát hành nhưng chúng tôi dự kiến nó sẽ ra mắt {0}".localize().format(General.getETADescription('11/11/4', '12/2/2')), // Chú ý: Ngày trong mô tả khác với ngày phát hành thực tế
								image: icon
							});
						}
					}
				]
			});
	};
	/*  */

	/* Holo Corp */
	// Thêm nền tảng HoloBox
	ExpPack.addPlatformHoloBox = function () {
		var icon = './mods/ExpansionPack/source/img/HoloBox.png';
		GDT.addPlatform(
			{
				id: '12111996-0000-0011-0000-DZJENGISKHAN', // Giữ ID
				name: 'Holo Box', // Tên hiển thị
				company: 'Holo Corp',
				startAmount: 1.7,
				unitsSold: 5.3,
				licencePrize: 250000,
				published: '20/1/1',
				platformRetireDate: '260/12/4',
				developmentCosts: 150000,
				genreWeightings: [0.9, 0.8, 0.7, 1, 0.7, 0.6],
				audienceWeightings: [0.7, 0.8, 1],
				techLevel: 7,
				iconUri: icon,
				events: [
					{
						id: '12111996-1111-0011-0001-DZJENGISKHAN',
						date: '19/9/3',
						getNotification: function (company) {
							return new Notification({
								header: "Tin Tức Ngành".localize(),
								text: "Hôm nay, Holo Corp, một công ty game mới, vừa thông báo rằng họ sẽ phát hành máy chơi game mới của mình, Holo Box. Nó sẽ hiển thị trò chơi bằng công nghệ holographic và loại bỏ nhu cầu về đĩa game.{n} Các trò chơi sẽ được tải vào một ổ đĩa flash nhỏ sau đó được lắp vào máy chơi game. Điều này sẽ giảm chi phí của trò chơi. Họ dự đoán rằng Holo Box sẽ là một thành công lớn. Nó sẽ được phát hành {0}".localize().format(General.getETADescription('19/9/3', '20/1/1')),
								image: icon
							});
						}
					}
				]
			});
	};
	/*  */

	/* Mirconoft */
	// Thêm nền tảng mBox 360 Slim
	ExpPack.addPlatformMBox360S = function () {
		var icon = './mods/ExpansionPack/source/img/mBox360Slim.png';
		GDT.addPlatform(
			{
				id: '12111996-1111-0100-0000-DZJENGISKHAN', // Giữ ID
				name: 'mBox 360 Slim', // Tên hiển thị
				company: 'Mirconoft',
				startAmount: 2,
				unitsSold: 3.2,
				licencePrize: 500000,
				published: '17/4/4',
				platformRetireDate: '24/9/3',
				developmentCosts: 80000,
				genreWeightings: [1, 0.9, 1, 0.9, 0.7, 0.9],
				audienceWeightings: [0.8, 0.9, 1],
				techLevel: 5,
				iconUri: icon,
				events: [
					{
						id: '12111996-1111-0100-0001-DZJENGISKHAN',
						date: '17/1/1',
						getNotification: function (company) {
							return new Notification({
								header: "Tin Tức Ngành".localize(),
								text: "Mirconoft đã công bố cải tiến của họ trên mBox 360, được gọi là: mBox 360 Slim.\nTheo các nhà phê bình, Mirconoft không thực hiện những cải tiến lớn và do đó họ tò mò muốn xem thị trường sẽ phản ứng như thế nào. {n} mBox 360 Slim sẽ được phát hành {0}".localize().format(General.getETADescription('17/1/1', '17/4/4')),
								image: icon
							});
						}
					}
				]
			});
	};
	/*  */

	/* Events */
	// Thêm sự kiện "Celebration"
	ExpPack.addEventCelebration = function () {
		var eventId = "12111996-0001-0000-0000-DZJENGISKHAN";

		var Celebration = {
			id: eventId,
			isRandom: true, // Sự kiện ngẫu nhiên
			maxTriggers: 1, // Chỉ xảy ra 1 lần
			trigger: function (company) {
				// Điều kiện kích hoạt: level 1, game đang phát triển gần xong
				return company.currentLevel == 1 && company.isGameProgressBetween(0.8, 0.9);
			},
			getNotification: function (company) {
				var game = company.currentGame;

				var msg = "Bạn gần như đã hoàn thành {0}! Có lẽ bạn nên tổ chức một bữa tiệc cho hàng xóm để ăn mừng? Nhưng tất nhiên là sẽ tốn một ít tiền.".localize().format(game.title);
				return new Notification({
					sourceId: eventId,
					header: "Tiệc ăn mừng?".localize("heading"), // Tiêu đề thông báo
					text: msg,
					options: ["Quẩy thôi!", "Không có thời gian"] // Các lựa chọn
				});
			},
			complete: function (decision) { // Xử lý khi người chơi đưa ra quyết định
				var company = GameManager.company;

				if (decision === 0) { // Nếu chọn "Quẩy thôi!"
					var n = new Notification({
						header: "Quẩy thôi!!".localize("heading"),
						text: "Bữa tiệc là một thành công lớn. Mọi người thực sự ấn tượng với công việc của bạn."
					});
					n.adjustCash(-500, "Tiệc"); // Trừ tiền
					n.adjustHype(5 + 10 * company.getRandom()); // Tăng hype

					company.activeNotifications.addRange(n.split());
					return;
				}
				if (decision === 1) { // Nếu chọn "Không có thời gian"
					var n = new Notification({
						header: "Không tiệc tùng".localize("heading"),
						text: "Có vẻ như tối nay sẽ khá yên tĩnh."
					});
					// Không có tác động gì thêm
					return;
				}
			}
		};
		GDT.addEvent(Celebration); // Thêm sự kiện vào game
	};

	// Thêm sự kiện "Fan Curiosity"
	ExpPack.addEventCuriosity = function () {
		var eventId = "12111996-0001-0000-0001-DZJENGISKHAN";

		var fanCuriosity = {
			id: eventId,
			isRandom: true,
			maxTriggers: 1,
			trigger: function (company) {
				// Điều kiện: level 3, game đang phát triển
				return company.currentLevel == 3 && company.isGameProgressBetween(0.2, 0.9);
			},
			getNotification: function (company) {
				var game = company.currentGame;

				var msg = "Sếp ơi, người hâm mộ đã phát hiện ra chúng ta đang phát triển {0}, và họ tò mò về nó. Chúng ta có thể nói cho họ biết để tạo thêm hype cần thiết. Nhưng chúng ta có thể tiết lộ chi tiết, hoặc chỉ úp mở. Hoặc chúng ta có thể phớt lờ họ, hy vọng điều này không làm tổn thương lượng fan hâm mộ quá nhiều.".localize().format(game.title);
				return new Notification({
					sourceId: eventId,
					header: "Cung cấp thông tin?".localize("heading"),
					text: msg,
					options: ["Cho họ biết những gì họ muốn!", "Nói úp mở", "Đừng nói cho họ!"]
				});
			},
			complete: function (decision) {
				var company = GameManager.company;

				if (decision === 0) {
					var n = new Notification({
						header: "Cho họ biết những gì họ muốn!".localize("heading"),
						text: "Người hâm mộ rất phấn khích về những gì bạn đã nói và họ đang lan truyền lời của bạn khắp thế giới!."
					});
					n.adjustHype(5 + 6 * company.getRandom());
					company.activeNotifications.addRange(n.split());
					return;
				}
				if (decision === 1) {
					var n = new Notification({
						header: "Nói úp mở".localize("heading"),
						text: "Người hâm mộ phấn khích về thông tin của bạn, nhưng họ cũng nghĩ rằng bạn có thể nói nhiều hơn một chút."
					});
					n.adjustHype(5 + 3 * company.getRandom());
					return; // Chú ý: thông báo này không được thêm vào activeNotifications, có thể là một thiếu sót
				}
				if (decision === 2) {
					var n = new Notification({
						header: "Đừng nói cho họ!".localize("heading"),
						text: "Người hâm mộ hơi thất vọng về bạn :("
					});
					// Tương tự, thông báo này không được thêm, có thể là ý đồ hoặc thiếu sót
					return;
				}
			}
		};
		GDT.addEvent(fanCuriosity);
	};

	// Thêm sự kiện "The Vacuum Cleaner"
	ExpPack.addEventVac = function () {
		var eventId = "12111996-0001-0000-0010-DZJENGISKHAN";

		var vacuumCleaner = {
			id: eventId,
			isRandom: true,
			maxTriggers: 1,
			trigger: function (company) {
				// Điều kiện: level 1, game đang phát triển, đã phát hành > 4 game
				return company.currentLevel == 1 && company.isGameProgressBetween(0.6, 0.9) && company.gameLog.length > 4;
			},
			getNotification: function (company) {
				var game = company.currentGame;

				var msg = "Khi bạn đang làm việc với trò chơi của mình, có người gõ cửa nhà để xe. Đó là một người đàn ông muốn bán cho bạn một cái máy hút bụi. Bạn có muốn mua máy hút bụi với giá 4K không?".localize().format(game.title); // game.title ở đây không được sử dụng trong msg?
				return new Notification({
					sourceId: eventId,
					header: "Máy Hút Bụi".localize("heading"),
					text: msg,
					options: ["Mua nó!", "Yêu cầu rời đi", "Tố cáo anh ta"]
				});
			},
			complete: function (decision) {
				var company = GameManager.company;

				if (decision === 0) {
					var n = new Notification({
						header: "Máy Hút Bụi".localize("heading"),
						text: "Bạn mua máy hút bụi. Sau khi dọn dẹp nhà để xe, bạn đã giành được giải thưởng nhà để xe sạch nhất trong ngành công nghiệp game! Điều này rất có thể sẽ làm tăng sự cường điệu cho trò chơi của bạn!"
					});
					n.adjustHype(5 + 10 * company.getRandom());
					n.adjustCash(-4000, "Máy hút bụi");

					company.activeNotifications.addRange(n.split());
					return;
				}
				if (decision === 1) {
					var n = new Notification({
						header: "Lại là tôi đây!".localize("heading"),
						text: "'Này! Tôi trở lại rồi!' là những gì anh chàng đó nói. Lần này anh ta thuyết phục bạn mua một cái máy hút bụi. Tạm biệt, 4000 đô la."
					});
					n.adjustCash(-4000, "Máy Hút Bụi"); // Chi phí
					company.notifications.push(n); // Thông báo này được đẩy vào hàng đợi thông báo
					return;
				}
				if (decision === 2) {
					var n = new Notification({
						header: "Máy Hút Bụi".localize("heading"),
						text: "'Sau khi bạn tố cáo tôi, tôi nghĩ rằng việc tạo cho bạn một tiếng xấu với giới truyền thông là một ý tưởng hay! Tuy nhiên, điều này không hiệu quả với tôi... Bạn thậm chí còn nhận được nhiều sự cường điệu hơn cho nó!' là điều cuối cùng anh ta nói trước khi tức giận bỏ đi."
					});
					n.adjustHype(15 + 25 * company.getRandom());
					company.activeNotifications.addRange(n.split());
					return;
				}
			}
		};
		GDT.addEvent(vacuumCleaner);
	};

	// Thêm sự kiện "Billy, the kid"
	ExpPack.addEventBilly = function () {
		var eventId = "12111996-0001-0000-0011-DZJENGISKHAN";

		var billyBrakeIn = {
			id: eventId,
			isRandom: true,
			maxTriggers: 1,
			trigger: function (company) {
				// Điều kiện: level 2, game đang phát triển
				return company.currenLevel == 2 && company.isGameProgressBetween(0.2, 0.9); // currenLevel -> currentLevel?
			},
			getNotification: function (company) {
				var game = company.currentGame;

				var msg = "Có vẻ như những đứa trẻ trong khu phố đã bắt đầu bàn tán về trò chơi sắp ra mắt của bạn {0}. Có tin đồn rằng Billy, con của hàng xóm bạn, đã lẻn vào nhà để xe và xem trộm một số tài liệu thiết kế.{n}Làm thế nào cậu bé làm được điều đó vẫn là một bí ẩn. Bạn có thể thề rằng bạn đã ở trong nhà để xe suốt thời gian đó!\nBạn muốn phản ứng thế nào?\n\nBạn có thể nói chuyện với cha mẹ để cậu bé bị phạt, phớt lờ vụ việc hoặc có thể mời một vài người hàng xóm đến để cho họ xem thêm về trò chơi."
					.localize().format(game.title);

				company.adjustHype(5 + 10 * company.getRandom()); // Tăng hype ngay khi sự kiện xuất hiện

				return new Notification({
					sourceId: eventId,
					header: "Billy, cậu bé".localize("heading"),
					text: msg,
					options: ["Nói chuyện với cha mẹ", "Phớt lờ vụ việc", "Mời đến xem"]
				});
			},
			complete: function (decision) {
				var company = GameManager.company;

				if (decision === 0) { // Nói chuyện với cha mẹ
					var n = new Notification({
						header: "Billy, cậu bé".localize("heading"),
						text: "Bạn nói chuyện với cha mẹ về hành động của Billy và họ hứa điều đó sẽ không xảy ra nữa."
					});
					n.adjustHype(5 + 10 * company.getRandom());

					company.activeNotifications.addRange(n.split());
					return;
				}
				if (decision === 1) { // Phớt lờ
					var n = new Notification({
						header: "Tài liệu biến mất".localize("heading"),
						text: "Bạn đang làm việc với một số tài liệu thiết kế phức tạp vào ngày hôm trước nhưng bây giờ bạn không thể tìm thấy chúng nữa. Những dấu chân nhỏ trên sàn cho thấy ai đó có thể đã lấy chúng.\nThật không may, bạn phải tạo lại các tài liệu (-500 cr.) - Đây có thể là tác phẩm của Billy",
						weeksUntilFired: 1 + 2 * company.getRandom() // Thông báo này sẽ xuất hiện sau
					});
					n.adjustCash(-500, "khôi phục tài liệu");
					company.notifications.push(n);
					return;
				}
				if (decision === 2) { // Mời đến xem
					var n = new Notification({
						header: "Billy, cậu bé".localize("heading"),
						text: "Bạn mời Billy, cha mẹ cậu bé và một vài người hàng xóm quan tâm khác đến và cho họ xem trò chơi đang trong quá trình phát triển. Những đứa trẻ vô cùng phấn khích và trong nhiều tuần sau đó bạn nghe chúng nói về nó."
					});
					n.adjustHype(15 + 25 * company.getRandom());
					company.activeNotifications.addRange(n.split());
					return;
				}
			}
		};

		GDT.addEvent(billyBrakeIn);
	};

	// Thêm sự kiện "Movie Game"
	ExpPack.addEventMovieGame = function () {
		var eventId = "12111996-0001-0000-0100-DZJENGISKHAN";

		var movieGame = {
			id: eventId,
			isRandom: true,
			maxTriggers: 1,
			trigger: function (company) {
				// Điều kiện: level 3, game đang phát triển
				return company.currenLevel == 3 && company.isGameProgressBetween(0.5, 0.9); // currenLevel -> currentLevel?
			},
			getNotification: function (company) {
				var game = company.currentGame;

				var msg = "Sếp ơi, một đạo diễn phim đã tiếp cận chúng ta với lựa chọn làm một bộ phim từ {0}. Nếu chúng ta đồng ý, điều này sẽ tạo ra rất nhiều sự cường điệu cho chúng ta. Nhưng sẽ tốn một ít tiền để thiết lập mọi thứ và hoàn tất các giao dịch cuối cùng.".localize().format(game.title);

				return new Notification({
					sourceId: eventId,
					header: "Làm một bộ phim".localize("heading"),
					text: msg,
					options: ["Ký hợp đồng", "Không làm phim"]
				});
			},
			complete: function (decision) {
				var company = GameManager.company;

				if (decision === 0) { // Ký hợp đồng
					var n = new Notification({
						header: "Sẽ có một bộ phim!".localize("heading"),
						text: "Bộ phim đã nhận được phản hồi tuyệt vời và chúng ta thậm chí còn có thêm một số người hâm mộ!"
					});
					n.adjustHype(10 + 15 * company.getRandom());
					n.adjustFans(250);

					company.activeNotifications.addRange(n.split());
					return;
				}
				if (decision === 1) { // Không làm phim
					var n = new Notification({
						header: "Không có phim".localize("heading"),
						text: "Bạn đã từ chối lời đề nghị và mọi thứ trở lại bình thường."
					});
					// Thông báo này không được thêm vào hàng đợi, có thể là ý đồ
					return;
				}
			}
		};

		GDT.addEvent(movieGame);
	};

	// Thêm sự kiện "Fire in the office"
	ExpPack.addEventFire = function () {
		var eventId = "12111996-0001-0000-0101-DZJENGISKHAN";

		var fire = {
			id: eventId,
			isRandom: true,
			maxTriggers: 1,
			trigger: function (company) {
				// Điều kiện: level 4, game đang phát triển
				return company.currentLevel == 4 && company.isGameProgressBetween(0.5, 0.9);
			},
			getNotification: function (company) {
				var game = company.currentGame;

				var msg = "Ôi chúa ơi! Một đám cháy vừa bùng phát, tất cả chúng ta cần phải rời đi ngay bây giờ!{n} .... Sau khi đám cháy được dập tắt, bạn vào xem và thấy có rất nhiều thiệt hại.".localize().format(game.title); // game.title không được sử dụng?

				return new Notification({
					sourceId: eventId,
					header: "Cháy văn phòng!!".localize("heading"),
					text: msg,
					options: ["Sửa chữa tất cả....."] // Chỉ có 1 lựa chọn?
				});
			},
			complete: function (decision) {
				var company = GameManager.company;

				if (decision === 0) {
					var n = new Notification({
						header: "Đang sửa chữa".localize("heading"),
						text: "Bạn đã có thể cứu dự án hiện tại của mình nhưng việc sửa chữa rất tốn kém. Trò chơi này tốt hơn hết là đáng tiền."
					});
					n.adjustCash(-15000, "Thiệt hại do cháy"); // Chi phí sửa chữa

					company.activeNotifications.addRange(n.split());
					return;
				}
			}
		};

		GDT.addEvent(fire);
	};

	// Thêm sự kiện "First Magazine Interview"
	ExpPack.addEventFirstMagazine = function () {
		var eventId = "12111996-0001-0000-0110-DZJENGISKHAN";

		var WelcomeToIndustry = {
			id: eventId,
			isRandom: false, // Sự kiện theo kịch bản
			date: '4/8/3', // Ngày kích hoạt
			ignoreGameLengthModifier: false,
			getNotification: function (company) {
				var msg = "Tạp chí Gamer Pride muốn bạn tham gia một cuộc phỏng vấn như một phần của chương trình 'Những Ngôi Sao Mới Trong Ngành Công Nghiệp Game' nhằm quảng bá ngành công nghiệp game và các nhà phát triển game sắp tới.{n}Đây là một phần quan trọng trong dự án của họ nhằm quảng bá game và giúp các nhà phát triển được chú ý hơn.\n\n Bạn có chấp nhận lời đề nghị này không? Nếu có, hãy quyết định chủ đề bạn muốn thảo luận.".localize();
				return new Notification({
					sourceId: eventId,
					header: "Phỏng Vấn Tạp Chí".localize("heading"),
					text: msg,
					options: ["Không, cảm ơn.", "Ngành công nghiệp game hiện tại", "Ước mơ của tôi"]
				});
			},

			complete: function (decision) {

				var company = GameManager.company;

				if (decision === 0) { // Từ chối
					var n = new Notification({
						header: "Phỏng Vấn Tạp Chí".localize("heading"),
						text: "Bạn đã từ chối, tạp chí Gamer Pride rất thất vọng."
					});
					company.activeNotifications.addRange(n.split());
					return;
				}
				if (decision === 1) { // Thảo luận về ngành game
					var n = new Notification({
						header: "Phỏng Vấn Tạp Chí".localize("heading"),
						text: "Bạn nói với tạp chí rằng ngày nay ngành công nghiệp game tương đối nhỏ và đó là một cơ hội tuyệt vời cho những người như bạn tìm thấy vị trí của mình và phát triển.{n} Người phỏng vấn hỏi liệu bạn có thể dự đoán tương lai của ngành công nghiệp game không.\n\n Bạn trả lời rằng sự tiến bộ năng động trong ngành công nghiệp điện tử có thể sẽ xúc tác cho việc sản xuất các nền tảng mới và điều đó sẽ mang lại cơ hội tuyệt vời cho ngành công nghiệp game tiến bộ theo nhiều cách."
					});
					n.adjustFans(200); // Tăng fan
					company.notifications.push(n);

					var m = new Notification({
						header: "Tài Trợ".localize("heading"),
						text: "Một số công ty điện tử đánh giá cao việc bạn đã đề cập đến họ trong cuộc phỏng vấn gần đây. Một công ty tên là RBM đã liên hệ với bạn và tặng bạn một số tiền như một món quà cho dự án hiện tại của bạn. Họ hy vọng rằng sự hợp tác giữa họ và các nhà phát triển game sẽ thúc đẩy cả hai ngành công nghiệp."
					});
					if (company.isGameProgressBetween(0.2, 0.9)) { // Nếu đang phát triển game
						m.adjustCash(40000, "Tài trợ từ RBM"); // Nhận tiền
						m.adjustHype(5 + 15 * company.getRandom()); // Tăng hype
						company.notifications.push(m);
					}
					return;
				}
				if (decision === 2) { // Thảo luận về ước mơ
					var n = new Notification({
						header: "Phỏng Vấn Tạp Chí".localize("heading"),
						text: "Ước mơ của bạn là tìm ra một 'giải pháp vàng' sẽ đưa công ty của bạn và có thể là toàn bộ ngành công nghiệp game lên một tầm cao mới. \nBạn nói rằng hiện tại đây là thời điểm tuyệt vời để phát triển vì ngành kinh doanh game tương đối mới. Bạn hy vọng rằng trong 4, 5 năm tới công ty sẽ phát triển và bạn sẽ có thể làm việc với những dự án tham vọng hơn.{n} Người phỏng vấn hỏi liệu bạn có thể dự đoán tương lai của ngành công nghiệp game không.\n\n Bạn trả lời rằng chỉ có Chúa mới biết tương lai sẽ mang lại điều gì."
					});
					n.adjustFans(100);
					if (company.isGameProgressBetween(0.2, 0.9)) {
						n.adjustHype(5 + 15 * company.getRandom());
					}
					company.notifications.push(n);
					return;
				}
			}
		};

		GDT.addEvent(WelcomeToIndustry);
	};

	// Thêm sự kiện "Second Magazine Interview"
	ExpPack.addEventSecMagazine = function () {
		var eventId = "12111996-0001-0000-0111-DZJENGISKHAN";

		var LateThoughts = {
			id: eventId,
			isRandom: false, // Sự kiện theo kịch bản
			maxTriggers: 1,
			trigger: function (company) {
				// Điều kiện: có 1.5 triệu fan
				return company.fans >= 1500000;
			},
			getNotification: function (company) {
				var msg = "Tạp chí Gamer Pride đã liên hệ với bạn để phỏng vấn. Gần đây bạn đã đạt được 1,5 triệu người hâm mộ, họ muốn biết bí mật đằng sau thành công này là gì.".localize();
				return new Notification({
					sourceId: eventId,
					header: "Phỏng Vấn Tạp Chí".localize("heading"),
					text: msg,
					options: ["Cung cấp những trò chơi tốt nhất", "Người hâm mộ", "Chúng tôi là dân chuyên nghiệp"]
				});
			},
			complete: function (decision) {
				var company = GameManager.company;
				if (decision === 0) { // Cung cấp game tốt nhất
					var n = new Notification({
						header: "Phỏng Vấn Tạp Chí".localize("heading"),
						text: "Bạn nói rằng chỉ bằng cách cung cấp những trò chơi tốt nhất có thể, bạn mới có thể xây dựng được một lượng fan hâm mộ lớn như vậy. Đến lúc này bạn đã học được rằng game thủ chỉ tìm kiếm những trò chơi tuyệt vời và nếu một số nhà phát triển game không thể sản xuất ra những trò chơi sáng tạo và tuyệt vời, thì rất khó có khả năng họ sẽ đạt được lượng fan hâm mộ như vậy và rất có thể họ sẽ phá sản sớm hay muộn."
					});
					n.adjustFans(5000);
					if (company.isGameProgressBetween(0.2, 0.9)) {
						n.adjustHype(20 + 40 * company.getRandom());
					}
					company.notifications.push(n);
					return;
				}
				if (decision === 1) { // Người hâm mộ
					var n = new Notification({
						header: "Phỏng Vấn Tạp Chí".localize("heading"),
						text: "Theo ý kiến của bạn, dựa trên nhiều năm kinh nghiệm, công thức thành công của bạn là xây dựng mối quan hệ tốt giữa nhà phát triển game và khách hàng. Điều đó có nghĩa là game thủ cần thấy rằng việc đầu tư tiền của họ vào sản phẩm của bạn là một ý tưởng tốt. \n Họ có thể thấy điều đó khi một công ty cung cấp giá trị tốt cho số tiền mà game thủ đã chi cho trò chơi.{n} Bạn nói rằng khách hàng cần được đối xử đúng mực. Ví dụ, họ không thể bị trừng phạt bằng DRM, bởi vì điều đó không công bằng. \nNhững kẻ vi phạm bản quyền không gặp vấn đề gì trong việc bẻ khóa DRM. Nó bị bẻ khóa ngay ngày hôm sau khi trò chơi được phát hành.\n Bằng cách đó, những kẻ vi phạm bản quyền có thể trải nghiệm trò chơi mà không gặp bất kỳ vấn đề gì, trong khi những khách hàng trung thực phải đối phó với chính sách DRM.{n}Thay vì trừng phạt khách hàng, các công ty nên thưởng cho họ bằng nội dung bổ sung miễn phí, dịch vụ khách hàng tuyệt vời, v.v.\n Điều thứ ba và quan trọng nhất là đối xử với game thủ giống như cách bạn muốn được đối xử, bởi vì cuối cùng, tất cả chúng ta đều là game thủ!"
					});
					company.notifications.push(n);
					var m = new Notification({
						header: "Phỏng Vấn Tạp Chí".localize("heading"),
						text: "Lời nói của bạn đã sưởi ấm lòng người. E-mail của công ty đã bị tràn ngập bởi hàng tấn tin nhắn ủng hộ từ người hâm mộ của bạn! Đó không phải là một cảm giác tuyệt vời sao?"
					});
					m.adjustFans(20000);
					if (company.isGameProgressBetween(0.2, 0.9)) {
						m.adjustHype(50 + 60 * company.getRandom());
					}
					company.notifications.push(m);
					return;
				}
				if (decision === 2) { // Chúng tôi là dân chuyên nghiệp
					var n = new Notification({
						header: "Phỏng Vấn Tạp Chí".localize("heading"),
						text: "Bạn có thể nói gì đây? Bạn và công ty của bạn chỉ đơn giản là những nhà phát triển chuyên nghiệp và game thủ yêu thích sự chuyên nghiệp!"
					});
					n.adjustFans(1000);
					if (company.isGameProgressBetween(0.2, 0.9)) {
						n.adjustHype(10 + 20 * company.getRandom());
					}
					company.notifications.push(n);

				}
			}
		};

		GDT.addEvent(LateThoughts);
	};
	/*  */

	/* Researches */
	// Thêm các mục nghiên cứu mới
	ExpPack.addResearch = function () {
		/* Graphic items */
		GDT.addResearchItem(
			{
				id: "Realistic Particles", // Giữ ID tiếng Anh
				name: "Hạt thực tế".localize(), // Dịch tên hiển thị
				v: 6,
				canResearch: function (company) {
					return LevelCalculator.getMissionLevel('Graphic') > 7
				},
				category: "Graphic",
				categoryDisplayName: "Đồ Họa".localize() // Dịch tên danh mục
			});
		GDT.addResearchItem(
			{
				id: "Advanced Shaders",
				name: "Shader nâng cao".localize(),
				v: 6,
				canResearch: function (company) {
					return LevelCalculator.getMissionLevel('Graphic') > 5
				},
				category: "Graphic",
				categoryDisplayName: "Đồ Họa".localize()
			});
		GDT.addResearchItem(
			{
				id: "Animated Textures",
				name: "Kết Cấu Động".localize(),
				v: 2,
				canResearch: function (company) {
					return LevelCalculator.getMissionLevel('Graphic') > 3
				},
				category: "Graphic",
				categoryDisplayName: "Đồ Họa".localize()
			});
		GDT.addResearchItem(
			{
				id: "Basic Holograms",
				name: "Hình Chiếu 3 Chiều Cơ Bản".localize(),
				v: 4,
				canResearch: function (company) {
					return LevelCalculator.getMissionLevel('Graphic') > 4
				},
				category: "Graphic",
				categoryDisplayName: "Đồ Họa".localize()
			});
		GDT.addResearchItem(
			{
				id: "Advanced Holograms",
				name: "Hình Chiếu 3 Chiều Nâng Cao".localize(),
				v: 8,
				canResearch: function (company) {
					return LevelCalculator.getMissionLevel('Graphic') > 6
				},
				category: "Graphic",
				categoryDisplayName: "Đồ Họa".localize()
			});
		GDT.addResearchItem(
			{
				id: "Interactive Holograms",
				name: "Hình Chiếu 3 Chiều Tương Tác".localize(),
				v: 10,
				canResearch: function (company) {
					return LevelCalculator.getMissionLevel('Graphic') > 8
				},
				category: "Graphic",
				categoryDisplayName: "Đồ Họa".localize()
			});
		/*  */

		/* Sound items */
		GDT.addResearchItem(
			{
				id: "Realistic Sound",
				name: "Âm thanh thực tế".localize(),
				v: 6,
				canResearch: function () {
					return LevelCalculator.getMissionLevel('Sound') > 6
				},
				category: "Sound",
				categoryDisplayName: "Âm Thanh".localize()
			});
		GDT.addResearchItem(
			{
				id: "Copywritten Music", // Nên là "Copyrighted Music"
				name: "Âm nhạc có bản quyền".localize(),
				v: 8,
				canResearch: function () {
					return LevelCalculator.getMissionLevel('Sound') > 7
				},
				category: "Sound",
				categoryDisplayName: "Âm Thanh".localize()
			});
		/*  */

		/* A.I. items */
		GDT.addResearchItem(
			{
				id: "Superior AI",
				name: "A.I. vượt trội".localize(),
				v: 8,
				canResearch: function () {
					return LevelCalculator.getMissionLevel('AI') > 7
				},
				category: "AI",
				categoryDisplayName: "A.I.".localize() // Giữ nguyên A.I.
			});
		GDT.addResearchItem(
			{
				id: "AI Difficulty",
				name: "Độ khó A.I.".localize(),
				v: 4,
				canResearch: function () {
					return LevelCalculator.getMissionLevel('AI') > 4
				},
				category: "AI",
				categoryDisplayName: "A.I.".localize()
			});
		/*  */

		/* Gameplay */
		GDT.addResearchItem(
			{
				id: "Cheat Codes",
				name: "Mã Ăn Gian".localize(),
				v: 4,
				canResearch: function () {
					return LevelCalculator.getMissionLevel('Gameplay') > 3
				},
				category: "Gameplay",
				categoryDisplayName: "Lối Chơi".localize()
			});
		GDT.addResearchItem(
			{
				id: "Premium Content",
				name: "Nội dung cao cấp".localize(),
				v: 8,
				canResearch: function () {
					return LevelCalculator.getMissionLevel('Gameplay') > 6
				},
				category: "Gameplay",
				categoryDisplayName: "Lối Chơi".localize()
			});
		/*  */

		/* Engine items */
		GDT.addResearchItem(
			{
				id: "Quick Saving",
				name: "Lưu Nhanh".localize(),
				v: 2,
				canResearch: function (company) {
					return LevelCalculator.getMissionLevel('Engine') > 3;
				},
				category: "Engine",
				categoryDisplayName: "Engine".localize() // Giữ nguyên Engine
			});
		GDT.addResearchItem(
			{
				id: "Seasons",
				name: "Các Mùa".localize(),
				v: 6,
				canResearch: function (e) { // 'e' nên là 'company' cho nhất quán
					return LevelCalculator.getMissionLevel('Engine') > 6
				},
				category: "Engine",
				categoryDisplayName: "Engine".localize()
			});
		/*  */

		/* Story/Quests */
		GDT.addResearchItem(
			{
				id: "Collectables",
				name: "Vật Phẩm Sưu Tầm".localize(),
				v: 2,
				canResearch: function () {
					return LevelCalculator.getMissionLevel('Story/Quests') > 2
				},
				category: "Story/Quests",
				categoryDisplayName: "Cốt Truyện/Nhiệm Vụ".localize()
			});
		GDT.addResearchItem(
			{
				id: "Simple quests",
				name: "Nhiệm vụ đơn giản".localize(),
				v: 2,
				canResearch: function () {
					return LevelCalculator.getMissionLevel('Story/Quests') > 3
				},
				category: "Story/Quests",
				categoryDisplayName: "Cốt Truyện/Nhiệm Vụ".localize()
			});
		GDT.addResearchItem(
			{
				id: "Advanced quests",
				name: "Nhiệm vụ nâng cao".localize(),
				v: 6,
				canResearch: function () {
					return LevelCalculator.getMissionLevel('Story/Quests') > 6
				},
				category: "Story/Quests",
				categoryDisplayName: "Cốt Truyện/Nhiệm Vụ".localize()
			});
		/*  */

		/* Dialogues items */
		GDT.addResearchItem(
			{
				id: "Language Settings",
				name: "Cài đặt ngôn ngữ".localize(),
				v: 4,
				canResearch: function () {
					return LevelCalculator.getMissionLevel('Dialogs') > 4
				},
				category: "Dialogs",
				categoryDisplayName: "Hội Thoại".localize(),
			});
		/*  */

		/* World Design items */
		GDT.addResearchItem(
			{
				id: "Realistic Water",
				name: "Nước thực tế".localize(),
				v: 4,
				canResearch: function () {
					return LevelCalculator.getMissionLevel('World Design') > 3
				},
				category: "World Design",
				categoryDisplayName: "Thiết Kế Thế Giới".localize()
			});
		GDT.addResearchItem(
			{
				id: "Realistic Plant Life",
				name: "Thực vật thực tế".localize(),
				v: 6,
				canResearch: function () {
					return LevelCalculator.getMissionLevel('World Design') > 6
				},
				category: "World Design",
				categoryDisplayName: "Thiết Kế Thế Giới".localize()
			});
		/*  */

		/* Level Design items */
		GDT.addResearchItem(
			{
				id: "Bosses",
				name: "Trùm (Boss)".localize(),
				v: 2,
				canResearch: function () {
					return LevelCalculator.getMissionLevel('Level Design') > 2
				},
				category: "Level Design",
				categoryDisplayName: "Thiết Kế Màn Chơi".localize()
			});
		GDT.addResearchItem(
			{
				id: "Swift Loading",
				name: "Tải nhanh".localize(),
				v: 4,
				canResearch: function () {
					return LevelCalculator.getMissionLevel('Level Design') > 5
				},
				category: "Level Design",
				categoryDisplayName: "Thiết Kế Màn Chơi".localize()
			});
		/*  */
	};
	/*  */

	/*  */
	// Thêm nghiên cứu trong phòng Lab
	ExpPack.addLabResearch = function () {
		GDT.addLabResearchItem(
			{
				id: "4D Graphics Project", // Giữ ID
				name: "Đồ Họa 4D".localize(), // Dịch tên
				pointsCost: 200,
				canResearch: function (company) {
					// Điều kiện: chưa có cờ 'graphics4D', level của 'Level Design' > 1 (nên là 'Graphic'?)
					return !company.flags.graphics4D && LevelCalculator.getMissionLevel(/*company, "3D Graphics V7"*/'Level Design') > 1;
				},
				iconUri: "./images/projectIcons/superb/graphics-v6.png", // Giữ nguyên đường dẫn icon
				description: "Bò....".localize(), // Mô tả
				targetZone: 2, // Khu vực R&D Lab
				complete: function (company) { // Hàm khi hoàn thành nghiên cứu
					company.flags.graphics4D = true;
					//GDT.fire(GameManager, GDT.eventKeys.gameplay.researchCompleted, ForDGraphics); // Dòng này bị comment
					GDT.addResearchItem({ // Thêm một mục nghiên cứu mới sau khi hoàn thành cái này
						id: "4D Graphics",
						name: "Đồ Họa 4D".localize(),
						v: 14,
						canResearch: function (company) {
							return false // Không thể nghiên cứu trực tiếp
						},
						category: "Graphic",
						categoryDisplayName: "Đồ Họa".localize(),
						group: "graphic-type",
						consolePart: true,
						techLevel: 7,
						showXPGain: true
					});
					company.notifications.push(new Notification({
						header: "Báo cáo phòng Lab".localize("heading"),
						text: "Bò....".localize(), // Thông báo
						image: "./images/projectIcons/superb/graphics-v6.png"
					}))
				}
			});
	};
	/*  */

	/* Custom prices for games */
	// Thêm tính năng tùy chỉnh giá game
	ExpPack.addCustomPrice = function () {
		var company = GameManager.company; // Biến này không được sử dụng ở đây, có thể gây lỗi nếu truy cập sớm
		var gamePrice; // Giá game hiện tại hoặc được đặt
		var newPrice; // Giá mới được chọn từ slider
		var dataStore = GDT.getDataStore("MasExpPack") // Lấy data store của mod

		// Ghi đè hoặc thêm hàm xử lý click cho việc chọn giá
		UI.selectPriceClick = function (a) {
			Sound.click();
			switch (a.id) {
				case "applyPrice":
					applyPrice(); // Áp dụng giá đã chọn
					break;
				default:
					return;
			}
		};

		// Tạo UI cho việc chọn giá
		var div = $("body");
		div.append('<div id="PriceContainer" class="windowBorder tallWindow" style="overflow:auto;display:none;"> <div id="priceSelector" class="windowTitle smallerWindowTitle">Giá Tùy Chỉnh</div>');
		div = $("#PriceContainer");

		div.append('<div id="exppack_price" style="text-align:center;margin-left:50px;width: 450px"></div>'); // Hiển thị giá đang chọn
		div.append('<div id="exppack_current_price" style="text-align:center;margin-left:50px;width: 450px"></div>'); // Hiển thị giá hiện tại của game
		div.append('<div id="exppack_select_price" style="text-align:center;margin-left:50px;width: 450px"></div>'); // Có thể là một label
		div.append('<div class="priceSlider"></div>'); // Thanh trượt chọn giá
		div.append('<div id="applyPrice" class="selectorButton whiteButton" onclick="UI.selectPriceClick(this)" style="margin-left:50px;width: 450px">Đặt Giá</div>');

		// Hàm áp dụng giá mới
		function applyPrice() {
			if (GameManager.company.isCurrentlyDevelopingGame()) // Chỉ áp dụng nếu đang phát triển game
			{
				game = GameManager.company.currentGame;

				// Cập nhật giá mặc định của Sales module dựa trên kích thước game
				if (game.gameSize === "medium") {
					Sales.mediumUnitPrice = newPrice;
				}
				else if (game.gameSize === "large") {
					Sales.largeUnitPrice = newPrice;
				}
				else if (game.gameSize === "aaa") {
					Sales.aaaUnitPrice = newPrice;
				}
				else { // small
					Sales.smallUnitPrice = newPrice;
				}

				gamePrice = newPrice; // Cập nhật biến gamePrice cục bộ
				div.find("#exppack_current_price").html("Giá hiện tại: " + gamePrice); // Cập nhật UI
			}
			dataStore.data.gamePrice = gamePrice; // Lưu giá vào data store của mod
		};

		// Hàm cập nhật UI khi người dùng kéo slider
		function setPrice(e) {
			if (GameManager.company.isCurrentlyDevelopingGame()) {
				var game = GameManager.company.currentGame;
				newPrice = e // Giá trị từ slider

				var div = $("#PriceContainer");

				// Hiển thị "(Mặc định)" nếu giá bằng giá gốc
				if (newPrice == 7 && game.gameSize === "small")
					div.find("#exppack_price").html(newPrice + " Cr. (Mặc định)");
				else if (newPrice == 11 && game.gameSize === "medium")
					div.find("#exppack_price").html(newPrice + " Cr. (Mặc định)");
				else if (newPrice == 14 && game.gameSize === "large")
					div.find("#exppack_price").html(newPrice + " Cr. (Mặc định)");
				else if (newPrice == 18 && game.gameSize === "aaa")
					div.find("#exppack_price").html(newPrice + " Cr. (Mặc định)");
				else
					div.find("#exppack_price").html(newPrice + " Cr.");
			}
		};

		/* salesCalculated algorithm */
		// Hàm này được gọi sau khi doanh số gốc được tính toán, để điều chỉnh dựa trên giá tùy chỉnh
		var salesCalculated = function (company, unused_var) { // company ở đây là đối tượng game, không phải GameManager.company
			var price = dataStore.data.gamePrice; // Lấy giá từ data store
			var currentGame = company.game // game hiện tại được truyền vào

			// Tính tỷ lệ ảnh hưởng của giá đến doanh số
			var priceRatio = function (price, game) {
				var a; // Biến tạm

				if (game.gameSize === "small")
					a = 2 - (price / 10);
				else if (game.gameSize === "medium")
					a = 2 - (price / 20);
				else if (game.gameSize === "large")
					a = 2 - (price / 40);
				else if (game.gameSize === "aaa")
					a = 2 - (price / 60);

				return a;
			};

			var score = currentGame.score.clamp(1, 10); // Lấy điểm game, giới hạn từ 1-10

			// Tính tỷ lệ ảnh hưởng của điểm đến doanh số
			var scoreRatio = function (score) {
				var b;

				if (score >= 9)
					b = 1.3;
				else if (score >= 7)
					b = 1.1;
				else if (score >= 5)
					b = 0.8;
				else if (score >= 3)
					b = 0.5;
				else
					b = 0.1;

				return b;
			};

			// Điều chỉnh tổng doanh thu dựa trên giá và điểm
			currentGame.totalSalesCash *= 1 * priceRatio(price, currentGame) * scoreRatio(score);
		};

		GDT.on(GDT.eventKeys.gameplay.salesCalculated, salesCalculated); // Gắn hàm điều chỉnh vào sự kiện tính toán doanh số
		/*  */

		// Ghi đè hàm _showContextMenu của UI để thêm lựa chọn "Game Price..."
		var original_showContextMenu = UI._showContextMenu;
		var new_showContextMenu = function (b, c, d, h) { // b: type, c: menuItems, d: x, h: y (tên biến gốc là items, x, y, options)
			GameManager.company.isCurrentlyDevelopingGame() && c.push({ // Chỉ thêm nếu đang phát triển game
				label: "Giá Game...".localize("menu item"), // Tên menu item
				action: function () { // Hành động khi click
					Sound.click();
					GameManager.resume(true); // Tiếp tục game (nếu đang pause)

					var div = $("#PriceContainer"); // Lấy dialog chọn giá

					div.scrollTop() // Cuộn lên đầu (có thể không cần thiết)

					div.gdDialog({ // Hiển thị dialog
						popout: !0,
						close: !0
					})
				}
			})

			var game = GameManager.company.currentGame;
			var max_price; // Giá tối đa cho slider

			// Xác định giá tối đa và giá hiện tại dựa trên kích thước game
			if (GameManager.company.isCurrentlyDevelopingGame() && game.gameSize === "medium") {
				max_price = 20;
				gamePrice = Sales.mediumUnitPrice;
			}
			else if (GameManager.company.isCurrentlyDevelopingGame() && game.gameSize === "large") {
				max_price = 40;
				gamePrice = Sales.largeUnitPrice;
			}
			else if (GameManager.company.isCurrentlyDevelopingGame() && game.gameSize === "aaa") {
				max_price = 60;
				gamePrice = Sales.aaaUnitPrice;
			}
			else if (GameManager.company.isCurrentlyDevelopingGame()) { // small
				max_price = 10;
				gamePrice = Sales.smallUnitPrice;
			}

			// Khởi tạo slider giá
			div.find(".priceSlider").slider({
				min: 1,
				max: max_price,
				range: "min",
				value: Math.floor(gamePrice), // Giá trị ban đầu của slider
				animate: !1,
				slide: function (a, b) { // Hàm được gọi khi kéo slider
					var c = b.value;
					setPrice(c); // Cập nhật UI hiển thị giá
				}
			});
			setPrice(gamePrice); // Cập nhật UI lần đầu

			original_showContextMenu(b, c, d, h); // Gọi lại hàm context menu gốc
		};
		UI._showContextMenu = new_showContextMenu; // Gán hàm mới
	};
	/*  */

	/* Black Bull */
	// Thêm tính năng "Black Bull" (có vẻ là một loại nước tăng lực)
	ExpPack.addBlackBull = function () {
		var menuItems = []; // Biến này không được sử dụng trực tiếp ở đây
		var div = $("body"); // Lấy thẻ body (không dùng)
		div = $("#BlackBull"); // Lấy một element tên BlackBull (có thể là một dialog ẩn)

		var original_PopupMenu = UI._showContextMenu; // Lưu lại hàm context menu gốc
		var new_initPopupMenu = function (type, menuItems, x, y) { // Ghi đè hàm context menu
			var company = GameManager.company;
			// Lấy nhân vật đang được chọn hoặc nhân vật chính
			var targetChar = company.currentLevel > 1 ? UI.getCharUnderCursor() : company.staff[0];

			if (targetChar) {
				// Nếu nhân vật không bận (nghiên cứu, đào tạo, nghỉ phép)
				if (targetChar.state != CharacterState.Researching &&
					(targetChar.state != CharacterState.Training && targetChar.state != CharacterState.Vacation)) {
					// Nếu level > 1 và nhân vật cần nghỉ phép
					if (company.currentLevel > 1 && targetChar.flags.needsVacation) {
						menuItems.push({
							label: "Mua một lon Black Bull".localize("menu item"),
							action: function () {
								Sound.click();
								GameManager.resume(true);
								var div = $("#BlackBull"); // Element này dùng để làm gì?
								company.adjustCash(-500, "Black Bull"); // Trừ tiền mua

								targetChar.relaxDelta = 0; // Reset delta nghỉ ngơi
								var vacationInterval;
								var canRecharge; // Biến này không được gán giá trị
								var timeLastUsed = GameManager.gameTime * GameManager.SECONDS_PER_WEEK * 1E3; // Tính thời gian game hiện tại (có vẻ thừa * 1E3)
								// Logic này có vẻ không đúng, vì timeLastUsed sẽ luôn bằng timeLastUsed
								if (timeLastUsed < timeLastUsed + 8)
									vacationInterval = 2;
								if (timeLastUsed >= timeLastUsed + 8)
									vacationInterval = 4;
								targetChar.flags.nextVacation = GameManager.gameTime + vacationInterval * GameManager.SECONDS_PER_WEEK * 1E3; // Đặt lại thời gian nghỉ phép tiếp theo
								targetChar.flags.relaxGained = 0;
								targetChar.flags.needsVacation = false; // Nhân vật không còn cần nghỉ phép nữa
								canRecharge = true; // Biến này được gán nhưng không sử dụng

							}
						})
					}
				}
			}
			original_PopupMenu(type, menuItems, x, y); // Gọi hàm context menu gốc
		};

		UI._showContextMenu = new_initPopupMenu; // Gán hàm mới
	};
	/*  */

})();