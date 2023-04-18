<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px;">
      <el-card class="box-card" style="margin-bottom: 20px;">
        <div class="user">
          <img alt="" src="../assets/images/user.png">
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登陆时间：<span>2021-7-19</span></p>
          <p>上次登陆地点：<span>武汉</span></p>
        </div>
      </el-card>

      <el-card class="box-card">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            v-for="item in menuData" :key="item.title"
            :label="item.title"
            :prop="item.content"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="r-content">
        <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0}"
                 class="box-card num">
          <div class="card-wrapper">
            <div :style="`background: ${item.color}`" class="icon-wrapper">
              <i :class="`el-icon-${item.icon}`"
                 class="icon"></i>
            </div>
            <div class="detail">
              <p class="price">{{ item.value }}</p>
              <p class="desc">{{ item.name }}</p>
            </div>
          </div>
        </el-card>

        <el-card style="height: 280px;width: 100%;" :body-style="{height: '100%', width: '100%'}">
<!--          :body-style="{height: '280px', width: '100%'}"-->
          <!--          <div id="lineChart" style="width: 100%;height: 280px;">a a a </div>-->
          <div ref="lineChart" style="width: 100%;height: 280px;"></div>
        </el-card>

        <div class="twoCharts">
          <el-card style="height: 260px;width: 48%;" :body-style="{height: '100%', width: '100%'}">
            <div ref="barChart" style="width: 100%;height: 100%;"></div>
          </el-card>
          <el-card style="height: 260px;width: 48%;" :body-style="{height: '100%', width: '100%'}">
            <div ref="pieChart" style="width: 100%;height: 100%;"></div>
          </el-card>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import * as echarts from 'echarts';
import request from '@/utils/request';

export default {
  name: 'Home',
  data() {
    return {
      tableData: [],
      menuData: [
        {
          title: '课程',
          content: 'name'
        },
        {
          title: '今日购买',
          content: 'todayBuy'
        },
        {
          title: '本月购买',
          content: 'monthBuy'
        },
        {
          title: '总购买',
          content: 'totalBuy'
        }
      ],
      countData: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9',
        },
        {
          name: '今日收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980',
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef',
        },
        {
          name: '本月支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9',
        },
        {
          name: '本月收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980',
        },
        {
          name: '本月未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef',
        },
      ],
      options: {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }
    };
  },
  mounted() {
    //获取数据
    request('/home/getData', 'get')
      .then(res => {

        //表格
        this.tableData=res.data.tableData

        //折线图

        var myChart1 = echarts.init(this.$refs.lineChart);

        let lineData=res.data.orderData;
        let keyData1=Object.keys(lineData.data[0])
        let valueData1=[];
        for(let i=0;i<lineData.data.length-1 ;i++){
            valueData1.unshift({
              name:keyData1[i],
              data:Object.values(lineData.data[i]),
              type:'line'
            })
        }
        myChart1.setOption({
          xAxis: {
            type: 'category',
            data: keyData1
          },
          yAxis: {
            type: 'value'
          },
          series: valueData1,
          legend:{
            data:keyData1
          }
        });


        //柱状图
        var myChart2 = echarts.init(this.$refs.barChart);
        let barChart=res.data.userData;
        let dateArr=[]
        barChart.forEach(item=>{
          dateArr.push(item.date)
        })
        // 使用刚指定的配置项和数据显示图表。
        myChart2.setOption({
          tooltip: {},
          legend: {
            data: ['新增用户','活跃用户']
          },
          xAxis: {
            data: dateArr
          },
          yAxis: {},
          series: [
            {
              name: '新增用户',
              type: 'bar',
              data: barChart.map(item=>item.new)
            },
            {
              name: '活跃用户',
              type: 'bar',
              data: barChart.map(item=>item.active)
            }
          ]
        });

        //饼状图
        var myChart3 = echarts.init(this.$refs.pieChart);
        let pieChart=res.data.videoData;
        myChart3.setOption({
          tooltip: {
            trigger: 'item'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '80%',
              data: pieChart,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      });
  }
};
</script>

<style lang="scss" scoped>
.user {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;

  & img {
    width: 150px;
    border-radius: 50%;
  }

  & > .userInfo {
    font-size: 16px;

    & > .access {
      color: #999999;
    }
  }

}

.login-info {
  & p {
    color: #999999;
    font-size: 14px;

    & span {
      color: #666666;
      margin-left: 60px;
    }
  }

}

.r-content {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-left: 20px;

  & > .num {
    width: 32%;
    margin-bottom: 20px;
  }

  & .card-wrapper {
    display: flex;

    & > .icon-wrapper {
      width: 80px;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;

      & > i {
        font-size: 30px;
        color: #fff;
      }
    }

    & > .detail {
      display: flex;
      flex-direction: column;
      justify-content: center;

      & > .price {
        font-size: 30px;
        color: #303133;
        margin-bottom: 10px;
      }

      & > .desc {
        font-size: 14px;
        color: #999999;
      }
    }
  }
  
  &>.twoCharts{
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
}

</style>