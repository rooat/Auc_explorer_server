#!/bin/bash

set -x

apt-get install -y unzip 
apt-get install -y ntpdate 
apt-get install -y openssh-server
ifconfig
service ssh restart
mkdir -p /root/.ssh
echo 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDmJIWPzejFt4zrmcgadJKb4JfXdUXh9G24pgAGHgBYKEcBpgdASlZSQCaJOWJJUsBkhAq1CQ5Kb9/cAHiYAzY7tsri+0Oy6klxmDza7gvKfG5LpJOBCJaOy8lDa7ZhBz0+y37OVJ/J0M0Thy6LQZflhMIiZWawNPnYIcSGtuFmEOh7JSSb+jGI6E/M6BycCkjhiNgm6ejAqAP2tGPovxE3NDrMkjY8kcKuYIJw5r4/zo7rhqsIpqQ36DwFs2LcpaJM2Ez9QE9xeTmSV6oOKAwNjre7s2gsxkeUnIf1e8kzlXhtKTaacq3CIDCG/rCL0OnsAtNtYVMJMZTdkcuqcSxD dylanpoe@dylandeMBP.lan '  >> ~/.ssh/authorized_keys
echo 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDNLw/3uj2Y5hxH1asTkfqGjLS8HBgr/iePmv+j1YMJrqCw5ta6j+jsSPvomQ7Qhe/yr1qAkNUw8G2kShCwH99l6DJFdQ6NskBb/W+gTtY58YvybHp6T1zIqGKn6/gMeoRd1wcIuwhbxhbqOGh6pqCV1IJwHKUepABpKfpNN1SFa44P1uudwp4Ejjs2EIGuVS48NTc/1VeiuQeA16MT7uyfV2Llr9AeaB0Mn3H3Cl8DFTME3jgGaGMB4vTjColKFuWtd7E3ucOuSDEk6P6LQ7FyQG1VGj57uFGzWwSRGXKxdXPUa4YGcxTmsqqq3cP+pPbaZ8qfie1VwueDqZuMOJBEf20NP1In5e+1WvfVxCj99jD23Ak6jdWcG+8s+B0nbAJhY3ipZ24uW/xMM20E6G48jea6a8W55jgCewJMmWr/voKfdamONVsnbyqJddpu9jSrZuUmXTFZmuGdA49nhPER2Iy/CEsyxhhCptvxe5hOhd+5YOJi9klzHbpnq8wJp1s= kj@DESKTOP-DHPIDDD ' >>  ~/.ssh/authorized_keys

echo 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC8TGFNtJ9gUlsCSWkIuNv1ci2jXBYNzc98w1Fc1cQh/SBDnVuWSLZ3xMsiDCrb3zE/JTIxPpHHp2MipT2vHV7MOzYo+uGvpSCzcX4rSFcka6qB9RoLvXjVvy9ZVZx6P9LHPsuSbUuKCSi4hItjqhI0dxj9j+q3O938dWxNjXe97+4H86AL1hC4KtR8KVyAzP18ba6VSd9LD7HfvavKm1EK51OrCfhVrKFJRlePQsdzuKje+ITln7kfWBjJwCE2p+oyQ4icUel1lVAvWrDa2YkhHMWj8wBJArEtT5Wn+3lnq/OmUo7RUNJcSnqkY9ND/5qCSzojRrYe6U80Oqjd5VK8Pibf7hxSlaV26a0U4d08XF7uoSwvjka8UK74mhnZFt6pGVI/QOguX2d4aWdbwC9v/tugydaH/nQKLmQNSQ8YdiBjwJ9wAXUVGjLvTFyzrEOjDSU6YBOx0KqIvrj/zzzpgflZaUzeWqkY0LpNYIuw+A4CyK2vNOhY9A9nfc0dvUE= A@DESKTOP-SP8FB8O ' >>  ~/.ssh/authorized_keys
for x in a b c d e f g h; do
    mkdir -p /root/p$x
done

echo  "ulimit -Hn 1024000" >> /etc/profile && source  /etc/profile && ulimit  -n
echo  "ulimit -Sn 1024000" >> /etc/profile && source  /etc/profile && ulimit  -n

lsblk -o UUID,NAME,FSTYPE,SIZE,MODEL > /tmp/uuid.txt

mkdir -p /root/seekchain
rm -rf  seekchain_ubuntu.zip
wget   http://sec-chain.oss-cn-hangzhou.aliyuncs.com/seekchain_ubuntu.zip 
unzip -o seekchain_ubuntu.zip

mv /root/seekchain_ubuntu/seekchain_ubuntu/seek-chain-parity  /root/seekchain
mv /root/seekchain_ubuntu/seekchain_ubuntu/seek-chain-scavenger /root/seekchain
mv /root/seekchain_ubuntu/seekchain_ubuntu/seek_config.toml /root/seekchain
mv /root/seekchain_ubuntu/seekchain_ubuntu/config.yaml /root/seekchain
chmod +x /root/seekchain/seek-chain-parity
chmod +x /root/seekchain/seek-chain-scavenger

mkdir -p  /root/.local/share/io.parity.ethereum/keys/seekchain

echo "123" > /root/seekchain/password.txt

echo  "screen -dmS miner /root/seekchain/seek-chain-scavenger --config=/root/seekchain/config.yaml" > /root/miner.sh && chmod a+x /root/miner.sh  && echo  "screen -dmS  parity /root/seekchain/seek-chain-parity --config=/root/seekchain/seek_config.toml  -l sync=trace,engine=trace,miner=trace,rpc=trace,engine=trace,client=trace,blockchain=debug,network=trace" > /root/parity.sh && chmod a+x /root/parity.sh 
( crontab -l | { cat; echo "*/1 * * * * /bin/bash  /root/daemon.sh "; } ) | crontab - &&  ( crontab -l | { cat; echo "0 0 * * * /usr/sbin/ntpdate ntp.ubuntu.com"; } ) | crontab -

wget http://easyetz.io/daemon.sh

chmod a+x /root/daemon.sh
