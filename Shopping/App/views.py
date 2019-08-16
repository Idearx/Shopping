import hashlib
from random import randint

from django.core.mail import send_mail
from django.db.models import Q
from django.http import HttpResponse
from django.shortcuts import render, redirect

# Create your views here.
from django.urls import reverse

from App.forms import UserForm
from App.forms2 import UserForm2
from App.models import *
from App.test_msg import send_sms
from Shopping import settings
from Shopping.settings import MAXAGE


def index(request):
    good_img_list = []
    print(Imgs.objects.first().imgurl)
    print(Imgs.objects.values('goodname').distinct())
    for good in Imgs.objects.values('goodname').distinct():
        print(good['goodname'])
        good_img_list.append(Imgs.objects.filter(goodname=good['goodname']).first())
    print(good_img_list[1].imgurl)
    url_huaweip30 = Imgs.objects.first().imgurl
    return render(request, 'common/huawei.html',context={
        'url_huaweip30':url_huaweip30
    })


def detail(request):
    return render(request, 'common/detailnew2.html', context={
        'title': '华为P30',
    })


def login(request):
    if request.method == 'POST':
        # 获取数据
        username = request.POST.get('username')
        password = request.POST.get('password')
        password = hashlib.sha1(password.encode('utf-8')).hexdigest()
        user = User.objects.filter(Q(email=username) | Q(tel=username) | Q(hwid=username)).first()
        print(username, password)
        if user:
            if user.password == password:
                response = redirect(reverse('app:index'))
                request.session['username'] = username
                request.session.set_expiry(MAXAGE)
                return response
            else:
                return render(request, 'common/hualogin0.html', context={
                    'title': '为华-登录',
                    'testid': 1
                })
        else:
            print('2', username, password)
            return render(request, 'common/hualogin0.html', context={
                'title': '为华-登录',
                'testid': 1
            })

    return render(request, 'common/hualogin0.html', context={
        'title': '为华-登录',
        'testid': 0
    })


def login_phone(request):
    if request.method == 'POST':
        phonenum = request.POST.get('phonenum')
        yzmnum = request.POST.get('yzmnum')
        print(phonenum, yzmnum)
        # print(request.session['yzm_num'])
        if User.objects.filter(tel=phonenum):
            if 'yzm_num' in request.session and yzmnum == request.session['yzm_num']:
                response = redirect(reverse('app:index'))
                request.session['username'] = phonenum
                print(request.session['username'])
                request.session.set_expiry(MAXAGE)
                return response
            else:
                return render(request, 'common/hualogin0.html', context={
                    'title': "为华-登录",
                    'testid': 2
                })
        else:
            return render(request, 'common/hualogin0.html', context={
                'title': '为华-登录',
                'testid': 3
            })
    return render(request, 'common/hualogin0.html', context={
        'title': '为华-登录',
        'testid': 0
    })


def car(request):
    return render(request, 'common/shopping_car.html', context={
        'title': '为华-购物车'
    })


def logout(request):
    response = redirect(reverse('app:index'))
    request.session.flush()
    return response


def register_phone(request):
    yz = 0
    cf = 0
    if request.method == 'POST':
        form1 = UserForm(request.POST)
        if form1.is_valid():
            tel = request.POST.get('tel')
            yzm = request.POST.get('yzm')
            password = request.POST.get('password')
            birthday = request.POST.get('birthday')
            user = User.objects.filter(tel=tel).first()
            if not user:
                if yzm == request.session['yzm_num2']:
                    b_password = hashlib.sha1(password.encode('utf-8')).hexdigest()
                    User.objects.create(tel=tel, password=b_password, birth=birthday, hwid='hw_'+tel)
                    return redirect(reverse('app:login'))
                else:
                    yz = -1
                    return render(request, 'common/register_phone.html', {'form': form1, 'yz': yz, 'cf': cf})
            else:
                cf = -1
                return render(request, 'common/register_phone.html', {'form': form1, 'yz': yz, 'cf': cf})

        else:
            return render(request, 'common/register_phone.html', {'form': form1, 'yz': yz, 'cf': cf})

    else:
        form1 = UserForm()
        return render(request, 'common/register_phone.html', {'form': form1})


def register_email(request):
    yz = 0
    cf = 0
    if request.method == 'POST':
        print('66666666')
        form1 = UserForm2(request.POST)
        if form1.is_valid():
            print('5555555')
            email = request.POST.get('email')
            yzm = request.POST.get('yzm')
            password = request.POST.get('password')
            birthday = request.POST.get('birthday')
            user = User.objects.filter(email=email).first()
            if not user:
                print('1111111111111')
                if yzm == request.session['yzm_num3']:
                    print('22222222222222')
                    b_password = hashlib.sha1(password.encode('utf-8')).hexdigest()
                    User.objects.create(email=email, password=b_password, birth=birthday,hwid='hw_'+email)
                    return redirect(reverse('app:login'))
                else:
                    print('3333333333')
                    yz = -1
                    return render(request, 'common/email_register.html', {'form': form1, 'yz': yz, 'cf': cf})
            else:
                print('444444444444444')
                cf = -1
                return render(request, 'common/email_register.html', {'form': form1, 'yz': yz, 'cf': cf})

        else:
            print('77777')
            return render(request, 'common/email_register.html', {'form': form1, 'yz': yz, 'cf': cf})

    else:
        form1 = UserForm()
        return render(request, 'common/email_register.html', {'form': form1})


