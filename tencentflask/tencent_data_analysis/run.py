from flask import Flask, render_template, jsonify
import sys,os
sys.path.append(os.path.abspath(os.path.dirname(__file__) + '/' + '..'))
import json
from tencent_spider.handle_insert_data import tencent_mysql

# 实例化flask
app = Flask(__name__)

# 注册路由
# @app.route("/")
# def index():
#     return "Hello World"

@app.route("/get_echart_data",methods=["post","get"])
def get_echart_data():
    info = {}
    # 行业发布数量分析
    info['echart_1'] = tencent_mysql.query_industryfield_result()
    # print(info['echart_1'] )
    # 薪资发布数量分析
    info['echart_2'] = tencent_mysql.query_salary_result()
    # 岗位数量分析,折线图
    info['echart_4'] = tencent_mysql.query_job_result()
    #工作年限分析
    info['echart_5'] = tencent_mysql.query_workyear_result()
    #学历情况分析
    info['echart_6'] = tencent_mysql.query_education_result()
    #融资情况
    info['echart_31'] = tencent_mysql.query_financestage_result()
    #公司规模
    info['echart_32'] = tencent_mysql.query_companysize_result()
    #岗位要求
    info['echart_33'] = tencent_mysql.query_jobNature_result()
    #各地区发布岗位数
    info['map'] = tencent_mysql.query_city_result()
    return jsonify(info)

@app.route("/",methods=['GET','POST'])
def tencent():
    # 库内数据总量，今日抓取量
    result = tencent_mysql.count_result()
    return render_template('index.html',result=result)

@app.route("/hello")
def hellod():
    # 库内数据总量，今日抓取量
    return "Hello World"


if __name__ == '__main__':
    # 启动flask
    # app.debug=True
    app.run()