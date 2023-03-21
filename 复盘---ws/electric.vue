<template>
  <div class="InspectRecord layoutInTHis">
    <div class="leftTimeLine">
      <div style="width: calc(100% + 2px)" v-for="(item, index) in timeList" :key="index + 'index'">
        <div class="timeListSingle" :class="{'activeBgColor': index === chooseOne}" @click="searchTime(item, index)">
          <span class="listName" :class="{'activeFont': index === chooseOne}">{{ item }}</span>
        </div>
      </div>
    </div>
    <div class="rightTimeLine columnBetween">
      <div class="navigation fullWidth marginBottom15 columnBetween">
        <div class="startCenter">
          <span class="titleBefore"></span>
          <span class="title">信息情况</span>
        </div>
        <div class="fullWidth marginTop15">
          <el-descriptions class="margin-top" :column="2" border>
            <el-descriptions-item v-for="(item, index) in infoArr" :key="index + item + 'item'">
              <template slot="label">
                {{ item.name }}
              </template>
              <span v-if="!item.show">{{ item.content }}</span>
              <el-checkbox-group v-if="item.show" v-model="item.checked" @change="handleChange(index, item)">-->
                <el-checkbox v-for="(item) in item.list" :label="item" :key="item">{{ item }}</el-checkbox>
              </el-checkbox-group>
            </el-descriptions-item>
            <!--            <el-descriptions-item>-->
            <!--              <template slot="label">-->
            <!--                开关站名称-->
            <!--              </template>-->
            <!--              上海路098供电所-->
            <!--            </el-descriptions-item>-->
            <!--            <el-descriptions-item>-->
            <!--              <template slot="label">-->
            <!--                供电所-->
            <!--              </template>-->
            <!--              西湖汉滨供电所-->
            <!--            </el-descriptions-item>-->
            <!--            <el-descriptions-item>-->
            <!--              <template slot="label">-->
            <!--                开关站门锁-->
            <!--              </template>-->
            <!--              <el-checkbox-group v-model="lockChecked" @change="handleCheckedChange">-->
            <!--                <el-checkbox v-for="(item) in lockList" :label="item" :key="item">{{ item }}</el-checkbox>-->
            <!--              </el-checkbox-group>-->
            <!--            </el-descriptions-item>-->
            <!--            <el-descriptions-item>-->
            <!--              <template slot="label">-->
            <!--                站点类型-->
            <!--              </template>-->
            <!--              <el-checkbox-group v-model="stationType" @change="handleStation">-->
            <!--                <el-checkbox v-for="(item) in stationList" :label="item" :key="item">{{ item }}</el-checkbox>-->
            <!--              </el-checkbox-group>-->
            <!--            </el-descriptions-item>-->
            <!--            <el-descriptions-item>-->
            <!--              <template slot="label">-->
            <!--                加热器-->
            <!--              </template>-->
            <!--              <el-checkbox-group v-model="humidifier" @change="handleHumidifier">-->
            <!--                <el-checkbox v-for="(item) in humidifierList" :label="item" :key="item">{{ item }}</el-checkbox>-->
            <!--              </el-checkbox-group>-->
            <!--            </el-descriptions-item>-->
            <!--            <el-descriptions-item>-->
            <!--              <template slot="label">-->
            <!--                除湿机-->
            <!--              </template>-->
            <!--              <el-checkbox-group v-model="dehumidifier" @change="handleDehumidifier">-->
            <!--                <el-checkbox v-for="(item) in dehumidifierList" :label="item" :key="item">{{ item }}</el-checkbox>-->
            <!--              </el-checkbox-group>-->
            <!--            </el-descriptions-item>-->
            <!--            <el-descriptions-item>-->
            <!--              <template slot="label">-->
            <!--                详细地址-->
            <!--              </template>-->
            <!--              XX省XX市XXX区XXX路XXX单元XXX栋XXX号XXXXXXXX设备-->
            <!--            </el-descriptions-item>-->
          </el-descriptions>
        </div>
      </div>
    </div>
  </div>
</template>
<script></script>
<script>
module.exports = {
  name: "InspectRecord",
  data() {
    return {
      timeList: ['20210111', '20210222', '20210321', '20210412'],
      chooseOne: 0,
      titleArr: ['信息情况', '设备记录', '巡视记录'],
      infoArr: [
        {
          name: '开关站名称',
          content: '上海路098供电所',
          show: false,
        },
        {
          name: '供电所',
          content: '西湖汉滨供电所',
          show: false,

        },
        {
          name: '开关站门锁',
          checked: [],
          list: ['电磁锁', '挂锁'],
          show: true,
        },
        {
          name: '站点类型',
          checked: [],
          list: ['室内', '室外'],
          show: true,
        },
        {
          name: '加热器',
          checked: [],
          list: ['有', '运行', '断电', '无'],
          show: true,
        },
        {
          name: '除湿机',
          checked: [],
          list: ['有', '运行', '断电', '无'],
          show: true,
        },
      ],
      // lockList: ['电磁锁', '挂锁'],
      // stationList: ['室内', '室外'],
      // humidifierList: ['有', '运行', '断电', '无'],
      // dehumidifierList: ['有', '运行', '断电', '无'],
      // lockChecked: [],
      // stationType: [],
      // humidifier: [],
      // dehumidifier: []
    }
  },
  methods: {
    searchTime(item, index) {
      this.chooseOne = index
    },
    handleChange(index,value){
      console.log(index,value, 'erwerwerwerwe')
    },







    handleCheckedChange(value) {
      console.log(value, 'value')
    },
    handleStation(val) {
      console.log(val)
    },
    handleHumidifier(val) {
      console.log(val)
    },
    handleDehumidifier(val) {

    },

  }
}
</script>

<style scoped>

</style>
