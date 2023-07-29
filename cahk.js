   const dropdown = document.getElementById("nameDropdown");
        const img = document.getElementById("img");

        dropdown.addEventListener("change", function () {
            const selectedOption = dropdown.options[dropdown.selectedIndex];
            const selectedValue = selectedOption.value;

            const xhr = new XMLHttpRequest();
            const url = 'https://gitee.com/api/v5/repos/xiang-520/xiang/contents/img/' + selectedValue + '?access_token=7f8823412c1b2262f256ee292d7d6fa2';

            xhr.open('GET', url, true);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    var content = response.content;
                    var decodedContent = atob(content); // 解码 base64 编码的 content
                    img.src = decodedContent;
                    console.log(decodedContent);
                    // 在这里处理获取到的文本内容
                }
            };

            xhr.send();
        });

        fetch("https://gitee.com/api/v5/repos/xiang-520/xiang/contents/img?access_token=7f8823412c1b2262f256ee292d7d6fa2")
            .then(response => response.json())
            .then(data => {
                const names = data.map(item => item.name);

                names.forEach(name => {
                    const option = document.createElement("option");
                    option.value = name;
                    option.text = name;
                    dropdown.appendChild(option);
                });
            })
            .catch(error => {
                console.error("发生错误:", error);
            });