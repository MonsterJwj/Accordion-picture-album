function accordion(id,option) {
    var box = document.getElementById(id);

    //设置默认信息  防止用户不传递宽高
    var defaultOption = {
        activeWidth:340,
        activeHeight:400,
        defaultWidth:130,
        defaultHeight:40,
        time:400
    }
    //Object.assign({},obj1,obj2....)  用来合并对象 有返回值
    //{}：目标对象，就是合并之后的那个大对象
    //obj1,obj2...:是要被合并的对象，后面的obj会覆盖前面的obj
    var merge= Object.assign({},defaultOption,option);
    //防止用户传递错误的参数  用户不能传递小于HTML里所设置的div数目
    if (merge.col * merge.row != box.children.length){
        //throw用来抛出一个自定义的异常提示
        throw "Error setting of rows and columns";
    }

    var time1 = new Date().getTime();
    var timer = null;

    var activePic = function(index) {
        clearTimeout(timer);
        //鼠标一 移进去时的时间
        var time2 = new Date().getTime();
        if (time2-time1<merge.time){
            timer = setTimeout(function () {
                activePic(index);
            },merge.time);
            return false;
        }
        time1 = time2;

        // box的最大宽度
        box.style.width = merge.activeWidth + merge.defaultWidth * (merge.col-1) + "px";
        //下标——>坐标  //匹配哪个盒子处于激活状态
        //坐标——>下标
        var cx = index % merge.col;
        var cy = Math.floor(index / merge.col);

        // console.log(cx,cy);
        for (var x=0;x<merge.col;x++){
            for (var y=0;y<merge.row;y++){
                //坐标转下标   //拿到dom节点
                var cindex = x+y*merge.col;
                // console.log(x,y);
                // console.log(cindex);
                //把下标赋给相应的图片
                var item = box.children[cindex];
                //设置所激活的图片的 那一列和那一行的宽高
                if (cx == x && cy == y){
                    item.className = "active";
                    item.style.width = merge.activeWidth + "px";
                    item.style.height = merge.activeHeight + "px";
                }else if (cx == x){
                    item.className  = "";
                    item.style.width = merge.activeWidth + "px";
                    item.style.height = merge.defaultHeight + "px";
                } else if (cy == y){
                    item.className  = "";
                    item.style.width = merge.defaultWidth + "px";
                    item.style.height = merge.activeHeight + "px";
                } else {
                    item.className  = "";
                    item.style.width = merge.defaultWidth + "px";
                    item.style.height = merge.defaultHeight + "px";
                }
            }
        }
    }
    activePic(0);

    //鼠标移近事件
    for (var i=0;i<box.children.length;i++){
        box.children[i].index = i;
        box.children[i].style.transition = "all "+merge.time/1000+"s";
        box.children[i].onmouseenter = function () {
            activePic(this.index);
        }
    }

}
