let Cookies=require('js-cookie')
let letterAspectRatio= {
    ' ': 0.3329986572265625,
    a: 0.5589996337890625,
    A: 0.6569992065429687,
    b: 0.58599853515625,
    B: 0.6769989013671875,
    c: 0.5469985961914062,
    C: 0.7279998779296875,
    d: 0.58599853515625,
    D: 0.705999755859375,
    e: 0.554998779296875,
    E: 0.63699951171875,
    f: 0.37299957275390627,
    F: 0.5769989013671875,
    g: 0.5909988403320312,
    G: 0.7479995727539063,
    h: 0.555999755859375,
    H: 0.7199996948242188,
    i: 0.255999755859375,
    I: 0.23699951171875,
    j: 0.26699981689453123,
    J: 0.5169998168945312,
    k: 0.5289993286132812,
    K: 0.6899993896484375,
    l: 0.23499908447265624,
    L: 0.5879989624023437,
    m: 0.854998779296875,
    M: 0.8819992065429687,
    n: 0.5589996337890625,
    N: 0.7189987182617188,
    o: 0.58599853515625,
    O: 0.7669998168945312,
    p: 0.58599853515625,
    P: 0.6419998168945312,
    q: 0.58599853515625,
    Q: 0.7669998168945312,
    r: 0.3649993896484375,
    R: 0.6759994506835938,
    s: 0.504998779296875,
    S: 0.6319992065429687,
    t: 0.354998779296875,
    T: 0.6189987182617187,
    u: 0.5599990844726562,
    U: 0.7139999389648437,
    v: 0.48199920654296874,
    V: 0.6389999389648438,
    w: 0.754998779296875,
    W: 0.929998779296875,
    x: 0.5089996337890625,
    X: 0.63699951171875,
    y: 0.4959991455078125,
    Y: 0.66199951171875,
    z: 0.48699951171875,
    Z: 0.6239990234375,
    '0': 0.6,
    '1': 0.40099945068359377,
    '2': 0.6,
    '3': 0.6,
    '4': 0.6,
    '5': 0.6,
    '6': 0.6,
    '7': 0.5469985961914062,
    '8': 0.6,
    '9': 0.6,
    '[': 0.3329986572265625,
    ']': 0.3329986572265625,
    ',': 0.26399993896484375,
    '.': 0.26399993896484375,
    ';': 0.26399993896484375,
    ':': 0.26399993896484375,
    '{': 0.3329986572265625,
    '}': 0.3329986572265625,
    '\\': 0.5,
    '|': 0.19499969482421875,
    '=': 0.604998779296875,
    '+': 0.604998779296875,
    '-': 0.604998779296875,
    _: 0.5,
    '`': 0.3329986572265625,
    ' ~': 0.8329986572265625,
    '!': 0.3329986572265625,
    '@': 0.8579986572265625,
    '#': 0.6,
    $: 0.6,
    '%': 0.9699996948242188,
    '^': 0.517999267578125,
    '&': 0.7259994506835937,
    '*': 0.505999755859375,
    '(': 0.3329986572265625,
    ')': 0.3329986572265625,
    '<': 0.604998779296875,
    '>': 0.604998779296875,
    '/': 0.5,
    '?': 0.53699951171875,
};
const getLetterWidth = (letter, fontSize) => {
    return fontSize * (letterAspectRatio[letter] || 1);
};
const getStrWidth = (str, fontSize) => {
    let width = 0;
    const pattern = new RegExp('[\u4E00-\u9FA5]+');
    str.split('').forEach((letter) => {
        if (pattern.test(letter)) {
            // ????????????
            width += fontSize;
        } else {
            width += getLetterWidth(letter, fontSize);
        }
    });
    return width
};

