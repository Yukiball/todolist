// var list = [{
// 	title:"吃饭",
// 	checked: true
// },{
// 	title:"睡觉",
// 	checked: false
// },{
// 	title:"吃饭",
// 	checked: true
// }]
var setLocal = {
	save(key,value){
		console.log(key)
		console.log(value)
		localStorage.setItem(key,JSON.stringify(value))
	},
	get(key){
		return JSON.parse( localStorage.getItem(key))
	}
}
var filterChecked = {
	all(list){
		return list
	},
	finish(list){
		return list.filter(function(item){
			return item.checked
		})
	},
	unfinish(list){
		return list.filter(function(item){
			return !item.checked
		})
	}
}
var list = setLocal.get('todo')|| [];
var vm = new Vue({
	el: ".main",
	data:{
		list : list,
		inputValue : "",
		editingtodo : "",
		beforeEditing:"",
		visibility: "all"
	},
	watch:{
		list :{
			deep : true,
			handler :function(){
				setLocal.save("todo",this.list)
			}
		} 
	},
	computed:{
		filterList(){
			return this.list.filter(function(item){return  !item.checked}).length
		},
		filterCheck(){
			return filterChecked[this.visibility] ? filterChecked[this.visibility](this.list) : this.list
		}
	},
	methods:{
		addTodo(){
			this.list.push({
				title : this.inputValue,
				checked : false
			})
			this.inputValue = ""
		},
		deleteTodo(todo){
			 var index = this.list.indexOf(todo)
			this.list.splice(index,1)
		},
		editTodo(todo){
			this.editingtodo = todo;
			this.beforeEditing = todo.title;
		},
		editedTodo(){
			this.editingtodo=""
		},
		cancelEdit(todo){
			todo.title = this.beforeEditing;
			this.beforeEditing = "";
			this.editingtodo =""
		}
	},
	directives:{
		focus:{
			update(el,binding){
				if (binding.value) {
					el.focus()
				}
			}
		}
	}
})
function hashchange(){
	var hash = window.location.hash.slice(1);
	vm.visibility = hash;
}
hashchange()
window.addEventListener("hashchange",hashchange)