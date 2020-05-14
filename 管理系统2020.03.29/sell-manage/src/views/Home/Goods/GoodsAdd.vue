<template>
  <div class="goods-list">
    <!-- 使用面板插槽组件 -->
    <panel>
      <!-- 标题 -->
      <span slot="title">商品添加</span>
      <!-- 内容 -->
      <div slot="content">
        <!-- 商品添加表单 -->
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          style="width:600px"
        >
          <!-- 1 商品名称 -->
          <el-form-item label="商品名称" prop="goodsname">
            <el-input v-model="ruleForm.goodsname"></el-input>
          </el-form-item>

          <!-- 2 商品分类 -->
          <el-form-item label="商品分类" prop="goodscategory">
            <el-select v-model="ruleForm.goodscategory" placeholder="请选择商品分类">
              <el-option label="烟酒类" value="烟酒类"></el-option>
              <el-option label="火锅" value="火锅"></el-option>
              <el-option label="凉菜" value="凉菜"></el-option>
              <el-option label="热菜" value="热菜"></el-option>
              <el-option label="甜品" value="甜品"></el-option>
            </el-select>
          </el-form-item>

          <!-- 3 商品特色 -->
          <el-form-item label="商品特色" prop="goodsfeature">
            <el-checkbox-group v-model="ruleForm.goodsfeature">
              <el-checkbox label="新品上市" name="goodsfeature"></el-checkbox>
              <el-checkbox label="第二单半价" name="goodsfeature"></el-checkbox>
              <el-checkbox label="主打产品" name="goodsfeature"></el-checkbox>
              <el-checkbox label="火爆产品" name="goodsfeature"></el-checkbox>
              <el-checkbox label="祖传手艺" name="goodsfeature"></el-checkbox>
              <el-checkbox label="源自四川" name="goodsfeature"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <!-- 4 商品图片 -->
          <el-form-item label="商品图片" prop="imgUrl">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:5000/goods/upload"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="ruleForm.imgUrl" :src="imgServeUrl+ruleForm.imgUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <!-- 5 是否促销 -->
          <el-form-item label="是否促销" prop="isPromotion">
            <el-radio-group v-model="ruleForm.isPromotion">
              <el-radio label="促销"></el-radio>
              <el-radio label="不促销"></el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- 6 商品规格 -->
          <el-form-item label="商品规格" prop="goodsstandard">
            <el-radio-group v-model="ruleForm.goodsstandard">
              <el-radio label="单规格"></el-radio>
              <el-radio label="多规格"></el-radio>
            </el-radio-group>
          </el-form-item>

          <!-- ------------------------------单规格 开始----------------------------- -->
          <!-- 7 包装费 -->
          <el-form-item label="包装费" v-show="ruleForm.goodsstandard=='单规格'" prop="packingexpense">
            <el-input-number
              v-model="ruleForm.packingexpense"
              @change="packagingChange"
              :min="1"
              :max="99"
            ></el-input-number>
          </el-form-item>

          <!-- 8 价格 -->
          <el-form-item label="价格" v-show="ruleForm.goodsstandard=='单规格'" prop="goodsPrice">
            <el-input-number v-model="ruleForm.goodsPrice" @change="PriceChange" :min="1" :max="99"></el-input-number>
          </el-form-item>
          <!-- ------------------------------单规格 结束--------------------------- -->

          <!-- ------------------------------多规格 开始----------------------------- -->
          <!-- 商品规格：多规格 -->
          <el-form-item label="多规格" v-show="ruleForm.goodsstandard=='多规格'" prop="goodsstandard">
            <!-- 添加按钮 -->
            <el-button type="primary" size="small" @click="addStandard">添加规格</el-button>
            <!-- 模态框 -->
            <el-dialog title="添加规格" :visible.sync="dialogFormVisible" width="500px">
              <el-form :model="form">
                <!-- 1 选择规格 -->
                <el-form-item label="选择规格" label-width="150px">
                  <el-select v-model="form.goodsstandard" placeholder="请选择规格">
                    <el-option label="大规格" value="大规格"></el-option>
                    <el-option label="中规格" value="中规格"></el-option>
                    <el-option label="小规格" value="小规格"></el-option>
                  </el-select>
                </el-form-item>
                <!-- 2 包装费 -->
                <el-form-item label="包装费" label-width="150px" class="xxx">
                  <el-input-number
                    v-model="form.packingexpense"
                    @change="packagingChange1"
                    :min="1"
                    :max="99"
                  ></el-input-number>
                </el-form-item>
                <!-- 3 价格 -->
                <el-form-item label="价格" label-width="150px" class="xxx">
                  <el-input-number
                    v-model="form.goodsPrice"
                    @change="PriceChange1"
                    :min="1"
                    :max="99"
                  ></el-input-number>
                </el-form-item>
              </el-form>
              <!-- 模态框的取消确认按钮 -->
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveStandard">确 定</el-button>
              </div>
            </el-dialog>
            <!-- 表格 -->
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="goodsstandard" label="规格"></el-table-column>
              <el-table-column prop="packingexpense" label="包装费"></el-table-column>
              <el-table-column prop="goodsPrice" label="价格"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <!-- ------------------------------多规格 结束--------------------------- -->

          <!-- 9 商品描述 -->
          <el-form-item label="商品描述" prop="goodsdesc">
            <el-input type="textarea" v-model="ruleForm.goodsdesc"></el-input>
          </el-form-item>

          <!-- 10.提交表单 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </panel>
  </div>
