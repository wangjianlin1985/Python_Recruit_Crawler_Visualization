#-*- coding:utf-8 -*-
from collections import Counter

from sqlalchemy import func
import sys,os
sys.path.append(os.path.abspath(os.path.dirname(__file__) + '/' + '..'))

from tencent_spider.create_tencent_tables import tencenttables
from tencent_spider.create_tencent_tables import Session
import time

class HandletencentData(object):
    def __init__(self):
    #实例化session信息
        self.mysql_session = Session()
    #获取今日爬取数量：
        self.date=time.strftime("%Y-%m-%d",time.localtime())
        # self.date = "2022-01-17"
        self.citycoors={}
    #获取城市对应经纬度
    def get_citycoors(self):
        #with open(r"D:\softwares\pythonProject\tencentflask\tencent_spider\中国各城市坐标.txt","r") as f:
        with open(r"D:\项目系统调试区\Python爬虫招聘系统\tencentflask\tencent_spider\中国各城市坐标.txt", "r") as f:
            # f.readline()
            datas=f.read().split("\n")
            for data in datas:
                self.citycoors[data.split(',')[1]]=data.split(',')[2]+","+data.split(',')[3]
    
    #数据的存储方法
    def insert_item(self,item):
        # 获取城市对应经纬度
        tencent_mysql.get_citycoors()
        #今天
        date = time.strftime("%Y-%m-%d",time.localtime())
        
        #存储的数据结构
        tempcity=item['workarea_text'].split('-')[0] if '-' in item['workarea_text'] else item['workarea_text']
        newcity=tempcity+"市" if (tempcity!="香港" or tempcity!="澳门") else item['LocationName']
        
        data = tencenttables(
            #岗位ID
            positionID = int(item['jobid']),
            # 经度
            # else float(self.citycoors[item['LocationName']].split(',')[0])
            longitude=float(self.citycoors[newcity].split(',')[0]) if newcity in  self.citycoors.keys() else 0,
            # # 纬度
            # # latitude=float(self.citycoors[item['workarea_text']+"市"].split(',')[1]) if item['workarea_text']!="香港" or item['workarea_text']!="澳门" else float(self.citycoors[item['LocationName']].split(',')[1]),
            latitude=float(self.citycoors[newcity].split(',')[1]) if newcity in  self.citycoors.keys() else 0,
            # 岗位名称
            #positionName=item['positionName'],
            positionName=item['positionName'] if 'positionName' in item else item['job_title'],
            # 工作年限
            workYear=int(item['workyear']) if item['workyear']!='' else 0,
            # 学历
            education=item['attribute_text'][2] if len(item['attribute_text'])>=3 else '',
            # 岗位性质
            jobNature=item['job_name'], #没有
            # 公司类型
            financeStage=item['companytype_text'],
            # 公司规模
            companySize=item['companysize_text'],
            # 业务方向
            industryField=item['companyind_text'],
            # 所在城市
            city=newcity,
            # 岗位标签
            positionAdvantage=item['job_title'], #没有
            # 公司简称
            companyShortName=item['company_name'], #没有
            # 公司全称
            companyFullName=item['company_name'],
            # 公司所在区
            district=item['workarea_text'], #没有
            # 公司福利标签
            companyLabelList=','.join(item['jobwelf_list']),
            salary=item['providesalary_text'],
            # 抓取日期
            crawl_date=date
        )

        #在存储数据之前，先来查询一下表里是否有这条岗位信息
        query_result = self.mysql_session.query(tencenttables).filter(tencenttables.crawl_date==date,
                                                                    tencenttables.positionID==int(item['jobid'])).first()
        if query_result:
            print('该岗位信息已存在%s:%s:%s'%(item['jobid'],item['workarea_text'],item['job_name']))
        else:
            #插入数据
            self.mysql_session.add(data)
            #提交数据到数据库
            self.mysql_session.commit()
            print('新增岗位信息%s'%item['jobid'])
            time.sleep(5)
    #行业信息
    def query_industryfield_result(self):
        info = {}
        # 查询今日抓取到的行业信息数据
        # self.mysql_session.query.with_entities(tencenttables.industryField) 
        result = self.mysql_session.query(tencenttables.industryField).filter(
        tencenttables.crawl_date==self.date
        ).all()
        
        result_list1 = [x[0].split(',')[0] for x in result]
        # 计数
        result_list2 = [x for x in Counter(result_list1).items() if x[1]>2]
        # print(result_list2)
        #填充的是series里面的data
        data = [{"name":x[0],"value":x[1]} for x in result_list2]
        name_list = [name['name'] for name in data]
        info['x_name'] = name_list
        info['data'] = data
        return info

    # 查询薪资情况
    def query_salary_result(self):
        info = {}
        # 查询今日抓取到的薪资数据
        result = self.mysql_session.query(tencenttables.salary).filter(
         tencenttables.crawl_date==self.date
          ).all()
        # 处理原始数据
        result_list1 = [x[0] for x in result]
        # 计数,并返回
        # print(result_list1)
        result_list2 = [x for x in Counter(result_list1).items() if x[1]>1]

        result = [{"name": x[0], "value": x[1]} for x in result_list2]
        name_list = [name['name'] for name in result]
        info['x_name'] = name_list
        info['data'] = result
        return info

    # 查询工作年限情况
    def query_workyear_result(self):
        info = {}
        # 查询今日抓取到的薪资数据
        result = self.mysql_session.query(tencenttables.workYear).filter(
         tencenttables.crawl_date==self.date
          ).all()
        # 处理原始数据
        result_list1 = [x[0] for x in result]
        # 计数,并返回
        result_list2 = [x for x in Counter(result_list1).items()]
        result = [{"name": x[0], "value": x[1]} for x in result_list2 if x[1]>2]
        name_list = [name['name'] for name in result]
        info['x_name'] = name_list
        info['data'] = result
        return info

    # 查询学历信息
    def query_education_result(self):
        info = {}
        # 查询今日抓取到的薪资数据
        result = self.mysql_session.query(tencenttables.education).filter(
        tencenttables.crawl_date==self.date
          ).all()
        # 处理原始数据
        result_list1 = [x[0] for x in result]
        # 计数,并返回
        result_list2 = [x for x in Counter(result_list1).items()]
        result = [{"name": x[0], "value": x[1]} for x in result_list2]
        name_list = [name['name'] for name in result]
        info['x_name'] = name_list
        info['data'] = result
        return info

    # 职业名称,横向柱状图
    def query_job_result(self):
        info = {}
        # 查询今日抓取到的行业信息数据
        result = self.mysql_session.query(tencenttables.positionName).filter(
         tencenttables.crawl_date == self.date
        ).all()

        result_list1 = [x[0].split(',')[0] for x in result]
        # print(result_list1)
        result_list2 = [x for x in Counter(result_list1).items() if x[1] > 1]
        # print(result_list2)
        # 填充的是series里面的data
        data = [{"name": x[0], "value": x[1]} for x in result_list2]
        name_list = [name['name'] for name in data]
        info['x_name'] = name_list
        info['data'] = data
        return info

    # 根据城市计数
    def query_city_result(self):
        info = {}
        # 查询今日抓取到的薪资数据
        result = self.mysql_session.query(tencenttables.city,func.count('*').label('c')).filter(
         tencenttables.crawl_date==self.date
          ).group_by(tencenttables.city).all()
        # print(result)
        result1 = [{"name": x[0], "value": x[1]} for x in result]
        # print(result1)
        name_list = [name['name'] for name in result1]
        # print(name_list)
        info['x_name'] = name_list
        info['data'] = result1
        return info

    #融资情况
    def query_financestage_result(self):
        info = {}
        # 查询今日抓取到的薪资数据
        result = self.mysql_session.query(tencenttables.financeStage).filter(
       tencenttables.crawl_date == self.date
          ).all()
        # 处理原始数据
        result_list1 = [x[0] for x in result]
        # 计数,并返回
        result_list2 = [x for x in Counter(result_list1).items()]
        result = [{"name": x[0], "value": x[1]} for x in result_list2]
        name_list = [name['name'] for name in result]
        info['x_name'] = name_list
        info['data'] = result
        return info

    # 公司规模
    def query_companysize_result(self):
        info = {}
        # 查询今日抓取到的薪资数据
        result = self.mysql_session.query(tencenttables.companySize).filter(
        tencenttables.crawl_date == self.date
          ).all()
        # 处理原始数据
        result_list1 = [x[0] for x in result]
        # 计数,并返回
        result_list2 = [x for x in Counter(result_list1).items()]
        result = [{"name": x[0], "value": x[1]} for x in result_list2]
        name_list = [name['name'] for name in result]
        info['x_name'] = name_list
        info['data'] = result
        return info

    # 任职情况
    def query_jobNature_result(self):
        info = {}
        # 查询今日抓取到的薪资数据
        result = self.mysql_session.query(tencenttables.positionName).filter(
        tencenttables.crawl_date == self.date
          ).all()
        # 处理原始数据
        result_list1 = [x[0] for x in result]
        # 计数,并返回
        result_list2 = [x for x in Counter(result_list1).items()]
        result = [{"name": x[0], "value": x[1]} for x in result_list2]
        name_list = [name['name'] for name in result]
        info['x_name'] = name_list
        info['data'] = result
        return info

    # 抓取数量
    def count_result(self):
        info = {}
        info['all_count'] = self.mysql_session.query(tencenttables).count()
        info['today_count'] = self.mysql_session.query(tencenttables).filter(tencenttables.crawl_date==self.date).count()
        return info

tencent_mysql = HandletencentData()
tencent_mysql