# 为手机登录用户产生验证码
def generate_yzm(request):
    # 产生验证码
    if request.method == 'POST':
        print(request.POST.get('phonenum'))
        phonenum = request.POST.get('phonenum')
        code = ''
        for i in range(6):
            num = randint(0, 9)
            code += str(num)
        print(code)
        send_sms(phonenum, {'number': code})
        print('1111111111111111111111111111111')
        response = redirect(reverse('app:login'))
        request.session['yzm_num'] = code
        return response
    return render(request, 'common/hualogin0.html', context={
        'title': '为华-登录',
        'testid': 0
    })

# 为找回密码的用户发送验证码，并把验证码存入session
def find_generate_yzm(request):
    # 产生验证码
    if request.method == 'POST':
        # print(request.POST.get('find_num'))
        print(request.session['find_num'])
        # phonenum = request.POST.get('find_num')
        phonenum = request.session['find_num']
        code = ''
        for i in range(6):
            num = randint(0, 9)
            code += str(num)
        print(code,phonenum)
        send_sms(phonenum, {'number': code})
        print('2222222222222222222')
        response = redirect(reverse('app:find_generate_yzm'))
        request.session['yzm_num1'] = code
        return response
    return render(request, 'common/find_pw_sendmsg.html', context={
        'title': '为华-找回密码',
        'find_phone_num':request.session['find_phone_num']
    })


def order(request):
    return render(request, 'common/dingdan.html', context={
        'title': "为华-订单"
    })

# 找回密码，验证输入的手机号在数据库中是否有信息
def find_password(request):
    if request.method == 'POST':
        find_phone_num = request.POST.get('formBean.username')
        print(find_phone_num,type(find_phone_num))
        if User.objects.filter(tel=find_phone_num):
            find_num = find_phone_num
            request.session['find_num'] = find_num
            find_phone_num = find_phone_num[0:3] + "*****" + find_phone_num[7:11]
            request.session['find_phone_num'] = find_phone_num
            return render(request,'common/find_pw_sendmsg.html',context={
                'title': '为华-找回密码',
                'find_phone_num':find_phone_num,
                'find_num':find_num,
                'error_id':0
            })
        else:
            return render(request, 'common/find_password.html', context={
                'title': '为华-找回密码',
                'find_id': 1
            })
    return render(request, 'common/find_password.html', context={
        'title': '为华-找回密码',
        'find_id': 0
    })

# 找回密码，验证用户收到的验证码是否正确
def find_pw_sendmsg(request):
    if request.method == 'POST':
        yzm = request.POST.get('find_yzm')
        yzm_num1 = request.session['yzm_num1']
        print(yzm,yzm_num1)
        if yzm == yzm_num1:
            return render(request,'common/setnew2.html',context={
                'title': '为华-找回密码',
                'set_error_id':0
            })
        else:
            return render(request, 'common/find_pw_sendmsg.html', context={
                'title': '为华-找回密码',
                'find_phone_num': request.session['find_phone_num'],
                'error_id':1
            })
    return render(request, 'common/find_pw_sendmsg.html', context={
        'title': '为华-找回密码',
        'find_phone_num': request.session['find_phone_num'],
        'error_id': 0
    })

# 设置新的密码
def setnewpassword(request):
    if request.method == 'POST':
        newPassword = request.POST.get("newPassword")
        confirmPasswd = request.POST.get("confirmPasswd")
        print(newPassword,confirmPasswd)
        user = User.objects.filter(tel=request.session['find_num']).first()
        print(user)
        user.password = hashlib.sha1(newPassword.encode('utf-8')).hexdigest()
        user.save()
        return redirect(reverse('app:login'))
    return HttpResponse('123')


def register_yzm(request):
    if request.method == 'POST':
        phonenum = request.POST.get('tel')
        print(phonenum)
        code = ''
        for i in range(6):
            num = randint(0, 9)
            code += str(num)
        print(code)
        send_sms(phonenum, {'number': code})
        print('333333333333333')
        response = redirect(reverse('app:register_phone'))
        request.session['yzm_num2'] = code
        return response
    return HttpResponse('123')


def sendMail(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        code = ''
        for i in range(6):
            num = randint(0, 9)
            code += str(num)
        send_mail('验证码', '验证码为:' + code, settings.EMAIL_FROM, [email])
        response = redirect(reverse('app:register_email'))
        request.session['yzm_num3'] = code
        print(request.session['yzm_num3'])
        return response
    return HttpResponse('123')