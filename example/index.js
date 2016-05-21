/**
 * 把今天最好的表现当作明天最新的起点．．～
 * いま 最高の表現 として 明日最新の始発．．～
 * Today the best performance  as tomorrow newest starter!
 * Created by IntelliJ IDEA.
 *
 * @author: xiaomo
 * @github: https://github.com/qq83387856
 * @email: hupengbest@163.com
 * @QQ_NO: 83387856
 * @Date: 2016/5/21 16:05
 * @Description:
 * @Copyright(©) 2015 by xiaomo.
 **/
import EventUtil from 'EventUtil';
var btn = document.getElementById('btn');
var handler = function (event) {
   alert("测试EventUtil");
};
EventUtil.addHandler(btn, "click", handler);