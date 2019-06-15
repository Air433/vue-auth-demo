<template>

</template>

<script>

  const alertMst = x => alert(x+'----');

  const buildTree =  (arr)=> {
    let temp = {};
    let tree = {};
    // 数组转 键值对
    arr.forEach(item => {
      temp[item.menuId] = item
    });

    let tempKeys = Object.keys(temp)
    tempKeys.forEach(key => {
      // 获取当前项
      let item = temp[key]
      // 当前项 pId
      let _itemPId = item.parentId
      // 获取父级项
      let parentItemByPid = temp[_itemPId]
      if (parentItemByPid) {
        if (!parentItemByPid.children) {
          parentItemByPid.children = []
        }
        parentItemByPid.children.push(item)
      } else {
        tree[item.menuId] = item
      }
    });
    // 对象转数组并返回
    return Object.keys(tree).map(key => tree[key])
  };
  const buildMenuTree = (array) => {
    let arr = [];
    for (let i = 0; i < array.length; i++) {
      arr[i] = {};
      arr[i].id = array[i].menuId;
      arr[i].name = array[i].name;
      arr[i].parentId = array[i].parentId;
      arr[i].parentName = array[i].parentName;
      arr[i].url = array[i].url;
      arr[i].perms = array[i].perms;
    }

    let temp = {};
    let tree = {};
    // 数组转 键值对
    arr.forEach(item => {
      temp[item.id] = item
    });

    let tempKeys = Object.keys(temp)
    tempKeys.forEach(key => {
      // 获取当前项
      let item = temp[key]
      // 当前项 pId
      let _itemPId = item.parentId
      // 获取父级项
      let parentItemByPid = temp[_itemPId]
      if (parentItemByPid) {
        if (!parentItemByPid.children) {
          parentItemByPid.children = []
        }
        parentItemByPid.children.push(item)
      } else {
        tree[item.id] = item
      }
    });
    // 对象转数组并返回
    return Object.keys(tree).map(key => tree[key])
  };

  export default {
    name: "Common",
    alertMst, buildMenuTree
  }
</script>

<style scoped>

</style>
