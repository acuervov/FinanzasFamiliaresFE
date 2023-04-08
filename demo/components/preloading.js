export default `
body{
display: block;
}
#globalLoader{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    display: flex;
    left: 0,
    right: 0;
    width: 100%;
    height: 100%;
    background-color: #111417;
    justify-content: center;
    align-items: center;
}
.layout-preloader {
  position: relative;
  width: 75px;
  height: 75px;
  background: transparent;
  border: 3px solid #161a1f;
  border-radius: 50%;
  text-align: center;
  line-height: 150px;
  font-family: sans-serif;
  font-size: 20px;
  color: #6366F1;
  letter-spacing: 4px;
  z-index: 999;
  text-transform: uppercase;
  text-shadow: 0 0 10px #6366F1;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}
.layout-preloader:before {
  content: "";
  position: absolute;
  top: -3px;
  left: -3px;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top: 3px solid #6366F1;
  border-right: 3px solid #6366F1;
  border-radius: 50%;
  animation: preloader-rotate-c 1s linear infinite;
}
.layout-preloader span {
  display: block;
  position: absolute;
  top: calc(50% - 2px);
  left: 50%;
  width: 50%;
  height: 4px;
  background: transparent;
  transform-origin: left;
  animation: preloader-rotate 1s linear infinite;
}
.layout-preloader span:before {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #6366F1;
  top: -6px;
  right: -8px;
  box-shadow: 0 0 20px #6366F1;
}`;
