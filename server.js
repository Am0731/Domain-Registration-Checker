const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors'); // 导入 cors 中间件
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('.'));
app.use(cors()); // 使用 cors 中间件


app.post('/queryDomain', async (req, res) => {
    const { domainName } = req.body;
    console.log('收到域名查询请求:', domainName);

    // 拆分域名
    const parts = domainName.split('.');
    const name = parts[0];
    const suffix = parts.slice(1).join('.');

    // 构建查询接口的 URL
    const queryUrl = `https://whois.freeaiapi.xyz/?name=${name}&suffix=${suffix}`;

    try {
        const response = await fetch(queryUrl);
        const result = await response.json();
        res.send({ message: "查询成功", result: result });
    } catch (error) {
        console.error('查询错误:', error);
        res.status(500).send({ message: "服务器错误" });
    }
});

app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});
