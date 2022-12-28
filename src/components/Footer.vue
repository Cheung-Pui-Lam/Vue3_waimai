<template>
  <div class="footer">
    <div class="item">
        <router-link to="/home" class="nav-item" active-class="nav-color">
            <van-icon name="wap-home-o" size="30"/>
            首页
        </router-link>
    </div>
    <div class="item">
        <router-link to="/cart" class="nav-item" active-class="nav-color">
            <van-icon name="shopping-cart-o" size="30"/>
            购物车
        </router-link>
    </div>
    <div class="item">
        <router-link to="/order" class="nav-item" active-class="nav-color">
            <van-icon name="coupon-o" size="30"/>
            订单
        </router-link>
    </div>
    <div class="item">
        <router-link to="/mine" class="nav-item" active-class="nav-color">
            <van-icon name="user-circle-o" size="30"/>
            我的
        </router-link>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.footer{
    display: flex;
    background-color: #fff;
    border-top: 0.5px solid #eee;
    font-size: 12px;
    .item{
        flex: 1;
        .nav-color{
            color: aqua;
        }
        .nav-item{
            display: flex;
            flex-flow: column;
            align-items: center;
        }
    }
}
</style>