</template>

<script>
// 引入面板组件
import Panel from "@/components/Panel.vue";
// 引入添加商品请求函数
import { addGoods } from "@/api/goods.js";

export default {
  // 注册面板组件
  components: {
    Panel
  },

  data() {
    return {
      // 表单数据
      ruleForm: {
        goodsname: "", //商品名称
        goodscategory: "", //商品分类
        goodsfeature: [], //商品特色
        imgUrl: "", //商品图片文件名
        isPromotion: "", //是否促销
        goodsstandard: "单规格", //商品规格
        packingexpense: 2, //包装费
        goodsPrice: 18, //价格
        goodsdesc: "" //商品描述
      },
      // 表格数据（多规格）
      tableData: [],
      // 图片所在服务器地址
      imgServeUrl: "http://localhost:5000/upload/imgs/",
      // 验证规则
      rules: {
        goodsname: [
          //1.商品名称
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        goodscategory: [
          //2.商品分类
          { required: true, message: "请选择商品分类", trigger: "change" }
        ],
        goodsfeature: [
          //3.商品特色
          {
            type: "array",
            required: true,
            message: "请至少选择一个商品特色",
            trigger: "change"
          }
        ],
        imgUrl: [
          //4.商品图片
          { required: true, message: "请上传商品图片", trigger: "blur" }
        ],
        isPromotion: [
          //5.是否促销
          { required: true, message: "请选择是否促销", trigger: "change" }
        ],
        goodsstandard: [
          //6.商品规格
          { required: true, message: "请选择商品规格", trigger: "change" }
        ],
        packingexpense: [
          //7.包装费
          { required: true, message: "请选择包装费", trigger: "change" }
        ],
        goodsPrice: [
          //8.价格
          { required: true, message: "请选择价格", trigger: "change" }
        ],
        goodsdesc: [
          //9.商品描述
          { required: true, message: "请填写商品描述", trigger: "blur" }
        ]
      },
      // 模态框
      dialogFormVisible: false,
      form: {
        goodsstandard: "中规格",
        packingexpense: 2,
        goodsPrice: 10
      }
    };
  },

  methods: {
    // 包装费改变时
    packagingChange(value) {
      console.log(value);
    },
    packagingChange1(value) {
      console.log(value);
    },
    // 价格改变时
    PriceChange(value) {
      console.log(value);
    },
    PriceChange1(value) {
      console.log(value);
    },
    // 图片上传前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 图片上传成功时
    handleAvatarSuccess(res, file) {
      // console.log(res,file) //{code: 0, msg: "上传成功!", imgUrl: "1586092119617.jpg"}
      let { code, msg, imgUrl } = res;
      if (code === 0) {
        // 弹提示
        this.$message({ type: "success", message: msg });
        // 回填图片文件名
        this.ruleForm.imgUrl = imgUrl;
      } else {
        this.$message({ type: "error", message: msg });
      }
    },
    // 表格的删除函数
    handleDelete(index, row) {
      this.tableData.splice(index, 1);
    },
    // 提交表单
    submitForm(formName) {
      // 收集参数
      let data = {
        goodsname: this.ruleForm.goodsname,
        goodscategory: this.ruleForm.goodscategory,
        goodsfeature: JSON.stringify(this.ruleForm.goodsfeature),
        imgUrl: this.ruleForm.imgUrl,
        isPromotion: this.ruleForm.isPromotion,
        standard:
          this.ruleForm.goodsstandard == "单规格"
            ? JSON.stringify([
                {
                  goodsstandard: this.ruleForm.goodsstandard,
                  packingexpense: this.ruleForm.packingexpense,
                  goodsPrice: this.ruleForm.goodsPrice
                }
              ])
            : JSON.stringify(this.tableData),
        goodsdesc: this.ruleForm.goodsdesc
      };
      // 触发所有前端验证
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //如果通过前端验证
          let { code, msg } = await addGoods(data);
          if (code === 0) {
            this.$refs.ruleForm.resetFields();
            location.href='/#/index/goodslist';
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 添加规格
    addStandard() {
      this.dialogFormVisible = true;
    },
    // 确定添加规格
    saveStandard() {
      this.tableData.unshift(this.form);
      this.form = {
        goodsstandard: "中规格",
        packingexpense: "",
        goodsPrice: ""
      };
      this.dialogFormVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
.xxx {
  margin: 20px 0;
}
</style>