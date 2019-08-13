from random import randint

from django.db.models import Q
from django.shortcuts import render, redirect

# Create your views here.
from django.urls import reverse

from App.models import *
from App.test_msg import send_sms
from Shopping.settings import MAXAGE


def index(request):
    return render(request, 'common/huawei.html')


def detail(request):
    return render(request, 'common/detailnew2.html', context={
        'title': '华为P30',
    })


def login(request):
    if request.method == 'POST':
        # 获取数据
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = User.objects.filter(Q(email=username) | Q(tel=username) | Q(hwid=username)).first()
        if user:
            if user.password == password:
                response = redirect(reverse('app:index'))
                request.session['username'] = username
                request.session.set_expiry(MAXAGE)
                return response
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
        print(phonenum,yzmnum)
        if phonenum=='15517768834' and yzmnum=='123':
            response = redirect(reverse('app:index'))
            request.session['phonenum'] = phonenum
            request.session.set_expiry(MAXAGE)
            return response
    return render(request, 'common/hualogin0.html', context={
        'title': '为华-登录',
        'testid': 0
    })

def car(request):
    return render(request, 'common/shopping_car.html', context={
        'title': '为华-购物车'
    })


def logout(request):
    response =  redirect(reverse('app:index'))
    request.session.flush()
    return response


def register_phone(request):
    return render(request, 'common/register_phone.html', context={
        'title':'手机号注册'
    })


def register_email(request):
    return render(request, 'common/email_register.html', context={
        'title': '手机号注册'
    })


def generate_yzm(request):
    # 产生验证码
    if request.method=='POST':
        print(request.POST.get('phonenum'))
        phonenum = request.POST.get('phonenum')
        code = ''
        for i in range(6):
            num = randint(0,9)
            code+=str(num)
        print(code)
        send_sms(phonenum, {'number': code})
        print('1111111111111111111111111111111')
        response = redirect(reverse('app:login'))
        request.session['yzm_num'] = code
        return response


def order(request):
    return render(request,'common/dingdan.html',context={
        'title':"为华-订单"
    })