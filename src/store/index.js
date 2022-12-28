import {createStore} from 'vuex'

export default createStore({
    state:{
        cartList:[],//当前购物车中的菜品数据
        isDelete:true,//编辑标志位,确定header组件 点击编辑的时候,底部组件展示
        edit:true,//默认展示编辑的状态
        orderList:[],//下单的商品数据
        userAddress:[//用户信息和地址
        {
            id: 1001,
            name: '马保国',
            tel: '12345678910',
            province: '广东省',
            city: '江门市',
            county: '蓬江区',
            addressDetail: '五邑大学',
            isDefault: true,//是否为默认地址
            areaCode: '110101',
          },
          {
            id: 1002,
            name: '蔡徐坤',
            tel: '12345678910',
            province: '广东省',
            city: '江门市',
            county: '蓬江区',
            addressDetail: '五邑大学',
            isDefault: false,//是否为默认地址
            areaCode: '110101',
          },
        ],
        orderListEnd: [],//生成的订单数据(已经下单的商品)
    },
    mutations:{
        // 加入购物车
        addCart(state,value){
            state.cartList = value
        },

        // 点击编辑转变标志位
        changeDelete(state){
            state.isDelete = !state.isDelete//标志位取反
        },

        // 删除商品
        delete(state,value){
            state.cartList = value
        },

        // 点击编辑转变标志位
        edit(state,value){
            if(value){//判断是否还有商品存在
                state.edit = true
            }else{
                state.edit = !state.edit//标志位取反
            }
        },

        // 商品提交订单
        pay(state,value){
            state.orderList = value
        },

        // 提交订单
        orderListEnd(state) {
            // 订单完成后将购物车中的数据提交(合并)到订单数据中(已经下单的商品)
            state.orderListEnd = state.orderListEnd.concat(state.orderList)
        },

        // 添加地址
        addaddress(state, value) {
            state.userAddress.map(item => {
                // 如果你将新增的地址设为默认地址
              if (value.isDefault) {
                //将其余的所有地址的置为非默认地址
                item.isDefault = false
              }
            })
            // 将新增的地址放进用户地址群组中
            state.userAddress.push(value)
        },
        
        // 编辑地址 
        editaddress(state, value) {
            state.userAddress = state.userAddress.map(item => {
                // 如果你将新增的地址设为默认地址
              if (value.isDefault) {
                //将其余的所有地址的置为非默认地址
                item.isDefault = false
              }
              // 判断编辑的是否为当前项,将数据返回出去  
              return item.id === value.id ? value : item
            })
        },
        
        // 删除地址
        deleteaddress(state, value) {
            state.userAddress = state.userAddress.filter(item => {
                // 返回不存在你传过来的id对象(条件判断)
              return !(item.id === value.id)
            })
            if (value.isDefault) {//如果删除的是默认地址
              state.userAddress[0].isDefault = true//将地址群组中的第一项设置为默认地址
            }
        }
    },
    actions:{},
})