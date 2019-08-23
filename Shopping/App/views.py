import datetime
import hashlib
from random import randint

from alipay import AliPay
from django.core.mail import send_mail
from django.core.paginator import Paginator
from django.db.models import Q
from django.http import HttpResponse
from django.shortcuts import render, redirect

# Create your views here.
from django.urls import reverse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from App.forms import UserForm
from App.forms2 import UserForm2
from App.models import *
from App.test_msg import send_sms
from Shopping import settings
from Shopping.settings import MAXAGE, COUNTOFPAGE, PAGERANGE, ALI_APP_ID, APP_PRIVATE_KEY, ALIPAY_PUBLIC_KEY


def index(request):
    pc_obj_list = []
    pc_price_dict = {}
    smart_obj_list = []
    smart_price_dict = {}
    hot_obj_list = []
    hot_price_dict = {}
    jing_obj_list = []
    jing_price_dict = {}
    pcs = Imgs.objects.filter(rid=2).values('goodname').distinct()
    smarts = Imgs.objects.filter(rid=3).values('goodname').distinct()
    hots = Imgs.objects.filter(rid=4).values('goodname').distinct()
    jings = Imgs.objects.filter(rid=5).values('goodname').distinct()
    for pc in pcs:
        print(pc['goodname'])
        pc_price_dict[pc['goodname']] = Goods.objects.filter(goodname=pc['goodname']).first().price
        pc_obj_list.append(Imgs.objects.filter(goodname=pc['goodname']).first())
    for smart in smarts:
        print(smart['goodname'])
        smart_price_dict[smart['goodname']] = Goods.objects.filter(goodname=smart['goodname']).first().price
        smart_obj_list.append(Imgs.objects.filter(goodname=smart['goodname']).first())
    for hot in hots:
        print(hot['goodname'])
        hot_price_dict[hot['goodname']] = Goods.objects.filter(goodname=hot['goodname']).first().price
        hot_obj_list.append(Imgs.objects.filter(goodname=hot['goodname']).first())
    for jing in jings:
        print(jing['goodname'])
        jing_price_dict[jing['goodname']] = Goods.objects.filter(goodname=jing['goodname']).first().price
        jing_obj_list.append(Imgs.objects.filter(goodname=jing['goodname']).first())
    print(pc_obj_list)
    print(pc_price_dict)
    print(smart_obj_list)
    print(smart_price_dict)
    print(hot_obj_list)
    print(hot_price_dict)
    print(jing_obj_list)
    print(jing_price_dict)
    url_huaweip30 = Imgs.objects.first().imgurl
    return render(request, 'common/huawei.html', context={
        'url_huaweip30': url_huaweip30,
        'pc_obj_list': pc_obj_list,
        'pc_price_dict': pc_price_dict,
        'smart_obj_list': smart_obj_list,
        'smart_price_dict': smart_price_dict,
        'hot_obj_list': hot_obj_list,
        'hot_price_dict': hot_price_dict,
        'jing_obj_list': jing_obj_list,
        'jing_price_dict': jing_price_dict,
    })