let userAgent = navigator.userAgent
let _isAndroid = !!userAgent.match(/android/ig)
let _isIos = !!userAgent.match(/iphone|ipad|ipod/ig)
let _isIpad = !!userAgent.match(/ipad/ig)
let _isIDevicePhone = (/iphone|ipod/gi).test(navigator.platform)
let _isIDeviceIpad = !_isIDevicePhone && (/ipad/gi).test(navigator.platform)
let _isIDevice = _isIDevicePhone || _isIDeviceIpad

let utils = {
    /**
     * textOverflow ??????????????????  ???????????????????????????????????????
     * @param str
     * @param maxWidth
     * @param fontSize
     * @returns {*}
     */
    textOverflow:(str, maxWidth, fontSize) => {
        const ellipsis = '...';
        const ellipsisLength = getStrWidth(ellipsis, fontSize)
        let currentWidth = 0;
        let res = str;
        const pattern = new RegExp('[\u4E00-\u9FA5]+');
        str.split('').forEach((letter, i) => {
            if (currentWidth > maxWidth - ellipsisLength) return;
            if (pattern.test(letter)) {
                // Chinese charactors
                currentWidth += fontSize;
            } else {
                // get the width of single letter according to the fontSize
                currentWidth += getLetterWidth(letter, fontSize);
            }
            if (currentWidth > maxWidth - ellipsisLength) {
                res = `${str.substr(0, i)}${ellipsis}`;
            }
        });
        return res;
    },
    /**
     * ua??????
     */
    ua:{
        isAndroid: _isAndroid,
        isIos: _isIos,
        isIpad: _isIpad,
        isIos9: !!userAgent.match(/OS 9/ig),
        isIosX: (_isIos || _isIpad) ? parseInt(((navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/))[1], 10) : false,
        isWeibo: (/WeiBo/i).test(userAgent),
        isYx: !!userAgent.match(/MailMaster_Android/i),
        isNewsapp: !!userAgent.match(/newsapp/i),
        isWeixin: (/MicroMessenger/ig).test(userAgent),
        isYixin: (/yixin/ig).test(userAgent),
        isQQ: (/\sqq/ig).test(userAgent),
        isIDevicePhone: _isIDevicePhone,
        isIDeviceIpad: _isIDeviceIpad,
        isIDevice: _isIDevice,
        isandroid2_x: !_isIDevice && (/android\s?2\./gi).test(userAgent),
        isIEMobile: !_isIDevice && !_isAndroid && (/MSIE/gi).test(userAgent)
    },
    setToken : (token) => {
        // ??????cookie??????????????????1
        Cookies.set(TOKEN_KEY, token, { expires: 1 });
    },

    getToken : () => {
    const token = Cookies.get(TOKEN_KEY);
    if (token) return token;
    return false;
},
    TOKEN_KEY:'token',
    /*??????
 * fn [function] ?????????????????????
 * delay [number] ????????????????????????
 */
     debounce : (fn, delay) => {
        let timer = null; // ????????????
        return function () {
            if (timer) {
                clearTimeout(timer); // ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                timer = setTimeout(fn, delay);
            } else {
                timer = setTimeout(fn, delay); // ???????????????????????????????????????????????????????????????????????????
            }
        };
    },
    /**
     * ????????????
     * @param {*} func ????????????
     * @param {*} wait
     */
    throttle : (context, func, wait) => {
        let lastTime = new Date().getTime();
        let timeout;
        return (...args) => {
            const now = new Date().getTime();
            // ????????????
            // ????????????????????????????????????now - ????????????????????? lastTime ?????? wait??????????????????
            // ????????????wait?????????????????????????????????????????????????????????
            if (now - lastTime - wait > 0) {
                // ???????????????????????????????????????
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                timeout = setTimeout(() => {
                    // ???????????????????????????
                    func.apply(context, args);
                }, wait);
            } else if (!timeout) {
                timeout = setTimeout(() => {
                    // ???????????????????????????
                    func.apply(context, args);
                }, wait);
            }
            lastTime = now;
        };
    },

    // ??????url???????????????
     parseUrlParams : (url) => {
        const urlParams = {};
        const urlArr = url.split('?');
        const [a, urlStr] = urlArr;
        const params = urlStr.split('&');
        const arr = [];
        params.map((item) => {
            arr.push(item.split('='));
        });
        arr.map((item) => {
            urlParams[item[0]] = item[1];
        });
        return urlParams;
    },
    // ??????????????????
    initObj : (object) => {
        const obj = {};
        Object.keys(object).forEach((k) => {
            if (typeof object[k] === 'string') {
                obj[k] = '';
            } else if (typeof object[k] === 'object' && object[k] != null) {
                obj[k] = Array.isArray(object[k]) ? [] : {};
            } else {
                obj[k] = null;
            }
        });
        return obj;
    },
    // ????????????????????????????????????
    referencesEqual : (obj1, obj2) => {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    },
     hasChild : (item) => item.children && item.children.length !== 0,

/**
 * @param {Array} routeMetched ????????????metched
 * @returns {Array}
 */
    getBreadCrumbList : (route, homeRoute) => {
    const homeItem = { ...homeRoute, icon: homeRoute.meta.icon };
    const routeMetched = route.matched;
    if (routeMetched.some((item) => item.name === homeRoute.name)) return [homeItem];
    let res = routeMetched
        .filter((item) => item.meta === undefined || !item.meta.hideInBread)
        .map((item) => {
            const meta = { ...item.meta };
            if (meta.title && typeof meta.title === 'function') {
                // meta.__titleIsFunction__ = true;
                meta.title = meta.title(route);
            }
            const obj = {
                icon: (item.meta && item.meta.icon) || '',
                name: item.name,
                meta,
            };
            return obj;
        });
    res = res.filter((item) => !item.meta.hideInMenu);
    return [{ ...homeItem, to: homeRoute.path }, ...res];
},

    getRouteTitleHandled : (route) => {
        const router = { ...route };
        const meta = { ...route.meta };
        let titles = '';
        if (meta.title) {
            if (typeof meta.title === 'function') {
                // meta.__titleIsFunction__ = true;
                titles = meta.title(router);
            } else titles = meta.title;
        }
        meta.title = titles;
        router.meta = meta;
        return router;
    },

    showTitle : (item) => {
    let { title } = item.meta;
    if (!title) return;
    title = (item.meta && item.meta.title) || item.name;
    return title;
},
    /**
     * @description ???????????????????????????????????????
     */
      setTagNavListInLocalstorage : (list) => {
        localStorage.tagNaveList = JSON.stringify(list);
    },
    /**
     * @returns {Array} ???????????????????????????????????????????????????name, path, meta??????
     */
      getTagNavListFromLocalstorage : () => {
        const list = localStorage.tagNaveList;
        return list ? JSON.parse(list) : [];
    },
    /**
     * @param {Array} routers ??????????????????
     * @description ???????????????????????????name???home?????????
     */
     getHomeRoute : (routers, homeName = 'home') => {
        let i = -1;
        const len = routers.length;
        let homeRoute = {};
        while (++i < len) {
            const item = routers[i];
            if (item.children && item.children.length) {
                const res = getHomeRoute(item.children, homeName);
                if (res.name) return res;
            } else if (item.name === homeName) homeRoute = item;
        }
        return homeRoute;
    },
    /**
     * @param {*} list ????????????????????????
     * @param {*} newRoute ?????????????????????????????????
     * @description ?????????newRoute???????????????????????????
     */
    getNewTagList : (list, newRoute) => {
        const { name, path, meta } = newRoute;
        const newList = [...list];
        if (newList.findIndex((item) => item.name === name) >= 0) return newList;
        newList.push({ name, path, meta });
        return newList;
    },

/**
 * @param {Number} times ?????????????????????????????????
 * @param {Function} callback ????????????
 */
   doCustomTimes : (times, callback) => {
    let i = -1;
    while (++i < times) {
        callback(i);
    }
},
    /**
     * @param {Object} file ????????????????????????????????????
     * @returns {Promise} resolve?????????????????????????????????
     * @description ???Csv????????????????????????????????????????????????
     */
      getArrayFromFile : (file) => {
        const nameSplit = file.name.split('.');
        const format = nameSplit[nameSplit.length - 1];
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsText(file); // ?????????????????????
            let arr = [];
            reader.onload = (evt) => {
                const data = evt.target.result; // ???????????????
                const pasteData = data.trim();
                arr = pasteData
                    .split(/[\n\u0085\u2028\u2029]|\r\n?/g)
                    .map((row) => row.split('\t'))
                    .map((item) => item[0].split(','));
                if (format === 'csv') resolve(arr);
                else reject(new Error('[Format Error]:??????????????????Csv??????'));
            };
        });
    },

    findNodeUpper : (ele, tag) => {
        if (ele.parentNode) {
            if (ele.parentNode.tagName === tag.toUpperCase()) {
                return ele.parentNode;
            }
            return findNodeUpper(ele.parentNode, tag);
        }
    },

 findNodeUpperByClasses : (ele, classes) => {
    const { parentNode } = ele;
    if (parentNode) {
        const { classList } = parentNode;
        if (classList && classes.every((className) => classList.contains(className))) {
            return parentNode;
        }
        return findNodeUpperByClasses(parentNode, classes);
    }
},

   findNodeDownward : (ele, tag) => {
    const tagName = tag.toUpperCase();
    if (ele.childNodes.length) {
        let i = -1;
        const len = ele.childNodes.length;
        while (++i < len) {
            const child = ele.childNodes[i];
            if (child.tagName === tagName) return child;
            return findNodeDownward(child, tag);
        }
    }
},

  localSave : (key, value) => {
    localStorage.setItem(key, value);
},

   localRead : (key) => localStorage.getItem(key) || '',

