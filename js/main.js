document.addEventListener("DOMContentLoaded", () => {
    // maskの起動処理
    $(".toggle_btn").on("click", function () {
        $(".mask").toggleClass("active");
    });

    // 既存のtoggle_btnクリック処理の下に追加
    $(".mask").on("click", function (e) {
        // メニュー本体以外（黒い部分）をクリックしたら閉じる
        if ($(e.target).hasClass("mask")) {
            $(this).removeClass("active");
        }
    });

    // スクロールで背景円の大きさを変化させる
    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY || window.pageYOffset;
        const circles = document.querySelectorAll(".worry-about__bg-circle");
        circles.forEach((circle, i) => {
            // それぞれ異なる動きをつける
            // スクロール量に応じてサイズを拡大（最大900pxまで）
            const base = [200, 300, 150][i];
            const max = 900;
            // スクロール量に応じて0.5〜1.5倍
            const scale = 0.5 + Math.min(scrollY / 800, 1);
            const size = Math.min(base * scale, max);
            circle.style.width = size + "px";
            circle.style.height = size + "px";
            // 透明度やぼかしも加えるとより動きが出る
            circle.style.filter = `blur(${(scale - 0.5) * 10}px)`;
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // 新しいクラス名 .faq__item を使って全てのアコーディオン項目を取得
    const allDetails = document.querySelectorAll(".faq__item");

    allDetails.forEach((details) => {
        // 各項目内の要素を新しいクラス名で取得
        const summary = details.querySelector(".faq__summary");
        const answer = details.querySelector(".faq__answer");
        const answerContent = answer.querySelector(".faq__answer-content");

        // 必要な要素が見つからない場合は、エラーを防ぐために処理をスキップ
        if (!summary || !answer || !answerContent) {
            console.error(
                "Accordion structure is missing elements for:",
                details
            );
            return;
        }

        summary.addEventListener("click", (event) => {
            // detailsタグのデフォルトの挙動（瞬時に開閉する）をキャンセル
            event.preventDefault();

            // detailsのopen属性で現在の状態をチェック
            if (details.open) {
                // --- 閉じる時のアニメーション ---
                answer.style.height = "0px";
                answer.style.opacity = "0";
                answer.style.paddingTop = "0";
                answer.style.paddingBottom = "0";

                // CSSのtransitionの時間（0.4秒）が経過した後にopen属性を削除
                setTimeout(() => {
                    details.open = false;
                }, 400);
            } else {
                // --- 開く時のアニメーション ---
                details.open = true; // 先にopen属性をセット

                // コンテンツの実際の高さを取得して適用
                const contentHeight = answerContent.offsetHeight;
                answer.style.height = contentHeight + "px";
                answer.style.opacity = "1";
                answer.style.paddingTop = "0.3em";
                answer.style.paddingBottom = "1.5em";
            }
        });
    });
});

// 吹き出し部分
$(function () {
    $(window).scroll(function () {
        $(".chat-item").each(function () {
            var scroll = $(window).scrollTop();

            var target = $(this).offset().top;

            var windowHeight = $(window).height();

            if (scroll > target - windowHeight + $(this).outerHeight()) {
                $(this).addClass("speech");
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // --- おしゃれな正円アニメーション ---
    const circles = [
        {
            el: document.querySelector(".worry-about__bg-circle--1"),
            x: 0,
            y: 0,
            r: 100,
            dx: 0.3,
            dy: 0.4,
            base: 200,
            rotation: 0,
            rotationSpeed: 0.02,
            opacity: 0.22,
            opacitySpeed: 0.001,
        },
        {
            el: document.querySelector(".worry-about__bg-circle--2"),
            x: 0,
            y: 0,
            r: 150,
            dx: -0.2,
            dy: 0.3,
            base: 300,
            rotation: 0,
            rotationSpeed: -0.015,
            opacity: 0.22,
            opacitySpeed: -0.0008,
        },
        {
            el: document.querySelector(".worry-about__bg-circle--3"),
            x: 0,
            y: 0,
            r: 75,
            dx: 0.4,
            dy: -0.25,
            base: 150,
            rotation: 0,
            rotationSpeed: 0.025,
            opacity: 0.22,
            opacitySpeed: 0.0012,
        },
    ];
    const maxR = 450; // 半径最大値（直径900px）
    const minR = 75; // 半径最小値

    // 初期配置
    function setInitialPositions() {
        const container = document.querySelector(".worry-about .container");
        const rect = container.getBoundingClientRect();
        const w = Math.min(rect.width, 900);
        const h = Math.max(rect.height, 500);

        // 3点を三角形状に配置
        circles[0].x = w * 0.2;
        circles[0].y = h * 0.3;
        circles[1].x = w * 0.7;
        circles[1].y = h * 0.6;
        circles[2].x = w * 0.5;
        circles[2].y = h * 0.8;
    }

    setInitialPositions();

    function animateCircles() {
        const container = document.querySelector(".worry-about .container");
        const rect = container.getBoundingClientRect();
        const w = Math.min(rect.width, 900);
        const h = Math.max(rect.height, 500);

        // 各円の位置を更新
        for (let i = 0; i < circles.length; i++) {
            let c = circles[i];

            // より滑らかな半径変化（遅い）
            c.r = c.base + Math.sin(Date.now() / 3000 + i * 2) * 30;
            c.r = Math.max(minR, Math.min(maxR, c.r));

            // 遅い移動
            c.x += c.dx;
            c.y += c.dy;

            // 壁でバウンド（より滑らかに）
            if (c.x - c.r < 0 || c.x + c.r > w) {
                c.dx *= -0.95; // 少し減衰
            }
            if (c.y - c.r < 0 || c.y + c.r > h) {
                c.dy *= -0.95; // 少し減衰
            }

            // 他の円と重なりチェック（より滑らかな反発）
            for (let j = 0; j < circles.length; j++) {
                if (i === j) continue;
                let c2 = circles[j];
                let dist = Math.hypot(c.x - c2.x, c.y - c2.y);
                let minDist = c.r + c2.r + 20; // 少し余裕を持たせる

                if (dist < minDist) {
                    // より滑らかな反発
                    let angle = Math.atan2(c.y - c2.y, c.x - c2.x);
                    let force = (minDist - dist) / minDist;
                    c.dx += Math.cos(angle) * force * 0.5;
                    c.dy += Math.sin(angle) * force * 0.5;
                }
            }

            // 回転アニメーション
            c.rotation += c.rotationSpeed;

            // 透明度の変化
            c.opacity += c.opacitySpeed;
            if (c.opacity > 0.3 || c.opacity < 0.15) {
                c.opacitySpeed *= -1;
            }

            // DOM反映（より滑らかなアニメーション）
            c.el.style.left = c.x - c.r + "px";
            c.el.style.top = c.y - c.r + "px";
            c.el.style.width = c.el.style.height = c.r * 2 + "px";
            c.el.style.transform = `rotate(${c.rotation}rad)`;
            c.el.style.opacity = c.opacity;

            // ぼかし効果の追加
            const blurAmount = Math.sin(Date.now() / 2000 + i) * 2 + 3;
            c.el.style.filter = `blur(${blurAmount}px)`;
        }

        requestAnimationFrame(animateCircles);
    }

    animateCircles();

    // ウィンドウリサイズ時に再配置
    window.addEventListener("resize", setInitialPositions);
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM loaded");

    const items = document.querySelectorAll(".worry-about__item");
    console.log("Found items:", items.length);

    const options = {
        threshold: 0.2,
    };

    function showItemWithDelay(item, delay) {
        setTimeout(() => {
            console.log("Making item visible");
            item.classList.add("visible");

            const textBlock = item.querySelector(".worry-about__text");
            if (textBlock) {
                const h4 = textBlock.querySelector("h4");
                if (h4 && !h4.classList.contains("typing")) {
                    const typingText = h4.querySelector(".typing-text");
                    const typingCursor = h4.querySelector(".typing-cursor");

                    if (typingText && typingCursor) {
                        // 元のテキストを直接指定（HTMLから取得）
                        const originalTexts = [
                            "わからないところ調べてたら1日経ってた...",
                            "全く手が動かなくてコードを1行で1時間使ってた...",
                            "今後のキャリアが不安、一人は寂しい...",
                        ];

                        // どのアイテムかを特定
                        const itemIndex = Array.from(
                            item.parentNode.children
                        ).indexOf(item);
                        const original =
                            originalTexts[itemIndex] || "テキストがありません";

                        console.log("Starting typing for:", original);
                        typingText.textContent = "";
                        h4.classList.add("typing");
                        let i = 0;

                        function typeChar() {
                            if (i < original.length) {
                                typingText.textContent = original.slice(
                                    0,
                                    i + 1
                                );

                                // カーソル位置を動的に計算
                                const textWidth = typingText.offsetWidth;
                                typingCursor.style.left = `${textWidth}px`;

                                i++;
                                setTimeout(typeChar, 100);
                            } else {
                                console.log("Typing completed");
                                h4.classList.remove("typing");
                                h4.classList.add("completed");
                            }
                        }
                        setTimeout(typeChar, 500);
                    }
                }
            }
        }, delay);
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                console.log("Item intersecting:", idx);
                showItemWithDelay(entry.target, idx * 300);
                obs.unobserve(entry.target);
            }
        });
    }, options);

    items.forEach((item, idx) => {
        observer.observe(item);
        console.log("Observing item:", idx);
    });

    const slider = new Swiper(".slider1", {
        // 基本的な設定
        //スライドを無限にループさせる
        loop: true,
        //自動再生する
        autoplay: {
            display: 2000,
            disableOnInteraction: false, // ユーザー操作後も再開する
        },
        //スライドが切り替わるときのアニメーションの速度を2秒に指定
        speed: 2000,
        //fadeを設定
        effect: "fade",
    });
});
