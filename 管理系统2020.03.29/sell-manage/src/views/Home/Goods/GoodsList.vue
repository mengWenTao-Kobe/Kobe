<template>
  <div class="goods-list">
    <!-- 使用面板组件 -->
    <panel>
      <span slot="title">商品列表</span>
      <div slot="content">
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%">
          <!-- 第1列 可以展开的-->
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品 ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="创建时间">
                  <span>{{ props.row.ctime|filterCtime }}</span>
                </el-form-item>
                <el-form-item label="商品名称">
                  <span>{{ props.row.goodsname }}</span>
                </el-form-item>
                <el-form-item label="商品分类">
                  <span>{{ props.row.goodscategory }}</span>
                </el-form-item>
                <el-form-item label="商品特色">
                  <span>{{ props.row.goodsfeature|filterFeature }}</span>
                </el-form-item>
                <el-form-item label="商品图片">
                  <img
                    v-if="props.row.imgUrl"
                    :src="imgServeUrl+props.row.imgUrl"
                    class="avatarImg"
                  />
                </el-form-item>
                <el-form-item label="是否促销">
                  <span>{{ props.row.isPromotion }}</span>
                </el-form-item>
                <el-form-item label="商品规格">
                  <span>{{ props.row.standard|filterStandard }}</span>
                </el-form-item>
                <el-form-item label="商品描述">
                  <span>{{ props.row.goodsdesc }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <!-- 第2列 -->
          <el-table-column label="商品 ID" prop="id"></el-table-column>
          <!-- 第3列 -->
          <el-table-column label="商品名称" prop="goodsname"></el-table-column>
          <!-- 第4列 -->
          <el-table-column label="商品图片" prop="imgUrl">
            <template slot-scope="props">
              <img v-if="props.row.imgUrl" :src="imgServeUrl+props.row.imgUrl" class="avatarImg" />
            </template>
          </el-table-column>
          <!-- 第6列 -->
          <el-table-column label="描述" prop="goodsdesc"></el-table-column>
          <!-- 第6列 操作（编辑、删除） -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <div class="page-block">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[3,5,10,20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </panel>
  </div>
</template>

<script>
// 引入面板组件
import Panel from "@/components/Panel.vue";
// 引入请求函数
import { getGoodsList, goodsDelete } from "@/api/goods.js";
// 引入moment工具
import moment from "moment";
// 引入session工具函数
import session from '@/utils/session';

export default {
  // 注册面板组件
  components: {
    Panel
  },

  // 生命周期函数
  created() {
    this.getData();
  },

  // 数据
  data() {
    return {
      tableData: [], // 商品表格数据
      currentPage: 1, // 默认当前页码
      pageSize: 5, // 默认每页条数
      total: 99, // 默认总条数
      //图片在服务器里存放的地址
      imgServeUrl: "http://localhost:5000/upload/imgs/"
    };
  },

  // 方法
  methods: {
    // 根据每页条数和当前页码获取数据
    async getData() {
      // 发送请求，接收数据
      let { total, data } = await getGoodsList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
      // 边界判断（如果那页没数据切总条数不为0，回到上一页）
      if (!data.length && total) {
        this.currentPage--;
        this.getData();
        return;
      }
      // 赋值渲染
      this.tableData = data;
      this.total = total;
    },
    // 每页条数改变时
    handleSizeChange(pageSize) {
      this.pageSize = pageSize; //更新每页条数
      this.getData(); //渲染
    },
    // 当前页码改变时
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage; //更新当前页码
      this.getData(); //渲染
    },
    // 商品编辑
    handleEdit(index, row) {
      // 页面之间传数据
      session.set('row',row)
      // 跳转到编辑页面
      location.href='/#/index/goodsedit'
    },
    // 商品删除
    async handleDelete(index, row) {
      let { code, msg } = await goodsDelete({ id: row.id });
      if (code === 0) {
        this.getData();
      }
    }
  },

  // 过滤器
  filters: {
    // 过滤时间
    filterCtime(ctime) {
      return moment(ctime).format("YYYY-MM-DD HH:mm:ss");
    },
    // 过滤特色
    filterFeature(goodsfeature) {
      return JSON.parse(goodsfeature).join(" 、 ");
    },
    // 过滤规格
    filterStandard(standard) {
      standard = JSON.parse(standard);
      let data = standard.map(value => {
        return `商品规格:${value.goodsstandard} 
                包装费:${value.packingexpense}元 
                价格:${value.goodsPrice}元`;
      });
      return data.join(" 、 ");
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.demo-table-expand {
  font-size: 0;
}
/deep/.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
/deep/.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.page-block {
  margin-top: 20px;
}
.avatarImg {
  width: 70px;
  border-radius: 5px;
}
</style>