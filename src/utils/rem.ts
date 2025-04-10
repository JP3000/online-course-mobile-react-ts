//rem等比例适配配置文件，750px设计稿
function setRem() {
  const baseSize = 10;
  const baseWidth = 750;
  const vW = document.documentElement.clientWidth;
  const scale = vW / baseWidth;
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px';
}

export const initRem = () => {
    setRem();
    window.onresize = () => {
      setRem();
    }
}