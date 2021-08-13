## git提交代码



### 提交流程

```
1.连接
ssh -T git@github.com
2.生成ssh
ssh-keygen -t rsa -C "2545589993@qq.com"
3.复制粘贴到github
clip < ~/.ssh/id_rsa.pub
4.查看连接状态
ssh -T git@github.com
5.报错执行
git config --global http.sslVerify "false"
6.查看本地提交记录
git status
7.提交
git push -u origin master


```





```bash
git config --global user.name "pinky-pig"
git config --global user.email "2545589993@qq.com"
cd ~/.ssh
ssh-keygen -t rsa -C "2545589993@qq.com"
clip < ~/.ssh/id_rsa.pub


ssh -T git@github.com
git init
git add .
git commit -m "提交描述"
git remote add origin https://github.com/pinky-pig/chrome-extension-vue.git

git push -u origin master



OpenSSL SSL_read: Connection was reset, errno 1005
// 这是服务器的SSL证书没有经过第三方机构的签署，所以报错。解决办法如下
git config --global http.sslVerify "false"

再运行git push -u origin master
```





### 设置用户名和邮箱

* git config --global user.name "pinky-pig"
* git config --global user.email "2545589993@qq.com"

### 设置ssh key

* cd ~/.ssh

首先检查是否已生成密钥 cd ~/.ssh，ls如果有3个文件，则密钥已经生成，id_rsa.pub就是公钥

如果没有，输入: ssh-keygen -t rsa -C "2545589993@qq.com"

### 复制ssh key

* 输入 clip < ~/.ssh/id_rsa.pub  会自动复制ssh key，可以直接粘贴

### **连接github，打开GitHub 进入setting找到ssh key并新建**

* ssh -T git@github.com

### 本地提交，github仓库不显示

```
git log //查看提交日志
git status //查看提交状态，提示：
    On branch master
    Your branch is ahead of 'origin/master' by 1 commit.
      (use "git push" to publish your local commits)

    nothing to commit, working tree clean
git push //将本地提交push到仓库


```

>
>
>