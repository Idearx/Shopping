from django.conf.urls import url

from App import views

urlpatterns=[
    url(r'^$',views.index,name='index'),
    url(r'^detail/$',views.detail,name='detail'),
    url(r'^login/$',views.login,name='login'),
    url(r'^login_phone/$',views.login_phone,name='login_phone'),
    url(r'^car/$',views.car,name='car'),
    url(r'^logout/$',views.logout,name='logout'),
    url(r'^register_phone/$', views.register_phone, name='register_phone'),
    url(r'^register_email/$', views.register_email, name='register_email'),
    url(r'^generate_yzm/$',views.generate_yzm,name='generate_yzm'),
    url(r'^order/$',views.order,name='order'),
    url(r'^find_password/$',views.find_password,name='find_password'),
    url(r'^find_pw_sendmsg/$',views.find_pw_sendmsg,name='find_pw_sendmsg'),
    url(r'^find_generate_yzm/$',views.find_generate_yzm,name='find_generate_yzm'),
    url(r'^setnewpassword/$',views.setnewpassword,name='setnewpassword'),
    url(r'^register_yzm/$', views.register_yzm, name='register_yzm'),
    url(r'^sendmail/$', views.sendMail, name='sendmail'),
]