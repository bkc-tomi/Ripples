import { db } from "./firebase";

const saveRipple = (ripple) => {
    const date = new Date();
    const today = date.valueOf().toString();
    // console.log(date.valueOf());
    db.collection("ripples").doc(today).set({
        ripple: ripple,
        date:   date.valueOf(),
    })
    .then(() => {
        // console.log("success");
    })
    .catch(err => {
        console.log(err);
    });

    db.collection("ripples").doc(today).delete()
    .then(() => {

    })
    .catch(err => {
        console.log(err);
    });
}

const Sketch = (p) => {
    
    /**
     * クリックした時に出来るrippleオブジェクトを格納しておく配列
     * クリックと同時に新しいrippleオブジェクトが追加され、透明度a
     * が０より小さくなると配列から削除される。
     * TODO:クラスオブジェクトの定義が上手くいかなかったのでそれぞれ関数で実装
     * しているのでクラス実装の仕方を調べる。
     */
    const ripples = [];
    let itr = 0; // noise生成の種
    /**
     * rippleオブジェクトの状態を更新する関数
     * drawの毎に更新される。
     * @param {*} ripple 
     */
    const update = (ripple) => {
        ripple.r+=2;
        ripple.a-=1;
    }
    /**
     * rippleオブジェクトから実際の波紋を描画する関数
     * drawの毎に表示する。
     * @param {*} ripple 
     */
    const show = (ripple) => {
        p.noStroke();
        p.drawingContext.shadowOffsetX = 0;
        p.drawingContext.shadowOffsetY = 0;
        p.drawingContext.shadowBlur = 1000;
        p.drawingContext.shadowColor = p.color(ripple.c, 255, 255);
        p.fill(ripple.c, 255, 255, ripple.a);
        p.ellipse(ripple.x, ripple.y, ripple.r);
    }
    
    /**
     * セットアップの関数。
     * ウィンドウサイズが変更される度に呼ばれるので
     * 関数にまとめている。
     */
    const initSetup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.colorMode(p.HSB, 255);
        p.blendMode(p.BLEND);
        p.background(0, 0, 255);
    }
    
    /**
     * ライトモードとダークモードの切り替え用の関数
     */
    let mode;
    const dark = () => {
        p.blendMode(p.BLEND);
        p.background(0, 0, 0);
        p.blendMode(p.LIGHTEST);
    }
    
    const light = () => {
        p.blendMode(p.BLEND);
        p.background(0, 0, 255);
        p.blendMode(p.DIFFERENCE);
    }
    
    p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
        mode = props.mode;
    }
    
    db.collection("ripples").onSnapshot(snapshots => {
        snapshots.forEach(snapshot => {
            const ripple = {
                x: snapshot.data().ripple.x * p.windowWidth,
                y: snapshot.data().ripple.y * p.windowHeight,
                c: snapshot.data().ripple.c,
                r: 0,
                a: 100,
            }
            ripples.push(ripple);
        });
    });

    p.setup = () => {
        initSetup();
        window.onresize = () => {
            initSetup();
        }
    }

    p.draw = () => {
        if (mode === "light") {
            light();
        } else {
            dark();
        }
        // 配列内の全てのrippleオブジェクトに対してudpate, showを実行
        for (let i=0; i<ripples.length; i++) {
            update(ripples[i]);
            show(ripples[i]);
            if (ripples[i].a < 0) {
                ripples.splice(i, 1);
            }
        }
        // マウスをクリックする度に新しいrippleオブジェクトを生成
        if (p.mouseIsPressed) {
            const posX = p.mouseX / p.windowWidth;
            const posY = p.mouseY / p.windowHeight;
            const color = p.floor(p.noise(itr/50) * 300);
            // console.log(posX, posY);
            const dbRipple = {
                x: posX,
                y: posY,
                c: color,
            }
            saveRipple(dbRipple);
        }
        itr++;
    }
}

export { Sketch }