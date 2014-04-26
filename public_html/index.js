/**
 * Created by namikawa_t on 2014/04/26.
 */

var GLB = {
    cvs: new fabric.Canvas('cvs'),
    bg: {
        imgPath: "./img/lovelivebg2.png"
    },
    music: {
        imgPath: "./img/music.png",
        xIn480: 240,
        yIn320: 50
    },
    movieRanking: [
        {
            url:"http://sp.nicovideo.jp/watch/sm23261200?cp_in=wt_tp_rk",
            imgPath:"./img/smile/23261200.png",
            idx: 0
        },
        {
            url: "http://sp.nicovideo.jp/watch/sm23270118?cp_in=wt_tp_rk",
            imgPath:"./img/smile/23270118.png",
            idx: 1
        },
        {
            url: "http://sp.nicovideo.jp/watch/sm23154338?cp_in=wt_tp_rk",
            imgPath: "./img/smile/23154338.png",
            idx: 2
        },
        {
            url: "http://sp.nicovideo.jp/watch/sm23254661?cp_in=wt_tp_rk",
            imgPath: "./img/smile/23254661.png",
            idx: 3
        },
        {
            url: "http://sp.nicovideo.jp/watch/sm23266767?cp_in=wt_tp_rk",
            imgPath: "./img/smile/23266767.png",
            idx: 4
        },
        {
            url: "http://sp.nicovideo.jp/watch/sm23259485?cp_in=wt_tp_rk",
            imgPath: "./img/smile/23259485.png",
            idx: 5
        },
        {
            url: "http://sp.nicovideo.jp/watch/sm23249476?cp_in=wt_tp_rk",
            imgPath: "./img/smile/23249476.png",
            idx: 6
        },
        {
            url: "http://sp.nicovideo.jp/watch/sm23268290?cp_in=wt_tp_rk",
            imgPath: "./img/smile/23268290.png",
            idx: 7
        },
        {
            url: "http://sp.nicovideo.jp/watch/1396515246?cp_in=wt_tp_rk",
            imgPath: "./img/smile/23245819.png",
            idx: 8
        }
    ],

    targetPositionsIn480x320: [
        [38, 54],
        [54, 123],
        [97, 184],
        [163, 221],
        [240, 234],
        [317, 221],
        [383, 184],
        [426, 123],
        [442, 54]
    ],
    sourceTargetWidth: 100,
    sourceTargetHeight: 100,
    targetWidthIn480x320: 64,
    sourceBgWidth: 640,
    sourceBgHeight: 360,
    imgLoadedCnt: 0,
    movieRadius: 0,

    ring: {
        imgPath: "./img/ring.png"
    },
    rings: [

    ],
    speed: 1000,
    concurrency: 1
};

GLB.loadAllImages = function() {
    var i, j, x, y, onLoaded, toBeLoadedCnt = 0;

    console.log("GLB.loadAllImages");

    // 座標の正規化
    for (i = 0; i < GLB.targetPositionsIn480x320.length; i++) {
        x = Math.floor(screenWidth * GLB.targetPositionsIn480x320[i][0] / 480);
        y = Math.floor(screenWidth * GLB.targetPositionsIn480x320[i][1] / 480);
        for (j = 0; j < GLB.movieRanking.length; j++) {
            if (GLB.movieRanking[j].idx == i) {
                GLB.movieRanking[j].x = x;
                GLB.movieRanking[j].y = y;
            }
        }
    }
    x = Math.floor(screenWidth * GLB.music.xIn480 / 480);
    y = Math.floor(screenWidth * GLB.music.yIn320 / 480);
    GLB.music.x = x;
    GLB.music.y = y;

    onLoaded = function() {
        GLB.imgLoadedCnt++;
        if (GLB.imgLoadedCnt < toBeLoadedCnt) {
            return;
        }

        // 画像読み込み完了
        GLB.onAllImageLoaded();
    };

    for (i = 0; i < GLB.movieRanking.length; i++) {
        GLB.movieRanking[i].element = new Image();
        GLB.movieRanking[i].element.src = GLB.movieRanking[i].imgPath;
        GLB.movieRanking[i].element.onload = onLoaded;
    }
    toBeLoadedCnt += GLB.movieRanking.length;

    GLB.bg.element = new Image();
    GLB.bg.element.src = GLB.bg.imgPath;
    GLB.bg.element.onload = onLoaded;
    toBeLoadedCnt++;

    GLB.music.element = new Image();
    GLB.music.element.src = GLB.music.imgPath;
    GLB.music.element.onload = onLoaded;
    toBeLoadedCnt++;

    GLB.ring.element = new Image();
    GLB.ring.element.src = GLB.ring.imgPath;
    GLB.ring.element.onload = onLoaded;
    toBeLoadedCnt++;
};

GLB.onAllImageLoaded = function() {
    console.log('onAllImageLoaded');

    var sideLen = screenWidth / 480 * GLB.targetWidthIn480x320;
    GLB.movieRadius = Math.sqrt(sideLen * sideLen * 2) / 2;
    console.log("hoge " + GLB.movieRadius);

    GLB.redraw();
};

