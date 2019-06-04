<template>
  <div style="margin-left:80px">
    <div class="block" style="margin-top:10px; margin-bottom:30px">
      <div style="color:#409EFF; font-weight:bold; font-size:16px; margin-bottom:20px">药物处方</div>
      <div v-if="drugPlanItem.length == 0">暂时未开具处方</div>
      <div v-for="(drugUnit,idx) in drugPlanItem">
        <div style="margin:20px 0">
          <label style="margin:15px; color:#409EFF; font-size:15px">{{drugUnit.drugCategoryName}}</label>
          <el-table :data="drugUnit.drugAndUseageDtoList" border style="width: fit-content;">
            <!-- <el-table-column prop="category" label="药物类别" width="150"></el-table-column> -->
            <el-table-column prop="drug.drugName" label="药物名称" width="150"></el-table-column>
            <el-table-column prop="singleDose" label="单次剂量" width="100">
              <template scope="scope">
                <label>{{scope.row.followDrugUsage.drugDosage}}</label>
                <label>{{scope.row.followDrugUsage.drugDosageUnit}}</label> / 次
              </template>
            </el-table-column>
            <el-table-column prop="timeOfDay" label="服用频率" width="100">
              <template scope="scope">
                <label>{{scope.row.followDrugUsage.drugTime}}</label>次 /
                <label>{{scope.row.followDrugUsage.drugDay}}</label> 天
              </template>
            </el-table-column>
            <el-table-column prop="timeOfDay" label="服用周期" width="100">
              <template scope="scope">
                <label>{{scope.row.followDrugUsage.drugPeriod}}</label>
                <label>{{scope.row.followDrugUsage.drugPeriodUnit}}</label>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="editRow(idx,scope.$index, scope.row)"
                  type="text"
                  size="small"
                >编辑</el-button>
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, scope.row)"
                  type="text"
                  size="small"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div style="margin:10px 0">
        <el-button @click.native.prevent="addRow" type="text" size="medium">+添加新药物</el-button>
      </div>
    </div>
    <!-- 新增界面 -->
    <el-dialog title="添加药物" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="药品名称：">
          <el-cascader
            :options="drugItem"
            v-model="editForm.drug.drugInfo"
            :show-all-levels="false"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="药品备注：">
          <el-input
            v-model="editForm.followDrugUsage.drugRemark"
            auto-complete="off"
            style="width:200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="单次计量：" prop="drugDosage">
          <el-input
            v-model="editForm.followDrugUsage.drugDosage"
            auto-complete="off"
            style="width:50px"
          ></el-input>
          <el-select
            v-model="editForm.followDrugUsage.drugDosageUnit"
            placeholder="请选择药物规格"
            style="width:150px"
          >
            <el-option label="粒" value="粒"></el-option>
            <el-option label="片" value="片"></el-option>
            <el-option label="袋" value="袋"></el-option>
            <el-option label="ml" value="ml"></el-option>
            <el-option label="mg" value="mg"></el-option>
            <el-option label="g" value="g"></el-option>
          </el-select>/ 次
        </el-form-item>
        <el-form-item label="服用频率：" prop="drugTime">
          <el-input
            v-model="editForm.followDrugUsage.drugTime"
            auto-complete="off"
            style="width:50px"
          ></el-input>次 /
          <el-input
            v-model="editForm.followDrugUsage.drugDay"
            auto-complete="off"
            style="width:50px"
          ></el-input>天
        </el-form-item>
        <el-form-item label="服用周期：" prop="drugPeriod">
          <el-input
            v-model="editForm.followDrugUsage.drugPeriod"
            auto-complete="off"
            style="width:50px"
          ></el-input>
          <el-select
            v-model="editForm.followDrugUsage.drugPeriodUnit"
            placeholder="请选择周期单位"
            style="width:150px"
          >
            <el-option label="天" value="天"></el-option>
            <el-option label="周" value="周"></el-option>
            <el-option label="月" value="月"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="药品名称：" prop="drugName">
          <el-input v-model="editForm.drug.drugName" auto-complete="off" style="width:150px"></el-input>
        </el-form-item>
        <el-form-item label="单次计量：" prop="drugName">
          <el-input
            v-model="editForm.followDrugUsage.drugDosage"
            auto-complete="off"
            style="width:50px"
          ></el-input>
          <el-select
            v-model="editForm.followDrugUsage.drugDosageUnit"
            placeholder="请选择药物规格"
            style="width:80px"
          >
            <el-option label="粒" value="粒"></el-option>
            <el-option label="片" value="片"></el-option>
            <el-option label="袋" value="袋"></el-option>
            <el-option label="ml" value="ml"></el-option>
            <el-option label="mg" value="mg"></el-option>
            <el-option label="g" value="g"></el-option>
          </el-select>/ 次
        </el-form-item>
        <el-form-item label="服用频率：" prop="drugName">
          <el-input
            v-model="editForm.followDrugUsage.drugTime"
            auto-complete="off"
            style="width:50px"
          ></el-input>次 /
          <el-input
            v-model="editForm.followDrugUsage.drugDay"
            auto-complete="off"
            style="width:50px"
          ></el-input>天
        </el-form-item>
        <el-form-item label="服用周期：" prop="drugName">
          <el-input
            v-model="editForm.followDrugUsage.drugPeriod"
            auto-complete="off"
            style="width:50px"
          ></el-input>
          <el-select
            v-model="editForm.followDrugUsage.drugPeriodUnit"
            placeholder="周期单位"
            style="width:80px"
          >
            <el-option label="天" value="天"></el-option>
            <el-option label="周" value="周"></el-option>
            <el-option label="月" value="月"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import util from "../../common/js/util";
