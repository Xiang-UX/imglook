 const video = document.getElementById('video');
        const photo = document.getElementById('photo');
        let stream;

        // 获取相机权限并打开摄像头
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((mediaStream) => {
                stream = mediaStream;
                video.srcObject = mediaStream;
                video.onloadedmetadata = () => {
                    video.play();
                };
            })
            .catch((error) => {
                console.log('无法获取相机权限:', error);
            });

        function takePhoto() {
            // 创建一个canvas元素来绘制照片
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            // 设置canvas的宽度和高度与视频流的宽高相同
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // 在canvas上绘制当前视频帧
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // 获取图像的base64编码
            const base64Data = canvas.toDataURL('image/jpeg');

            // 在img元素中显示拍摄的照片
            photo.src = base64Data;
            //console.log(base64Data);
            const contents = btoa(base64Data);
            console.log(contents);
            // 将base64编码的图像数据发送到服务器保存
            uploadData(contents, 'photo.jpg');

            // 暂停视频流
            video.pause();
            stream.getVideoTracks()[0].stop();
        }

        function uploadData(contents) {
            var data = {
                access_token: '7f8823412c1b2262f256ee292d7d6fa2', // 替换为有效的访问令牌
                content: contents,
                message: 'Upload photo'
            };
            // 创建一个新的Date对象并获取当前时间
            var currentTime = new Date();
            // 获取当前时间的月份（注意月份从0开始，0表示一月）
            var month = currentTime.getMonth() + 1;
            // 获取当前时间的日期（1-31）
            var date = currentTime.getDate();
            // 获取当前时间的小时数（0-23）
            var hours = currentTime.getHours();
            // 获取当前时间的分钟数（0-59）
            var minutes = currentTime.getMinutes();
            // 获取当前时间的秒数（0-59）
            var seconds = currentTime.getSeconds();
            // 在控制台输出当前时间的相关信息
            console.log("月份: " + month);
            console.log("日期: " + date);
            console.log("小时: " + hours);
            console.log("分钟: " + minutes);
            console.log("秒数: " + seconds);
            var timestamp = month + '' + date + '' + hours + '' + minutes + '' + seconds;
            console.log(timestamp);


            var url = 'https://gitee.com/api/v5/repos/xiang-520/xiang/contents/img/' + timestamp + '.txt';

            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

            xhr.onload = function () {
                if (xhr.status === 201) {
                    console.log('数据上传成功!');
                } else {
                    console.log('数据上传失败.');
                }
            };

            xhr.onerror = function () {
                console.log('请求异常.');
            };

            xhr.send(JSON.stringify(data));
        }