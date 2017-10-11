var imgSrc = []; //图片路径
var imgFile = []; //文件流
var imgName = []; //图片名字
//选择图片
function imgUpload(obj) {
	var oInput = '#' + obj.inputId;
	var imgBox = '#' + obj.imgBox;
	var btn = '#' + obj.buttonId;
	$(oInput).on("change", function() {
		var fileImg = $(oInput)[0];
		var fileList = fileImg.files;
		for(var i = 0; i < fileList.length; i++) {
			var imgSrcI = getObjectURL(fileList[i]);
			imgName.push(fileList[i].name);
			imgSrc.push(imgSrcI);
			imgFile.push(fileList[i]);
		}
		addNewContent(imgBox);
	})
	$(btn).on('click', function() {
		var data = new Object;
		data[obj.data] = imgFile;
		submitPicture(obj.upUrl, data);
	})
}
//图片展示
function addNewContent(obj) {
	$(imgBox).html("");
	for(var a = 0; a < imgSrc.length; a++) {
		var oldBox = $(obj).html();
		$(obj).html(oldBox + '<div class="imgContainer"><img title=' + imgName[a] + ' alt=' + imgName[a] + ' src=' + imgSrc[a] + ' onclick="imgDisplay(this)"><p onclick="removeImg(this,' + a + ')" class="imgDelete">删除</p></div>');
	}
}
//删除
function removeImg(obj, index) {
	imgSrc.splice(index, 1);
	imgFile.splice(index, 1);
	imgName.splice(index, 1);
	var boxId = "#" + $(obj).parent('.imgContainer').parent().attr("id");
	addNewContent(boxId);
}
//上传(将文件流数组传到后台)
function submitPicture(url,data) {
	console.log(data);
	alert('请打开控制台查看传递参数！');
	if(url&&data){
		$.ajax({
			type: "post",
			url: url,
			async: true,
			data: data,
			traditional: true,
			success: function(dat) {
	//			console.log(dat);
			}
		});
	}
}
//图片灯箱
function imgDisplay(obj) {
	var src = $(obj).attr("src");
	var imgHtml = '<div style="width: 100%;height: 100vh;overflow: auto;background: rgba(0,0,0,0.5);text-align: center;position: fixed;top: 0;left: 0;z-index: 1000;"><img src=' + src + ' style="margin-top: 100px;width: 70%;margin-bottom: 100px;"/><p style="font-size: 50px;position: fixed;top: 30px;right: 30px;color: white;cursor: pointer;" onclick="closePicture(this)">×</p></div>'
	$('body').append(imgHtml);
}
//关闭
function closePicture(obj) {
	$(obj).parent("div").remove();
}

//图片预览路径
function getObjectURL(file) {
	var url = null;
	if(window.createObjectURL != undefined) { // basic
		url = window.createObjectURL(file);
	} else if(window.URL != undefined) { // mozilla(firefox)
		url = window.URL.createObjectURL(file);
	} else if(window.webkitURL != undefined) { // webkit or chrome
		url = window.webkitURL.createObjectURL(file);
	}
	return url;
}

// 
//
// // Initialization
// const compress = new Compress()
//
// // Attach listener
// const upload = document.getElementById('file')
// upload.addEventListener('change', function (evt) {
//   const files = [...evt.target.files]
//   compress.compress(files, {
//     size: 4, // the max size in MB, defaults to 2MB
//     quality: .75, // the quality of the image, max is 1,
//     maxWidth: 1920, // the max width of the output image, defaults to 1920px
//     maxHeight: 1920, // the max height of the output image, defaults to 1920px
//     resize: true, // defaults to true, set false if you do not want to resize the image width and height
//   }).then((data) => {
//     // returns an array of compressed images
//     }).then((results) => {
//       // Example mimes:
//       // image/png, image/jpeg, image/jpg, image/gif, image/bmp, image/tiff, image/x-icon,  image/svg+xml, image/webp, image/xxx, image/png, image/jpeg, image/webp
//       // If mime is not provided, it will default to image/jpeg
//       const img1 = results[0]
//       const base64str = img1.data
//       const imgExt = img1.ext
//       const file = Compress.convertBase64ToFile(base64str, imgExt)
//       // -> Blob {size: 457012, type: "image/png"}
//     })
// }, false)
