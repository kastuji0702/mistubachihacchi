document.addEventListener("DOMContentLoaded", () => {
    // GSAP Mitubachi文字アニメーション
    const chars = document.querySelectorAll(".char");

    // 初期アニメーション（ページ読み込み時）
    gsap.set(chars, { y: 0, color: "#2c3e50" });

    // ホバーアニメーション
    chars.forEach((char, index) => {
        char.addEventListener("mouseenter", () => {
            gsap.to(char, {
                duration: 0.4,
                y: -10,
                color: "#f39c12",
                ease: "back.out(1.7)",
                scale: 1.1,
            });
        });

        char.addEventListener("mouseleave", () => {
            gsap.to(char, {
                duration: 0.4,
                y: 0,
                color: "#2c3e50",
                ease: "back.out(1.7)",
                scale: 1,
            });
        });
    });

    // Loading Screen Functionality
    const loadingScreen = document.querySelector(".loading-screen");
    const loadingIcon = document.querySelector(".loading-icon img");
    const loadingBarFill = document.querySelector(".loading-bar-fill");
    const loadingPercentage = document.querySelector(".loading-percentage");
    const header = document.querySelector("header");

    let loadingProgress = 0;
    let isPageFullyLoaded = false;

    // ページの読み込み状況を監視
    function checkPageLoadStatus() {
        const images = document.querySelectorAll("img");
        const totalImages = images.length;
        let loadedImages = 0;

        // 画像の読み込み状況をチェック
        images.forEach((img) => {
            if (img.complete) {
                loadedImages++;
            } else {
                img.addEventListener("load", () => {
                    loadedImages++;
                    updateLoadingProgress();
                });
                img.addEventListener("error", () => {
                    loadedImages++;
                    updateLoadingProgress();
                });
            }
        });

        // 初期チェック
        updateLoadingProgress();

        function updateLoadingProgress() {
            const imageProgress = (loadedImages / totalImages) * 60; // 画像読み込みで60%
            const baseProgress = 20; // 基本20%
            const totalProgress = Math.min(baseProgress + imageProgress, 80);

            if (totalProgress > loadingProgress) {
                loadingProgress = totalProgress;
                updateLoadingUI();
            }

            // すべての画像が読み込まれたら100%に
            if (loadedImages >= totalImages && !isPageFullyLoaded) {
                setTimeout(() => {
                    loadingProgress = 100;
                    updateLoadingUI();
                    completeLoading();
                }, 500);
            }
        }
    }

    function updateLoadingUI() {
        loadingBarFill.style.width = loadingProgress + "%";
        loadingPercentage.textContent = Math.floor(loadingProgress);

        // アイコンの表示制御
        if (loadingProgress > 20) {
            loadingIcon.classList.add("visible");
        }
    }

    function completeLoading() {
        isPageFullyLoaded = true;

        // 100%になった時のアニメーション
        setTimeout(() => {
            loadingIcon.classList.add("shake");

            setTimeout(() => {
                loadingScreen.classList.add("loading-complete");

                setTimeout(() => {
                    loadingScreen.style.display = "none";
                }, 800);
            }, 1000);
        }, 500);
    }

    // ページ読み込み状況の監視開始
    checkPageLoadStatus();

    // フォールバック: 最低限のloading時間を確保
    setTimeout(() => {
        if (!isPageFullyLoaded) {
            loadingProgress = 100;
            updateLoadingUI();
            completeLoading();
        }
    }, 3000); // 最低3秒はloading

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

    // スクロールで背景円の大きさを変化させる（軽量版）
    window.addEventListener(
        "scroll",
        () => {
            const scrollY = window.scrollY || window.pageYOffset;
            const circles = document.querySelectorAll(
                ".worry-about__bg-circle"
            );
            circles.forEach((circle, i) => {
                // スクロール量に応じてサイズと透明度のみ変化
                const base = [200, 300, 150, 180, 120][i];
                const scale = 0.8 + Math.min(scrollY / 1000, 0.4);
                const opacity = 0.3 + Math.min(scrollY / 800, 0.3);

                const size = Math.min(base * scale, 900);
                circle.style.width = size + "px";
                circle.style.height = size + "px";
                circle.style.opacity = opacity;
                circle.style.filter = `blur(${(scale - 0.8) * 5}px)`;
            });
        },
        { passive: true }
    ); // パフォーマンス向上
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
            opacity: 0.6, // 初期透明度を上げる
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
            opacity: 0.6, // 初期透明度を上げる
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
            opacity: 0.6, // 初期透明度を上げる
            opacitySpeed: 0.0012,
        },
        {
            el: document.querySelector(".worry-about__bg-circle--4"),
            x: 0,
            y: 0,
            r: 90,
            dx: -0.35,
            dy: 0.5,
            base: 180,
            rotation: 0,
            rotationSpeed: 0.018,
            opacity: 0.6, // 初期透明度を上げる
            opacitySpeed: 0.0009,
        },
        {
            el: document.querySelector(".worry-about__bg-circle--5"),
            x: 0,
            y: 0,
            r: 60,
            dx: 0.25,
            dy: -0.4,
            base: 120,
            rotation: 0,
            rotationSpeed: -0.022,
            opacity: 0.6, // 初期透明度を上げる
            opacitySpeed: -0.0011,
        },
    ];
    // デバッグ用: 取得できているか確認
    circles.forEach((c, i) => {
        if (!c.el) {
            console.warn(`worry-about__bg-circle--${i + 1} が見つかりません`);
        } else {
            console.log(`worry-about__bg-circle--${i + 1} OK`);
        }
    });
    const maxR = 450; // 半径最大値（直径900px）
    const minR = 60; // 半径最小値

    // 初期配置
    function setInitialPositions() {
        const container = document.querySelector(".worry-about .container");
        const rect = container.getBoundingClientRect();
        const w = Math.min(rect.width, 900);
        const h = Math.max(rect.height, 500);

        // 5点を星形に配置
        circles[0].x = w * 0.2;
        circles[0].y = h * 0.3;
        circles[1].x = w * 0.7;
        circles[1].y = h * 0.6;
        circles[2].x = w * 0.5;
        circles[2].y = h * 0.8;
        circles[3].x = w * 0.8;
        circles[3].y = h * 0.2;
        circles[4].x = w * 0.3;
        circles[4].y = h * 0.7;

        // デバッグ用: 初期位置を出力
        console.log("背景円の初期位置:");
        circles.forEach((c, i) => {
            if (c.el) {
                console.log(`円${i + 1}: x=${c.x}, y=${c.y}, r=${c.r}`);
            }
        });
    }

    setInitialPositions();

    // 軽量版：常時アニメーション（CSSのみ）
    function setCirclePositions() {
        const container = document.querySelector(".worry-about .container");
        const rect = container.getBoundingClientRect();
        const w = Math.min(rect.width, 900);
        const h = Math.max(rect.height, 500);

        // 各円の初期位置を設定（CSSアニメーションで動作）
        circles.forEach((circle, i) => {
            if (!circle.el) return;

            // 星形の配置
            const positions = [
                { x: w * 0.2, y: h * 0.3, r: 200 },
                { x: w * 0.7, y: h * 0.6, r: 300 },
                { x: w * 0.5, y: h * 0.8, r: 150 },
                { x: w * 0.8, y: h * 0.2, r: 180 },
                { x: w * 0.3, y: h * 0.7, r: 120 },
            ];

            const pos = positions[i];
            circle.el.style.left = pos.x - pos.r + "px";
            circle.el.style.top = pos.y - pos.r + "px";
            circle.el.style.width = circle.el.style.height = pos.r * 2 + "px";
            circle.el.style.opacity = "0.4";
        });
    }

    setCirclePositions();

    // ウィンドウリサイズ時に再配置
    window.addEventListener("resize", setCirclePositions);
});

