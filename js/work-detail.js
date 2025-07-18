// スクリーンショットギャラリーのライトボックス機能
document.addEventListener('DOMContentLoaded', () => {
    const screenshots = document.querySelectorAll('.screenshot-item img');
    
    // ライトボックスのHTML要素を作成
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img class="lightbox-image" src="" alt="">
            <button class="lightbox-close">&times;</button>
            <button class="lightbox-prev">‹</button>
            <button class="lightbox-next">›</button>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    
    let currentIndex = 0;
    
    // スクリーンショットクリック時の処理
    screenshots.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            currentIndex = index;
            showImage(currentIndex);
            lightbox.classList.add('active');
        });
    });
    
    // 画像を表示
    function showImage(index) {
        lightboxImage.src = screenshots[index].src;
        lightboxImage.alt = screenshots[index].alt;
    }
    
    // 前の画像
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + screenshots.length) % screenshots.length;
        showImage(currentIndex);
    });
    
    // 次の画像
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % screenshots.length;
        showImage(currentIndex);
    });
    
    // 閉じる
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
    
    // 背景クリックで閉じる
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
    
    // キーボード操作
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
        } else if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        }
    });
});

// ライトボックス用のCSS
const style = document.createElement('style');
style.textContent = `
.lightbox {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    z-index: 2000;
}

.lightbox.active {
    opacity: 1;
    visibility: visible;
}

.lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
}

.lightbox-image {
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 8px;
}

.lightbox-close,
.lightbox-prev,
.lightbox-next {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    border: none;
    font-size: 40px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.lightbox-close:hover,
.lightbox-prev:hover,
.lightbox-next:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

.lightbox-close {
    top: -60px;
    right: 0;
}

.lightbox-prev {
    left: -70px;
    top: 50%;
    transform: translateY(-50%);
}

.lightbox-next {
    right: -70px;
    top: 50%;
    transform: translateY(-50%);
}

@media (max-width: 768px) {
    .lightbox-prev,
    .lightbox-next {
        width: 40px;
        height: 40px;
        font-size: 30px;
    }
    
    .lightbox-prev {
        left: 10px;
    }
    
    .lightbox-next {
        right: 10px;
    }
    
    .lightbox-close {
        top: 10px;
        right: 10px;
    }
}
`;
document.head.appendChild(style);