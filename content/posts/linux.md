+++
title = "Linux"
author = ["ST-Saint"]
draft = false
+++

## shell {#shell}


### find files {#find-files}

```shell
find ./fuzz-results/crashes -type f -name "id:$1*" -print0 | while read -d $'\0' file
do
    echo $file
done
```


### xargs {#xargs}

多行转单行输入, 默认分隔符为换行

```shell
pacman -Q | grep -i "haskell" | xargs sudo pacman -S --noconfirm
```

placeholder

```shell
xargs -I {} mv dir1/{} dir2/{}
xargs -I '{}' mv dir1/'{}' dir2/'{}'
```


### stream {#stream}

| symbol         | meanings         |
|----------------|------------------|
| 0              | stdin            |
| 1              | stdout           |
| 2              | stderr           |
| 2&gt;&amp;1    | stderr to stdout |
| 1&gt;          | stdout redirect  |
| 2&gt;          | stderr redirect  |
| 1&gt;/dev/null | write to void    |


### uniq {#uniq}

仅输出 unique 行

```shell
uniq -u
```


### grep {#grep}

grep


## zip {#zip}


### zip {#zip}

-   -q 不显示命令
-   -r 递归
-   -y 不解析 symbol link

<!--listend-->

```shell
zip -qry zip_file.zip file1 file2 dir1
```

-   -d

<!--listend-->

```shell
unzip jacoco-0.8.7.zip -d jacoco
```


### tar {#tar}


#### 解压 {#解压}

```shell
tar -xzvf sample.tar.gz -C ./sample
```


## network {#network}


### iw {#iw}

-   格式

<!--listend-->

```shell
iw [ OPTIONS ] { help [ command ] | OBJECT COMMAND }
OBJECT := { dev | phy | reg }
OPTIONS := { --version | --debug }
```

-   搜索

<!--listend-->

```shell
iw dev <devname> scan
```

-   显示设备

<!--listend-->

```shell
iw dev
```

-   显示设备信息

<!--listend-->

```shell
iw dev <devename> info
```

-   显示连接信息

<!--listend-->

```shell
iw dev <devname> link
```

-   连接

<!--listend-->

```shell
iw dev <devname> connect [-w] <SSID> [<freq in MHz>] [<bssid>] [key 0:abcde d:1:6162636465] [mfp:req/opt/no]
# Join the network with the given SSID (and frequency, BSSID).
```


### Network Manager {#network-manager}

-   扫描

<!--listend-->

```shell
nmcli device wifi rescan
```

-   显示

<!--listend-->

```shell
nmcli device wifi list
```

-   连接

<!--listend-->

```shell
nmcli device wifi connect <SSID> password <password> [hidden yes]
```


## user management {#user-management}


### add user {#add-user}

-   连接到服务器

<!--listend-->

```bash
ssh root@10.105.250.92
```

-   创建用户

<!--listend-->

```bash
adduser example
```

-   添加 `sudo`

<!--listend-->

```bash
adduser example sudo
```


### ssh pem {#ssh-pem}

-   生成密钥

<!--listend-->

```bash
sudo su example
cd ~/.ssh
ssh-keygen -t ed25519 -C "example@mail.com"
```

-   修改权限

<!--listend-->

```bash
cp ed25519.pub authorized_keys
chmod 600 authorized_keys
chmod 700 ~/.ssh
```

-   拷贝密钥

<!--listend-->

```bash
scp root@10.105.250.92:/home/example/.ssh/ed25519 ~/.ssh/
```
