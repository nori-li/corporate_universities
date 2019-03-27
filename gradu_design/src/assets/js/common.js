// 触发事件
export function choose(data){
    this.$emit('getkdname',data);
    console.log('我是子组件')
}
var list = $('.knowledge-list-li')