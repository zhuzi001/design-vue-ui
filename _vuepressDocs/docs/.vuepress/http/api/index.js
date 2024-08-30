const jsonObj = {
  "/app/list": require("../json/table-list.json"),
};

// 全局 调用api方式
export function apiFc(parameters) {
  console.log(parameters);
  return new Promise((resolve) => {
    const _data = jsonObj[parameters.url];
    // 做一个延时处理
    setTimeout(() => {
      resolve(_data);
    }, 1000);
  });
}
