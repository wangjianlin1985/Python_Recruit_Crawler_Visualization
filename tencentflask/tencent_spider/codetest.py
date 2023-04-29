import grequests
import pymysql
import requests
import re
import json
import csv
import time
# 请求头
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36',
    'Cookie':'_uab_collina=164612430585357725766102; guid=6175724bb425e4aebce5ecb529c63d22; nsearch=jobarea%3D%26%7C%26ord_field%3D%26%7C%26recentSearch0%3D%26%7C%26recentSearch1%3D%26%7C%26recentSearch2%3D%26%7C%26recentSearch3%3D%26%7C%26recentSearch4%3D%26%7C%26collapse_expansion%3D; search=jobarea%7E%60030200%2C040000%2C110200%2C110300%7C%21ord_field%7E%600%7C%21recentSearch0%7E%60030200%2C040000%2C110200%2C110300%A1%FB%A1%FA000000%A1%FB%A1%FA0000%A1%FB%A1%FA00%A1%FB%A1%FA99%A1%FB%A1%FA%A1%FB%A1%FA99%A1%FB%A1%FA99%A1%FB%A1%FA99%A1%FB%A1%FA99%A1%FB%A1%FA9%A1%FB%A1%FA99%A1%FB%A1%FA%A1%FB%A1%FA0%A1%FB%A1%FA%A1%FB%A1%FA2%A1%FB%A1%FA1%7C%21; privacy=1647162332; acw_tc=2f624a4a16471623346494036e7d6c9b85e0da452b9bb73e0e0505f376542c; acw_sc__v2=622db3dfa86dba6aa6204ba9cd330b025c9af5bb; ssxmod_itna=YqjOYKY5DIkhODBDl4iuOzYa0=S2uq2uxye49xDs5DcQxA5D8D6DQeGTTnardvdKn8retfK/YuDsfBQ7xLpik22YnsoxCPGnDB9wxTADYYCDt4DTD34DYDixib1xi5GRD0KDF7dy/1yDYPDE0KDaxDbDiekIxGCDeKD0ouFDQKDu2Ixd0F+kc71atyqoz0xjxG1H40H6j3vrRfLdjH+m83=4xGdNELqdAMYClGGf7KDX1QDv1H1lcapS/FsBoBoaARDaQ2Nd=rdjibeoWxek7hEG22KdnZ4kliPq00d7lwZDDpq9vhDD; ssxmod_itna2=YqjOYKY5DIkhODBDl4iuOzYa0=S2uq2uxyeRxikE5bDl1erDjbgRQi=qCrUy5uKDk965/4tuYiGKVpCYuhNIagYihHsSWO=61k+nBGmzwzkQ7n5aMjSgRNu4KAMXFhN5UiveUXXkstZ5ix85iP6KCoCHzCQn=cPchxaBb4=9Nr4HsTfoFeP5AtUcwx2B1ZiSNomiir0PD6QadUDdi9tIqctKjCQww0F2Q9zqtc3CXWaM6rAQjlbwr0+u063nuqT6nYyjnTxd=a=Z05ePBmktXT1Z68Xk9NPCc2uLMwqkyXsUnyfIj0s=AgpVo=z=K9xN/=jEAijcihZ54fNsxKkPXk20pp0wBiZrqe3rdtUKSXkoj4tQYf2t3bM=E5m4DQ94CxDFqD+6DxD='}
