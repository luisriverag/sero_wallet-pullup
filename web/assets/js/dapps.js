var DApps = {

    init: function () {
        var that = this;
        setTimeout(function () {
            that.genPageData();
        }, 10)

    },

    loadProperties: function (lang) {
        jQuery.i18n.properties({
            name: 'lang', // 资源文件名称
            path: 'assets/i18n/', // 资源文件所在目录路径
            mode: 'map', // 模式：变量或 Map
            language: lang, // 对应的语言
            cache: false,
            encoding: 'UTF-8',
            callback: function () {
                $('.navbar-nav li:eq(0) a').text($.i18n.prop('navbar_home'));
                $('.navbar-nav li:eq(1) a').text($.i18n.prop('navbar_send'));
                $('.navbar-nav li:eq(2) a').text($.i18n.prop('navbar_stake'));
                $('.navbar-nav li:eq(3) a').text($.i18n.prop('navbar_dapps'));

                $('#myModal .modal-title').text($.i18n.prop('dapps_modal_title'));
                $('#myModal .modal-body p').text($.i18n.prop('dapps_modal_body'));
                $('#myModal .modal-footer button:eq(0)').text($.i18n.prop('dapps_button_cancel'));
                $('#myModal .modal-footer button:eq(1)').text($.i18n.prop('dapps_button_enter'));

                $('.add-dapp h3').text($.i18n.prop('navbar_dapps'));
                $('.add-dapp i').text($.i18n.prop('dapps_modal_add'));

                $('#addDappModal .modal-footer button:eq(0)').text($.i18n.prop('dapp_token_modal_button_cancel'));
                $('#addDappModal .modal-footer button:eq(1)').text($.i18n.prop('dapps_modal_add'));
                $('#addDappModal .modal-title').text($.i18n.prop('dapps_modal_add'));
            }
        });
        $('.toast').toast({animation: true, autohide: true, delay: 2000})
        this.genPageData();

    },

    dapps_en_US: [
        {
            img: "./assets/img/token.png",
            title: "SRC20 Token Tracker",
            desc: "SRC20 is a standard interface for anonymous tokens. This standard provides basic functionality to transfer tokens.",
            author: "sero.cash",
            url: "./views/contract/token.html",
            showTips: false,
            state: 1,
        },
        {
            img: "./assets/img/asnow.jpeg",
            title: "ASNOW",
            desc: "",
            author: "asnow.com",
            url: "http://134.175.161.78:8088/v2",
            showTips: true,
            state: 1,
        },{
            "img": "http://111.231.62.4:8089/vote/v1/vote.jpg",
            "title": "Vote",
            "desc": "Support or Oppose, Who can win?",
            "author": "nobody",
            "url": "http://111.231.62.4:8089/vote/v1",
            showTips: true,
            "state": 1
        },
        {
            img: "./assets/img/bluna.jpeg",
            title: "Bluna",
            desc: "Bluna is a distributed ultra-clear streaming media project initiated by BlunaLabs, which mainly serves the transmission protocols of 4k and 8k in the distributed field in the future. At present, Bluna has reached an agreement with a number of media companies, the number of studios reached 2,000.",
            author: "bluna",
            url: "",
            showTips: true,
            state: 0,
        },
        {
            img: "./assets/img/sanguo.png",
            title: "超零三国-无限穿越",
            desc: "",
            author: "盘古",
            url: "",
            showTips: true,
            state: 0,
        },
    ],
    dapps_zh_CN: [
        {
            img: "./assets/img/token.png",
            title: "SRC20 Token Tracker",
            desc: "SRC20是匿名Token的标准接口, 该标准提供了转移Token的基本功能。",
            author: "sero.cash",
            url: "./views/contract/token.html",
            showTips: false,
            state: 1,
        },
        {
            img: "./assets/img/asnow.jpeg",
            title: "ASNOW",
            desc: "",
            author: "asnow.com",
            url: "http://134.175.161.78:8088/v2",
            showTips: true,
            state: 1,
        },{
            "img": "http://111.231.62.4:8089/vote/v1/vote.jpg",
            "title": "Vote",
            "desc": "Support or Oppose, Who can win?",
            "author": "nobody",
            "url": "http://111.231.62.4:8089/vote/v1",
            showTips: true,
            "state": 1
        },
        {
            img: "./assets/img/bluna.jpeg",
            title: "Bluna",
            desc: "Bluna是由BlunaLabs发起的分布式超清流媒体项目，主要服务于今后4k,8k在分布式领域的传输协议。目前Bluna已经于多家媒体公司达成协议，工作室人数达到至2000人。",
            author: "bluna",
            url: "",
            showTips: true,
            state: 0,
        },
        {
            img: "./assets/img/sanguo.png",
            title: "超零三国-无限穿越",
            desc: "",
            author: "盘古",
            url: "",
            showTips: true,
            state: 0,
        }
    ],

    showAddModal() {
        $('#addDappModal').modal('show');
    },

    addDapp() {
        var that = this;
        var url = $('#url').val();

        url = url.trim();
        var biz = {
            operation: "add",
            url: url
        };

        Common.postAsync('dapp/set', biz, {}, function (res) {
            if (res.base.code === "SUCCESS") {
                that.genPageData();
                $('.toast-body').removeClass('alert-danger').addClass('alert-success').text($.i18n.prop('dapps_modal_add_success'));
                $('.toast').toast('show');
                setTimeout(function () {
                    $('#addDappModal').modal('hide');
                    $('#url').val('');
                },1000);
            } else {
                $('.toast-body').removeClass('alert-success').addClass('alert-danger').text($.i18n.prop('dapps_modal_add_fail'));
                $('.toast').toast('show');
            }
            $('#sub1').attr('disabled', false);
        });

    },

    removeDapp(dappId) {
        var that = this;
        var biz = {
            operation: "remove",
            id: dappId,
        }
        Common.postAsync('dapp/set', biz, {}, function (res) {
            if (res.base.code === "SUCCESS") {
                that.genPageData();
            } else {

            }
        })
    },

    genPageData() {
        var that = this;
        var lang = $.cookie('language');

        if (!lang) {
            lang = "en_US";
            $.cookie('language', lang);
        }
        var data = [];
        if (lang === "zh_CN") {
            data = that.dapps_zh_CN;
        } else if (lang === "en_US") {
            data = that.dapps_en_US
        }

        $(".dapp-data").empty();
        for (var i = 0; i < data.length; i++) {
            var dapp = data[i];
            if (dapp.state === 1) {
                $('.dapp-data').append(`
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="card shadow">
                            <img src="${dapp.img}" with="390" class="card-img-top">
                            <div class="card-body" style="height:130px;">
                                <h6 class="card-title text-dark">${dapp.title}</h6>
                                <p class="card-text">${dapp.desc}</p>
                            </div>
                            <div class="card-footer text-right">
                                <a href="${dapp.showTips ? "#" : dapp.url}" class="btn btn-sm btn-primary dapp-btn text-uppercase" dapp-name="${dapp.title}" dapp-url="${dapp.url}">${$.i18n.prop('dapps_button_enter')}</a>
                            </div>
                        </div>
                    </div>
                `);
            } else if (dapp.state === 0) {
                $('.dapp-data').append(`
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="card shadow">
                            <img src="${dapp.img}" with="390" class="card-img-top">
                            <div class="card-body" style="height:130px;">
                                <h6 class="card-title text-dark">${dapp.title}</h6>
                                <p class="card-text">${dapp.desc}</p>
                            </div>
                            <div class="card-footer text-right">
                                <button class="btn btn-sm btn-secondary text-uppercase">${$.i18n.prop('dapp_token_stay_tuned')}</button>
                            </div>
                        </div>
                    </div>
                `);
            }
        }

        var biz = {
            operation: "list",
        }
        Common.post('dapp/set', biz, {}, function (res) {
            if (res.base.code === "SUCCESS") {
                var dapps = res.biz;
                for (var i = 0; i < dapps.length; i++) {
                    var dapp = dapps[i];
                    $('.dapp-data').append(`
                    <div class="col-lg-3 col-md-4 col-sm-6">
                        <div class="card shadow" >
                            <img src="${dapp.img}" with="390" class="card-img-top">
                            <div class="card-body" style="height:130px;">
                                <h6 class="card-title text-dark">${dapp.title}</h6>
                                <p class="card-text">${dapp.desc}</p>
                            </div>
                            <div class="card-footer text-right">
                                <button class="btn btn-danger btn-sm" onclick="DApps.removeDapp('`+dapp.id+`')">${$.i18n.prop('dapps_button_remove')}</button>
                                <a href="#" class="btn btn-sm btn-primary dapp-btn text-uppercase" dapp-name="${dapp.title}" dapp-url="${dapp.url}">${$.i18n.prop('dapps_button_enter')}</a>
                            </div>
                        </div>
                    </div>
                `);
                }
            }
        })

        $('.dapp-btn').bind('click', function () {
            var dappName = $(this).attr('dapp-name');
            var dappUrl = $(this).attr('dapp-url');
            var bodyp = $('.modal-body p').text();
            $('#myModal p').text(bodyp.replace(/GGGGG/g, dappName));

            $('.dapp-name').text(dappName);
            $('#myModal').modal('show');
            $('.modal-footer button:eq(1)').unbind('click').bind('click', function () {
                window.location.href = dappUrl;
            });
        });

    }
}