document.addEventListener("DOMContentLoaded", () => {
    // GSAP WORRY ABOUTセクションアニメーション
    const worryAboutItems = document.querySelectorAll(".worry-about__item");
    const worryAboutImages = document.querySelectorAll(".worry-about__image");
    const worryAboutTexts = document.querySelectorAll(".worry-about__text");

    // 初期状態を設定
    gsap.set(worryAboutItems, {
        opacity: 0,
        y: 50,
        scale: 0.95,
    });
    gsap.set(worryAboutImages, {
        opacity: 0,
        scale: 0.8,
        rotation: -5,
    });
    gsap.set(worryAboutTexts, {
        opacity: 0,
        x: -30,
    });

    // Intersection Observer for WORRY ABOUT items
    const worryAboutObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    const image = item.querySelector(".worry-about__image");
                    const text = item.querySelector(".worry-about__text");

                    // アイテム全体のアニメーション
                    gsap.to(item, {
                        duration: 0.8,
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        ease: "back.out(1.7)",
                        delay: index * 0.2,
                    });

                    // 画像のアニメーション
                    gsap.to(image, {
                        duration: 0.6,
                        opacity: 1,
                        scale: 1,
                        rotation: 0,
                        ease: "back.out(1.7)",
                        delay: index * 0.2 + 0.3,
                    });

                    // テキストのアニメーション
                    gsap.to(text, {
                        duration: 0.6,
                        opacity: 1,
                        x: 0,
                        ease: "back.out(1.7)",
                        delay: index * 0.2 + 0.5,
                    });
                }
            });
        },
        {
            threshold: 0.3,
            rootMargin: "0px 0px -50px 0px",
        }
    );

    // 各アイテムを監視
    worryAboutItems.forEach((item) => {
        worryAboutObserver.observe(item);
    });

    // ホバーアニメーション
    worryAboutItems.forEach((item) => {
        item.addEventListener("mouseenter", () => {
            gsap.to(item, {
                duration: 0.3,
                y: -5,
                scale: 1.02,
                ease: "power2.out",
            });
        });

        item.addEventListener("mouseleave", () => {
            gsap.to(item, {
                duration: 0.3,
                y: 0,
                scale: 1,
                ease: "power2.out",
            });
        });
    });

    // 画像ホバーアニメーション
    worryAboutImages.forEach((image) => {
        image.addEventListener("mouseenter", () => {
            gsap.to(image, {
                duration: 0.3,
                scale: 1.05,
                rotation: 2,
                ease: "back.out(1.7)",
            });
        });

        image.addEventListener("mouseleave", () => {
            gsap.to(image, {
                duration: 0.3,
                scale: 1,
                rotation: 0,
                ease: "back.out(1.7)",
            });
        });
    });
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

// voiceの設定
$(document).ready(function () {
    $(".voice__list").slick({
        centerMode: true,
        centerPadding: "25%",
        slidesToShow: 1,
        arrows: true,
        dots: true,
        infinite: true,

        responsive: [
            {
                breakpoint: 769,
                settings: {
                    centerMode: false, // 中央表示モードを解除
                    centerPadding: "0", // 見切れをなくす
                    arrows: true,
                    dots: true,
                },
            },
        ],
    });
});