/**
 * @description ????????????????????????????????????????????????????????????title
 * @param {Object} routeItem ????????????
 * @param {Object} vm Vue??????
 */
    setTitle : (routeItem, vm) => {
    const handledRoute = getRouteTitleHandled(routeItem);
    const pageTitle = showTitle(handledRoute, vm);
    const { TITLE } = vm.$constants;
    const resTitle = pageTitle ? `${TITLE} - ${pageTitle}` : `${TITLE}`;
    window.document.title = resTitle;
},
    // ?????????
    deepClone : (data) => {
        if (typeof data !== 'number' && !data) return;

        const isObject = data instanceof Object;
        const isArray = data instanceof Array;

        let obj;
        if (isArray) {
            obj = [];
        } else if (isObject) {
            obj = {};
        } else {
            // ????????????????????????
            return data;
        }
        if (isArray) {
            for (let i = 0, len = data.length; i < len; i++) {
                obj.push(deepClone(data[i]));
            }
        } else if (isObject) {
            const keys = Object.keys(data);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                obj[key] = deepClone(data[key]);
            }
        }
        return obj;
    },
    /**
     * ????????????????????????
     * @param ary
     * @param ary2
     * @returns {*[]}
     */
   aryJoinAry : (ary, ary2) => {
    const itemAry = [];
    let minLength;
    // ????????????????????????????????????????????????????????????
    if (ary.length > ary2.length) {
        minLength = ary2.length;
    } else {
        minLength = ary.length;
    }
    // ?????????????????????????????????????????????
    const longAry = ary.length > ary2.length ? ary : ary2;
    // ?????????????????????????????????????????????
    for (let i = 0; i < minLength; i++) {
        // ??????????????????????????????
        itemAry.push(ary[i]);
        itemAry.push(ary2[i]);
    }
    // itemAry?????????????????????????????????????????????
    return itemAry.concat(longAry.slice(minLength));
}
}
module.exports = utils;
