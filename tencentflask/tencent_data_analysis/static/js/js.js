$(function () {
  // alert("ok");
  // 请求数据
  $.ajax({
    type: 'get',
    url: '/get_echart_data',
    dataType: 'json',
    success: function (result) {
      // console.log(result['data']);
      // 调用echarts
      // alert(result);
      // if (result.status == "success") {
      //   alert("ok");
      // }
      // else {
      //   alert("nook");
      // }
      // alert("get_echart_dataok");
      echarts_1(result);
      echarts_2(result);
      echarts_4(result);
      echarts_5(result);
      echarts_6(result);
      echarts_31(result);
      echarts_32(result);
      echarts_33(result);
      map(result);
    }
  });



  function map (input_data) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('map_1'));
    var data = input_data['map']['data'];

    // 经纬度信息
    var geoCoordMap = {
      '北京': [116.40717, 39.90469],
      '天津': [117.19937, 39.0851],
      '上海': [121.4737, 31.23037],
      '重庆': [106.55073, 29.56471],
      '香港': [114.16546, 22.27534],
      '澳门': [113.54913, 22.19875],
      '石家庄': [114.5143, 38.04276],
      '唐山': [118.18058, 39.63048],
      '秦皇岛': [119.59964, 39.93545],
      '邯郸': [114.53918, 36.62556],
      '邢台': [114.50443, 37.07055],
      '保定': [115.46459, 38.87396],
      '张家口': [114.88755, 40.82444],
      '承德': [117.9634, 40.9515],
      '沧州': [116.83869, 38.30441],
      '廊坊': [116.68376, 39.53775],
      '衡水': [115.67054, 37.73886],
      '郑州': [113.62493, 34.74725],
      '开封': [114.30731, 34.79726],
      '洛阳': [112.45361, 34.61812],
      '平顶山': [113.19241, 33.76609],
      '安阳': [114.3931, 36.09771],
      '鹤壁': [114.29745, 35.747],
      '新乡': [113.92675, 35.30323],
      '焦作': [113.24201, 35.21563],
      '濮阳': [115.02932, 35.76189],
      '许昌': [113.85233, 34.0357],
      '漯河': [114.01681, 33.58149],
      '三门峡': [111.2003, 34.77261],
      '南阳': [112.52851, 32.99073],
      '商丘': [115.65635, 34.41427],
      '信阳': [114.09279, 32.14714],
      '周口': [114.69695, 33.62583],
      '驻马店': [114.02299, 33.01142],
      '济南': [117.12009, 36.65184],
      '青岛': [120.38299, 36.06623],
      '淄博': [118.0548, 36.8131],
      '枣庄': [117.32196, 34.81071],
      '东营': [118.67466, 37.43365],
      '烟台': [121.44801, 37.46353],
      '潍坊': [119.16176, 36.70686],
      '济宁': [116.58724, 35.41459],
      '泰安': [117.0884, 36.19994],
      '威海': [122.12171, 37.51348],
      '日照': [119.52719, 35.41646],
      '莱芜': [117.67667, 36.21359],
      '临沂': [118.35646, 35.10465],
      '德州': [116.35927, 37.4355],
      '聊城': [115.98549, 36.45702],
      '滨州': [117.97279, 37.38211],
      '菏泽': [115.48115, 35.23363],
      '太原': [112.556252, 37.876876],
      '大同': [113.304424, 40.081863],
      '阳泉': [113.58047, 37.85668],
      '长治': [113.11649, 36.19581],
      '晋城': [112.85113, 35.49039],
      '朔州': [112.439374, 39.357422],
      '晋中': [112.75278, 37.68702],
      '运城': [111.00699, 35.02628],
      '忻州': [112.73418, 38.4167],
      '临汾': [111.51962, 36.08822],
      '吕梁': [111.14165, 37.51934],
      '沈阳': [123.4631, 41.67718],
      '大连': [121.61476, 38.91369],
      '鞍山': [122.9946, 41.10777],
      '抚顺': [123.95722, 41.87971],
      '本溪': [123.76686, 41.29413],
      '丹东': [124.35601, 39.9998],
      '锦州': [121.12703, 41.09515],
      '营口': [122.2349, 40.66683],
      '阜新': [121.67011, 42.02166],
      '辽阳': [123.23736, 41.26809],
      '盘锦': [122.07078, 41.11996],
      '铁岭': [123.84241, 42.2862],
      '朝阳': [120.4508, 41.57347],
      '葫芦岛': [120.83699, 40.711],
      '长春': [125.32357, 43.81602],
      '吉林': [126.54944, 43.83784],
      '四平': [124.35036, 43.16646],
      '辽源': [125.14368, 42.88805],
      '通化': [125.9399, 41.72829],
      '白山': [126.42443, 41.9408],
      '松原': [124.82515, 45.1411],
      '白城': [122.83871, 45.6196],
      '延边朝鲜族自治州': [129.5091, 42.89119],
      '哈尔滨': [126.5358, 45.80216],
      '齐齐哈尔': [123.91796, 47.35431],
      '鸡西': [130.96954, 45.29524],
      '鹤岗': [130.29785, 47.34989],
      '双鸭山': [131.1591, 46.64658],
      '大庆': [125.110961, 46.595319],
      '伊春': [128.84049, 47.72752],
      '佳木斯': [130.31882, 46.79977],
      '七台河': [131.00306, 45.77065],
      '牡丹江': [129.63244, 44.55269],
      '黑河': [127.52852, 50.24523],
      '绥化': [126.96932, 46.65246],
      '大兴安岭地区': [124.59216, 51.92398],
      '南京': [118.79647, 32.05838],
      '无锡': [120.31237, 31.49099],
      '徐州': [117.28577, 34.2044],
      '常州': [119.97365, 31.81072],
      '苏州': [120.58319, 31.29834],
      '南通': [120.89371, 31.97958],
      '连云港': [119.22295, 34.59669],
      '淮安': [119.01595, 33.61016],
      '盐城': [120.16164, 33.34951],
      '扬州': [119.41269, 32.39358],
      '镇江': [119.425, 32.18959],
      '泰州': [119.92554, 32.45546],
      '宿迁': [118.27549, 33.96193],
      '杭州': [120.15515, 30.27415],
      '宁波': [121.55027, 29.87386],
      '温州': [120.69939, 27.99492],
      '嘉兴': [120.7555, 30.74501],
      '湖州': [120.08805, 30.89305],
      '绍兴': [120.5802, 30.03033],
      '金华': [119.64759, 29.07812],
      '衢州': [118.87419, 28.93592],
      '舟山': [122.20778, 29.98539],
      '台州': [121.42056, 28.65611],
      '丽水': [119.92293, 28.4672],
      '合肥': [117.22901, 31.82057],
      '芜湖': [118.43313, 31.35246],
      '蚌埠': [117.38932, 32.91548],
      '淮南': [116.9998, 32.62549],
      '马鞍山': [118.50611, 31.67067],
      '淮北': [116.79834, 33.95479],
      '铜陵': [117.81232, 30.94486],
      '安庆': [117.06354, 30.54294],
      '黄山': [118.33866, 29.71517],
      '滁州': [118.31683, 32.30181],
      '阜阳': [115.81495, 32.88963],
      '宿州': [116.96391, 33.64614],
      '六安': [116.52324, 31.73488],
      '亳州': [115.77931, 33.84461],
      '池州': [117.49142, 30.66469],
      '宣城': [118.75866, 30.94078],
      '福州': [119.29647, 26.07421],
      '厦门': [118.08948, 24.47951],
      '莆田': [119.00771, 25.454],
      '三明': [117.63922, 26.26385],
      '泉州': [118.67587, 24.87389],
      '漳州': [117.64725, 24.51347],
      '南平': [118.12043, 27.33175],
      '龙岩': [117.01722, 25.07504],
      '宁德': [119.54819, 26.66571],
      '南昌': [115.85794, 28.68202],
      '景德镇': [117.17839, 29.26869],
      '萍乡': [113.85427, 27.62289],
      '九江': [116.00146, 29.70548],
      '新余': [114.91713, 27.81776],
      '鹰潭': [117.06919, 28.26019],
      '赣州': [114.93476, 25.83109],
      '吉安': [114.99376, 27.11382],
      '宜春': [114.41612, 27.81443],
      '抚州': [116.35809, 27.94781],
      '上饶': [117.94357, 28.45463],
      '武汉': [114.30525, 30.59276],
      '黄石': [115.0389, 30.19953],
      '十堰': [110.79801, 32.62918],
      '宜昌': [111.28642, 30.69186],
      '襄阳': [112.12255, 32.009],
      '鄂州': [114.89495, 30.39085],
      '荆门': [112.19945, 31.03546],
      '孝感': [113.91645, 30.92483],
      '荆州': [112.24069, 30.33479],
      '黄冈': [114.87238, 30.45347],
      '咸宁': [114.32245, 29.84126],
      '随州': [113.38262, 31.69013],
      '恩施土家族苗族自治州': [109.48817, 30.27217],
      '长沙': [112.93886, 28.22778],
      '株洲': [113.13396, 27.82767],
      '湘潭': [112.94411, 27.82975],
      '衡阳': [112.57195, 26.89324],
      '邵阳': [111.4677, 27.2389],
      '岳阳': [113.12919, 29.35728],
      '常德': [111.69854, 29.03158],
      '张家界': [110.47839, 29.11667],
      '益阳': [112.35516, 28.55391],
      '郴州': [113.01485, 25.77063],
      '永州': [111.61225, 26.42034],
      '怀化': [110.0016, 27.56974],
      '娄底': [111.99458, 27.69728],
      '湘西土家族苗族自治州': [109.73893, 28.31173],
      '广州': [113.26436, 23.12908],
      '韶关': [113.59723, 24.81039],
      '深圳': [114.05956, 22.54286],
      '珠海': [113.57668, 22.27073],
      '汕头': [116.68221, 23.3535],
      '佛山': [113.12192, 23.02185],
      '江门': [113.08161, 22.57865],
      '湛江': [110.35894, 21.27134],
      '茂名': [110.92523, 21.66329],
      '肇庆': [112.46528, 23.0469],
      '惠州': [114.41679, 23.11075],
      '梅州': [116.12264, 24.28844],
      '汕尾': [115.37514, 22.78566],
      '河源': [114.70065, 23.74365],
      '阳江': [111.98256, 21.85829],
      '清远': [113.05615, 23.68201],
      '东莞': [113.75179, 23.02067],
      '中山': [113.3926, 22.51595],
      '潮州': [116.62296, 23.6567],
      '揭阳': [116.37271, 23.54972],
      '云浮': [112.04453, 22.91525],
      '海口': [110.19989, 20.04422],
      '三亚': [109.51209, 18.25248],
      '三沙': [112.33356, 16.83272],
      '儋州': [109.58069, 19.52093],
      '成都': [104.06476, 30.5702],
      '自贡': [104.77844, 29.3392],
      '攀枝花': [101.71872, 26.58228],
      '泸州': [105.44257, 28.8717],
      '德阳': [104.3979, 31.12679],
      '绵阳': [104.6796, 31.46751],
      '广元': [105.84357, 32.43549],
      '遂宁': [105.59273, 30.53286],
      '内江': [105.05844, 29.58015],
      '乐山': [103.76539, 29.55221],
      '南充': [106.11073, 30.83731],
      '眉山': [103.84851, 30.07563],
      '宜宾': [104.6417, 28.7513],
      '广安': [106.63322, 30.45596],
      '达州': [107.46791, 31.20864],
      '雅安': [103.0424, 30.01053],
      '巴中': [106.74733, 31.86715],
      '资阳': [104.62798, 30.12859],
      '阿坝藏族羌族自治州': [102.22477, 31.8994],
      '甘孜藏族自治州': [101.96254, 30.04932],
      '凉山彝族自治州': [102.26746, 27.88164],
      '贵阳': [106.63024, 26.64702],
      '六盘水': [104.83023, 26.59336],
      '遵义': [106.92723, 27.72545],
      '安顺': [105.9462, 26.25367],
      '毕节': [105.30504, 27.29847],
      '铜仁': [109.18099, 27.69066],
      '黔西南布依族苗族自治州': [104.90437, 25.08988],
      '黔东南苗族侗族自治州': [107.98416, 26.58364],
      '黔南布依族苗族自治州': [107.52226, 26.25427],
      '昆明': [102.83322, 24.87966],
      '曲靖': [103.79625, 25.49002],
      '玉溪': [102.54714, 24.3518],
      '保山': [99.16181, 25.11205],
      '昭通': [103.7168, 27.33817],
      '丽江': [100.2271, 26.85648],
      '普洱': [100.96624, 22.82521],
      '临沧': [100.08884, 23.88426],
      '楚雄彝族自治州': [101.52767, 25.04495],
      '红河哈尼族彝族自治州': [103.3756, 23.36422],
      '文山壮族苗族自治州': [104.21504, 23.39849],
      '西双版纳傣族自治州': [100.79739, 22.00749],
      '大理白族自治州': [100.26764, 25.60648],
      '德宏傣族景颇族自治州': [98.58486, 24.43232],
      '怒江傈僳族自治州': [98.8567, 25.81763],
      '迪庆藏族自治州': [99.70305, 27.81908],
      '西安': [108.93984, 34.34127],
      '铜川': [108.94515, 34.89673],
      '宝鸡': [107.23732, 34.36194],
      '咸阳': [108.70929, 34.32932],
      '渭南': [109.51015, 34.49997],
      '延安': [109.48978, 36.58529],
      '汉中': [107.02377, 33.06761],
      '榆林': [109.73458, 38.2852],
      '安康': [109.02932, 32.68486],
      '商洛': [109.94041, 33.87036],
      '兰州': [103.83417, 36.06138],
      '嘉峪关': [98.29011, 39.77201],
      '金昌': [102.18759, 38.52006],
      '白银': [104.13773, 36.5447],
      '天水': [105.72486, 34.58085],
      '武威': [102.63797, 37.9282],
      '张掖': [100.44981, 38.92592],
      '平凉': [106.6653, 35.54303],
      '酒泉': [98.49394, 39.73255],
      '庆阳': [107.64292, 35.70978],
      '定西': [104.62524, 35.58113],
      '陇南': [104.92166, 33.401],
      '临夏回族自治州': [103.21091, 35.60122],
      '甘南藏族自治州': [102.91102, 34.98327],
      '西宁': [101.77782, 36.61729],
      '海东': [102.40173, 36.48209],
      '海北藏族自治州': [100.90096, 36.95454],
      '黄南藏族自治州': [102.01507, 35.51991],
      '海南藏族自治州': [100.62037, 36.28663],
      '果洛藏族自治州': [100.24475, 34.47141],
      '玉树藏族自治州': [97.0065, 33.00528],
      '海西蒙古族藏族自治州': [97.37122, 37.3771],
      '南宁': [108.3669, 22.81673],
      '柳州': [109.41552, 24.32543],
      '桂林': [110.29002, 25.27361],
      '梧州': [111.27917, 23.47691],
      '北海': [109.12008, 21.48112],
      '防城港': [108.35472, 21.68713],
      '钦州': [108.65431, 21.9797],
      '贵港': [109.59764, 23.11306],
      '玉林': [110.18098, 22.65451],
      '百色': [106.61838, 23.90216],
      '贺州': [111.56655, 24.40346],
      '河池': [108.0854, 24.69291],
      '来宾': [109.22238, 23.7521],
      '崇左': [107.36485, 22.37895],
      '呼和浩特': [111.75199, 40.84149],
      '包头': [109.84021, 40.65781],
      '乌海': [106.79546, 39.65384],
      '赤峰': [118.88894, 42.2586],
      '通辽': [122.24469, 43.65247],
      '鄂尔多斯': [109.78087, 39.60845],
      '呼伦贝尔': [119.76584, 49.21163],
      '巴彦淖尔': [107.38773, 40.74317],
      '乌兰察布': [113.13376, 40.99391],
      '兴安盟': [122.03818, 46.08208],
      '锡林郭勒盟': [116.04775, 43.9332],
      '阿拉善盟': [105.72898, 38.85153],
      '银川': [106.23248, 38.48644],
      '石嘴山': [106.38418, 38.9841],
      '吴忠': [106.19879, 37.99755],
      '固原': [106.24259, 36.0158],
      '中卫': [105.19676, 37.50026],
      '拉萨': [91.1145, 29.64415],
      '日喀则': [88.88116, 29.26705],
      '昌都': [97.17225, 31.14073],
      '林芝': [94.36155, 29.64895],
      '山南': [91.77313, 29.23705],
      '那曲': [92.05136, 31.47614],
      '阿里地区': [81.1454, 30.40051],
      '乌鲁木齐': [87.61688, 43.82663],
      '克拉玛依': [84.88927, 45.57999],
      '吐鲁番': [89.18954, 42.9513],
      '哈密': [93.51538, 42.81855],
      '昌吉回族自治州': [87.30822, 44.01117],
      '博尔塔拉蒙古自治州': [82.06665, 44.90597],
      '巴音郭楞蒙古自治州': [86.14517, 41.76404],
      '阿克苏地区': [80.26008, 41.16842],
      '克孜勒苏柯尔克孜自治州': [76.16661, 39.7153],
      '喀什地区': [75.98976, 39.47042],
      '和田地区': [79.92247, 37.11431],
      '伊犁哈萨克自治州': [81.32416, 43.91689],
      '塔城地区': [82.98046, 46.74532],
      '阿勒泰地区': [88.14023, 47.84564]
    };
    // 拼接数据
    var convertData = function (data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        console.log(data[i])
        var data_name = data[i].name;
        if(data_name.substring(data_name.length-1) == '市')
           data_name = data_name.substring(0,data_name.length-1);
        //var geoCoord = geoCoordMap[data[i].name];
        var geoCoord = geoCoordMap[data_name];
        console.log(geoCoord)
        if (geoCoord) {
          res.push({
            //name: data[i].name,
            name: data_name,
            value: geoCoord.concat(data[i].value)
          });
        }
      }
      console.log(res)
      return res;
    };

    option = {
      tooltip: {
        trigger: 'item',
        formatter: function(data){
            return data.data.name + "：" + data.data.value[2]
        }
      },

      geo: {
        map: 'china',
        label: {
          // 显示各个省份名称

          emphasis: {
            show: true,
            color: '#fff'
          }
        },
        roam: false,//禁止其放大缩小
        itemStyle: {
          normal: {
            areaColor: '#deedff',
            borderColor: '#002097'
          },
          emphasis: {
            areaColor: '#ff4d4f'
          }
        }
      },
      series: [
        {
          name: '岗位数据',
          type: 'scatter',
          coordinateSystem: 'geo',
          data: convertData(data),
          // symbolSize: function (val) {
          //     return val[2] / 15;
          // },
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: false
            },
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              show:false,
              color: '#4ac8ff'
            }
          }
        },
        {
          name: 'Top 5',
          // top5的显示图形
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: convertData(data.sort(function (a, b) {
            return b.value - a.value;
          }).slice(0, 5)),
          symbolSize: function (val) {
            return val[2] / 10;
          },
          // 气泡特效
          showEffectOn: 'render',
          rippleEffect: {
            // 气泡动画样式
            brushType: 'stroke'
          },
          // 是否开启鼠标滑过的动画样式
          hoverAnimation: true,
          label: {
            normal: {
              formatter: '{c}',
              position: 'right',
              show: false
            }
          },
          itemStyle: {
            normal: {
              // 气泡颜色
              color: '#3635ff'
            }
          }
        }

      ]
    };

    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  function echarts_1 (data) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart1'));

    option = {
      // backgroundColor: "#0f375f",
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      grid: {
        left: '0',
        right: '4%',
        bottom: '0',
        top: '8%',
        containLabel: true
      },

      legend: {
        top: "2%",
        right: '10',
        textStyle: {
          color: "rgba(253,253,255,0.5)",
          fontSize: "12"
        },
      },

      xAxis: {
        name: "行业",
        type: 'category',
        data: data['echart_1']['x_name'],
        axisLine: {
          show: true, //隐藏X轴轴线
          lineStyle: {
            color: '#26D9FF',
            width: 2
          }
        },
        axisTick: {
          show: true //隐藏X轴刻度
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "rgba(113,204,161,0.6)", //X轴文字颜色
            fontSize: 12
          }
        },

      },
      yAxis: [{
        color: "rgba(255,255,255,.6)",
        type: "value",
        name: "岗位数量",
        min: 0,
        max: 500,
        interval: 100,
        nameTextStyle: {
          color: "#ebf8ac",
          fontSize: 16
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: true
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#26D9FF',
            width: 2
          }
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "rgba(250,250,250,0.6)",
            fontSize: 16
          }
        },

      },
      {
        show: false

      }
      ],
      series: [{
        name: "岗位数量",
        type: "line",
        yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
        smooth: true, //平滑曲线显示
        showAllSymbol: true, //显示所有图形。
        symbol: "circle", //标记的图形为实心圆
        symbolSize: 8, //标记的大小
        itemStyle: {
          //折线拐点标志的样式
          color: "#eb2bd1",
          borderColor: "#3D7EEB",
          width: 2,
          shadowColor: "#3D7EEB",
          shadowBlur: 4
        },
        lineStyle: {
          color: "#c1ff38",
          width: 2,
          shadowColor: "#3D7EEB",
          shadowBlur: 4
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: "rgba(61,126,235, 0.5)"
          },
          {
            offset: 1,
            color: "rgba(61,126,235, 0)"
          }
          ])
        },
        // data: [200, 300, 300, 900, 1500, 1200, 600]
        data: data['echart_1']['data'],

      },
      {
        name: "岗位数量",
        type: "bar",
        barWidth: 15,
        tooltip: {
          show: false
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "#d427ff"
            },
            {
              offset: 1,
              color: "rgba(61,126,235, 0)"
            }
            ]),
            borderColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: "rgba(160,196,225, 1)"
            },
            {
              offset: 1,
              color: "rgba(61,126,235, 1)"
            }
            ]),
            borderWidth: 2
          }
        },
        // data: [200, 300, 300, 900, 1500, 1200, 600]
        data: data['echart_1']['data'],
      }

      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  function echarts_2 (data) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart2'));

    option = {
      // backgroundColor:"#0f375f",
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '8%',

        containLabel: true
      },
      legend: {
        top: "2%",
        right: '10',
        textStyle: {
          color: "rgba(253,253,255,0.5)",
          fontSize: "12"
        },

      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        }
      },

      xAxis: {
        type: 'category',
        // boundaryGap: false,
        data: data['echart_2']['x_name'],
        triggerEvent: true,
        splitLine: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            width: 2,
            color: 'rgba(255,255,255,.6)'
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          //     textStyle: {
          //     color: "rgba(250,250,250,0.6)", //X轴文字颜色
          //     fontSize: 16
          // },
          color: '#fff',
          fontSize: 16,
          fontWeight: 'bold',
          textShadowColor: '#000',
          textShadowOffsetY: 2
        }
      },
      yAxis: {
        name: '个数',
        nameTextStyle: {
          color: '#fff',
          fontSize: 16,
          textShadowColor: '#000',
          textShadowOffsetY: 2
        },
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,.2)'
          }
        },
        axisLine: {
          show: true,
          lineStyle: {
            width: 2,
            color: 'rgba(255,255,255,.6)'
          }
        },
        axisTick: {
          show: true
        },
        axisLabel: {
          textStyle: {
            color: "rgba(250,250,250,0.6)", //X轴文字颜色
            fontSize: 16
          },
          color: '#fff',
          fontSize: 16,
          textShadowColor: '#000',
          textShadowOffsetY: 2
        }
      },
      series: [{
        data: data['echart_2']['data'],
        type: 'line',
        symbol: 'none',
        symbolSize: 12,
        color: '#0b1eff',
        lineStyle: {
          color: "#d0e3f2"
        },
        label: {
          show: false,
          position: 'top',
          textStyle: {
            color: '#FEC201',
            fontSize: 18,
            fontWeight: 'bold'
          }
        },
        areaStyle: {
          color: 'rgba(1,98,133,0.6)'
        }
      }, {
        type: 'bar',
        animation: false,
        barWidth: 3,
        hoverAnimation: false,
        data: data,
        tooltip: {
          show: false
        },
        itemStyle: {
          normal: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: '#91EAF2' // 0% 处的颜色
              }, {
                offset: 1,
                color: '#074863' // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            },
            label: {
              show: true
            }
          }
        }
      }]
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  function echarts_5 (data) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart5'));

    option = {
      // backgroundColor: '#061326',
      title: {
        x: "center",
        y: "6%",
        textStyle: {
          color: '#FFF',
          fontSize: 30
        }
      },
      grid: {
        "top": "20%",
        "left": "5%",
        "bottom": "5%",
        "right": "5%",
        "containLabel": true
      },
      tooltip: {
        show: true,
      },
      animation: false,
      "xAxis": [{
        "type": "category",
        "data": data['echart_5']['x_name'],
        "axisTick": {
          "alignWithLabel": true
        },
        "nameTextStyle": {
          "color": "#FEC201"
        },
        "axisLine": {
          show: false,
          "lineStyle": {
            "color": "#82b0ec"
          }
        },
        "axisLabel": {
          "textStyle": {
            "color": "rgba(113,204,161,0.6"
          },
          margin: 30
        }
      }],
      "yAxis": [{
        show: true,
        "type": "value",
        "axisLabel": {
          "textStyle": {
            "color": "rgba(113,204,161,0.6"
          },
        },
        "splitLine": {
          "lineStyle": {
            "color": "#0c2c5a"
          }
        },
        "axisLine": {
          "show": false
        }
      }],
      "series": [{
        "name": "",
        type: 'pictorialBar',
        symbolSize: [40, 10],
        symbolOffset: [0, -6],
        symbolPosition: 'end',
        z: 12,
        // "barWidth": "0",
        "label": {
          "normal": {
            "show": true,
            "position": "top",
            // "formatter": "{c}%"
            fontSize: 25,
            fontWeight: 'bold',
            color: '#ffeb7b'
          }
        },
        color: "#2DB1EF",
        data: data['echart_5']['data'],
      },
      {
        name: '',
        type: 'pictorialBar',
        symbolSize: [40, 10],
        symbolOffset: [0, 7],
        // "barWidth": "20",
        z: 12,
        "color": "#2DB1EF",
        "data": data['echart_5']['data'],
      },
      {
        name: '',
        type: 'pictorialBar',
        symbolSize: [50, 15],
        symbolOffset: [0, 12],
        z: 10,
        itemStyle: {
          normal: {
            color: 'transparent',
            borderColor: '#2EA9E5',
            borderType: 'solid',
            borderWidth: 1
          }
        },
        data: data['echart_5']['data'],
      },
      {
        name: '',
        type: 'pictorialBar',
        symbolSize: [70, 20],
        symbolOffset: [0, 18],
        z: 10,
        itemStyle: {
          normal: {
            color: 'transparent',
            borderColor: '#19465D',
            borderType: 'solid',
            borderWidth: 2
          }
        },
        data: data['echart_5']['data'],
      },
      {
        type: 'bar',
        //silent: true,
        "barWidth": "40",
        barGap: '10%', // Make series be overlap
        barCateGoryGap: '10%',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 0.7, [{
              offset: 0,
              color: "#38B2E6"
            },
            {
              offset: 1,
              color: "#0B3147"
            }
            ]),
            opacity: .8
          },
        },
        data: data['echart_5']['data'],
      }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  function echarts_4 (data) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart4'));

    const colorArray = [{
      top: '#ffa800', //黄
      bottom: 'rgba(248,195,248,.3)'
    }, {
      top: '#1ace4a', //绿
      bottom: 'rgba(100,255,249, 0.3)'
    },
    {
      top: '#4bf3ff', //蓝
      bottom: 'rgba(135,183,255,.3)'
    }, {
      top: '#4f9aff', //深蓝
      bottom: 'rgba(11,42,84,.3)'
    },
    {
      top: '#b250ff', //粉
      bottom: 'rgba(100,255,249,.3)'
    }
    ];

    option = {
      tooltip: {
        show: true,
        formatter: '{b} : {c}'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '0%',
        top: '8%',

        containLabel: true
      },
      xAxis: {
        type: 'value',
        show: false,
      },
      yAxis: {
        type: 'category',
        axisTick: {
          show: false,
          alignWithLabel: false,
          length: 5,
        },
        inverse: 'true',
        axisLine: {
          show: false,
          lineStyle: {
            color: '#fff',
          }
        },
        data: data['echart_4']['data']
      },
      series: [{
        type: 'bar',
        label: {
          normal: {
            show: false,
            position: 'right',
            formatter: '{c}',
          }
        },
        data: data['echart_4']['data'],
        barWidth: '2px',
        barCategoryGap: '25%',
        itemStyle: {
          normal: {
            show: true,
            color: function (params) {
              let num = colorArray.length;
              return {
                type: 'linear',
                colorStops: [{
                  offset: 0,
                  color: colorArray[params.dataIndex % num].bottom
                }, {
                  offset: 1,
                  color: colorArray[params.dataIndex % num].top
                }, {
                  offset: 0,
                  color: colorArray[params.dataIndex % num].bottom
                }, {
                  offset: 1,
                  color: colorArray[params.dataIndex % num].top
                }, {
                  offset: 0,
                  color: colorArray[params.dataIndex % num].bottom
                }, {
                  offset: 1,
                  color: colorArray[params.dataIndex % num].top
                }, {
                  offset: 0,
                  color: colorArray[params.dataIndex % num].bottom
                }, {
                  offset: 1,
                  color: colorArray[params.dataIndex % num].top
                }, {
                  offset: 0,
                  color: colorArray[params.dataIndex % num].bottom
                }, {
                  offset: 1,
                  color: colorArray[params.dataIndex % num].top
                }]
              }
            },
            barBorderRadius: 20,
            borderWidth: 0,
            borderColor: '#333',
          }
        }
      }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  // function echarts_6 (data) {
  //   // 基于准备好的dom，初始化echarts实例
  //   var myChart = echarts.init(document.getElementById('echart6'));
  //
  //   option = {
  //     // backgroundColor:"#0f375f",
  //     grid: {
  //       left: '3%',
  //       right: '4%',
  //       bottom: '3%',
  //       top: '8%',
  //
  //       containLabel: true
  //     },
  //     legend: {
  //       top: "2%",
  //       right: '10',
  //       textStyle: {
  //         color: "rgba(253,253,255,0.5)",
  //         fontSize: "12"
  //       },
  //
  //     },
  //     tooltip: {
  //       trigger: 'axis',
  //       axisPointer: {
  //         type: 'cross',
  //       }
  //     },
  //
  //     xAxis: {
  //       type: 'category',
  //       // boundaryGap: false,
  //       data: data['echart_6']['x_name'],
  //       triggerEvent: true,
  //       splitLine: {
  //         show: false
  //       },
  //       axisLine: {
  //         show: true,
  //         lineStyle: {
  //           width: 2,
  //           color: 'rgba(255,255,255,.6)'
  //         }
  //       },
  //       axisTick: {
  //         show: false
  //       },
  //       axisLabel: {
  //         //     textStyle: {
  //         //     color: "rgba(250,250,250,0.6)", //X轴文字颜色
  //         //     fontSize: 16
  //         // },
  //         color: '#fff',
  //         fontSize: 16,
  //         fontWeight: 'bold',
  //         textShadowColor: '#000',
  //         textShadowOffsetY: 2
  //       }
  //     },
  //     yAxis: {
  //       name: '个数',
  //       nameTextStyle: {
  //         color: '#fff',
  //         fontSize: 16,
  //         textShadowColor: '#000',
  //         textShadowOffsetY: 2
  //       },
  //       type: 'value',
  //       splitLine: {
  //         show: true,
  //         lineStyle: {
  //           color: 'rgba(255,255,255,.2)'
  //         }
  //       },
  //       axisLine: {
  //         show: true,
  //         lineStyle: {
  //           width: 2,
  //           color: 'rgba(255,255,255,.6)'
  //         }
  //       },
  //       axisTick: {
  //         show: true
  //       },
  //       axisLabel: {
  //         textStyle: {
  //           color: "rgba(250,250,250,0.6)", //X轴文字颜色
  //           fontSize: 16
  //         },
  //         color: '#fff',
  //         fontSize: 16,
  //         textShadowColor: '#000',
  //         textShadowOffsetY: 2
  //       }
  //     },
  //     series: [{
  //       data: data['echart_6']['data'],
  //       type: 'line',
  //       symbol: 'none',
  //       symbolSize: 12,
  //       color: '#0b1eff',
  //       lineStyle: {
  //         color: "#d0e3f2"
  //       },
  //       label: {
  //         show: false,
  //         position: 'top',
  //         textStyle: {
  //           color: '#FEC201',
  //           fontSize: 18,
  //           fontWeight: 'bold'
  //         }
  //       },
  //       areaStyle: {
  //         color: 'rgba(1,98,133,0.6)'
  //       }
  //     }, {
  //       type: 'bar',
  //       animation: false,
  //       barWidth: 3,
  //       hoverAnimation: false,
  //       data: data,
  //       tooltip: {
  //         show: false
  //       },
  //       itemStyle: {
  //         normal: {
  //           color: {
  //             type: 'linear',
  //             x: 0,
  //             y: 0,
  //             x2: 0,
  //             y2: 1,
  //             colorStops: [{
  //               offset: 0,
  //               color: '#91EAF2' // 0% 处的颜色
  //             }, {
  //               offset: 1,
  //               color: '#074863' // 100% 处的颜色
  //             }],
  //             globalCoord: false // 缺省为 false
  //           },
  //           label: {
  //             show: true
  //           }
  //         }
  //       }
  //     }]
  //   }
  //
  //   // 使用刚指定的配置项和数据显示图表。
  //   myChart.setOption(option);
  //   window.addEventListener("resize", function () {
  //     myChart.resize();
  //   });
  // }
 function echarts_6 (data) {
    var myChart = echarts.init(document.getElementById('echart6'));


    var option = {
      color: ["#05050a", "#a1e0f2", "#ffcbea", "#e10023","#fbf6ff","#fbf6ff"],
      grid: {
        left: -100,
        top: 50,
        bottom: 10,
        right: 10,
        containLabel: true
      },
      tooltip: {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)"
      },
      legend: {
        type: "scroll",
        orient: "vartical",
        // x: "right",
        top: "center",
        right: "15",
        // bottom: "0%",
        itemWidth: 16,
        itemHeight: 8,
        itemGap: 16,
        textStyle: {
          color: '#A3E2F4',
          fontSize: 12,
          fontWeight: 0
        },
        // data: ['不限', '大专', '本科', '硕士']
        data: data['echart_6']['x_name']
      },
      polar: {},
      angleAxis: {
        interval: 1,
        type: 'category',
        data: [],
        z: 10,
        axisLine: {
          show: false,
          lineStyle: {
            color: "#0B4A6B",
            width: 1,
            type: "solid"
          },
        },
        axisLabel: {
          interval: 0,
          show: true,
          color: "#0B4A6B",
          margin: 8,
          fontSize: 16
        },
      },
      radiusAxis: {
        min: 40,
        max: 120,
        interval: 20,
        axisLine: {
          show: false,
          lineStyle: {
            color: "#0B3E5E",
            width: 1,
            type: "solid"
          },
        },
        axisLabel: {
          formatter: '{value} %',
          show: false,
          padding: [0, 0, 20, 0],
          color: "#0B3E5E",
          fontSize: 16
        },
        splitLine: {
          lineStyle: {
            color: "#0B3E5E",
            width: 2,
            type: "solid"
          }
        }
      },
      calculable: true,
      series: [{
        type: 'pie',
        radius: ["5%", "10%"],
        hoverAnimation: false,
        labelLine: {
          normal: {
            show: false,
            length: 30,
            length2: 55
          },
          emphasis: {
            show: false
          }
        },
        data: [{
          name: '',
          value: 0,
          itemStyle: {
            normal: {
              color: "#0B4A6B"
            }
          }
        }]
      }, {
        type: 'pie',
        radius: ["90%", "95%"],
        hoverAnimation: false,
        labelLine: {
          normal: {
            show: false,
            length: 30,
            length2: 55
          },
          emphasis: {
            show: false
          }
        },
        name: "",
        data: [{
          name: '',
          value: 0,
          itemStyle: {
            normal: {
              color: "#0B4A6B"
            }
          }
        }]
      }, {
        stack: 'a',
        type: 'pie',
        radius: ['20%', '80%'],
        roseType: 'area',
        zlevel: 10,
        label: {
          normal: {
            show: true,
            formatter: "{c}",
            textStyle: {
              fontSize: 12,
            },
            position: 'outside'
          },
          emphasis: {
            show: true
          }
        },
        labelLine: {
          normal: {
            show: true,
            length: 20,
            length2: 55
          },
          emphasis: {
            show: false
          }
        },
        data: data['echart_6']['data']
      },]
    }

    myChart.setOption(option)
	    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  function echarts_31 (data) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('fb1'));

    option = {
      title: [{
        text: '融资情况',
        left: 'center',
        textStyle: {
          color: '#fff',
          fontSize: '16'
        }

      }],
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",
        position: function (p) {   //其中p为当前鼠标的位置
          return [p[0] + 10, p[1] - 10];
        }
      },
      legend: {
        top: '62%',
        itemWidth: 10,
        itemHeight: 10,
        // data:['2D线','3D线','资源类','采集类','宝宝大全','2D视频','3D视频'],
        data: data['echart_31']['x_name'],
        textStyle: {
          color: 'rgba(255,255,255,0.75)',
          fontSize: '10'
        }
      },
      series: [
        {
          name: '融资情况',
          type: 'pie',
          center: ['50%', '38%'],
          radius: ['40%', '60%'],
          color: ['#2640f5', '#fe566c', '#65db99', '#d30afd', '#78f4f5', '#fcba61', '#f5d978', '#c8f578'],
          data: data['echart_31']['data'],
          itemStyle: {
            normal: {
              label: {
                show: false,
                position: 'inner',
                textstyle: {
                  fontWeight: 50,
                  fontSize: 1
                }
              },
              labelLine: {
                show: false,
              }

            }
          },

        }
      ]
    };
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  function echarts_32 (data) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('fb2'));

    option = {
      title: [{
        text: '公司规模',
        left: 'center',
        textStyle: {
          color: '#fff',
          fontSize: '16'
        }

      }],

      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",
        position: function (p) {   //其中p为当前鼠标的位置
          return [p[0] + 10, p[1] - 10];
        }
      },
      legend: {
        top: '62%',
        itemWidth: 10,
        itemHeight: 10,
        // data:['2D线','3D线','资源类','采集类','宝宝大全','2D视频','3D视频'],
        data: data['echart_32']['x_name'],
        textStyle: {
          color: 'rgba(251,246,255,0.75)',
          fontSize: '9'
        }
      },

      series: [
        {
          name: '公司规模',
          type: 'pie',
          radius: '60%',
          center: ['50%', '38%'],
          data: data['echart_32']['data'].sort(function (a, b) { return a.value - b.value }),
          minAngle: 45,
          roseType: 'angle',
          itemStyle: {
            normal: {
              label: {
                show: false,
                position: 'inner',
                textstyle: {
                  fontWeight: 50,
                  fontSize: 1
                }
              },
              labelLine: {
                show: false,
              }
            }
          },

        }
      ]
    };
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }

  function echarts_33 (data) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('fb3'));

    option = {

      title: [{
        text: '岗位要求',
        left: 'center',
        textStyle: {
          color: '#fff',
          fontSize: '16'
        }

      }],
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)",
        position: function (p) {   //其中p为当前鼠标的位置
          return [p[0] + 10, p[1] - 10];
        }
      },
      legend: {
        top: '62%',
        itemWidth: 10,
        itemHeight: 10,
        // data: ['要求一', '要求二', '要求三', '要求四', '要求五', '要求六'],
        data: data['echart_33']['x_name'],
        // data: ['天空', '金字塔亮的一面', '金字塔暗的一面'],
        textStyle: {
          color: 'rgba(255,255,255,0.75)',
          fontSize: '10'
        }
      },
      series: [{
        name: '岗位要求',
        type: 'pie',
        center: ['50%', '38%'],
        radius: '60%',
        color: ['#b7b8c2', '#5C3926', '#D3A359'],
        data: data['echart_33']['data'],
        minAngle: 45,
        startAngle: -135,
        itemStyle: {
          normal: {
            // color: '#425E8D'
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        label: {
          normal: {
            show: false
          }
        },
        silent: false
      }]
    };
    myChart.setOption(option);
    window.addEventListener("resize", function () {
      myChart.resize();
    });
  }
})
  ;