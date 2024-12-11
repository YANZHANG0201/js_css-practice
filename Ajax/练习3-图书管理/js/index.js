//渲染图书列表--每次操作都会获取数据渲染列表--封装
const creator = "yan";
function getBookslist() {
  axios({
    url: "http://hmajax.itheima.net/api/books",
    params: {
      creator,
    },
  }).then((res) => {
    console.log(res);
    const bookList = res.data.data;
    console.log(bookList);
    const htmlStr = bookList
      .map((item, index) => {
        return `<tr>
            <td>${index + 1}</td>
            <td>${item.bookname}</td>
            <td>${item.author}</td>
            <td>${item.publisher}</td>
            <td>
              <span class="del">删除</span>
              <span class="edit">编辑</span>
            </td>
          </tr>`;
      })
      .join("");
    console.log(htmlStr);
    document.querySelector(".list").innerHTML = htmlStr;
  });
}

//网页加载运行，就要获取并且渲染列表一次

getBookslist();
