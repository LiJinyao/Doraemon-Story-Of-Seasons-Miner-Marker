class App {
    constructor() {
        let size = 7; // 方块网格大小
        let grid = new Array(size);
        for (let i = 0; i < size; i++) {
            grid[i] = new Array(size);
        }
        this.size = size;
        this.grid = grid; // 网格状态数组，用于存储标记信息
        this.selectedBlock = null; // 当前选定的方块
    }

    // 重置网格，清除类型内容和标记类
    resetGrid() {
        document.querySelectorAll('.block').forEach(function (item) {
            const typeElement = item.querySelector('.type');
            typeElement.textContent = ''; // 清空类型内容
            item.classList.remove('blockMarked'); // 移除标记类
        });
    }

    // 添加选择器
    addSelector() {
        const gridImg = document.querySelector('.grid');
        let height = gridImg.height;
        let width = gridImg.width;
        console.log(height, width);
    }

    // 渲染方块网格
    renderkGrid() {
        const map = document.querySelector('.gridContainer');
        const width = 110; // 方块宽度
        const height = 110; // 方块高度
        const blockHeight = 55; // 方块半高度，用于定位中心点
        const xscal = 0.805; // x轴缩放因子
        const yscal = 0.405; // y轴缩放因子
        const dx = 159; // x轴平移量
        const dy = 546; // y轴平移量

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                let x = width * i;
                let y = height * j;
                let nx = 0.70710678 * (x + y) * xscal + dx;
                let ny = 0.70710678 * (y - x) * yscal + dy;

                let block = document.createElement('div');
                block.innerHTML = `
                    <svg width="${width}px" height=${blockHeight}px>
                        <polyline class="blockBorder" points="3,${blockHeight / 2} ${width / 2},${blockHeight - 3} ${width - 3},${blockHeight / 2} ${width / 2},3 3,${blockHeight / 2}"/>
                    </svg>
                    <div class="info">
                        <p class="coordinate">${i + 1}-${j + 1}</p>
                        <p class="type"></p>
                    </div>
                `;

                block.style.position = 'absolute';
                block.style.width = `${width}px`;
                block.style.height = `${blockHeight}px`;
                block.style.left = `${nx}px`;
                block.style.top = `${ny}px`;
                block.className = 'block';
                map.append(block);
            }
        }
    }

    // 打开弹出菜单
    openMenu(x, y) {
        const menuOverlay = document.querySelector('.menu-overlay');
        const menuContainer = document.querySelector('.menu-container');
        menuContainer.style.left = `${x}px`;
        menuContainer.style.top = `${y}px`;
        menuOverlay.style.display = 'block';
    }

    // 关闭弹出菜单
    closeMenu() {
        const menuOverlay = document.querySelector('.menu-overlay');
        menuOverlay.style.display = 'none';
    }

    // 处理菜单项点击事件
    handleMenuItemClick(value) {
        if (this.selectedBlock) {
            const typeElement = this.selectedBlock.querySelector('.type');
            typeElement.textContent = `:${value}`; // 在 value 前添加 ":"
            this.selectedBlock.classList.add('blockMarked'); // 添加标记类
            this.closeMenu();
        }
    }

    // 运行应用
    run() {
        document.querySelector('.reset').addEventListener('click', () => {
            this.resetGrid();
        });

        this.addSelector();
        this.renderkGrid();

        const menuItems = document.querySelectorAll('.menu-item');
        const blocks = document.querySelectorAll('.block');

        // 监听菜单项点击事件
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                this.handleMenuItemClick(item.getAttribute('data-value'));
            });
        });

        // 监听方块点击事件
        blocks.forEach(block => {
            block.addEventListener('click', event => {
                event.stopPropagation();
                const x = event.clientX;
                const y = event.clientY;
                this.openMenu(x, y);
                this.selectedBlock = block;
            });
        });

        // 点击其他地方关闭菜单
        document.addEventListener('click', () => {
            this.closeMenu();
        });

        console.log('准备就绪！');
    }
}

// 创建并运行应用
const app = new App();
app.run();