def detail(request, goodname='123', page='1'):
    print(goodname)
    good_obj = Goods.objects.filter(goodname=goodname)
    good_gid_list = []
    # good_comment_obj_list = []
    good_comment_portrait_dict = {}
    good_comment_Goods_dict = {}
    good_comment_obj_new = Comments.objects.filter(goodname=goodname).all().order_by('comid')
    print(good_comment_obj_new)

    # 分页
    paginator = Paginator(good_comment_obj_new, COUNTOFPAGE)
    page = int(page)
    # 参数是当前的页码
    pager = paginator.page(page)
    print('1111111111111', page, paginator, pager)
    # 自定义页码范围
    if paginator.num_pages > PAGERANGE:
        if page - 3 <= 0:
            my_page_range = range(1, 7)
        elif page + 2 > paginator.num_pages:
            my_page_range = range(paginator.num_pages - 5, paginator.num_pages + 1)
        else:
            my_page_range = range(page - 3, page + 3)
    else:  # 总页数小于PAGERANGE
        my_page_range = paginator.page_range
    # 页码序列
    pager.page_range = my_page_range
    print('页码范围', pager.page_range)

    for per_com_obj in good_comment_obj_new:
        good_comment_user_img_name = []
        img = User.objects.filter(uid=per_com_obj.uid).first().img
        nickyname = User.objects.filter(uid=per_com_obj.uid).first().nickyname
        good_comment_user_img_name.append(img)
        good_comment_user_img_name.append(nickyname)
        good_comment_portrait_dict[per_com_obj.comid] = good_comment_user_img_name
        good_comment_Goods_dict[per_com_obj.comid] = Goods.objects.filter(gid=per_com_obj.gid).first()
    for per_good in good_obj:
        good_gid_list.append(per_good.gid)
        # if Comments.objects.filter(gid=per_good.gid).all():
        # for per_com_obj in Comments.objects.filter(gid=per_good.gid).all():
        #     good_comment_user_img_name = []
        #     # print(User.objects.filter(uid=per_com_obj.uid).first().img)
        #     user = User.objects.filter(uid=per_com_obj.uid).first()
        #     print(user)
        #     img = user.img
        #     nickyname = User.objects.filter(uid=per_com_obj.uid).first().nickyname
        #     good_comment_user_img_name.append(img)
        #     good_comment_user_img_name.append(nickyname)
        #     good_comment_portrait_dict[per_com_obj.comid] = good_comment_user_img_name
        #     good_comment_Goods_dict[per_com_obj.comid] = Goods.objects.filter(gid=per_com_obj.gid).first()
        # good_comment_obj_list.append(per_com_obj)
    print(good_gid_list)
    # print(good_comment_obj_list)
    # good_comment_big_obj_list = []
    print(good_comment_portrait_dict)
    print(good_comment_Goods_dict)
    # for i in range(0, len(good_comment_obj_list)):
    #     if i % 2 == 0:
    #         good_comment_little_obj_list = []
    #         good_comment_little_obj_list.append(good_comment_obj_list[i])
    #         good_comment_big_obj_list.append(good_comment_little_obj_list)
    # print(good_comment_big_obj_list)
    # for j in range(0, len(good_comment_obj_list)):
    #     if j % 2 != 0:
    #         if j == 1:
    #             good_comment_big_obj_list[0].append(good_comment_obj_list[j])
    #         else:
    #             n = int((j - 1) / 2)
    #             good_comment_big_obj_list[n].append(good_comment_obj_list[j])
    # page_num_list = []
    # for i in range(1,len(good_comment_big_obj_list)+1):
    #     page_num_list.append(i)
    # print(page_num_list)
    # print(good_comment_big_obj_list)

    good_obj_price_obj_price = Goods.objects.filter(goodname=goodname).first().price
    good_obj_price_obj = Goods.objects.filter(goodname=goodname).first()
    good_obj_first_img = Imgs.objects.filter(gid=good_obj_price_obj.gid).first().imgurl
    canshu_obj_list = Goodsdetail.objects.filter(goodname=goodname).all()
    print(good_obj_first_img)
    print(good_obj_price_obj_price)
    good_obj_price_list = []
    good_obj_goodcode_list = []
    good_obj_goodcode_dict = {}
    good_obj_color_list = []
    good_obj_versions_list = []
    good_img_obj_list_big = []
    myrecommend_reid_list = []
    myrecommend_good_obj = []
    myrecommend_good_img_dict = {}
    for good in good_obj:
        if good.reid not in myrecommend_reid_list:
            myrecommend_reid_list.append(good.reid)
    for per_reid in myrecommend_reid_list:
        recom_good_obj = Goods.objects.filter(gid=per_reid)
        recom_good_img_obj = Imgs.objects.filter(gid=per_reid)
        recom_good_img_imgurl_list = []
        for per_recom_good_img_obj in recom_good_img_obj:
            recom_good_img_imgurl_list.append(per_recom_good_img_obj.imgurl)
        myrecommend_good_img_dict[per_reid] = recom_good_img_imgurl_list
        myrecommend_good_obj.append(recom_good_obj)
    print(myrecommend_good_obj)
    print(myrecommend_good_img_dict)
    good_obj_goodname = Imgs.objects.filter(goodname=goodname)
    print(good_obj_goodname)
    goodstype = Types.objects.filter(tid=good_obj.first().tid).first()
    for good in good_obj_goodname.values('gid').distinct():
        good_img_obj_list_small = []
        for key, value in good.items():
            good_img_obj_list_small.append(Imgs.objects.filter(gid=value))
        good_img_obj_list_big.append(good_img_obj_list_small)

    for good in good_obj.values('versions').distinct():
        for key, value in good.items():
            good_obj_versions_list.append(value)
    for good in good_obj.values('color').distinct():
        for key, value in good.items():
            good_obj_color_list.append(value)
    for i in range(0, len(good_obj_color_list)):
        good_obj_color_small_list = []
        for cor in good_obj.filter(color=good_obj_color_list[i]):
            good_obj_color_small_list.append(cor.goodcode)
        good_obj_goodcode_dict[i] = good_obj_color_small_list
    print(good_obj_goodcode_dict)
    for good in good_obj.values('goodcode').distinct():
        for key, value in good.items():
            good_obj_goodcode_list.append(value)
    for good in good_obj.values('price').distinct():
        for key, value in good.items():
            good_obj_price_list.append(value)
    # print(good_obj_price_list)
    # print(good_obj_goodcode_list)
    # print(good_obj_color_list)
    # print(good_obj_versions_list)
    # print(good_img_obj_list_big)

    good_obj_color_dict = {}
    good_img_obj_dict_big = {}
    for i in range(0, len(good_obj_color_list)):
        good_obj_color_dict[i] = good_obj_color_list[i]
    for j in range(0, len(good_img_obj_list_big)):
        good_img_obj_dict_big[j] = good_img_obj_list_big[j]
    print(good_img_obj_dict_big)

    return render(request, 'common/detailnew2.html', context={
        'title': goodname,
        'goodname': goodname,
        'good_obj_price_obj_price': good_obj_price_obj_price,
        'good_obj_first_img': good_obj_first_img,
        'myrecommend_good_obj': myrecommend_good_obj,
        'myrecommend_good_img_dict': myrecommend_good_img_dict,
        'good_obj_price_list': good_obj_price_list,
        'good_obj_goodcode_list': good_obj_goodcode_list,
        'good_obj_color_list': good_obj_color_list,
        'good_obj_versions_list': good_obj_versions_list,
        'good_img_obj_list_big': good_img_obj_list_big,
        'good_img_obj_dict_big': good_img_obj_dict_big,
        'good_obj_color_dict': good_obj_color_dict,
        'good_obj_goodcode_dict': good_obj_goodcode_dict,
        'canshu_obj_list': canshu_obj_list,
        # 'good_comment_obj_list': good_comment_obj_list,
        'good_comment_obj_list': good_comment_obj_new,
        'good_comment_portrait_dict': good_comment_portrait_dict,
        'good_comment_Goods_dict': good_comment_Goods_dict,
        # 'good_comment_big_obj_list': good_comment_big_obj_list,
        # 'page_num_list':page_num_list,
        'pager': pager,
        'goodstype': goodstype
    })
    # return redirect(reverse('app:detail'),kwargs={'goodname':goodname})


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
    username = '123'
    if 'username' in request.session:
        username = request.session['username']
    else:
        return redirect(reverse('app:login'))
    # print(username+"*************")
    user = User.objects.filter(Q(email=username) | Q(tel=username) | Q(hwid=username)).first()
    uid = user.uid
    cids = Cart.objects.filter(uid=int(uid)).all()  # 该用户加入购物车的全部商品
    # print(cids)

    gids_good = []
    images = []
    good_img = {}
    num_price = 0
    num = {}
    count = 0
    gid_add = {}
    gid_sub = {}
    gid_num = {}
    index = 0
    prices = 0
    pricess = {}
    servers = {}
    delete_list_id = []
    for car in cids:

        g_good = Goods.objects.filter(gid=car.gid).first()
        delete_list_id.append('#'+'delete'+str(g_good.goodcode))

        gids_good.append(g_good)
        count = count + 1

        # print('!!!!!!!!!!!!!!!!!!1')
        # print(*gids_good)

        image = Imgs.objects.filter(gid=car.gid).first()
        images.append(image)
        good_img[g_good] = image

        server = car.server
        servers[g_good] = server
        if server == 0:
            price = g_good.price
            pricess[g_good] = price
        elif server == 1:
            price = g_good.price + 200
            pricess[g_good] = price
        else:
            price = g_good.price + 600
            pricess[g_good] = price

        buynum = Cart.objects.filter(cid=car.cid).first().buynum
        prices = prices + int(g_good.price) * int(buynum)
        print(prices)
        print('############')
        # num.append(buynum)
        num[g_good] = buynum
        # print(num)
        # print('************')
        gid_add[car.gid] = 'myadd' + str(index)
        gid_sub[car.gid] = 'mysub' + str(index)
        gid_num[car.gid] = 'number' + str(index)
        print(gid_num)
        index += 1
    for good in gids_good:
        for gid_key, mynumber in gid_num.items():
            if good.gid == gid_key:
                print(gid_key, good.gid)
    return render(request, 'common/shopping_car.html', locals())


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
                    User.objects.create(tel=tel, password=b_password, birth=birthday, hwid='hw_' + tel)
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
                    User.objects.create(email=email, password=b_password, birth=birthday, hwid='hw_' + email)
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
        print(code, phonenum)
        send_sms(phonenum, {'number': code})
        print('2222222222222222222')
        response = redirect(reverse('app:find_generate_yzm'))
        request.session['yzm_num1'] = code
        return response
    return render(request, 'common/find_pw_sendmsg.html', context={
        'title': '为华-找回密码',
        'find_phone_num': request.session['find_phone_num']
    })


