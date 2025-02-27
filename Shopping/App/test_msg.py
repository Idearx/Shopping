from aliyunsdkcore.client import AcsClient
from aliyunsdkcore.request import CommonRequest
from Shopping.settings import SMS_CONFIG


def send_sms(phone, templateParam):
    client = AcsClient(SMS_CONFIG['ACCESS_KEY_ID'],
                       SMS_CONFIG['ACCESS_KEY_SECRET'], 'default')
    request = CommonRequest()
    request.set_accept_format('json')
    request.set_domain('dysmsapi.aliyuncs.com')
    request.set_method('POST')
    request.set_protocol_type('https')  # https | http
    request.set_version('2017-05-25')
    request.set_action_name('SendSms')
    request.add_query_param('PhoneNumbers', phone)
    request.add_query_param('SignName', SMS_CONFIG['SignName'])
    request.add_query_param('TemplateCode', SMS_CONFIG['TemplateCode'])
    request.add_query_param('TemplateParam', templateParam)
    response = client.do_action_with_exception(request)
    return str(response, encoding='utf-8')


if __name__ == "__main__":
    # send_sms('13210949892', {'number': '666666'})
    send_sms('13700857601', {'number': '666666'})