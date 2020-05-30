class App {
    constructor() {
        let size = 7
        let grid = new Array(size)
        for (let i = 0; i < size; i++) {
            grid[i] = new Array(size)
        }
        this.size = size
        this.grid = grid
    }

    resetGrid() {
        document.querySelectorAll('.blockMarked').forEach(function (item) {
            item.classList.remove('blockMarked')
        })
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.grid[i][j] = 0
            }
        }
    }

    addSelector() {
        const gridImg = document.querySelector(".grid")
        let height = gridImg.height
        let width = gridImg.width
        console.log(height, width)
    }

    renderkGrid() {
        const map = document.querySelector(".gridContainer")
        // 画一个正方形
        const width = 110
        const height = 110
        const blockHeight = 55
        const xscal = 0.805
        const yscal = 0.405
        //中心旋转的平移量
        const dx = 159
        const dy = 546
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                // 齐次坐标变换
                let x = width * i
                let y = height * j
                // 旋转+缩放变换，θ = 45° cos(θ) = 0.70710678
                let nx = 0.70710678 * (x + y) * xscal + dx
                let ny = 0.70710678 * (y - x) * yscal + dy

                let block = document.createElement('div');
                block.innerHTML = `<svg width="${width}px" height=${blockHeight}px>
                <polyline class="blockBorder" points="3,${blockHeight / 2} ${width / 2},${blockHeight - 3} ${width - 3},${blockHeight / 2} ${width / 2},3 3,${blockHeight / 2}"/>
                </svg>
                <p class="coordinate">${i + 1},${j + 1}</p>
                `
                // let img = new Image(width, 42);
                block.style.position = "absolute"
                block.style.width = `${width}px`
                block.style.height = `${blockHeight}px`
                block.style.left = `${nx}px`
                block.style.top = `${ny}px`
                block.className = 'block'
                map.append(block)
                const handler = this.handlerBlockClick.bind(this)
                block.addEventListener('click', function (params) {
                    handler(this, i, j)
                }, false)
            }
        }
    }

    renderMinerals() {
        minerals.map((m) => {
            console.log(m)
        })
    }
    handlerBlockClick(target, x, y) {
        target.classList.toggle('blockMarked')
        console.log(x, y)
    }

    run() {
        // mount reset
        document.querySelector(".reset").addEventListener("click", this.resetGrid)
        this.addSelector()
        this.renderkGrid()
        this.renderMinerals()
        console.log("ready to go!")
    }
}

app = new App()
app.run()
