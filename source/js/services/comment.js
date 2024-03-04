utils.jq(() => {
    // 加载 Twikoo 的 JavaScript 脚本
    const twikooScript = document.createElement('script');
    twikooScript.src = 'https://npm.onmicrosoft.cn/twikoo@latest';
    twikooScript.async = true;
    document.head.appendChild(twikooScript);

    twikooScript.onload = function() {
        // 当 Twikoo 脚本加载完成后执行加载评论的函数
        $(function () {
            const els = document.getElementsByClassName('ds-comment');
            for (var i = 0; i < els.length; i++) {
                const el = els[i];
                const api = el.getAttribute('api');
                if (api == null) {
                    continue;
                }
                const default_avatar = def.avatar;
                twikoo.getRecentComments({
                    envId: 'https://comment.weekdaycare.cn',
                    pageSize: 15,
                    includeReply: false
                }).then(function (res) {
                    console.log(res);
                    for (var j = 0; j < res.length; j++) {
                        if (j === 0) {
                            console.log(res[0]);
                        }
                        var cell = '<div class="timenode" index="' + i + '">';
                        cell += '<div class="header">';
                        cell += '<div class="user-info">';
                        cell += '<img src="' + (res[j].avatar || default_avatar) + '" onerror="javascript:this.src=\'' + default_avatar + '\';">';
                        cell += '<span>' + res[j].nick + '</span>';
                        cell += '</div>';
                        cell += '<span>' + res[j].relativeTime + '</span>';
                        cell += '</div>';
                        cell += '<a class="body" href="' + res[j].url + '" target="_blank" rel="external nofollow noopener noreferrer">';
                        cell += res[j].commentText;
                        cell += '</div>';
                        cell += '</div>';
                        $(el).append(cell);
                    }
                }).catch(function (err) {
                    // 发生错误
                    console.error(err);
                });
            }
        });
    };
});