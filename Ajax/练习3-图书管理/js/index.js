//渲染图书列表--每次操作都会获取数据渲染列表--封装
const creator = "yan";
function getBookslist() {
  axios({
    url: "http://hmajax.itheima.net/api/books",
    params: {
      creator,
    },
  }).then((res) => {
    const bookList = res.data.data;
    const htmlStr = bookList
      .map((item, index) => {
        return `<tr>
            <td>${index + 1}</td>
            <td>${item.bookname}</td>
            <td>${item.author}</td>
            <td>${item.publisher}</td>
            <td class=${item.id}>
              <span class="del">删除</span>
              <span class="edit">编辑</span>
            </td>
          </tr>`;
      })
      .join("");
    document.querySelector(".list").innerHTML = htmlStr;
  });
}

//网页加载运行，就要获取并且渲染列表一次

getBookslist();

//新增
const addModalDom = document.querySelector(".add-modal");
const addModal = new bootstrap.Modal(addModalDom);

document.querySelector(".add-btn").addEventListener("click", () => {
  const addForm = document.querySelector(".add-form");
  const bookobj = serialize(addForm, { hash: true, empty: true });
  console.log(bookobj);
  axios({
    url: "http://hmajax.itheima.net/api/books",
    method: "post",
    data: {
      ...bookobj,
      creator,
    },
  }).then((res) => {
    console.log(res);
    getBookslist();
    addForm.reset();
    addModal.hide();
  });
});
//删除
//获取删除id--绑定删除事件--获取id （绑定自定义属性--父级）--在父级元素上拿--dom
//事件委托-删除-->最近一级的静态元素-->回答事件委托可以拿来做例子

document.querySelector(".table").addEventListener("click", (e) => {
  //   console.log(e.target.className);
  const deleteId = e.target.parentElement.className;
  if (e.target.className == "del") {
    // console.log(deleteId);
    axios({
      url: `http://hmajax.itheima.net/api/books/${deleteId}`,
      method: "DELETE",
    }).then((res) => {
      //   console.log(res);
      getBookslist();
    });
  }
});

//编辑
//编辑弹框
const editDom = document.querySelector(".edit-modal");
const editModal = new bootstrap.Modal(editDom);

document.querySelector(".table").addEventListener("click", (e) => {
  const eidtId = e.target.parentElement.className;
  console.log(eidtId);
  if (e.target.className == "edit") {
    axios({
      url: `http://hmajax.itheima.net/api/books/${eidtId}`,
    }).then((res) => {
      console.log(res.data.data);
      //   document.querySelector(".edit-form .bookname").placeholder =
      //     res.data.data.bookname;
      //   document.querySelector(".edit-form .author").placeholder =
      //     res.data.data.author;
      //   document.querySelector(".edit-form .publisher").placeholder =
      //     res.data.data.publisher;
      //类名和对象名相同
      const bookObj = res.data.data;
      const keys = Object.keys(bookObj);
      keys.forEach((key) => {
        document.querySelector(`.edit-form .${key}`).placeholder = bookObj[key];
        document.querySelector(`.edit-form .${key}`).value = bookObj[key];
      });

      editModal.show();
    });
  }
});

document.querySelector(".edit-btn").addEventListener("click", (e) => {
  const editForm = document.querySelector(".edit-form");
  const { id, bookname, author, publisher } = serialize(editForm, {
    hash: true,
    empty: true,
  });
  axios({
    url: `http://hmajax.itheima.net/api/books/${id}`,
    method: "PUT",
    data: {
      bookname,
      author,
      publisher,
      creator,
    },
  }).then((res) => {
    getBookslist();
    editModal.hide();
  });
});
