from parse_json import parse_url
import json

# baseurl="https://careers.tencent.com/tencentcareer/api/post/Query?pageIndex={}&pageSize=10&language=zh-cn&area=cn"

# baseurl="https://careers.tencent.com/tencentcareer/api/post/Query?countryId=1&keyword=python&pageIndex={}&pageSize=10&language=zh-cn&area=cn"

# offset=1
# start_urls = baseurl.format(offset)
# response=parse_url(start_urls)
# response=json.loads(response)
# data=response['Data']
# count=data['Count']
# data_lists=data['Posts']

# print("ok")


# import requests

# cookies = {
#     'guid': 'f9afd04891c4871a0970652cc413e4ff',
#     '_ujz': 'MTg3MzgxOTcxMA%3D%3D',
#     'ps': 'needv%3D0',
#     '51job': 'cuid%3D187381971%26%7C%26cusername%3Dphone_16605924339_202103174904%26%7C%26cpassword%3D%26%7C%26cname%3D%26%7C%26cemail%3D%26%7C%26cemailstatus%3D0%26%7C%26cnickname%3D%26%7C%26ccry%3D.0XTya4Gjns9Y%26%7C%26cconfirmkey%3D%25241%2524MFfAaAGt%2524Kpf7biKttwh.Cn5noq0Nq.%26%7C%26cautologin%3D1%26%7C%26cenglish%3D0%26%7C%26sex%3D%26%7C%26cnamekey%3D%25241%2524apg60.Va%25242pY8PN26oaFo5o0fHOFUS.%26%7C%26to%3D0c90f570cf414295f2754e901b1ccd4360517dc5%26%7C%26',
#     'adv': 'adsnew%3D0%26%7C%26adsnum%3D6617760%26%7C%26adsresume%3D1%26%7C%26adsfrom%3Dhttps%253A%252F%252Fwww.baidu.com%252Fbaidu.php%253Fsc.Kf0000K5cNxA6dzipHgb8SMDhFjlNtbVcH1d68plK6h_2eJqZTGo7vVnpsK5YCeeLdlNPD54geiBcRB5RNi5EuUSqjCHFJNiXiYKUTkMKBPoLFElrV0mwVs2mzUizFXYdmqqowxQcvDdSDIoFO3XXqtH6rN6_uF0aJb71OOwkXWPziMr0MkY7ct-dC-B9w13qDc3bezOKj7yeRpYHrv0si29h71X.7Y_NR2Ar5Od66CHnsGtVdXNdlc2D1n2xx81IZ76Y_I5Hg3S5Huduz3vAxLOqIb5eOtHGOgCLYAX54tZ4xY5oeQtMLsxqWFECxo3Ol3EdtxzYUOkLOk5qMlePZtH4xx6O3Zj43AxLOqIaO4UqnrMxfOPSLOVNnOVOllOSkSLSIWov_gUS1GEu_ePqS8OGtUSM_dq-h1xYqnPq1572IlknyuQr1xuvTXguz3qis1f_urMIuyC.U1Yk0ZDq1PowVVgfkoWj8q5f8pHgqtHJ1qeiJ_x10ZKGm1Ys0Zfq1PowVVgfko60pyYqnWcd0ATqUvwlnfKdpHdBmy-bIykV0ZKGujYd0APGujYLn0KVIjYknjDLg1DsnH-xnH0vnNt1PW0k0AVG5H00TMfqnW0d0AFG5HDdPNtkPH9xnW0Yg1ckPdtdnjn0UynqnH63PHTdPW04Pdtknj0kg1Dsn-ts0Z7spyfqn0Kkmv-b5H00ThIYmyTqn0K9mWYsg100ugFM5H00TZ0qPHfzrjRsrjbd0A4vTjYsQW0snj0snj0s0AdYTjYs0AwbUL0qn0KzpWYk0Aw-IWdsmsKhIjYs0ZKC5H00ULnqn0KBI1Ykn0K8IjYs0ZPl5fK9TdqGuAnqTZnVuLGCXZb0pywW5R9rffKYmgFMugfqn17xn1Dkg160IZN15HfYn1nvnHc3njDsn1nLPWfLrjb0ThNkIjYkPWDdrHR1n104rjb10ZPGujdWrHD1mycsm10snjc3rj-W0AP1UHYsf1uaP19AnjbYfWbvPjc30A7W5HD0TA3qn0KkUgfqn0KkUgnqn0KbugwxmLK95H00XMfqn0KVmdqhThqV5HKxn7tsg100uA78IyF-gLK_my4GuZnqn7tsg1RznHmsPHIxn0Ksmgwxuhk9u1Ys0AwWpyfqn0K-IA-b5iYk0A71TAPW5H00IgKGUhPW5H00Tydh5H00uhPdIjYs0A-1mvsqn0KlTAkdT1Ys0A7buhk9u1Yk0Akhm1Ys0AwWmvfqwHRkwjT3PYmYPHRvfH0sPRnsPbcLnbm4wbNKnHRsrDPtn0KYTh7buHYs0AFbpyfqwjfLnRPKPWPaPHR4nbR1nWb3nHK7rjcvnWTsnYuKnRR0UvnqnfKBIjYs0Aq9IZTqn0KEIjYk0AqzTZfqnBnsc1nWnBnYnjTsnjn1rjRWPjRsnanYPH0sQW0snj0snankc1cWnanVc108njn1rH0dc1D8njDvnH0s0Z7xIWYsQWmvg108njKxna3sn7tsQW0zg108njFxna3zrNtknj08njKxnHc30AF1gLKzUvwGujYs0A-1gvPsmHYs0APs5H00ugPY5H00mLFW5HDdn10v%2526word%253D%2526ck%253D7187.15.81.366.147.315.182.242%2526shh%253Dwww.baidu.com%2526sht%253D02049043_8_pg%2526us%253D1.0.1.0.1.301.0%2526wd%253D%2526bc%253D110101%26%7C%26ad_logid_url%3D0%26%7C%26',
#     'slife': 'lowbrowser%3Dnot%26%7C%26lastlogindate%3D20210317%26%7C%26securetime%3DAT1VYAJlB2ZWPQA7DzcLYwYxCzU%253D',
#     'track': 'registertype%3D1',
#     'nsearch': 'jobarea%3D%26%7C%26ord_field%3D%26%7C%26recentSearch0%3D%26%7C%26recentSearch1%3D%26%7C%26recentSearch2%3D%26%7C%26recentSearch3%3D%26%7C%26recentSearch4%3D%26%7C%26collapse_expansion%3D',
#     'search': 'jobarea%7E%60000000%7C%21ord_field%7E%600%7C%21recentSearch0%7E%60000000%A1%FB%A1%FA000000%A1%FB%A1%FA0000%A1%FB%A1%FA00%A1%FB%A1%FA99%A1%FB%A1%FA%A1%FB%A1%FA99%A1%FB%A1%FA99%A1%FB%A1%FA99%A1%FB%A1%FA99%A1%FB%A1%FA9%A1%FB%A1%FA99%A1%FB%A1%FA%A1%FB%A1%FA0%A1%FB%A1%FApython%A1%FB%A1%FA2%A1%FB%A1%FA1%7C%21recentSearch1%7E%60110300%A1%FB%A1%FA000000%A1%FB%A1%FA0000%A1%FB%A1%FA00%A1%FB%A1%FA99%A1%FB%A1%FA%A1%FB%A1%FA99%A1%FB%A1%FA99%A1%FB%A1%FA99%A1%FB%A1%FA99%A1%FB%A1%FA9%A1%FB%A1%FA99%A1%FB%A1%FA%A1%FB%A1%FA0%A1%FB%A1%FApython%A1%FB%A1%FA2%A1%FB%A1%FA1%7C%21',
# }

