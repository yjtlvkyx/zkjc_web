require.config({
    paths: {
        "mui": "./libs/mui.min",
    }
})

require(["mui"], (mui) => {
    let muis = document.querySelector(".mui-table-view-chevron"),
        pages = 0;
    mui.init({
        pullRefresh: {
            container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                style: 'circle', //必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                color: '#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
                height: 50, //可选,默认50px.下拉刷新控件的高度,
                range: '100px', //可选 默认100px,控件可下拉拖拽的范围
                offset: '0px', //可选 默认0px,下拉刷新控件的起始位置
                // auto: true, //可选,默认false.首次加载自动上拉刷新一次
                callback: pullfresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            },
            up: {
                // auto: true,
                contentrefresh: '正在加载...',
                callback: pullupRefresh
            }
        }
    });

    function pullupRefresh() {
        console.log(22)
        ajaxAdds(false)
    }

    function pullfresh() {
        console.log(44)
        ajaxAdds(true)
            // setTimeout(() => {
            // }, 2000)

    }

    //请求数据的方法
    function ajaxAdds(flags) {
        console.log(flags)
        pages = flags ? pages++ : 1;
        mui.ajax({
            url: "/seldatas",
            type: "post",
            data: {
                pages: pages,
                countData: 8
            },
            success: function(datas) {
                console.log(datas)
                let data = addDatas(datas.data);

                if (!flags) {
                    console.log(55)
                    muis.innerHTML += data;
                    mui('#refreshContainer').pullRefresh().endPullupToRefresh(pages == 3);
                } else {
                    console.log(66)
                    muis.innerHTML = data;
                    mui('#refreshContainer').pullRefresh().endPulldownToRefresh()
                }
            },
        })
    }

    //处理数据的方法
    function addDatas(data) {
        return data.map(element => {
            return `<li class="mui-table-view-cell mui-media">
		  	<a href="javascript:;">
		  		<img class="mui-media-object mui-pull-left" src="./images/${element.imgsrc}">
		  		<div class="mui-media-body">
		  			${element.discribe}
		  			<p class='mui-ellipsis'>能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
		  			<span class="mui-prices">${element.prices}</span>
		  			<span class="mui-collect">${element.collectCount}</span>
		  		</div>
		  	</a>
		  </li>`
        }).join("");
    }
})