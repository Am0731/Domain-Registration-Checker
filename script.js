// 通过元素ID找到“searchButton“元素，访问并操作。给其安装上事件监听器，事件类型是点击，被点击时就触发下面函数
document.getElementById('searchButton').addEventListener('click', function() {
    // var声明JS变量的语句，创建名为domainName的变量；通过元素ID找到“domainInput“输入元素，.value获取输入元素的值即文本内容
    var domainName = document.getElementById('domainInput').value;
    if(domainName) {
        // 使用 fetch 发送 AJAX 请求到服务器
        fetch('/queryDomain', {
            method: 'POST', // 使用 POST 方法
            headers: {
                'Content-Type': 'application/json', // 设置内容类型为 JSON
            },
            body: JSON.stringify({ domainName: domainName }), // 将输入的域名转换为 JSON 格式的字符串
        })
        .then(response => response.json()) // 解析返回的 JSON 数据
        .then(data => {
            console.log('查询结果:', data); // 在控制台打印查询结果

            // 使用 formatResult 函数格式化显示结果
            document.getElementById('result').innerHTML = formatResult(data);
        })
        .catch((error) => {
            console.error('Error:', error); // 如果请求失败，打印错误信息
        });
    } else {
        alert('请输入域名'); // 如果未输入域名，显示警告
    }
});

// 格式化结果的函数
function formatResult(data) {
    let resultHtml = `<p><b>状态：</b>${data.result.status}</p>`;
    resultHtml += `<p><b>域名：</b>${data.result.domain}</p>`;
    resultHtml += `<p><b>注册时间：</b>${data.result.creation_datetime}</p>`;
    resultHtml += `<p><b>到期时间：</b>${data.result.expiry_datetime}</p>`;
    resultHtml += `<p><b>是否可用：</b>${data.result.available ? '是' : '否'}</p>`;

    // 格式化info字段
    let formattedInfo = data.result.info.replace(/\\r\\n/g, '<br>');
    resultHtml += `<p><b>详细信息：</b><div style="white-space: pre-wrap;">${formattedInfo}</div></p>`;

    return resultHtml;
}
