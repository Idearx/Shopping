import re

from django import forms
from django.core.exceptions import ValidationError


def check_password(password):
    if re.match(r'\d+$', password):
        raise ValidationError("密码不能是纯数字")


def check_birthday(birthday):
    if not re.match(r'\d{4}-\d{2}-\d{2}$', birthday):
        print(birthday)

        raise ValidationError("请按格式输入出生日期")


class UserForm(forms.Form):
    tel = forms.CharField(label='手机号：', min_length=11, max_length=11,
                          error_messages={
                              'required': '请输入手机号',
                              'max_length': '手机号长度必须是11位',
                              'min_length': '手机号长度必须是11位'
                          })

    yzm = forms.CharField(label='验证码', min_length=6, max_length=6,
                          error_messages={
                              'required': '请输入验证码',
                              'max_length': '验证码长度必须是6位',
                              'min_length': '验证码长度必须是6位'
                          })
    password = forms.CharField(label='密码：', max_length=20,
                               min_length=3,
                               widget=forms.PasswordInput(attrs={
                                   'placehold': '请输入密码',
                                   'class': 'password'
                               }),
                               error_messages={
                                   'required': '请输入密码',
                                   'max_length': '密码最大20字符',
                                   'min_length': '密码最少3个字符'
                               },
                               validators=[check_password]
                               )
    confirm_password = forms.CharField(label="确认密码：", max_length=20,
                                       min_length=3,
                                       widget=forms.PasswordInput(attrs={
                                           'placehold': '请输入密码',
                                           'class': 'password'
                                       }),
                                       error_messages={
                                           'required': '密码必须输入',
                                           'max_length': '密码最大20字符',
                                           'min_length': '密码最少3个字符'
                                       },
                                       validators=[check_password]
                                       )
    birthday = forms.CharField(label='出生日期：', min_length=10, max_length=10,
                               error_messages={
                                   'required': '请输入出生日期',
                                   'max_length': '请按正确格式填写',
                                   'min_length': '请按正确格式填写',

                               },
                               validators=[check_birthday]
                               )

    # 全局验证函数
    def clean(self):
        password1 = self.cleaned_data.get('password')
        password2 = self.cleaned_data.get('confirm_password')
        if password1 == password2:
            return self.cleaned_data
        # 错误信息可以是一个字典，字典的键应该是出错的字段名
        raise ValidationError({'confirm_password': "两次密码不一致"})
