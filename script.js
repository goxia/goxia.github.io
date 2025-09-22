// ===== 全局变量 =====
let currentTheme = localStorage.getItem('theme') || 'light';
let isScrolling = false;

// ===== DOM元素 =====
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeAnimations();
    initializeNavigation();
    initializeScrollEffects();
    initializeCounters();
    initializeProgressBars();
    initializeContactForm();
    
    // 添加事件监听器
    addEventListeners();
    
    console.log('🚀 Goxia的个人网站已加载完成');
});

// ===== 主题切换功能 =====
function initializeTheme() {
    // 设置初始主题
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
    
    // 添加切换动画效果
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
}

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (currentTheme === 'light') {
        icon.className = 'fas fa-moon';
    } else {
        icon.className = 'fas fa-sun';
    }
}

// ===== 导航栏功能 =====
function initializeNavigation() {
    // 移动端菜单切换
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // 导航链接点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // 滚动时更新活跃导航项
    window.addEventListener('scroll', updateActiveNav);
}

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // 防止背景滚动
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

function handleNavClick(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    
    if (targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // 平滑滚动到目标元素
            const offsetTop = targetElement.offsetTop - 70; // 考虑导航栏高度
            smoothScrollTo(offsetTop, 800);
            
            // 关闭移动端菜单
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    }
}

function updateActiveNav() {
    if (isScrolling) return;
    
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            // 移除所有活跃状态
            navLinks.forEach(link => link.classList.remove('active'));
            
            // 添加当前活跃状态
            const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// ===== 滚动效果 =====
function initializeScrollEffects() {
    // 回到顶部按钮显示/隐藏
    window.addEventListener('scroll', handleScroll);
    
    // 回到顶部按钮点击事件
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            smoothScrollTo(0, 800);
        });
    }
    
    // 滚动指示器点击事件
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 70;
                smoothScrollTo(offsetTop, 800);
            }
        });
    }
}

function handleScroll() {
    const scrollY = window.scrollY;
    
    // 回到顶部按钮显示/隐藏
    if (backToTop) {
        if (scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    // 导航栏背景透明度调整
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (scrollY > 50) {
            navbar.style.background = currentTheme === 'light' 
                ? 'rgba(255, 255, 255, 0.98)' 
                : 'rgba(15, 23, 42, 0.98)';
        } else {
            navbar.style.background = currentTheme === 'light' 
                ? 'rgba(255, 255, 255, 0.95)' 
                : 'rgba(15, 23, 42, 0.95)';
        }
    }
}

function smoothScrollTo(targetY, duration) {
    const startY = window.scrollY;
    const difference = targetY - startY;
    const startTime = performance.now();
    
    isScrolling = true;
    
    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 使用缓动函数
        const easeProgress = easeInOutCubic(progress);
        
        window.scrollTo(0, startY + difference * easeProgress);
        
        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            isScrolling = false;
        }
    }
    
    requestAnimationFrame(step);
}

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

// ===== 动画效果 =====
function initializeAnimations() {
    // 创建 Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll(
        '.hero-text, .hero-image, .about-text, .stat, .skill-card, .project-card, .contact-info, .contact-form-container'
    );
    
    animatedElements.forEach((element, index) => {
        // 添加动画类
        if (element.classList.contains('hero-text')) {
            element.classList.add('slide-in-left');
        } else if (element.classList.contains('hero-image')) {
            element.classList.add('slide-in-right');
        } else {
            element.classList.add('fade-in');
        }
        
        // 添加延迟
        element.style.animationDelay = `${index * 0.1}s`;
        
        observer.observe(element);
    });
}

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}

// ===== 数字计数器动画 =====
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver(handleCounterIntersection, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function handleCounterIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
        }
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2秒
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// ===== 技能进度条动画 =====
function initializeProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    const observer = new IntersectionObserver(handleProgressIntersection, {
        threshold: 0.5
    });
    
    progressBars.forEach(bar => {
        observer.observe(bar.closest('.skill-card'));
    });
}

function handleProgressIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.progress-bar');
            const progress = progressBar.getAttribute('data-progress');
            
            setTimeout(() => {
                progressBar.style.width = progress + '%';
            }, 300);
        }
    });
}