def order(request):
    return render(request, 'common/dingdan.html', context={
        'title': "为华-订单"
    })


# 找回密码，验证输入的手机号在数据库中是否有信息
def find_password(request):
    if request.method == 'POST':
        find_phone_num = request.POST.get('formBean.username')
        print(find_phone_num, type(find_phone_num))
        if User.objects.filter(tel=find_phone_num):
            find_num = find_phone_num
            request.session['find_num'] = find_num
            find_phone_num = find_phone_num[0:3] + "*****" + find_phone_num[7:11]
            request.session['find_phone_num'] = find_phone_num
            return render(request, 'common/find_pw_sendmsg.html', context={
                'title': '为华-找回密码',
                'find_phone_num': find_phone_num,
                'find_num': find_num,
                'error_id': 0
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
        print(yzm, yzm_num1)
        if yzm == yzm_num1:
            return render(request, 'common/setnew2.html', context={
                'title': '为华-找回密码',
                'set_error_id': 0
            })
        else:
            return render(request, 'common/find_pw_sendmsg.html', context={
                'title': '为华-找回密码',
                'find_phone_num': request.session['find_phone_num'],
                'error_id': 1
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
        print(newPassword, confirmPasswd)
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


def gotocar(request):
    if request.method == 'POST':
        good_code = request.POST.get('h_code')
        server_content = request.POST.get('myserver')
        good_count = request.POST.get('good_count')
        print(good_code, server_content, good_count)
        server = 0
        if server_content == "无增值服务" or server_content == '无服务':
            server = 0
        elif server_content == "3年保修 ￥200":
            server = 1
        elif server_content == "3年包退 ￥600":
            server = 2
        if 'username' in request.session:
            username = request.session['username']
            gid = Goods.objects.filter(goodcode=good_code).first().gid
            buynum = good_count
            uid = User.objects.filter(Q(email=username) | Q(tel=username) | Q(hwid=username)).first().uid
            Cart.objects.create(gid=gid, buynum=buynum, uid=uid, server=server)
            # good = Goods.objects.filter(goodcode=good_code).first()
            # good.count = good.count-buynum
            # good.save()
            return redirect(reverse('app:car'))
        return redirect(reverse('app:login'))


# def delect(request):
#     if request.method == 'POST':
#         print('***************************')
#         user = request.session['username']
#         uid = User.objects.filter(Q(email=user) | Q(tel=user) | Q(hwid=user))
#         cids = Cart.objects.filter(uid=uid).all()
#         good = request.POST.get('to_delete')
#         print(good)
#
#         c1 = Cart.objects.filter(gid=good).first()
#         c1.delete()
#
#     return redirect(reverse('app:car'))
def delect(request,gid=0):
    if request.method == 'GET':
        print('***************************')
        user = request.session['username']
        uid = User.objects.filter(Q(email=user) | Q(tel=user) | Q(hwid=user))
        cids = Cart.objects.filter(uid=uid).all().filter(gid=gid).first()
        cids.delete()
        # good = request.POST.get('to_delete')
        # print(good)
        #
        # c1 = Cart.objects.filter(gid=good).first()
        # c1.delete()

    return redirect(reverse('app:car'))


def buy_now(request):
    if request.method == 'POST':
        print('!!!!!!!!!!')
        # prices = request.POST.get('prices')
        # print(prices)
        user = request.session['username']
        uid = User.objects.filter(Q(email=user) | Q(tel=user) | Q(hwid=user))
        cids = Cart.objects.filter(uid=uid).all()
        for i in cids:
            good = Goods.objects.filter(gid=i.gid).first()

    return HttpResponse('1111')


def buynum_add(request):
    if request.method == 'POST':
        print('?????????????????')
        number = request.POST.get('buynum')
        print(number)

    return HttpResponse('11')


def dingdan(request):
    if request.method == 'POST':
        print('!!!!!!!!!!')

        user = request.session['username']
        uid = User.objects.filter(Q(email=user) | Q(tel=user) | Q(hwid=user))
        print(uid)
        cids = Cart.objects.filter(uid=uid).all()
        user_id = uid[0].uid
        print(user_id)
        addrs = Addrs.objects.filter(uid=user_id, isdefault=1).first()

        images = []
        good_img = {}
        num = {}
        goods = []
        servers = {}
        pricess = {}
        for i in cids:
            good = Goods.objects.filter(gid=i.gid).first()
            goods.append(good)
            image = Imgs.objects.filter(gid=i.gid).first()
            images.append(image)

            server = i.server
            servers[good] = server
            if server == 0:
                price = good.price
                pricess[good] = price
            elif server == 1:
                price = good.price + 200
                pricess[good] = price
            else:
                price = good.price + 600
                pricess[good] = price

            good_img[good] = image
            a = good.goodcode
            print(a)
            buynum = request.POST.get(str(a))

            # buynum = Cart.objects.filter(cid=i.cid).first().buynum
            print(buynum)
            num[good] = int(buynum)
            zongji = request.POST.get('zongji')
            print(zongji)

        return render(request, 'common/dingdan.html', locals())

    return render(request, 'common/dingdan.html', locals())


def confirm_buy(request):
    if request.method == 'POST':
        user = request.session['username']
        uid = User.objects.filter(Q(email=user) | Q(tel=user) | Q(hwid=user)).first().uid
        print(type(uid))
        cids = Cart.objects.filter(uid=uid).all()
        print(cids)
        for i in cids:
            good = Goods.objects.filter(gid=i.gid).first()
            print(good)
            buynum = request.POST.get(str(good.goodcode))
            print(type(buynum))

            gid = good.gid
            print(type(gid))

            totalprice = request.POST.get('totalprice')
            print(type(totalprice))

            print(totalprice)
            rid = request.POST.get('dizhi')
            print(type(rid))
            print(rid)
            zongji = request.POST.get('zongjiage')
            print(zongji)
            request.session['zongji'] = zongji
            o1 = Orders(uid=uid, gid=gid, totalprice=int(totalprice), buynum=int(buynum), rid=int(rid),
                        ordernum='11111', status='待支付')
            o1.save()
            # i.delete()
        return redirect(reverse('app:ali_buy'))

    return render(request, 'common/huawei.html', locals())


@api_view(["GET", "POST"])
def ali_buy(request):
    # order_no = "2019082102983"
    zongji = request.session['zongji']
    print(type(zongji))
    alipay = AliPay(
        appid=ALI_APP_ID,
        app_notify_url=None,  # 默认回调url
        app_private_key_string=APP_PRIVATE_KEY,
        # 支付宝的公钥，验证支付宝回传消息使用，不是你自己的公钥,
        alipay_public_key_string=ALIPAY_PUBLIC_KEY,
        sign_type="RSA2",  # RSA 或者 RSA2
        debug=False  # 默认False
    )

    order_string = alipay.api_alipay_trade_page_pay(
        out_trade_no="2019061900100",
        total_amount=int(zongji),
        subject="macpro",
        return_url="http://localhost:8000/app/",
        notify_url="http://localhost:8000/app/"  # 可选, 不填则使用默认notify url
    )
    print(order_string)

    # 支付宝网关
    net = "https://openapi.alipaydev.com/gateway.do?"

    data = {
        "msg": "ok",
        "status": 200,
        "data": {
            "pay_url": net + order_string
        }
    }

    return Response(data)


def user0(request):
    types = Types.objects.all()
    if 'username' in request.session:
        username = request.session['username']
        user = User.objects.filter(Q(email=username) | Q(tel=username) | Q(hwid=username)).first()
        carts = Cart.objects.filter(uid=user.uid).all()
        orders = Orders.objects.filter(uid=user.uid).all()
        cart_count = len(carts)
        order_count = len(orders)
        print(cart_count)
        print(order_count)
    if request.method == 'POST':
        # search = request.
        search = request.POST.get('search')
        return redirect(reverse('app:detail'))
    title = '个人中心'
    return render(request, 'common/user0.html', locals())


def user_msg(request):
    types = Types.objects.all()
    if 'username' in request.session:
        username = request.session['username']
        user = User.objects.filter(Q(email=username) | Q(tel=username) | Q(hwid=username)).first()
        carts = Cart.objects.filter(uid=user.uid).all()
        cart_count = len(carts)
        each_msgs = Comments.objects.filter(reid=user.uid)
        msgs = Msgs.objects.filter(touid=user.uid)
    title = '我的消息'
    return render(request, 'common/user_msg.html', locals())


def user_msg_detail(request, msgid=0):
    types = Types.objects.all()

    return redirect(reverse('app:user_msg_detail', kwargs={'msgid':msgid}))


def user_order(request):
    types = Types.objects.all()
    # allgoods = []
    # paid_goods = []
    # receive_goods = []
    # comment_goods = []
    # finish_goods = []
    # cancel_goods = []
    # paid_orders = []
    # receive_orders = []
    # comment_orders = []
    # finish_orders = []
    # cancel_orders = []
    # if 'username' in request.session:
    #     username = request.session['username']
    #     user = User.objects.filter(Q(email=username) | Q(tel=username) | Q(hwid=username)).first()
    #     carts = Cart.objects.filter(uid=user.uid).all()
    #     cart_count = len(carts)
    #     allorders = Orders.objects.filter(uid=user.uid)
    #     allcount = len(allorders)
    #     for ord in allorders:
    #         good = Goods.objects.filter(gid=ord.gid).first()
    #         allgoods.append(good)
    #         if ord.status == '待支付':
    #             paid_goods.append(good)
    #             paid_orders.append(ord)
    #         elif ord.status == '待收货':
    #             receive_goods.append(good)
    #             receive_orders.append(ord)
    #         elif ord.status == '待评价':
    #             comment_goods.append(good)
    #             comment_orders.append(ord)
    #         elif ord.status == '已完成':
    #             finish_goods.append(good)
    #             finish_orders.append(ord)
    #         else:
    #             cancel_goods.append(good)
    #             cancel_orders.append(ord)
    #     to_be_paid = len(paid_goods)
    #     to_be_receive = len(receive_goods)
    #     to_be_comment = len(comment_goods)
    #     to_be_finish = len(finish_goods)
    #     to_be_cancel = len(cancel_goods)
    #     print(len(allgoods), to_be_paid, to_be_comment, to_be_receive, to_be_finish, to_be_cancel)
    allord = {}
    paidord = {}
    receiveord = {}
    commentord = {}
    finishord = {}
    cancelord = {}
    if 'username' in request.session:
        username = request.session['username']
        user = User.objects.filter(Q(email=username) | Q(tel=username) | Q(hwid=username)).first()
        carts = Cart.objects.filter(uid=user.uid).all()
        cart_count = len(carts)
        allorders = Orders.objects.filter(uid=user.uid)
        allcount = len(allorders)
        for ord in allorders:
            good = Goods.objects.filter(gid=ord.gid).first()
            allord[ord] = good

            if ord.status == '待支付':
                paidord[ord] = good

            elif ord.status == '待收货':
                receiveord[ord] = good

            elif ord.status == '待评价':
                commentord[ord] = good

            elif ord.status == '已完成':
                finishord[ord] = good

            else:
                cancelord[ord] = good

        to_be_paid = len(paidord)
        to_be_receive = len(receiveord)
        to_be_comment = len(commentord)
        to_be_finish = len(finishord)
        to_be_cancel = len(cancelord)
        # print(len(allgoods), to_be_paid, to_be_comment, to_be_receive, to_be_finish, to_be_cancel)

    title = '我的订单'
    return render(request, 'common/user_order.html', locals())


def user_returns(request):
    types = Types.objects.all()
    all_orders = []
    all_goods = []
    if 'username' in request.session:
        username = request.session['username']
        user = User.objects.filter(Q(email=username) | Q(tel=username) | Q(hwid=username)).first()
        carts = Cart.objects.filter(uid=user.uid).all()
        cart_count = len(carts)
        starttime = (datetime.datetime.now() - datetime.timedelta(days=180)).strftime('%Y-%m-%d %H:%M:%S')
        print(starttime)
        allorders = Orders.objects.filter(uid=user.uid)
        for order in allorders:
            good = Goods.objects.filter(gid=order.gid).first()
            if order.status == '待评价' or order.status == '已完成':
                # print(order.ordtime.strftime('%Y-%m-%d %H:%M:%S'), type(order.ordtime.strftime('%Y-%m-%d %H:%M:%S')))
                # print(starttime, type(starttime))
                # print(order.ordtime.strftime('%Y-%m-%d %H:%M:%S') > starttime)
                if order.ordtime.strftime('%Y-%m-%d %H:%M:%S') > starttime:
                    all_orders.append(order)
                    all_goods.append(good)
        to_be_return = len(all_orders)
    title = '我的退换货'
    return render(request, 'common/user_returns.html', locals())


def user_drawback(request):
    types = Types.objects.all()
    if 'username' in request.session:
        username = request.session['username']
        user = User.objects.filter(Q(email=username) | Q(tel=username) | Q(hwid=username)).first()
        carts = Cart.objects.filter(uid=user.uid).all()
        cart_count = len(carts)
    title = '我的退款'
    return render(request, 'common/user_drawback.html', locals())


def user_comment(request):
    types = Types.objects.all()
    afterorder = []
    aftergoods = []
    beforeorder = []
    beforegoods = []
    if 'username' in request.session:
        username = request.session['username']
        user = User.objects.filter(Q(email=username) | Q(tel=username) | Q(hwid=username)).first()
        carts = Cart.objects.filter(uid=user.uid).all()
        cart_count = len(carts)
        starttime = (datetime.datetime.now() - datetime.timedelta(days=180)).strftime('%Y-%m-%d %H:%M:%S')
        allorders = Orders.objects.filter(uid=user.uid)
        for order in allorders:
            good = Goods.objects.filter(gid=order.gid).first()
            if order.status == '待评价':
                if order.ordtime.strftime('%Y-%m-%d %H:%M:%S') > starttime:
                    afterorder.append(order)
                    aftergoods.append(good)
                else:
                    beforeorder.append(order)
                    beforegoods.append(good)
        aftercount = len(aftergoods)
        beforecount = len(beforegoods)

    title = '商品评价'
    return render(request, 'common/user_comments.html', locals())


def user_points(request):
    types = Types.objects.all()
    if 'username' in request.session:
        username = request.session['username']
        user = User.objects.filter(Q(email=username) | Q(tel=username) | Q(hwid=username)).first()
        carts = Cart.objects.filter(uid=user.uid).all()
        cart_count = len(carts)
        points = user.points

    title = '我的积分'
    return render(request, 'common/user_points.html', locals())


def goods_type(request, tid):
    types = Types.objects.all()

    return redirect(reverse('app:goods_type', kwargs={'tid':tid}))


def user_info(request):
    username = request.session['username']
    user = User.objects.filter(Q(email=username) | Q(tel=username) | Q(hwid=username)).first()
    print(user.nickyname)
    print('!!!!!!!!!!!')

    if request.method == 'POST':
        nickyname = request.POST.get('nicheng')
        xingbie = request.POST.get('sex')
        file = request.FILES.get('file')
        # print(file.name)
        # print(file.size)
        savePath = os.path.join(settings.MDEIA_ROOT, file.name)  # print(savePath)
        with open(savePath, 'wb') as f:
            # f.write(file.read())
            if file.multiple_chunks():
                for myf in file.chunks():
                    f.write(myf)
                print('大大于2.5')
            else:
                print('小小于2.5')
                f.write(file.read())
        sex = 0
        if xingbie == '男':
            sex = 1
        elif xingbie == '女':
            sex = 2
        addr = request.POST.get('addr')
        realname = request.POST.get('realname')
        birth = request.POST.get('birth')
        u1 = User.objects.get(pk=user.uid)
        u1.nickyname = nickyname
        u1.sex = sex
        u1.addr = addr
        u1.realname = realname
        u1.img = '/static/upload/'+ file.name
        # u1.birth = datetime.datetime.strftime(birth, '%Y-%m-%d')
        u1.save()
    return render(request, 'common/user_info.html', locals())


def user_safety(request):
    return render(request, 'common/user_safety.html', context={
        'title': "实名认证",
    })


def user_vip(request):
    types = Types.objects.all()
    if 'username' in request.session:

        username = request.session['username']
        user = User.objects.filter(Q(email=username) | Q(tel=username) | Q(hwid=username)).first()
        carts = Cart.objects.filter(uid=user.uid).all()
        cart_count = len(carts)

    title = '等级与特权'
    return render(request, 'common/user_vip.html', locals())


def user_coupon(request):
    types = Types.objects.all()
    if 'username' in request.session:
        username = request.session['username']
        user = User.objects.filter(Q(email=username) | Q(tel=username) | Q(hwid=username)).first()
        carts = Cart.objects.filter(uid=user.uid).all()
        cart_count = len(carts)

    title = '我的优惠券'
    return render(request, 'common/user_coupon.html', locals())


def receive_addr(request):
    types = Types.objects.all()
    if request.method == 'POST':
        user = request.session['username']
        uid = User.objects.filter(Q(email=user) | Q(tel=user) | Q(hwid=user)).first().uid
        name = request.POST.get('consignee')
        tel = request.POST.get('mobile')
        youbian = request.POST.get('zipCode')
        address = request.POST.get('address')
        moren = request.POST.get('defaultFlag')
        if moren == '1':
            r1 = Addrs(uid=uid, youbian=youbian, receivername=name, receivertel=tel, addr=address, isdefault=1)
            r1.save()
        r1 = Addrs(uid=uid, youbian=youbian, receivername=name, receivertel=tel, addr=address)
        r1.save()
    username = request.session['username']
    uid = User.objects.filter(Q(email=username) | Q(tel=username) | Q(hwid=username)).first().uid
    adds = Addrs.objects.filter(uid=uid).all()
    print(uid)
    print('******')

    user = User.objects.filter(Q(email=username) | Q(tel=username) | Q(hwid=username)).first()
    carts = Cart.objects.filter(uid=user.uid).all()
    cart_count = len(carts)
    for i in adds:
        if i.isdefault == 1:
            consignee = i.receivername
            addr = i.addr
            receivertel = i.receivertel
            you = i.youbian
            return render(request, 'common/receive_addr.html', locals())

    return render(request, 'common/receive_addr.html', context={
        'title': "收货地址",
        'types': types,
    })


def goods_arrival(request):
    types = Types.objects.all()
    user = request.session['username']
    uid = User.objects.filter(Q(email=user) | Q(tel=user) | Q(hwid=user)).first().uid
    orders = Orders.objects.filter(uid=uid).all()
    goods = []
    ords_time = {}
    ords_num = {}
    for i in orders:
        if i.status == '待收货':
            good = Goods.objects.filter(gid=i.gid).first()
            goods.append(good)
            ords_time[good] = i.ordtime
            ords_num[good] = i.ordernum
    count = len(goods)

    return render(request, 'common/goods_arrival.html', locals())