#发送请求
# 数据库连接
conn = pymysql.connect(host='127.0.0.1', user='root', password='123456', db='spiders')
cursor = conn.cursor()
def get_info():
    for page in range(1,20):
        print(f'=======正在爬取第{page}页数据内容=======')
        time.sleep(5)
        url = f'https://search.51job.com/list/000000,000000,0000,00,9,99,python,2,{page}.html'
        headers = {
            'Cookie': 'guid=60172f6ee7023d13eb83dd29e13b8937; nsearch=jobarea%3D%26%7C%26ord_field%3D%26%7C%26recentSearch0%3D%26%7C%26recentSearch1%3D%26%7C%26recentSearch2%3D%26%7C%26recentSearch3%3D%26%7C%26recentSearch4%3D%26%7C%26collapse_expansion%3D; adv=adsnew%3D0%26%7C%26adsnum%3D2004282%26%7C%26adsresume%3D1%26%7C%26adsfrom%3Dhttps%253A%252F%252Fwww.baidu.com%252Fother.php%253Fsc.0f0000jqGlpYpEfj9lynK-vVDEa3_-UBknjKNZHv564Y0vKZl1HuJ_R-N5IL15bSOcsJosb0q_Wo1wF7Mii9F4LBsYH6hifvw5UTUvZh0TroPLYKL42KMGH5tJOnLTudJaV-clfQLAHbrn-lE-uvr8XEa5AJfP0Q9SG7oEV1K66Fex_tGJnLhWFXaTAcrvFuHX7BWo1QI_9Zp9lmohEKj_mDk-9j.DR_NR2Ar5Od66CHnsGtVdXNdlc2D1n2xx81IZ76Y_uQQr1F_zIyT8P9MqOOgujSOODlxdlPqKMWSxKSgqjlSzOFqtZOmzUlZlS5S8QqxZtVAOtIOtHOuS81wODSgL35SKsSXKMqOOgfESyOHjGLY51xVOeNH5exS88Zqq1ZgVm9udSnQr1__oodvgvnehUrPL72xZgjX1IIYJN9h9merzEuY60.TLFWgv-b5HDkrfK1ThPGujYknHb0THY0IAYqkea11neXYtT0IgP-T-qYXgK-5H00mywxIZ-suHY10ZIEThfqkea11neXYtT0ThPv5HD0IgF_gv-b5HDdnW0zPH61P100UgNxpyfqnHnsnW6Lnj00UNqGujYknjTkPHf3PsKVIZK_gv-b5HDkPHnY0ZKvgv-b5H00pywW5fKWThnqn1Tdrjb%2526dt%253D1599548539%2526wd%253D%2525E5%252589%25258D%2525E7%2525A8%25258B%2525E6%252597%2525A0%2525E5%2525BF%2525A7%2526tpl%253Dtpl_11534_22836_18980%2526l%253D1520258370%26%7C%26; slife=lowbrowser%3Dnot%26%7C%26; search=jobarea%7E%60000000%7C%21ord_field%7E%600%7C%21recentSearch0%7E%60000000%A1%FB%A1%FA000000%A1%FB%A1%FA0000%A1%FB%A1%FA00%A1%FB%A1%FA99%A1%FB%A1%FA%A1%FB%A1%FA99%A1%FB%A1%FA99%A1%FB%A1%FA99%A1%FB%A1%FA99%A1%FB%A1%FA9%A1%FB%A1%FA99%A1%FB%A1%FA%A1%FB%A1%FA0%A1%FB%A1%FA%B4%F3%CA%FD%BE%DD%A1%FB%A1%FA2%A1%FB%A1%FA1%7C%21recentSearch1%7E%60000000%A1%FB%A1%FA000000%A1%FB%A1%FA0000%A1%FB%A1%FA00%A1%FB%A1%FA99%A1%FB%A1%FA%A1%FB%A1%FA99%A1%FB%A1%FA99%A1%FB%A1%FA99%A1%FB%A1%FA99%A1%FB%A1%FA9%A1%FB%A1%FA99%A1%FB%A1%FA%A1%FB%A1%FA0%A1%FB%A1%FApython%A1%FB%A1%FA2%A1%FB%A1%FA1%7C%21recentSearch2%7E%60000000%A1%FB%A1%FA000000%A1%FB%A1%FA0000%A1%FB%A1%FA00%A1%FB%A1%FA99%A1%FB%A1%FA%A1%FB%A1%FA99%A1%FB%A1%FA99%A1%FB%A1%FA99%A1%FB%A1%FA99%A1%FB%A1%FA9%A1%FB%A1%FA99%A1%FB%A1%FA%A1%FB%A1%FA0%A1%FB%A1%FAPython%A1%FB%A1%FA2%A1%FB%A1%FA1%7C%21recentSearch3%7E%60000000%A1%FB%A1%FA000000%A1%FB%A1%FA0000%A1%FB%A1%FA00%A1%FB%A1%FA99%A1%FB%A1%FA%A1%FB%A1%FA99%A1%FB%A1%FA99%A1%FB%A1%FA99%A1%FB%A1%FA99%A1%FB%A1%FA9%A1%FB%A1%FA99%A1%FB%A1%FA%A1%FB%A1%FA0%A1%FB%A1%FA%C5%C0%B3%E6%A1%FB%A1%FA2%A1%FB%A1%FA1%7C%21recentSearch4%7E%60000000%A1%FB%A1%FA000000%A1%FB%A1%FA0000%A1%FB%A1%FA00%A1%FB%A1%FA99%A1%FB%A1%FA%A1%FB%A1%FA99%A1%FB%A1%FA99%A1%FB%A1%FA99%A1%FB%A1%FA99%A1%FB%A1%FA9%A1%FB%A1%FA99%A1%FB%A1%FA%A1%FB%A1%FA0%A1%FB%A1%FAPython%C5%C0%B3%E6%A1%FB%A1%FA2%A1%FB%A1%FA1%7C%21collapse_expansion%7E%601%7C%21; m_search=keyword%3D%E5%A4%A7%E6%95%B0%E6%8D%AE%26%7C%26areacode%3D000000; partner=www_baidu_com; 51job=cenglish%3D0%26%7C%26',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36'}
        response = requests.get(url=url,headers=headers)
        ##获取数据
        #print(response.text)
        ##解析数据
        html_data = re.findall('window.__SEARCH_RESULT__ = (.*?)</script>',response.text)[0]
        json_data = json.loads(html_data)
        engine_jds = json_data['engine_jds']
        item = {}
        for index in engine_jds:
            href = f'https://jobs.51job.com/shenzhen/{index["jobid"]}.html'
            item['positionName']=index['job_name']
            item['companyFullName']=index['company_name']
            item['xxx']=index['workarea_text']
            # print(item['city'])
            # print(type(item))
            a=str(item['xxx'])
            # print(a)
            b=a[0:2]
            # print(b)
            item['city']=b
            # print(item['city'])
            item['salary']=index['providesalary_text']
            item['yyy']= ','.join(index['attribute_text'][1:])
            c=str(item['yyy'])
            d=c[0:1]
            item['workYear'] = d
            item['zzz']=','.join(index['attribute_text'][1:])
            # print(item['zzz'])
            m=str(item['zzz'])
            msplit=m.split(',')
            for value in range(len(msplit)):
                if value==1:
                    item['education']=msplit[value]

            item['companyLabelList']=index['jobwelf']
            item['companySize']=index['companysize_text']
            item['industryField']=index['companyind_text']
            item['financeStage']=index['companytype_text']
            item['url_href']=href
            item['crawl_date'] = index['issuedate'][0:10]
            yield item


def write_mysql(info_data):
    sql = 'insert into job51_data2(positionName, workYear, companyFullName, education, city, industryField, salary, companyLabelList, companySize, financeStage,url_href,crawl_date) values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,%s)'
    for data in info_data:
        print(data)
        args = (data['positionName'], data['workYear'], data['companyFullName'], data['education'], data['city'],
                data['industryField'], data['salary'], data['companyLabelList'], data['companySize'], data['financeStage'],
                data['url_href'],data['crawl_date'])
        cursor.execute(sql, args)
        conn.commit()


def main():
    """主程序入口"""
    info_data = get_info()
    write_mysql(info_data)

if __name__ == '__main__':
    main()