// ===== 联系表单处理 =====
function initializeContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // 添加实时验证
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };
    
    // 验证表单
    if (validateForm(data)) {
        // 显示加载状态
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<div class="loading"></div> 发送中...';
        submitBtn.disabled = true;
        
        // 模拟发送（实际项目中应该调用API）
        setTimeout(() => {
            showNotification('消息发送成功！我会尽快回复您。', 'success');
            contactForm.reset();
            
            // 恢复按钮状态
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
}

function validateForm(data) {
    let isValid = true;
    
    // 验证姓名
    if (!data.name || data.name.trim().length < 2) {
        showFieldError('name', '请输入至少2个字符的姓名');
        isValid = false;
    }
    
    // 验证邮箱
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showFieldError('email', '请输入有效的邮箱地址');
        isValid = false;
    }
    
    // 验证消息
    if (!data.message || data.message.trim().length < 10) {
        showFieldError('message', '请输入至少10个字符的消息');
        isValid = false;
    }
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    clearFieldError(e);
    
    switch (field.name) {
        case 'name':
            if (value.length > 0 && value.length < 2) {
                showFieldError('name', '姓名至少需要2个字符');
            }
            break;
        case 'email':
            if (value.length > 0) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    showFieldError('email', '请输入有效的邮箱地址');
                }
            }
            break;
        case 'message':
            if (value.length > 0 && value.length < 10) {
                showFieldError('message', '消息至少需要10个字符');
            }
            break;
    }
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const formGroup = field.closest('.form-group');
    
    // 移除之前的错误信息
    const existingError = formGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // 添加错误样式
    field.style.borderColor = 'var(--accent-warning)';
    
    // 添加错误信息
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: var(--accent-warning);
        font-size: 0.875rem;
        margin-top: 0.25rem;
    `;
    
    formGroup.appendChild(errorElement);
}

function clearFieldError(e) {
    const field = e.target;
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.field-error');
    
    if (errorElement) {
        errorElement.remove();
        field.style.borderColor = 'var(--border-color)';
    }
}

// ===== 通知系统 =====
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-primary);
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        border-left: 4px solid var(--accent-${type === 'success' ? 'secondary' : 'primary'});
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 关闭按钮事件
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // 自动关闭
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// ===== 事件监听器 =====
function addEventListeners() {
    // 主题切换
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // 窗口大小改变
    window.addEventListener('resize', handleResize);
    
    // 键盘事件
    document.addEventListener('keydown', handleKeyDown);
    
    // 页面可见性变化
    document.addEventListener('visibilitychange', handleVisibilityChange);
}

function handleResize() {
    // 关闭移动端菜单（如果窗口变大）
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
}

function handleKeyDown(e) {
    // ESC 键关闭移动端菜单
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
    
    // Ctrl+D 切换主题
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        toggleTheme();
    }
}

function handleVisibilityChange() {
    if (document.hidden) {
        // 页面被隐藏时的处理
        console.log('页面已隐藏');
    } else {
        // 页面重新显示时的处理
        console.log('页面重新显示');
    }
}

// ===== 工具函数 =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== 性能优化 =====
// 使用防抖优化滚动事件
const debouncedScroll = debounce(updateActiveNav, 10);
window.addEventListener('scroll', debouncedScroll);

// 预加载关键资源
function preloadImages() {
    const imageUrls = [
        'https://github.com/goxia.png',
        // 添加其他需要预加载的图片
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// 页面加载完成后预加载图片
window.addEventListener('load', preloadImages);

// ===== 开发工具 =====
if (process?.env?.NODE_ENV === 'development') {
    // 开发模式下的调试工具
    window.goxiaDebug = {
        toggleTheme,
        showNotification,
        currentTheme: () => currentTheme,
        scrollTo: smoothScrollTo
    };
    
    console.log('🔧 开发模式已启用，可使用 window.goxiaDebug 进行调试');
}

// ===== 错误处理 =====
window.addEventListener('error', (e) => {
    console.error('页面错误:', e.error);
    // 在生产环境中，这里可以发送错误报告到服务器
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('未处理的Promise拒绝:', e.reason);
    // 在生产环境中，这里可以发送错误报告到服务器
});

// ===== 导出模块（如果使用模块化） =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleTheme,
        showNotification,
        smoothScrollTo,
        initializeTheme
    };
}