# headers = {
#     'Connection': 'keep-alive',
#     'Accept': 'application/json, text/javascript, */*; q=0.01',
#     'X-Requested-With': 'XMLHttpRequest',
#     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.116 Safari/537.36',
#     'Sec-Fetch-Site': 'same-origin',
#     'Sec-Fetch-Mode': 'cors',
#     'Referer': 'https://search.51job.com/list/000000,000000,0000,00,9,99,python,2,2.html?lang=c&postchannel=0000&workyear=99&cotype=99&degreefrom=99&jobterm=99&companysize=99&ord_field=0&dibiaoid=0&line=&welfare=',
#     'Accept-Encoding': 'gzip, deflate, br',
#     'Accept-Language': 'zh-CN,zh;q=0.9',
# }

# params = (
#     ('lang', 'c'),
#     ('postchannel', '0000'),
#     ('workyear', '99'),
#     ('cotype', '99'),
#     ('degreefrom', '99'),
#     ('jobterm', '99'),
#     ('companysize', '99'),
#     ('ord_field', '0'),
#     ('dibiaoid', '0'),
#     ('line', ''),
#     ('welfare', ''),
# )

# response = requests.get('https://search.51job.com/list/000000,000000,0000,00,9,99,python,2,1.html', headers=headers, params=params, cookies=cookies)


import requests, re
from urllib import parse
def query(region):
    header = {'User-Agent': 'Opera/8.0 (Windows NT 5.1; U; en)'}
    url = 'http://apis.map.qq.com/jsapi?'
    data = {
        'qt': 'poi',
        'wd': region,
        'pn': 0,
        'rn': 10,
        'rich_source': 'qipao',
        'rich': 'web',
        'nj': 0,
        'c': 1,
        'key': 'FBOBZ-VODWU-C7SVF-B2BDI-UK3JE-YBFUS',
        'output': 'jsonp',
        'pf': 'jsapi',
        'ref': 'jsapi',
        'cb': 'qq.maps._svcb3.search_service_0'}
    coordinate_url = url + parse.urlencode(data)
    r = requests.get(coordinate_url, headers=header)
    longitude = re.findall('"pointx":\s*"(.+?)"', r.text)[0]
    latitude = re.findall('"pointy":\s*"(.+?)"', r.text)[0]
    print([region, longitude, latitude])
query('福州=')

# 福州市,119.296470,26.074210
print()
#NB. Original query string below. It seems impossible to parse and
#reproduce query strings 100% accurately so the one below is given
#in case the reproduced version is not "correct".
# response = requests.get('https://search.51job.com/list/000000,000000,0000,00,9,99,python,2,2.html?lang=c&postchannel=0000&workyear=99&cotype=99&degreefrom=99&jobterm=99&companysize=99&ord_field=0&dibiaoid=0&line=&welfare=', headers=headers, cookies=cookies)