import { patientData } from "../../common/js/data";
import { patientApi, recordApi } from "../../api/api";
export default {
  data() {
    return {
      drugPlanItem: Object.assign([], patientData.drugPlanItem),
      liverKidneyExam: Object.assign([], patientData.liverKidneyItem),
      bloodLipidExam: Object.assign([], patientData.bloodLipidItem),
      coagulationExam: Object.assign([], patientData.coagulationItem),
      drugItem: Object.assign([], patientData.drugItem),
      editFormVisible: false, //编辑界面是否显示
      addFormVisible: false,
      editLoading: false,
      editForm: {
        drug: {
          drugName: "",
          drugInfo: []
        },
        followDrugUsage: {
          drugUsageId: "",
          drugDosage: "",
          drugDosageUnit: "粒",
          drugTime: "",
          drugDay: "",
          drugPeriod: "",
          drugPeriodUnit: "天",
          drugId: "",
          medicalHistoryId: "",
          followUpIndex: "",
          drugRemark: ""
        }
      },
      editFormRules: {
        // drugName: [{ required: true, message: "请输入", trigger: "blur" }]
        // drugDosage:[{required:true, message:"请输入", trigger:"blur"}],
        // drugDosageUnit:[{required:true, message:"请输入", trigger:"blur"}],
        // drugTime:[{required:true, message:"请输入", trigger:"blur"}],
        // drugDay:[{required:true, message:"请输入", trigger:"blur"}],
        // drugPeriod:[{required:true, message:"请输入", trigger:"blur"}],
        // drugPeriodUnit:[{required:true, message:"请输入", trigger:"blur"}]
      }
    };
  },
  methods: {
    /**
     * 删除药品用法用量
     */
    deleteRow(index, rows) {
      this.$confirm("确认删除吗？", "提示", {})
        .then(() => {
          recordApi.deleteDrugUsage(rows.followDrugUsage).then(res => {
            if (res.code !== "0000") {
              this.$message({
                message: "删除失败",
                type: "warning"
              });
              return;
            }
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getDetail();
          });
        })
        .catch(() => {});
    },
    /**
     * 显示编辑界面
     */
    editRow(idx, index, row) {
      console.log(idx, index, row);
      console.log(JSON.stringify(row));
      this.editForm = { ...this.editForm, ...row };
      this.editFormVisible = true;
    },
    /**
     * 显示新增界面
     */
    addRow() {
      this.addFormVisible = true;
    },
    /**
     * 刷新界面数据
     */
    getDetail: function() {
      var params = {
        medicalHistoryId: sessionStorage.getItem("currentMedicalHistory"),
        followUpIndexId: 0
      };
      recordApi.getDrugUsage(params).then(res => {
        // console.log(JSON.stringify(res));
        if (res.code !== "0000") {
          this.$message({
            message: "信息获取失败",
            type: "warning"
          });
          return;
        }
        this.drugPlanItem = res.data;
      });
    },
    /**
     * 新增药品用法用量
     */
    addSubmit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          //数据填充
          this.editForm.followDrugUsage.medicalHistoryId = sessionStorage.getItem(
            "currentMedicalHistory"
          );
          this.editForm.followDrugUsage.followUpIndex = 0;
          this.editForm.drug.drugCode = this.editForm.drug.drugInfo[0]
            ? this.editForm.drug.drugInfo[1]
            : "";
          var drugAndUseageDtoList = [];
          drugAndUseageDtoList.push(this.editForm);
          var queryDrugDto = {
            drugCategoryCode: this.editForm.drug.drugInfo[0]
              ? this.editForm.drug.drugInfo[0]
              : "",
            drugAndUseageDtoList: drugAndUseageDtoList
          };
          var queryDrugDtoList = [];
          queryDrugDtoList.push(queryDrugDto);
          console.log(JSON.stringify(queryDrugDtoList));
          //添加药品
          recordApi.addDrugUsage(queryDrugDtoList).then(res => {
            this.addFormVisible = false;
            if (res.code !== "0000") {
              this.$message({
                message: "新增失败",
                type: "warning"
              });
              return;
            }
            this.$message({
              message: "新增成功",
              type: "success"
            });
            //刷新数据
            this.getDetail();
          });
        }
      });
    },
    /**
     * 编辑药品用法用量
     */
    editSubmit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          var params = Object.assign({}, this.editForm);
          recordApi.updateDrugUsage(params).then(res => {
            this.editFormVisible = false;
            if (res.code != "0000") {
              this.$message({
                message: "更新失败",
                type: "warning"
              });
              return;
            }
            this.$message({
              message: "更新成功",
              type: "success"
            });
            //刷新数据
            this.getDetail();
          });
        }
      });
    }
  },
  mounted() {
    this.getDetail();
  }
};
</script>
<style>
.el-row {
  margin-bottom: 5px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-light {
  background: #e5e9f2;
}
</style>