GLB.redraw = function() {
    var i, k, scale;

    scale = screenWidth / GLB.sourceBgWidth;
    tmp = new fabric.Image(GLB.bg.element, {
        left: 0,
        top: 0,
        scaleX: scale,
        scaleY: scale,
        selectable: false
    });
    GLB.bg.favImg = tmp;
    GLB.cvs.add(GLB.bg.favImg);

    scale = screenWidth / 480 * GLB.targetWidthIn480x320 / GLB.sourceTargetWidth;
    tmp = new fabric.Image(GLB.music.element, {
        left: GLB.music.x,
        top: GLB.music.y,
        scaleX: scale,
        scaleY: scale,
        selectable: false,
        centeredRotation: true,
        centeredScaling: true,
        originX: "center",
        originY: "center"
    });
    GLB.bg.favImg = tmp;
    GLB.cvs.add(GLB.bg.favImg);

    scale = screenWidth / 480 * GLB.targetWidthIn480x320 / GLB.sourceTargetWidth;
    for (i = 0; i < GLB.movieRanking.length; i++) {
        tmp = new fabric.Image(GLB.movieRanking[i].element, {
            left: GLB.movieRanking[i].x,
            top: GLB.movieRanking[i].y,
            scaleX: scale,
            scaleY: scale,
            selectable: false,
            centeredRotation: true,
            centeredScaling: true,
            originX: "center",
            originY: "center"
        });
        GLB.movieRanking[i].fabImg = tmp;
        GLB.movieRanking[i].sideLen = GLB.movieRanking[i].element.width;
        GLB.cvs.add(GLB.movieRanking[i].fabImg);
    }

    setInterval('GLB.screenUpdate()', 80);

    GLB.start();
};

GLB.start = function() {

    // 一発だけ出す
    GLB.throwOne();
};

GLB.throwOne = function() {
    var targetIdx, target, tmp, scale;

    if (GLB.concurrency <= GLB.rings.length) {
        return;
    }

        // ターゲット決定
    targetIdx = Math.floor(Math.random() * GLB.movieRanking.length);
    target = GLB.movieRanking[targetIdx];

    scale = screenWidth / 480 * GLB.targetWidthIn480x320 / GLB.sourceTargetWidth;
    tmp = new fabric.Image(GLB.ring.element, {
        left: GLB.music.x,
        top: GLB.music.y,
        scaleX: scale,
        scaleY: scale,
        selectable: false,
        centeredRotation: true,
        centeredScaling: true,
        originX: "center",
        originY: "center"
    });
    var ring = {
        startAt: new Date(),
        fabImg: tmp,
        targetIdx: targetIdx
    };
    GLB.cvs.add(ring.fabImg);

    ring.fabImg.animate('angle', '+=720', {
        duration: GLB.speed,
        onComplete: function() {
            GLB.cvs.remove(ring.fabImg);
            var i, tmp;
            tmp = Math.floor(Math.random() * GLB.speed);
            setTimeout("GLB.rings.pop(); GLB.throwOne();", tmp);
        }
    });
    ring.fabImg.animate('left', target.x, {
        duration: GLB.speed
    });
    ring.fabImg.animate('top', target.y, {
        duration: GLB.speed
    });
    GLB.rings.push(ring);
    if (GLB.rings.length < GLB.concurrency) {
        GLB.throwOne();
    }
};

GLB.screenUpdate = function() {
    GLB.cvs.renderAll();
};

GLB.canvasMouseDown = function(options) {
    var x = options.e.touches[0].clientX;
    var y = options.e.touches[0].clientY;
    var i, tmp1, tmp2, dist, found = -1, targetX, targetY;

    for (i = 0; i < GLB.movieRanking.length; i++) {
        targetX = GLB.movieRanking[i].x;
        targetY = GLB.movieRanking[i].y;
        tmp1 = x - targetX;
        tmp2 = y - targetY;
        dist = Math.sqrt(tmp1 * tmp1 + tmp2 * tmp2);
        if (dist < GLB.movieRadius) {
            found = i;
            break;
        }
    }
    if (-1 == found) {
        return;
    }

    for (i = 0; i < GLB.rings.length; i++) {
        tmp = Math.abs(new Date().getTime() - GLB.rings[i].startAt.getTime() - GLB.speed);
        if (GLB.rings[i].targetIdx == found && tmp < GLB.speed / 2) {
            location.href = GLB.movieRanking[found].url;
            return;
        }
    }

    tmp = GLB.movieRanking[found].fabImg;
    tmp.animate('width', '150%', {
        duration: GLB.speed / 6,
        onComplete: function() {
            tmp.animate('width', '100%', {
                duration: GLB.speed / 7
            });
        }
    });
    tmp.animate('height', '150%', {
        duration: GLB.speed / 5,
        onComplete: function() {
            tmp.animate('height', '100%', {
                duration: GLB.speed / 4
            });
        }
    });
};

(function() {
    var i, j;

    // キャンバス
    GLB.cvs.selection = false;
    GLB.cvs.setWidth(screenWidth);
    GLB.cvs.setHeight(screenHeight);

    // 画像読み込み
    GLB.loadAllImages();

    // イベントアタッチ
    GLB.cvs.on('mouse:down', GLB.canvasMouseDown);
})();
